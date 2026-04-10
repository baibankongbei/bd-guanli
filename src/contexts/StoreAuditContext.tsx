import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { initialStoreAudits, type StoreAudit } from '@/data/mockData';

function randomPartnerDivision(): '加盟店' | '合作店' {
  return Math.random() < 0.5 ? '加盟店' : '合作店';
}

/** 新建门店时由保存逻辑写入 id / merchantUid / submittedAt */
export type StoreAuditCreatePayload = Omit<StoreAudit, 'id' | 'merchantUid' | 'submittedAt'>;

type Ctx = {
  stores: StoreAudit[];
  getStore: (id: number) => StoreAudit | undefined;
  updateStore: (id: number, patch: Partial<StoreAudit>) => void;
  createStore: (payload: StoreAuditCreatePayload) => number;
  bdApprove: (id: number) => void;
  bdReject: (id: number, reason: string) => void;
};

const StoreAuditContext = createContext<Ctx | null>(null);

export function StoreAuditProvider({ children }: { children: ReactNode }) {
  const [stores, setStores] = useState<StoreAudit[]>(() =>
    initialStoreAudits.map(s => ({ ...s, partnerDivision: randomPartnerDivision() }))
  );

  const getStore = useCallback((id: number) => stores.find(s => s.id === id), [stores]);

  const updateStore = useCallback((id: number, patch: Partial<StoreAudit>) => {
    setStores(prev => prev.map(s => (s.id === id ? { ...s, ...patch } : s)));
  }, []);

  const createStore = useCallback((payload: StoreAuditCreatePayload) => {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const ts = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
    let newId = 0;
    setStores(prev => {
      newId = prev.reduce((m, s) => Math.max(m, s.id), 0) + 1;
      const merchantUid = `MU${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}${String(newId).padStart(4, '0')}`;
      const row: StoreAudit = {
        ...payload,
        id: newId,
        merchantUid,
        submittedAt: ts,
      };
      return [...prev, row];
    });
    return newId;
  }, []);

  const bdApprove = useCallback((id: number) => {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const ts = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
    setStores(prev =>
      prev.map(s =>
        s.id === id && s.phase === 'awaiting_bd'
          ? { ...s, phase: 'awaiting_leader' as const, bdApprovedAt: ts }
          : s
      )
    );
  }, []);

  const bdReject = useCallback((id: number, reason: string) => {
    setStores(prev =>
      prev.map(s =>
        s.id === id && s.phase === 'awaiting_bd'
          ? { ...s, phase: 'rejected' as const, rejectReason: reason, systemFailureDetail: undefined }
          : s
      )
    );
  }, []);

  const value = useMemo(
    () => ({ stores, getStore, updateStore, createStore, bdApprove, bdReject }),
    [stores, getStore, updateStore, createStore, bdApprove, bdReject]
  );

  return <StoreAuditContext.Provider value={value}>{children}</StoreAuditContext.Provider>;
}

export function useStoreAudit() {
  const ctx = useContext(StoreAuditContext);
  if (!ctx) throw new Error('useStoreAudit must be used within StoreAuditProvider');
  return ctx;
}
