import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, Search, Plus } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { managedMerchants, MerchantStatus } from '@/data/mockData';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';

const statusColor: Record<MerchantStatus, string> = {
  进件成功: 'text-success bg-success/10',
  审核中: 'text-warning bg-warning/10',
  已驳回: 'text-destructive bg-destructive/10',
};

type TabValue = 'all' | 'onboarding' | 'settled';

const MerchantManagementPage = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<TabValue>('all');
  const [search, setSearch] = useState('');

  const filtered = managedMerchants.filter(m => {
    const matchSearch = !search || m.name.includes(search) || m.shortName.includes(search) || m.merchantNo.includes(search);
    if (!matchSearch) return false;
    if (tab === 'onboarding') return ['审核中', '已驳回'].includes(m.status);
    if (tab === 'settled') return m.status === '进件成功';
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="商户进件" />

      {/* Search */}
      <div className="px-4 pt-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="搜索商户名称/编号" value={search} onChange={e => setSearch(e.target.value)} className="pl-9 h-9 text-sm rounded-lg" />
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 pt-3">
        <Tabs value={tab} onValueChange={v => setTab(v as TabValue)}>
          <TabsList className="w-full grid grid-cols-3 h-9">
            <TabsTrigger value="all" className="text-xs">全部({managedMerchants.length})</TabsTrigger>
            <TabsTrigger value="onboarding" className="text-xs">进件中({managedMerchants.filter(m => ['审核中', '已驳回'].includes(m.status)).length})</TabsTrigger>
            <TabsTrigger value="settled" className="text-xs">进件成功({managedMerchants.filter(m => m.status === '进件成功').length})</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* List */}
      <div className="px-4 pt-3 pb-24 space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground text-sm">暂无商户数据</div>
        )}
        {filtered.map(m => (
          <div key={m.id} className="bg-card rounded-xl border border-border p-4" onClick={() => navigate(`/merchants/${m.id}`)}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <Store className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground truncate flex-1">{m.name}</p>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap ${statusColor[m.status]}`}>{m.status}</span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-1">商户编号: {m.merchantNo}</p>
                <div className="flex items-center gap-4 mt-2 text-[11px] text-muted-foreground">
                  <span>简称: {m.shortName}</span>
                  <span>费率: {m.rate}</span>
                </div>
                <div className="flex items-center gap-4 mt-1 text-[11px] text-muted-foreground">
                  <span>渠道: {m.channel}</span>
                  <span>进件: {m.applicationDate}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FAB */}
      <div className="fixed bottom-6 right-4 z-30">
        <button onClick={() => navigate('/merchants/onboarding')} className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-full shadow-lg active:scale-95 transition-transform">
          <Plus className="w-5 h-5" />
          <span className="text-sm font-medium">商户进件</span>
        </button>
      </div>
    </div>
  );
};

export default MerchantManagementPage;