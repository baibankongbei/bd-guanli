import { useMemo, useState, type ReactNode } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import { Building2, ImagePlus, MapPinned, Package, UserRound } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useStoreAudit, type StoreAuditCreatePayload } from '@/contexts/StoreAuditContext';
import { getStoreTagsDisplay, type StoreAudit, type StorePartnerDivision } from '@/data/mockData';
import { cn } from '@/lib/utils';
import storefrontDemoUrl from '@/assets/storefront-demo.svg?url';

const BD_OPTIONS = ['王强', '李明', '赵丽', '周杰', '当前 BD'] as const;
const DELIVERY_OPTIONS = ['配送', '总部仓配', '门店自提+同城配', '供应商直送', '无仓储', '—'] as const;
const WAREHOUSE_OPTIONS = ['华东 RDC-杭州', '杭州城市前置仓', '图书中央仓', '—'] as const;
const PARTNER_DIVISION_OPTIONS = ['加盟店', '合作店'] as const;
const LABEL_OPTIONS = ['社区店', '商场店', '夜市烧烤', '写字楼配套', '工作室', '待完善', '—'] as const;
const REGION_PRESETS = [
  '浙江省 / 杭州市 / 西湖区',
  '浙江省 / 杭州市 / 拱墅区',
  '浙江省 / 杭州市 / 滨江区',
  '浙江省 / 杭州市 / 上城区',
  '浙江省 / 杭州市 / 余杭区',
  '—',
] as const;

function maskPhone(p: string) {
  const d = p.replace(/\D/g, '');
  if (d.length >= 11) return `${d.slice(0, 3)}****${d.slice(-4)}`;
  return p || '';
}

