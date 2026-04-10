import type { ReactNode } from 'react';
import { getStoreTagsDisplay, type StoreAudit } from '@/data/mockData';
import { cn } from '@/lib/utils';
import storefrontDemoUrl from '@/assets/storefront-demo.svg?url';

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-2.5">
      <h3 className="text-[11px] font-semibold text-muted-foreground">{title}</h3>
      <div className="flex flex-col gap-3.5 rounded-xl bg-muted/25 px-3 py-3.5">{children}</div>
    </section>
  );
}

function Row({
  label,
  value,
  valueClassName,
  labelClassName,
}: {
  label: string;
  value: ReactNode;
  valueClassName?: string;
  labelClassName?: string;
}) {
  return (
    <div className="flex min-h-0 items-start gap-3">
      <span
        className={cn(
          'w-[4.75rem] shrink-0 text-[11px] text-muted-foreground leading-[1.35] pt-0.5',
          labelClassName
        )}
      >
        {label}
      </span>
      <div className={cn('flex-1 min-w-0 text-[13px] text-foreground leading-snug break-words', valueClassName)}>{value}</div>
    </div>
  );
}

function TwoCol({
  left,
  right,
}: {
  left: { label: string; value: ReactNode };
  right: { label: string; value: ReactNode };
}) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-3">
      <div className="min-w-0">
        <div className="mb-1 text-[11px] text-muted-foreground">{left.label}</div>
        <div className="text-[13px] text-foreground leading-snug break-words">{left.value}</div>
      </div>
      <div className="min-w-0">
        <div className="mb-1 text-[11px] text-muted-foreground">{right.label}</div>
        <div className="text-[13px] text-foreground leading-snug break-words">{right.value}</div>
      </div>
    </div>
  );
}

/** 审核资料：只读，分区紧凑排版 */
export function StoreAuditFieldsView({ store }: { store: StoreAudit }) {
  const val = (s: string) => (s?.trim() && s !== '—' ? s : '—');

  return (
    <div className="flex flex-col gap-5 pb-1">
      <Section title="基础">
        <Row label="门店名称" value={val(store.name)} />
        <Row label="门店简称" value={val(store.shortName)} />
        <Row label="创建时间" value={val(store.approvedAt ?? '')} valueClassName="tabular-nums" />
        <Row label="绑定 BD" value={val(store.boundBd)} />
        <Row label="门店分组" value={val(store.partnerDivision ?? '')} />
      </Section>

      <Section title="配送">
        <Row label="仓库配送方式" value={val(store.deliveryMode)} />
        <Row
          label="配送仓库"
          labelClassName={store.warehouseNeedsAttention ? 'text-destructive font-medium' : undefined}
          value={val(store.warehouse)}
          valueClassName={store.warehouseNeedsAttention ? 'text-destructive font-medium' : undefined}
        />
        <Row label="运营分组" value={val(store.storeGroup)} />
        <Row
          label="门店标签"
          value={
            getStoreTagsDisplay(store).length ? (
              <span className="flex flex-wrap gap-1">
                {getStoreTagsDisplay(store).map(t => (
                  <span
                    key={t}
                    className="inline-flex rounded-md bg-muted px-1.5 py-0.5 text-[12px] font-medium text-foreground"
                  >
                    {t}
                  </span>
                ))}
              </span>
            ) : (
              '—'
            )
          }
        />
      </Section>

      <Section title="地址">
        <Row label="门店地址" value={val(store.regionCascade)} />
        <Row label="详细地址" value={val(store.detailAddress)} />
        <div className="flex flex-col gap-2">
          <div className="text-[11px] font-medium text-muted-foreground">地图定位</div>
          <div className="rounded-lg bg-muted/50 h-[88px] flex items-center justify-center text-[11px] text-muted-foreground">
            嵌入地图
          </div>
          {store.mapHint && store.mapHint !== '—' && (
            <p className="text-[10px] text-muted-foreground mt-1.5 leading-relaxed">{store.mapHint}</p>
          )}
        </div>
      </Section>

      <Section title="联系">
        <TwoCol
          left={{
            label: '联系电话',
            value: (
              <span className="tabular-nums">{store.contactPhone?.trim() ? store.contactPhone : '—'}</span>
            ),
          }}
          right={{ label: '联系人', value: val(store.contactName) }}
        />
      </Section>

      <Section title="门头照">
        <div className="relative rounded-lg overflow-hidden bg-muted/30">
          <img
            src={storefrontDemoUrl}
            alt="门店门头照示意"
            className="w-full h-[132px] object-cover object-center block"
          />
          <span
            className={cn(
              'absolute bottom-1.5 right-1.5 rounded-md px-1.5 py-0.5 text-[9px] font-medium',
              store.frontPhotoUploaded ? 'bg-background/95 text-foreground shadow-sm' : 'bg-background/90 text-muted-foreground'
            )}
          >
            {store.frontPhotoUploaded ? '已上传' : '未上传'}
          </span>
        </div>
      </Section>

      <p className="text-center text-[10px] text-muted-foreground pt-0.5">提交时间 {store.submittedAt}</p>
    </div>
  );
}
