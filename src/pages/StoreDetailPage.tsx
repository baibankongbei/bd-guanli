import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useStoreAudit } from '@/contexts/StoreAuditContext';
import { StoreAuditFieldsView } from '@/components/store/StoreAuditFieldsView';
import { AlertCircle } from 'lucide-react';

const StoreDetailPage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { getStore, bdApprove, bdReject } = useStoreAudit();

  const store = useMemo(() => {
    const n = Number(id);
    return Number.isFinite(n) ? getStore(n) : undefined;
  }, [id, getStore]);

  const [rejectOpen, setRejectOpen] = useState(false);
  const [rejectText, setRejectText] = useState('');
  const [failureOpen, setFailureOpen] = useState(false);

  if (!store) {
    return (
      <div className="min-h-screen bg-background">
        <PageHeader title="审核资料" />
        <p className="p-8 text-center text-muted-foreground text-sm">门店不存在</p>
      </div>
    );
  }

  const bdCanAct = store.phase === 'awaiting_bd';

  const openReject = () => {
    if (!bdCanAct) return;
    setRejectText('');
    setRejectOpen(true);
  };

  const confirmReject = () => {
    if (!rejectText.trim()) {
      toast({ title: '请填写驳回原因', variant: 'destructive' });
      return;
    }
    bdReject(store.id, rejectText.trim());
    setRejectOpen(false);
    toast({ title: '已驳回', description: '门店已标记为审核失败' });
  };

  const confirmApprove = () => {
    if (!bdCanAct) return;
    bdApprove(store.id);
    toast({ title: 'BD 初审通过', description: '已提交 BD 负责人终审，列表与详情仍显示「审核中」' });
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title="审核资料" />

      {store.phase === 'awaiting_leader' && (
        <div className="mx-4 mt-3 rounded-xl border border-amber-200/80 bg-amber-50 px-3 py-2.5 text-xs text-amber-950 leading-relaxed dark:border-amber-900/50 dark:bg-amber-950/35 dark:text-amber-100">
          您已完成 <strong>BD 初审</strong>，资料已流转至 <strong>BD 负责人</strong>终审。对外审核状态仍为
          <strong>「审核中」</strong>，下方 <strong>驳回</strong>、<strong>审核通过</strong> 已置灰不可操作。本页为只读审核资料。
        </div>
      )}

      <div className="mx-3 mt-2.5 rounded-xl border border-border/80 bg-card px-2 py-2 shadow-sm">
        <StoreAuditFieldsView store={store} />
      </div>

      {store.rejectReason && (
        <div className="mx-4 mt-3 rounded-xl border border-destructive/25 bg-destructive/5 px-3 py-3">
          <p className="text-xs font-medium text-destructive flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            驳回/失败原因
          </p>
          <p className="text-sm text-foreground mt-1.5 leading-relaxed">{store.rejectReason}</p>
          {store.systemFailureDetail && (
            <Button type="button" variant="secondary" size="sm" className="mt-2 h-8 text-xs w-full" onClick={() => setFailureOpen(true)}>
              查看系统失败详情
            </Button>
          )}
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 z-20 bg-background/95 backdrop-blur border-t border-border pt-3 pb-6 px-4 max-w-lg mx-auto w-full">
        <div className="flex gap-2">
          <Button type="button" variant="outline" className="flex-1 h-11" disabled={!bdCanAct} onClick={openReject}>
            驳回
          </Button>
          <Button type="button" className="flex-1 h-11" disabled={!bdCanAct} onClick={confirmApprove}>
            审核通过
          </Button>
        </div>
      </div>

      <Dialog open={rejectOpen} onOpenChange={setRejectOpen}>
        <DialogContent className="max-w-[340px] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-base">驳回原因</DialogTitle>
            <DialogDescription>请填写驳回说明，提交后门店状态将变为审核失败。</DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="请输入驳回原因…"
            value={rejectText}
            onChange={e => setRejectText(e.target.value)}
            className="min-h-[120px] mt-2"
          />
          <DialogFooter className="flex-row gap-2 sm:justify-stretch">
            <Button type="button" variant="outline" className="flex-1" onClick={() => setRejectOpen(false)}>
              取消
            </Button>
            <Button type="button" className="flex-1" onClick={confirmReject}>
              确定
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={failureOpen} onOpenChange={setFailureOpen}>
        <DialogContent className="max-w-[340px] rounded-2xl border-zinc-700 bg-zinc-900 text-zinc-50">
          <DialogHeader>
            <DialogTitle className="text-base text-zinc-50 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-400" />
              失败原因
            </DialogTitle>
            <DialogDescription className="text-zinc-400">{store.systemFailureDetail}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-row gap-2 sm:justify-stretch">
            <Button type="button" variant="secondary" className="flex-1 bg-zinc-800 text-zinc-100 hover:bg-zinc-700" onClick={() => setFailureOpen(false)}>
              返回
            </Button>
            <Button
              type="button"
              className="flex-1 bg-primary"
              onClick={() => {
                setFailureOpen(false);
                toast({ title: '已发起重新认证', description: '演示：已跳转认证流程（可接真实路由）' });
              }}
            >
              重新认证
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StoreDetailPage;
