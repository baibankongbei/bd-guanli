import { useMemo, type ReactNode } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ClipboardCopy, FileText, LineChart, Pencil, ShoppingCart, Users } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useStoreAudit } from '@/contexts/StoreAuditContext';
import { getDisplayOnboardingStatus, getStoreAuditDisplayStatus, getStoreTagsDisplay } from '@/data/mockData';
import { cn } from '@/lib/utils';

function onboardingBadgeClass(s: string) {
  if (s === '进件成功') return 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300';
  if (s === '进件中') return 'bg-amber-500/15 text-amber-900 dark:text-amber-200';
  return 'bg-slate-500/10 text-slate-700 dark:bg-slate-400/12 dark:text-slate-200';
}

function auditBadgeClass(status: string) {
  switch (status) {
    case '审核成功':
      return 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300';
    case '审核失败':
      return 'bg-destructive/15 text-destructive';
    case '审核中':
      return 'bg-amber-500/15 text-amber-900 dark:text-amber-200';
    default:
      /* 待审核：与进件侧同为实体胶囊，避免像孤立蓝字链接 */
      return 'bg-slate-500/12 text-slate-800 dark:bg-slate-400/15 dark:text-slate-100';
  }
}

function StatTile({
  icon: Icon,
  iconBg,
  iconColor,
  label,
  value,
}: {
  icon: typeof LineChart;
  iconBg: string;
  iconColor: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-sm ring-1 ring-border/40">
      <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-full', iconBg)}>
        <Icon className={cn('h-[18px] w-[18px]', iconColor)} strokeWidth={1.75} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] text-muted-foreground leading-tight">{label}</p>
        <p className="mt-1 text-sm font-semibold tabular-nums text-foreground">{value}</p>
      </div>
    </div>
  );
}

function MetaInline({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex min-w-0 flex-wrap items-baseline gap-x-0.5 text-[13px] leading-snug">
      <span className="shrink-0 text-muted-foreground">{label}</span>
      <span className="text-muted-foreground/80">：</span>
      <span className="min-w-0 font-medium text-foreground">{children}</span>
    </div>
  );
}

const StoreWorkspacePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getStore } = useStoreAudit();

  const store = useMemo(() => {
    const n = Number(id);
    return Number.isFinite(n) ? getStore(n) : undefined;
  }, [id, getStore]);

  if (!store) {
    return (
      <div className="min-h-screen bg-background">
        <PageHeader title="门店档案" />
        <p className="p-8 text-center text-muted-foreground text-sm">门店不存在</p>
      </div>
    );
  }

  const auditLabel = getStoreAuditDisplayStatus(store.phase);
  const onboardingLabel = getDisplayOnboardingStatus(store);
  const needsReview = store.phase === 'awaiting_bd';
  /** 与列表侧一致：审核中 / 审核成功可进入审核资料页（只读或流程中） */
  const auditRowOpensMaterials = auditLabel === '审核中' || auditLabel === '审核成功';
  const addr =
    store.address?.trim() && store.address !== '—' ? store.address : '—';
  const contactName = store.contactName?.trim() && store.contactName !== '—' ? store.contactName : '—';
  const contactPhone = store.contactPhone?.trim() ? store.contactPhone : '—';
  const tagList = getStoreTagsDisplay(store);
  const shortNameDisplay =
    store.shortName?.trim() && store.shortName !== '—' ? store.shortName : '—';

  const copyUid = async () => {
    try {
      await navigator.clipboard.writeText(store.merchantUid);
      toast({ title: '已复制', description: '门店编号已复制到剪贴板' });
    } catch {
      toast({ title: '复制失败', variant: 'destructive' });
    }
  };

  return (
    <div className="min-h-screen bg-muted/50 pb-10">
      <PageHeader title="门店档案" />

      <div className="mx-auto w-full max-w-lg space-y-4 px-4 py-4">
        {needsReview && (
          <div className="rounded-xl border border-primary/20 bg-primary/5 px-3 py-2.5 text-xs text-foreground leading-relaxed">
            该门店待您审核资料。
            <button
              type="button"
              className="ml-1 font-semibold text-primary underline-offset-2 hover:underline"
              onClick={() => navigate(`/leads/${store.id}`)}
            >
              去审核
            </button>
          </div>
        )}

        {/* 顶部档案头：标题行 + 右侧小编辑；下方横向「标签：值」 */}
        <div className="rounded-2xl bg-card p-5 shadow-[0_2px_20px_-6px_rgba(15,23,42,0.1)] ring-1 ring-border/35">
          <div className="flex items-start justify-between gap-3">
            <h1 className="min-w-0 flex-1 text-[1.25rem] font-bold leading-snug tracking-tight text-foreground">
              {store.name}
            </h1>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 shrink-0 gap-1 rounded-lg border-border/70 px-2.5 text-xs font-medium text-foreground shadow-none"
              onClick={() => navigate(`/leads/${store.id}/edit`)}
            >
              <Pencil className="h-3.5 w-3.5" />
              编辑资料
            </Button>
          </div>

          <div className="mt-5 flex flex-col gap-4 text-[13px]">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <MetaInline label="门店编号">
                <span className="font-mono text-[12px] font-semibold tracking-tight">{store.merchantUid}</span>
              </MetaInline>
              <button
                type="button"
                onClick={copyUid}
                className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-primary hover:bg-primary/10"
                aria-label="复制门店编号"
              >
                <ClipboardCopy className="h-4 w-4" />
              </button>
            </div>

            <MetaInline label="简称">{shortNameDisplay}</MetaInline>

            <MetaInline label="创建时间">
              <span className="tabular-nums font-medium text-foreground">
                {store.approvedAt?.trim() ? store.approvedAt : '—'}
              </span>
            </MetaInline>

            <div className="flex flex-col gap-2">
              <p className="text-[11px] font-medium text-muted-foreground">门店标签</p>
              <div className="flex flex-wrap gap-1.5">
                {tagList.length ? (
                  tagList.map(t => (
                    <span
                      key={t}
                      className="inline-flex max-w-full truncate rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-foreground ring-1 ring-primary/15"
                    >
                      {t}
                    </span>
                  ))
                ) : (
                  <span className="text-[13px] font-medium text-muted-foreground">—</span>
                )}
              </div>
            </div>

            <div className="rounded-xl bg-muted/40 px-3 py-3 ring-1 ring-border/30">
              <p className="mb-3 text-[11px] font-medium text-muted-foreground">当前状态</p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="flex items-center justify-between gap-2 rounded-lg bg-background/70 px-2.5 py-2 ring-1 ring-border/40">
                  <span className="shrink-0 text-[11px] text-muted-foreground">进件</span>
                  <span
                    className={cn(
                      'max-w-[65%] truncate rounded-full px-2.5 py-0.5 text-center text-[11px] font-semibold',
                      onboardingBadgeClass(onboardingLabel)
                    )}
                  >
                    {onboardingLabel}
                  </span>
                </div>
                {auditRowOpensMaterials ? (
                  <button
                    type="button"
                    onClick={() => navigate(`/leads/${store.id}`)}
                    aria-label="查看审核资料"
                    className="flex w-full min-w-0 cursor-pointer items-center justify-between gap-2 rounded-lg bg-background/70 px-2.5 py-2 text-left ring-1 ring-border/40 transition-colors hover:bg-background hover:ring-primary/25 active:bg-muted/60"
                  >
                    <span className="shrink-0 text-[11px] text-muted-foreground">资料审核</span>
                    <span
                      className={cn(
                        'max-w-[65%] truncate rounded-full px-2.5 py-0.5 text-center text-[11px] font-semibold',
                        auditBadgeClass(auditLabel)
                      )}
                    >
                      {auditLabel}
                    </span>
                  </button>
                ) : (
                  <div className="flex min-w-0 items-center justify-between gap-2 rounded-lg bg-background/70 px-2.5 py-2 ring-1 ring-border/40">
                    <span className="shrink-0 text-[11px] text-muted-foreground">资料审核</span>
                    <span
                      className={cn(
                        'max-w-[65%] truncate rounded-full px-2.5 py-0.5 text-center text-[11px] font-semibold',
                        auditBadgeClass(auditLabel)
                      )}
                    >
                      {auditLabel}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4 border-t border-border/35 pt-4">
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                <MetaInline label="联系人">{contactName}</MetaInline>
                <MetaInline label="联系电话">
                  <span className="tabular-nums">{contactPhone}</span>
                </MetaInline>
                <MetaInline label="绑定 BD">{store.boundBd}</MetaInline>
                <MetaInline label="门店分组">{store.partnerDivision ?? '—'}</MetaInline>
              </div>
              <p className="text-[13px] leading-relaxed">
                <span className="text-muted-foreground">门店地址：</span>
                <span className="font-medium text-foreground">{addr}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <StatTile
            icon={LineChart}
            iconBg="bg-sky-500/12"
            iconColor="text-sky-600 dark:text-sky-400"
            label="累计交易金额"
            value="¥125.7万"
          />
          <StatTile
            icon={ShoppingCart}
            iconBg="bg-emerald-500/12"
            iconColor="text-emerald-600 dark:text-emerald-400"
            label="累计交易笔数"
            value="8,520"
          />
          <StatTile
            icon={Users}
            iconBg="bg-violet-500/12"
            iconColor="text-violet-600 dark:text-violet-400"
            label="累计使用次数"
            value="365"
          />
          <StatTile
            icon={FileText}
            iconBg="bg-orange-500/12"
            iconColor="text-orange-600 dark:text-orange-400"
            label="商户产生订单"
            value="9,200"
          />
        </div>

        <div className="rounded-2xl bg-card p-4 shadow-sm ring-1 ring-border/40">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-sm font-semibold text-foreground">交易趋势</h2>
            <div className="flex rounded-lg bg-muted/80 p-0.5 text-[11px] font-medium">
              <span className="rounded-md bg-background px-2.5 py-1 shadow-sm">日</span>
              <span className="px-2.5 py-1 text-muted-foreground">月</span>
            </div>
          </div>
          <div className="mt-4 flex h-36 items-end justify-between gap-1.5 px-1">
            {[40, 55, 35, 62, 48, 70].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-md bg-primary/25 dark:bg-primary/30"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="mt-2 flex justify-between text-[10px] text-muted-foreground tabular-nums px-0.5">
            {['03-20', '03-22', '03-24', '03-26', '03-28', '03-31'].map(d => (
              <span key={d}>{d}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreWorkspacePage;
