import { useState } from 'react';
import { Store } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const merchants = [
  { id: 1, name: '茶百道-人民路店', status: '正常营业', date: '2024-01-15', revenue: '¥3,260', storeId: 'MD20240101', contact: '张经理', phone: '138****1234', address: '杭州市西湖区人民路88号' },
  { id: 2, name: '星辰咖啡馆', status: '正常营业', date: '2024-02-20', revenue: '¥2,180', storeId: 'MD20240035', contact: '王老板', phone: '139****5678', address: '杭州市拱墅区莫干山路166号' },
  { id: 3, name: '鲜果时光-中山店', status: '正常营业', date: '2024-03-01', revenue: '¥1,850', storeId: 'MD20240088', contact: '李店长', phone: '137****9012', address: '杭州市上城区中山中路200号' },
  { id: 4, name: '麦香面包坊', status: '审核中', date: '2024-03-25', revenue: '—', storeId: 'MD20240120', contact: '赵师傅', phone: '136****3456', address: '杭州市滨江区江南大道500号' },
  { id: 5, name: '老王烧烤', status: '正常营业', date: '2023-11-10', revenue: '¥4,520', storeId: 'MD20230188', contact: '王大叔', phone: '135****7890', address: '杭州市余杭区文一西路800号' },
  { id: 6, name: '川味小馆', status: '已暂停', date: '2023-09-05', revenue: '¥890', storeId: 'MD20230099', contact: '陈老板', phone: '133****2345', address: '杭州市萧山区市心中路300号' },
];

const statusColor: Record<string, string> = {
  '正常营业': 'text-success bg-success/10',
  '审核中': 'text-warning bg-warning/10',
  '已暂停': 'text-muted-foreground bg-muted',
};

const MyMerchantsPage = () => {
  const [selected, setSelected] = useState<typeof merchants[0] | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="我的商户" />
      <div className="px-4 pt-4 pb-6 space-y-3">
        {merchants.map(m => (
          <div key={m.id} onClick={() => setSelected(m)} className="bg-card rounded-xl border border-border p-4 cursor-pointer active:bg-muted/30 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Store className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground truncate">{m.name}</p>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${statusColor[m.status]}`}>{m.status}</span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-1">入驻时间: {m.date}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{m.revenue}</p>
                <p className="text-[10px] text-muted-foreground">累计分润</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!selected} onOpenChange={open => !open && setSelected(null)}>
        <DialogContent className="max-w-[380px] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-base">{selected?.name}</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">商户详细信息</DialogDescription>
          </DialogHeader>
          {selected && (
            <div className="space-y-0 -mt-1">
              {[
                { label: '门店编号', value: selected.storeId },
                { label: '营业状态', value: selected.status },
                { label: '入驻时间', value: selected.date },
                { label: '累计分润', value: selected.revenue },
                { label: '联系人', value: selected.contact },
                { label: '联系电话', value: selected.phone },
                { label: '门店地址', value: selected.address },
              ].map((row, i) => (
                <div key={row.label} className={`flex items-center justify-between py-3 ${i !== 6 ? 'border-b border-border' : ''}`}>
                  <span className="text-sm text-muted-foreground">{row.label}</span>
                  <span className="text-sm text-foreground">{row.value}</span>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyMerchantsPage;