function FormSection({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl bg-card shadow-[0_1px_0_rgba(0,0,0,0.04),0_8px_28px_-6px_rgba(15,23,42,0.12)] ring-1 ring-border/50 overflow-hidden">
      <div className="flex gap-3 border-b border-border/40 bg-gradient-to-r from-primary/[0.06] to-transparent px-4 py-3.5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/14 text-primary shadow-inner shadow-primary/5">
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </div>
        <div className="min-w-0 flex-1 pt-0.5">
          <h2 className="text-[15px] font-semibold tracking-tight text-foreground">{title}</h2>
          {description ? <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">{description}</p> : null}
        </div>
      </div>
      <div className="flex flex-col gap-5 px-4 py-5">{children}</div>
    </section>
  );
}

function Field({ label, hint, error, children }: { label: string; hint?: string; error?: boolean; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-2">
        <Label className={cn('text-xs font-medium', error ? 'text-destructive' : 'text-foreground/70')}>{label}</Label>
        {hint ? <span className="text-[10px] text-muted-foreground shrink-0">{hint}</span> : null}
      </div>
      {children}
    </div>
  );
}

function StoreEditForm({ store }: { store: StoreAudit | null }) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { updateStore, createStore } = useStoreAudit();
  const isCreate = store === null;

  const [name, setName] = useState(() => (isCreate ? '' : store.name));
  const [shortName, setShortName] = useState(() => (isCreate ? '' : store.shortName ?? ''));
  const [boundBd, setBoundBd] = useState(() => (isCreate ? '' : store.boundBd));
  const [deliveryMode, setDeliveryMode] = useState(() => (isCreate ? '' : store.deliveryMode));
  const [warehouse, setWarehouse] = useState(() => (isCreate ? '' : store.warehouse));
  const [partnerDivision, setPartnerDivision] = useState<StorePartnerDivision | ''>(() =>
    isCreate ? '' : (store.partnerDivision ?? '')
  );
  const [storeLabel, setStoreLabel] = useState(() =>
    isCreate ? '' : (getStoreTagsDisplay(store)[0] ?? '待完善')
  );
  const [regionCascade, setRegionCascade] = useState(() => (isCreate ? '' : store.regionCascade));
  const [detailAddress, setDetailAddress] = useState(() => (isCreate ? '' : store.detailAddress));
  const [contactPhone, setContactPhone] = useState(() => (isCreate ? '' : store.contactPhone));
  const [verifyCode, setVerifyCode] = useState('');
  const [contactName, setContactName] = useState(() => (isCreate ? '' : store.contactName));
  const [mapHint, setMapHint] = useState(() => (isCreate ? '' : store.mapHint));
  const [frontPhotoUploaded, setFrontPhotoUploaded] = useState(() => (isCreate ? false : store.frontPhotoUploaded));

  const warehouseWarn = warehouse === '—' || !warehouse.trim();

  const onSave = () => {
    if (!name.trim()) {
      toast({ title: '请填写门店名称', variant: 'destructive' });
      return;
    }
    if (!boundBd.trim()) {
      toast({ title: '请选择绑定 BD', variant: 'destructive' });
      return;
    }
    if (!deliveryMode.trim() || deliveryMode === '—') {
      toast({ title: '请选择仓库配送方式', variant: 'destructive' });
      return;
    }
    if (!warehouse.trim() || warehouse === '—') {
      toast({ title: '请选择配送仓库', variant: 'destructive' });
      return;
    }
    if (!partnerDivision) {
      toast({ title: '请选择门店分组（加盟店/合作店）', variant: 'destructive' });
      return;
    }
    if (!storeLabel.trim() || storeLabel === '—') {
      toast({ title: '请选择主标签', variant: 'destructive' });
      return;
    }
    if (!regionCascade.trim() || regionCascade === '—') {
      toast({ title: '请选择门店地址（省市区）', variant: 'destructive' });
      return;
    }
    if (!detailAddress.trim() || detailAddress === '—') {
      toast({ title: '请填写详细地址', variant: 'destructive' });
      return;
    }
    if (!contactPhone.trim()) {
      toast({ title: '请填写联系电话', variant: 'destructive' });
      return;
    }
    if (!verifyCode.trim() || verifyCode.length < 4) {
      toast({ title: '请填写验证码', variant: 'destructive' });
      return;
    }
    if (!contactName.trim() || contactName === '—') {
      toast({ title: '请填写联系人', variant: 'destructive' });
      return;
    }

    const maskedContact = maskPhone(contactPhone);

    const tagsToSave = storeLabel.trim() && storeLabel !== '—' ? [storeLabel.trim()] : ['待完善'];
    const primaryTag = tagsToSave[0];

    const contactLine = `${contactName.trim()} ${maskedContact || contactPhone.trim()}`;
    const addrLine = [regionCascade, detailAddress.trim()].join(' ').replace(/\s+/g, ' ').trim();

    if (isCreate) {
      const payload: StoreAuditCreatePayload = {
        name: name.trim(),
        storeType: '',
        onboardingStatus: '待进件',
        contact: contactLine,
        deliveryMode,
        warehouse,
        boundBd,
        withdrawPhone: maskedContact || contactPhone.trim(),
        address: addrLine,
        storeCategory: '',
        shortName: shortName.trim() || '—',
        storeTags: tagsToSave,
        storeLabel: primaryTag,
        detailAddress: detailAddress.trim(),
        mapHint: mapHint.trim() || '—',
        storeGroup: '',
        partnerDivision: partnerDivision as StorePartnerDivision,
        regionCascade,
        contactPhone: maskedContact || contactPhone.trim(),
        contactName: contactName.trim(),
        frontPhotoUploaded,
        warehouseNeedsAttention: warehouseWarn,
        phase: 'awaiting_bd',
      };
      const newId = createStore(payload);
      toast({ title: '已保存', description: '门店已创建' });
      navigate(`/leads/${newId}/workspace`);
      return;
    }

    updateStore(store.id, {
      name: name.trim(),
      shortName: shortName.trim() || '—',
      boundBd,
      deliveryMode,
      warehouse,
      partnerDivision: partnerDivision as StorePartnerDivision,
      storeTags: tagsToSave,
      storeLabel: primaryTag,
      regionCascade,
      detailAddress: detailAddress.trim(),
      mapHint: mapHint.trim() || '—',
      contactPhone: maskedContact || contactPhone.trim(),
      contactName: contactName.trim(),
      contact: contactLine,
      address: addrLine,
      withdrawPhone: maskedContact || contactPhone.trim(),
      frontPhotoUploaded,
      warehouseNeedsAttention: warehouseWarn,
    });

    toast({ title: '已保存', description: '门店资料已更新' });
    navigate(`/leads/${store.id}/workspace`);
  };

  const control = cn(
    'h-11 w-full rounded-xl border-border/70 bg-secondary/25 text-sm transition-colors',
    'placeholder:text-muted-foreground/60',
    'focus-visible:bg-background focus-visible:border-primary/45 focus-visible:ring-2 focus-visible:ring-primary/15'
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/[0.08] via-background to-muted/40 pb-36">
      <PageHeader title={isCreate ? '添加门店' : '编辑门店'} />

      <div className="relative px-4 pt-1">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-primary/10 to-transparent opacity-90" aria-hidden />
        <div className="relative rounded-2xl border border-white/60 bg-card/80 px-4 py-4 shadow-sm shadow-primary/5 backdrop-blur-sm dark:border-white/5 dark:bg-card/90">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">门店资料</p>
          <h2 className="mt-1.5 text-xl font-bold leading-tight tracking-tight text-foreground line-clamp-2">
            {name.trim() || '未命名门店'}
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            信息将用于列表展示与审核，请尽量填写准确。
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-5 px-4">
        <FormSection icon={Building2} title="基础信息" description="名称与负责 BD">
          <Field label="门店名称">
            <Input className={control} placeholder="请输入门店名称" value={name} onChange={e => setName(e.target.value)} />
          </Field>
          <Field label="门店简称" hint="对外简称，≠ 标签">
            <Input
              className={control}
              placeholder="如：鲜丰-文一西路店"
              value={shortName}
              onChange={e => setShortName(e.target.value)}
            />
          </Field>
          <Field label="绑定 BD">
            <Select value={boundBd || undefined} onValueChange={setBoundBd}>
              <SelectTrigger className={control}>
                <SelectValue placeholder="请选择负责 BD" />
              </SelectTrigger>
              <SelectContent>
                {BD_OPTIONS.map(b => (
                  <SelectItem key={b} value={b}>
                    {b}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </FormSection>

        <FormSection icon={Package} title="配送与分类" description="履约方式与门店归类">
          <Field label="仓库配送方式">
            <Select value={deliveryMode || undefined} onValueChange={setDeliveryMode}>
              <SelectTrigger className={control}>
                <SelectValue placeholder="请选择" />
              </SelectTrigger>
              <SelectContent>
                {DELIVERY_OPTIONS.map(b => (
                  <SelectItem key={b} value={b}>
                    {b}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="配送仓库" error={warehouseWarn}>
            <Select value={warehouse || undefined} onValueChange={setWarehouse}>
              <SelectTrigger className={cn(control, warehouseWarn && 'border-destructive/60 ring-1 ring-destructive/25')}>
                <SelectValue placeholder="请选择配送仓库" />
              </SelectTrigger>
              <SelectContent>
                {WAREHOUSE_OPTIONS.map(b => (
                  <SelectItem key={b} value={b}>
                    {b}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {warehouseWarn ? (
              <p className="text-[11px] text-destructive pt-1">请选择有效仓库，以免影响履约</p>
            ) : null}
          </Field>
          <Field label="门店分组">
            <Select
              value={partnerDivision || undefined}
              onValueChange={v => setPartnerDivision(v as StorePartnerDivision)}
            >
              <SelectTrigger className={control}>
                <SelectValue placeholder="请选择加盟店或合作店" />
              </SelectTrigger>
              <SelectContent>
                {PARTNER_DIVISION_OPTIONS.map(b => (
                  <SelectItem key={b} value={b}>
                    {b}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="主标签" hint="门店标签">
            <Select value={storeLabel || undefined} onValueChange={setStoreLabel}>
              <SelectTrigger className={control}>
                <SelectValue placeholder="选择主标签" />
              </SelectTrigger>
              <SelectContent>
                {LABEL_OPTIONS.map(b => (
                  <SelectItem key={b} value={b}>
                    {b}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </FormSection>

        <FormSection icon={MapPinned} title="地址与定位" description="省市区与详细位置">
          <Field label="省 / 市 / 区">
            <Select value={regionCascade || undefined} onValueChange={setRegionCascade}>
              <SelectTrigger className={control}>
                <SelectValue placeholder="请选择省市区" />
              </SelectTrigger>
              <SelectContent>
                {REGION_PRESETS.map(b => (
                  <SelectItem key={b} value={b}>
                    {b}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="详细地址">
            <Input
              className={control}
              placeholder="街道、门牌号等"
              value={detailAddress}
              onChange={e => setDetailAddress(e.target.value)}
            />
          </Field>
          <Field label="地图定位说明" hint="选填">
            <Input className={control} placeholder="选点备注" value={mapHint} onChange={e => setMapHint(e.target.value)} />
            <div className="relative mt-2 overflow-hidden rounded-xl bg-gradient-to-br from-primary/[0.07] via-muted/40 to-accent/[0.06]">
              <div className="absolute inset-0 opacity-[0.35] bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.25),transparent_50%)]" />
              <div className="relative flex min-h-[100px] flex-col items-center justify-center gap-1 px-4 py-6">
                <MapPinned className="h-8 w-8 text-primary/35" strokeWidth={1.25} />
                <span className="text-[11px] font-medium text-muted-foreground">地图选点区域</span>
                <span className="text-[10px] text-muted-foreground/80">接入地图 SDK 后展示</span>
              </div>
            </div>
          </Field>
        </FormSection>

        <FormSection icon={UserRound} title="联系人" description="手机验证与对接人">
          <Field label="联系电话">
            <div className="flex gap-2">
              <Input
                className={cn(control, 'min-w-0 flex-1')}
                inputMode="tel"
                placeholder="手机号"
                value={contactPhone}
                onChange={e => setContactPhone(e.target.value)}
              />
              <Button
                type="button"
                variant="secondary"
                className="h-11 shrink-0 rounded-xl px-4 text-xs font-semibold shadow-sm"
                onClick={() => toast({ title: '已发送', description: '演示：短信验证码已发送' })}
              >
                获取验证码
              </Button>
            </div>
          </Field>
          <Field label="短信验证码" hint="4–6 位">
            <Input
              className={control}
              placeholder="请输入验证码"
              value={verifyCode}
              onChange={e => setVerifyCode(e.target.value)}
              maxLength={6}
              inputMode="numeric"
            />
          </Field>
          <Field label="联系人姓名">
            <Input className={control} placeholder="请输入姓名" value={contactName} onChange={e => setContactName(e.target.value)} />
          </Field>
        </FormSection>

        <FormSection icon={ImagePlus} title="门头照" description="用于审核与线下识别">
          <div className="overflow-hidden rounded-2xl bg-muted/30 ring-1 ring-border/40">
            <div className="relative">
              <img src={storefrontDemoUrl} alt="门头示意" className="h-[160px] w-full object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />
              {frontPhotoUploaded ? (
                <span className="absolute bottom-3 right-3 rounded-full bg-background/95 px-2.5 py-1 text-[10px] font-semibold text-success shadow-md backdrop-blur-sm">
                  已上传
                </span>
              ) : null}
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            className="h-10 w-full rounded-xl gap-2 border-border/80 text-xs font-semibold"
            onClick={() => {
              setFrontPhotoUploaded(true);
              toast({ title: '已选择文件', description: '演示：门头照已标记为已上传' });
            }}
          >
            <ImagePlus className="h-4 w-4" />
            上传或更换图片
          </Button>
        </FormSection>
      </div>

      <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-20 max-w-lg mx-auto w-full p-4 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="pointer-events-auto flex gap-2 rounded-2xl border border-border/60 bg-card/95 p-2 shadow-[0_-8px_32px_-8px_rgba(15,23,42,0.18)] backdrop-blur-xl dark:shadow-black/40">
          <Button
            type="button"
            variant="ghost"
            className="h-12 flex-1 rounded-xl text-sm font-medium"
            onClick={() => {
              if (isCreate) navigate('/leads');
              else navigate(-1);
            }}
          >
            取消
          </Button>
          <Button type="button" className="h-12 flex-[1.35] rounded-xl text-sm font-semibold shadow-md shadow-primary/20" onClick={onSave}>
            保存资料
          </Button>
        </div>
      </div>
    </div>
  );
}

const StoreEditPage = () => {
  const { id } = useParams();
  const { getStore } = useStoreAudit();

  if (id === 'new') {
    return <StoreEditForm key="create" store={null} />;
  }

  const store = useMemo(() => {
    const n = Number(id);
    return Number.isFinite(n) ? getStore(n) : undefined;
  }, [id, getStore]);

  if (!store) {
    return (
      <div className="min-h-screen bg-background">
        <PageHeader title="编辑门店" />
        <p className="p-8 text-center text-muted-foreground text-sm">门店不存在</p>
      </div>
    );
  }

  return <StoreEditForm key={store.id} store={store} />;
};

export default StoreEditPage;
