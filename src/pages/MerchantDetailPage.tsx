import { useState, type ReactNode } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Copy, RefreshCw, Maximize2 } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { managedMerchants, type SettlementType } from '@/data/mockData';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import storefrontDemoUrl from '@/assets/storefront-demo.svg?url';

function settlementAccountLabel(t: SettlementType): string {
  switch (t) {
    case '对公':
      return '对公账户';
    case '对私法人':
      return '对私账户（法人结算）';
    case '对私非法人':
      return '对私账户（非法人结算）';
    default:
      return t;
  }
}

function SectionCard({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-border/80 bg-card shadow-[0_1px_0_rgba(0,0,0,0.04)] ring-1 ring-border/30 overflow-hidden">
      <div className="border-b border-border/50 bg-muted/30 px-4 py-3">
        <h2 className="text-[15px] font-semibold tracking-tight text-foreground">{title}</h2>
        {subtitle ? <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">{subtitle}</p> : null}
      </div>
      <div className="px-4 py-1">{children}</div>
    </section>
  );
}

function DetailRow({ label, value, valueClassName }: { label: string; value: ReactNode; valueClassName?: string }) {
  return (
    <div className="flex gap-3 border-b border-border/40 py-3.5 last:border-b-0">
      <span className="w-[6.5rem] shrink-0 pt-0.5 text-[12px] leading-snug text-muted-foreground">{label}</span>
      <div className={cn('min-w-0 flex-1 text-right text-[13px] font-medium leading-snug text-foreground break-words', valueClassName)}>
        {value}
      </div>
    </div>
  );
}

function PhotoThumb({
  label,
  src,
  onPreview,
}: {
  label: string;
  src: string;
  onPreview: (src: string, title: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onPreview(src, label)}
      className="group flex w-full flex-col gap-2 rounded-xl text-left"
    >
      {label ? <span className="text-[11px] font-medium text-muted-foreground">{label}</span> : null}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-border/60 bg-muted/40 ring-1 ring-border/30">
        <img src={src} alt="" className="h-full w-full object-cover object-center transition-transform group-active:scale-[1.02]" />
        <span className="absolute bottom-1.5 right-1.5 flex items-center gap-0.5 rounded-md bg-background/90 px-1.5 py-0.5 text-[9px] font-medium text-muted-foreground shadow-sm backdrop-blur-sm">
          <Maximize2 className="h-2.5 w-2.5" />
          查看大图
        </span>
      </div>
    </button>
  );
}

const MerchantDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const merchant = managedMerchants.find(m => m.id === Number(id));
  const [resubmitDialog, setResubmitDialog] = useState(false);
  const [preview, setPreview] = useState<{ src: string; title: string } | null>(null);

  if (!merchant) {
    return (
      <div className="min-h-screen bg-background">
        <PageHeader title="商户详情" />
        <div className="p-8 text-center text-muted-foreground">商户不存在</div>
      </div>
    );
  }

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: '已复制', description: text });
  };

  const openPreview = (src: string, title: string) => setPreview({ src, title });
  const demoImg = storefrontDemoUrl;

  const settlementCredentialLabel = merchant.settlementType === '对公' ? '开户许可证' : '银行卡照片';
  const showResubmitBar = merchant.status === '已驳回';

  return (
    <div className={cn('min-h-screen bg-muted/35', showResubmitBar ? 'pb-[calc(5.5rem+env(safe-area-inset-bottom,0px))]' : 'pb-8')}>
      <PageHeader title="商户详情" />

      <div className="mx-auto w-full max-w-lg space-y-4 px-4 pt-3">
        {/* 顶部摘要 */}
        <div className="rounded-2xl border border-border/80 bg-card p-4 shadow-sm ring-1 ring-border/35">
          <p className="text-[15px] font-semibold leading-snug text-foreground">{merchant.name}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-muted-foreground">商户编号 {merchant.merchantNo}</span>
            <button type="button" onClick={() => copyText(merchant.merchantNo)} className="rounded-md p-1 text-primary hover:bg-primary/10" aria-label="复制商户编号">
              <Copy className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
            <span>简称 {merchant.shortName}</span>
            <span
              className={cn(
                'rounded-full px-2 py-0.5 text-[10px] font-semibold',
                merchant.status === '进件成功' && 'bg-emerald-500/12 text-emerald-800 dark:text-emerald-300',
                merchant.status === '审核中' && 'bg-amber-500/12 text-amber-900 dark:text-amber-200',
                merchant.status === '已驳回' && 'bg-destructive/12 text-destructive'
              )}
            >
              {merchant.status}
            </span>
          </div>
        </div>

        {merchant.rejectReason ? (
          <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-4 shadow-sm ring-1 ring-destructive/15">
            <p className="text-xs font-semibold text-destructive">驳回原因</p>
            <p className="mt-2 text-[13px] leading-relaxed text-foreground">{merchant.rejectReason}</p>
          </div>
        ) : null}

        <SectionCard title="进件概要" subtitle="渠道与审核进度相关字段">
          <DetailRow label="进件渠道" value={merchant.channel} />
          <DetailRow label="进件日期" value={merchant.applicationDate} valueClassName="tabular-nums font-normal" />
          <DetailRow label="商户落地日期" value={merchant.merchantDate?.trim() ? merchant.merchantDate : '—'} valueClassName="tabular-nums font-normal" />
          <DetailRow label="签约费率" value={merchant.rate} />
          <DetailRow label="支付认证" value={merchant.paymentAuth} />
          <DetailRow label="行业（参考）" value={merchant.industry} />
        </SectionCard>

        <SectionCard title="执照信息" subtitle="主体与营业执照">
          <DetailRow label="商户类别" value={merchant.merchantCategory} />
          <div className="border-b border-border/40 py-3.5 last:border-b-0">
            <PhotoThumb label="营业执照" src={demoImg} onPreview={openPreview} />
          </div>
          <DetailRow label="营业执照名称" value={merchant.licenseName} />
          <DetailRow label="注册号/代码" value={merchant.registrationCode} valueClassName="font-mono text-[12px]" />
          <DetailRow
            label="执照有效期"
            value={
              <span className="tabular-nums">
                {merchant.licenseValidFrom} 至 {merchant.licenseValidTo}
              </span>
            }
            valueClassName="font-normal"
          />
          <DetailRow label="注册地址" value={merchant.registeredRegion} />
          <DetailRow label="详细地址" value={merchant.registeredDetailAddress} />
          <DetailRow label="证件类型" value={merchant.licenseDocumentType} />
        </SectionCard>

        <SectionCard title="法人信息" subtitle="法人身份证件">
          <DetailRow label="证件类型" value={merchant.legalIdDocType} />
          <div className="grid grid-cols-2 gap-3 border-b border-border/40 py-3.5">
            <PhotoThumb label="身份证人像面" src={demoImg} onPreview={openPreview} />
            <PhotoThumb label="身份证国徽面" src={demoImg} onPreview={openPreview} />
          </div>
          <DetailRow label="法人姓名" value={merchant.legalPerson} />
          <DetailRow label="身份证号" value={merchant.idNumber} valueClassName="font-mono text-[12px]" />
          <DetailRow
            label="证件有效期限"
            value={
              <span className="tabular-nums">
                {merchant.idValidFrom} 至 {merchant.idValidTo}
              </span>
            }
            valueClassName="font-normal"
          />
          <DetailRow label="身份证签发机关" value={merchant.idIssuingAuthority} />
        </SectionCard>

        <SectionCard title="基本信息" subtitle="门店经营与联系人">
          <DetailRow label="商户经营名称" value={merchant.operatingName} />
          <DetailRow label="商户经营地区" value={merchant.operatingRegion} />
          <DetailRow label="经营详细地址" value={merchant.operatingDetailAddress} />
          <DetailRow label="商户类型" value={merchant.merchantTypeLabel} />
          <DetailRow label="联系人姓名" value={merchant.contact} />
          <DetailRow label="手机号码" value={merchant.phone} valueClassName="tabular-nums font-normal" />
        </SectionCard>

        <SectionCard title="结算信息" subtitle="结算账户与开户行">
          <DetailRow label="账户类型" value={settlementAccountLabel(merchant.settlementType)} />
          <div className="border-b border-border/40 py-3.5">
            <PhotoThumb label={settlementCredentialLabel} src={demoImg} onPreview={openPreview} />
          </div>
          <DetailRow label="开户名/结算户名" value={merchant.settlementAccountName} />
          <DetailRow label="开户账号/结算账号" value={merchant.bankAccount} valueClassName="font-mono text-[12px]" />
          <DetailRow label="开户银行" value={merchant.bankName} />
          <DetailRow label="开户支行" value={merchant.branchName} />
          <DetailRow label="是否法人结算" value={merchant.isLegalPersonSettlement ? '是' : '否'} />

          {!merchant.isLegalPersonSettlement && (merchant.settlorName || merchant.settlorIdNumber) ? (
            <>
              <div className="my-2 border-t border-dashed border-border/60 pt-3">
                <p className="text-[11px] font-semibold text-foreground">非法人结算补充</p>
                <p className="mt-0.5 text-[10px] text-muted-foreground">结算人证件及法人授权函</p>
              </div>
              {merchant.settlorName ? <DetailRow label="结算人姓名" value={merchant.settlorName} /> : null}
              {merchant.settlorIdNumber ? (
                <DetailRow label="结算人证件号" value={merchant.settlorIdNumber} valueClassName="font-mono text-[12px]" />
              ) : null}
              <div className="grid grid-cols-2 gap-3 border-b border-border/40 py-3.5 last:border-b-0">
                <PhotoThumb label="结算人身份证人像面" src={demoImg} onPreview={openPreview} />
                <PhotoThumb label="结算人身份证国徽面" src={demoImg} onPreview={openPreview} />
              </div>
              <div className="py-3.5">
                <PhotoThumb label="法人授权函" src={demoImg} onPreview={openPreview} />
              </div>
            </>
          ) : null}
        </SectionCard>

        <SectionCard title="门店信息" subtitle="门头、内景与收银台">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <PhotoThumb label="门头照" src={demoImg} onPreview={openPreview} />
            <PhotoThumb label="内景照" src={demoImg} onPreview={openPreview} />
            <PhotoThumb label="收银台照" src={demoImg} onPreview={openPreview} />
          </div>
          <div className="border-t border-border/40">
            <DetailRow label="门店名称" value={merchant.storeName} />
          </div>
        </SectionCard>

        <SectionCard title="协议与认证" subtitle="签约与实名状态">
          <DetailRow label="商户协议类型" value={merchant.agreementType} />
          <DetailRow label="电子签名" value={merchant.eSignStatus} />
          <DetailRow label="实名认证" value={merchant.realNameAuthStatus} />
        </SectionCard>
      </div>

      {showResubmitBar ? (
        <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-border/80 bg-background/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-4px_24px_-8px_rgba(15,23,42,0.12)] backdrop-blur-md supports-[backdrop-filter]:bg-background/85">
          <div className="mx-auto w-full max-w-lg">
            <Button className="h-12 w-full gap-2 rounded-xl text-sm font-semibold shadow-sm" onClick={() => setResubmitDialog(true)}>
              <RefreshCw className="h-4 w-4" />
              重新提交
            </Button>
          </div>
        </div>
      ) : null}

      <Dialog open={!!preview} onOpenChange={open => !open && setPreview(null)}>
        <DialogContent className="max-w-[min(100vw-1.5rem,380px)] gap-0 overflow-hidden rounded-2xl p-0">
          <DialogHeader className="border-b border-border px-4 py-3 text-left">
            <DialogTitle className="text-base">{preview?.title || '图片预览'}</DialogTitle>
            <DialogDescription className="sr-only">点击查看大图</DialogDescription>
          </DialogHeader>
          <div className="bg-muted/30 p-3">
            {preview ? (
              <img src={preview.src} alt="" className="max-h-[70vh] w-full rounded-lg object-contain" />
            ) : null}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={resubmitDialog} onOpenChange={setResubmitDialog}>
        <DialogContent className="max-w-[340px] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-base">重新提交进件</DialogTitle>
            <DialogDescription>将跳转到进件流程页面，请修改相关资料后重新提交审核。</DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-row gap-2">
            <Button variant="outline" className="flex-1" onClick={() => setResubmitDialog(false)}>
              取消
            </Button>
            <Button
              className="flex-1"
              onClick={() => {
                setResubmitDialog(false);
                navigate('/merchants/onboarding');
              }}
            >
              去提交
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MerchantDetailPage;
