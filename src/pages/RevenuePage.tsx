import { useState, useMemo } from 'react';
import PageHeader from '@/components/PageHeader';
import { revenueList, storeList } from '@/data/mockData';

const fmt = (n: number) => `¥${n.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}`;

type Period = 'day' | 'month' | 'cumulative';

const RevenuePage = () => {
  const [selectedStore, setSelectedStore] = useState('all');
  const [period, setPeriod] = useState<Period>('day');

  const filteredList = useMemo(() => {
    if (selectedStore === 'all') return revenueList;
    const store = storeList.find(s => s.id === selectedStore);
    return store ? revenueList.filter(i => i.merchant === store.name) : revenueList;
  }, [selectedStore]);

  // Group by date
  const grouped = useMemo(() => {
    const map = new Map<string, typeof revenueList>();
    filteredList.forEach(item => {
      const list = map.get(item.date) || [];
      list.push(item);
      map.set(item.date, list);
    });
    return Array.from(map.entries()).sort((a, b) => b[0].localeCompare(a[0]));
  }, [filteredList]);

  // Summary stats
  const totalProfit = filteredList.reduce((s, i) => s + i.profit, 0);
  const totalOrders = filteredList.reduce((s, i) => s + i.orders, 0);
  const totalVolume = filteredList.reduce((s, i) => s + i.volume, 0);
  const totalNewUsers = filteredList.reduce((s, i) => s + i.newUsers, 0);

  // For cumulative view, show date range
  const dateRange = grouped.length > 0
    ? `${grouped[grouped.length - 1][0]} - ${grouped[0][0]}`
    : '';

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="收益明细" />

      {/* Filter bar */}
      <div className="px-4 pt-3 pb-2 flex items-center justify-between">
        <select
          value={selectedStore}
          onChange={e => setSelectedStore(e.target.value)}
          className="text-sm bg-card border border-border rounded px-2 py-1.5 text-foreground"
        >
          {storeList.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>

        <div className="flex items-center text-xs border border-border rounded overflow-hidden">
          {([['day', '日'], ['month', '月'], ['cumulative', '累计']] as [Period, string][]).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setPeriod(key)}
              className={`px-3 py-1.5 transition-colors ${
                period === key
                  ? 'bg-primary text-primary-foreground font-medium'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Summary card */}
      <div className="px-4 pb-3">
        <div className="text-center py-4">
          <p className="text-3xl font-bold text-foreground">{fmt(totalProfit)}</p>
          <p className="text-xs text-muted-foreground mt-1">分佣收益</p>
        </div>
        <div className="grid grid-cols-3 text-center">
          <div>
            <p className="text-base font-semibold text-foreground">{totalOrders}</p>
            <p className="text-xs text-muted-foreground mt-0.5">支付订单</p>
          </div>
          <div>
            <p className="text-base font-semibold text-foreground">{fmt(totalVolume)}</p>
            <p className="text-xs text-muted-foreground mt-0.5">交易流水</p>
          </div>
          <div>
            <p className="text-base font-semibold text-foreground">{totalNewUsers}</p>
            <p className="text-xs text-muted-foreground mt-0.5">新增用户</p>
          </div>
        </div>
      </div>

      <div className="h-2 bg-muted" />

      {/* Revenue detail list grouped by date */}
      <div className="px-4 pb-24">
        {grouped.map(([date, items]) => (
          <div key={date}>
            <p className="text-sm font-medium text-foreground py-3">
              {period === 'cumulative' ? dateRange : date}
            </p>
            <div className="space-y-2.5">
              {items.map(item => (
                <div key={item.id} className="bg-card border border-border rounded-lg px-4 py-3">
                  <p className="text-sm font-medium text-card-foreground mb-2 border-b border-border pb-2">
                    {item.merchant}
                  </p>
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">新增用户</span>
                      <span className="text-card-foreground">{item.newUsers}名</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">支付订单</span>
                      <span className="text-card-foreground">{item.orders}笔</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">交易流水</span>
                      <span className="text-card-foreground">{fmt(item.volume)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">分佣收益</span>
                      <span className="text-card-foreground font-medium">{fmt(item.profit)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenuePage;
