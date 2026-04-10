import { useMemo, useState, type MouseEvent, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/PageHeader';
import { useStoreAudit } from '@/contexts/StoreAuditContext';
import {
  getDisplayOnboardingStatus,
  getStoreAuditDisplayStatus,
  getStoreTagsDisplay,
  type StoreAudit,
  type StoreAuditDisplayStatus,
} from '@/data/mockData';
import { Plus, Search, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const STATUS_TABS: Array<'全部' | StoreAuditDisplayStatus> = ['全部', '待审核', '审核中', '审核成功', '审核失败'];

function statusBadgeClass(status: StoreAuditDisplayStatus) {
  switch (status) {
    case '审核成功':
      return 'bg-emerald-500/12 text-emerald-800 dark:text-emerald-300';
    case '审核失败':
      return 'bg-destructive/12 text-destructive';
    case '审核中':
      return 'bg-amber-500/12 text-amber-900 dark:text-amber-200';
    default:
      return 'bg-slate-500/12 text-slate-800 dark:text-slate-200';
  }
}

function displayDash(v: string) {
  const t = v?.trim();
  return !t || t === '—' ? '—' : t;
}

function storeMatchesSearch(store: StoreAudit, rawQuery: string): boolean {
  const q = rawQuery.trim().toLowerCase();
  if (!q) return true;
  const blob = [
    store.name,
    store.boundBd,
    store.address,
    store.regionCascade,
    store.detailAddress,
  ]
    .map(s => (s ?? '').toString().toLowerCase())
    .join('\n');
  return blob.includes(q);
}

function InfoCell({
  label,
  children,
  className,
  valueClassName,
}: {
  label: string;
  children: ReactNode;
  className?: string;
  valueClassName?: string;
}) {
  return (
    <div className={cn('min-w-0 space-y-1', className)}>
      <p className="text-[10px] font-medium leading-tight text-muted-foreground">{label}</p>
      <div className={cn('text-[12px] font-medium leading-snug text-foreground break-words', valueClassName)}>{children}</div>
    </div>
  );
}

const LeadsPage = () => {
  const navigate = useNavigate();
  const { stores } = useStoreAudit();
  const [statusFilter, setStatusFilter] = useState<(typeof STATUS_TABS)[number]>('全部');
  const [searchQuery, setSearchQuery] = useState('');

  const counts = useMemo(() => {
    const c: Record<StoreAuditDisplayStatus | '全部', number> = {
      全部: stores.length,
      待审核: 0,
      审核中: 0,
      审核成功: 0,
      审核失败: 0,
    };
    for (const s of stores) {
      const d = getStoreAuditDisplayStatus(s.phase);
      c[d]++;
    }
    return c;
  }, [stores]);

  const pendingBdCount = useMemo(() => stores.filter(s => s.phase === 'awaiting_bd').length, [stores]);

  const statusFiltered = useMemo(() => {
    if (statusFilter === '全部') return stores;
    return stores.filter(s => getStoreAuditDisplayStatus(s.phase) === statusFilter);
  }, [stores, statusFilter]);

  const filtered = useMemo(() => {
    const arr = statusFiltered.filter(s => storeMatchesSearch(s, searchQuery));
    arr.sort((a, b) => {
      const aPending = getStoreAuditDisplayStatus(a.phase) === '待审核';
      const bPending = getStoreAuditDisplayStatus(b.phase) === '待审核';
      if (aPending !== bPending) return aPending ? -1 : 1;
      return b.submittedAt.localeCompare(a.submittedAt);
    });
    return arr;
  }, [statusFiltered, searchQuery]);

  const onAddStore = () => {
    navigate('/leads/new/edit');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/60 via-background to-muted/30 pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))]">
      <PageHeader title="门店管理" />

      <div className="mx-auto flex w-full max-w-lg flex-col gap-3 px-4 pt-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <Input
            type="search"
            enterKeyHint="search"
            placeholder="搜索门店名称、BD名称"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="h-10 rounded-xl border-border/60 bg-card pl-9 pr-3 text-sm shadow-sm"
          />
        </div>

        <div className="rounded-2xl bg-muted/40 p-1 ring-1 ring-border/40">
          <div className="flex gap-1 overflow-x-auto pb-0.5 [-webkit-overflow-scrolling:touch] scrollbar-thin px-0.5">
            {STATUS_TABS.map(tab => (
              <button
                key={tab}
                type="button"
                onClick={() => setStatusFilter(tab)}
                className={cn(
                  'shrink-0 rounded-xl px-3 py-2 text-xs font-semibold transition-all whitespace-nowrap',
                  statusFilter === tab
                    ? 'bg-card text-foreground shadow-sm ring-1 ring-border/50'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {tab}
                <span className={cn('ml-1 tabular-nums', statusFilter === tab ? 'text-primary' : 'text-muted-foreground')}>
                  {counts[tab]}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div
          className={cn(
            'rounded-xl border px-3 py-2.5 text-[11px] leading-relaxed',
            pendingBdCount > 0 ? 'border-primary/20 bg-primary/[0.06] text-foreground' : 'border-border/50 bg-card/60 text-muted-foreground'
          )}
        >
          {pendingBdCount > 0 ? (
            <>
              当前有 <span className="font-semibold text-foreground">{pendingBdCount}</span> 家门店待您审核：可直接点卡片上的
              <span className="font-semibold text-primary">「审核资料」</span>
              ，或<span className="font-semibold text-foreground"> 点击卡片</span>进档案后再处理。
            </>
          ) : (
            <>暂无待您审核的门店。点击门店卡片进入档案查看详情与编辑资料。</>
          )}
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-lg flex-col gap-4 px-4 py-4">
        {filtered.map(store => {
          const d = getStoreAuditDisplayStatus(store.phase);
          const tags = getStoreTagsDisplay(store);
          const whWarn = store.warehouseNeedsAttention;
          const showAuditButton = store.phase === 'awaiting_bd';
          const openWorkspace = () => navigate(`/leads/${store.id}/workspace`);
          const openAudit = (e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            navigate(`/leads/${store.id}`);
          };
          return (
            <article
              key={store.id}
              role="button"
              tabIndex={0}
              onClick={openWorkspace}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openWorkspace();
                }
              }}
              className="cursor-pointer overflow-hidden rounded-2xl bg-card shadow-[0_2px_20px_-8px_rgba(15,23,42,0.12)] ring-1 ring-border/40 transition-[transform,box-shadow,ring-color] hover:ring-primary/25 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <div className="px-4 pt-4 pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-bold leading-snug tracking-tight text-foreground">
                      {store.name.trim() || '未命名门店'}
                    </h3>
                    <p className="mt-1 text-[10px] text-muted-foreground tabular-nums">门店编号 {store.merchantUid}</p>
                  </div>
                  <span
                    className={cn(
                      'shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold',
                      statusBadgeClass(d)
                    )}
                  >
                    {d}
                  </span>
                </div>
                <div className="mt-2.5 flex min-h-[1.25rem] flex-wrap gap-1.5">
                  {tags.length ? (
                    tags.map(t => (
                      <span
                        key={`${store.id}-${t}`}
                        className="inline-flex max-w-full truncate rounded-full border border-primary/30 bg-primary/[0.11] px-2.5 py-0.5 text-[11px] font-semibold text-primary dark:border-primary/40 dark:bg-primary/20 dark:text-primary-foreground"
                      >
                        {t}
                      </span>
                    ))
                  ) : (
                    <span className="text-[10px] text-muted-foreground">暂无标签</span>
                  )}
                </div>
              </div>

              <div className="mx-3 mb-3 grid grid-cols-2 gap-x-3 gap-y-4 rounded-xl bg-muted/30 px-3 py-4 ring-1 ring-border/25">
                <InfoCell label="进件状态">{getDisplayOnboardingStatus(store)}</InfoCell>
                <InfoCell label="仓库配送">{displayDash(store.deliveryMode)}</InfoCell>
                <InfoCell label="门店联系人">{displayDash(store.contact)}</InfoCell>
                <InfoCell label="绑定 BD">{displayDash(store.boundBd)}</InfoCell>
                <InfoCell
                  label="配送仓库"
                  valueClassName={cn(whWarn && 'text-destructive font-semibold')}
                >
                  {displayDash(store.warehouse)}
                </InfoCell>
                <InfoCell label="门店分组">{store.partnerDivision ?? '—'}</InfoCell>
                <InfoCell label="可提现手机" className="col-span-2">
                  {!store.withdrawPhone?.trim() ? (
                    <span className="text-primary font-semibold">待添加</span>
                  ) : (
                    <span className="tabular-nums">{store.withdrawPhone}</span>
                  )}
                </InfoCell>
                <InfoCell label="门店地址" className="col-span-2">
                  <span className="line-clamp-2 font-normal text-foreground/90">{displayDash(store.address)}</span>
                </InfoCell>
              </div>

              {showAuditButton && (
                <div className="border-t border-border/45 bg-primary/[0.06] px-3 py-2.5" onClick={e => e.stopPropagation()}>
                  <Button
                    type="button"
                    className="h-10 w-full rounded-xl text-sm font-semibold shadow-sm"
                    onClick={openAudit}
                  >
                    审核资料
                  </Button>
                </div>
              )}
            </article>
          );
        })}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 bg-muted/20 px-6 py-14 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
              <Store className="h-6 w-6" strokeWidth={1.5} />
            </div>
            <p className="mt-4 text-sm font-semibold text-foreground">
              {stores.length === 0
                ? '暂无门店'
                : searchQuery.trim() && statusFiltered.length > 0
                  ? '未找到相关门店'
                  : '该筛选下暂无门店'}
            </p>
            <p className="mt-1 max-w-[240px] text-xs text-muted-foreground leading-relaxed">
              {stores.length === 0
                ? '点击右下角添加门店，开始录入资料。'
                : searchQuery.trim() && statusFiltered.length > 0
                  ? '请尝试更换关键词，或清空搜索框。'
                  : '可切换上方筛选或查看「全部」。'}
            </p>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-30 flex justify-center pb-[max(1rem,env(safe-area-inset-bottom))] pt-2 pointer-events-none">
        <Button
          type="button"
          onClick={onAddStore}
          className="pointer-events-auto h-12 rounded-full px-6 shadow-lg shadow-primary/20 ring-4 ring-background gap-2"
        >
          <Plus className="h-5 w-5" />
          <span className="text-sm font-semibold">添加门店</span>
        </Button>
      </div>
    </div>
  );
};

export default LeadsPage;
