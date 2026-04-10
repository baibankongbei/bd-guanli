import { useState } from 'react';
import { TrendingUp, Store, DollarSign, Users, Target } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';

const stats = [
  { icon: Store, label: '累计发展商户', value: '50', unit: '家', color: 'text-primary', bg: 'bg-primary/10', trend: '较上月增长 12%' },
  { icon: DollarSign, label: '累计收益', value: '¥86,320', unit: '', color: 'text-success', bg: 'bg-success/10', trend: '较上月增长 ¥8,200' },
  { icon: Users, label: '团队规模', value: '12', unit: '人', color: 'text-accent', bg: 'bg-accent/10', trend: '本月新增 2 人' },
  { icon: Target, label: '转化率', value: '68', unit: '%', color: 'text-warning', bg: 'bg-warning/10', trend: '较上月提升 5%' },
];

const monthly = [
  { month: '3月', merchants: 8, revenue: '¥12,350', daily: [
    { date: '3月28日', merchants: 2, revenue: '¥3,200' },
    { date: '3月20日', merchants: 3, revenue: '¥4,850' },
    { date: '3月15日', merchants: 1, revenue: '¥1,800' },
    { date: '3月08日', merchants: 2, revenue: '¥2,500' },
  ]},
  { month: '2月', merchants: 6, revenue: '¥9,800', daily: [
    { date: '2月25日', merchants: 2, revenue: '¥3,600' },
    { date: '2月18日', merchants: 2, revenue: '¥3,100' },
    { date: '2月10日', merchants: 2, revenue: '¥3,100' },
  ]},
  { month: '1月', merchants: 5, revenue: '¥8,200', daily: [
    { date: '1月20日', merchants: 3, revenue: '¥5,000' },
    { date: '1月10日', merchants: 2, revenue: '¥3,200' },
  ]},
  { month: '12月', merchants: 7, revenue: '¥11,500', daily: [
    { date: '12月28日', merchants: 3, revenue: '¥5,200' },
    { date: '12月15日', merchants: 4, revenue: '¥6,300' },
  ]},
  { month: '11月', merchants: 4, revenue: '¥6,900', daily: [
    { date: '11月22日', merchants: 2, revenue: '¥3,500' },
    { date: '11月10日', merchants: 2, revenue: '¥3,400' },
  ]},
];

const MyPerformancePage = () => {
  const [selectedMonth, setSelectedMonth] = useState<typeof monthly[0] | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="我的业绩" />

      <div className="px-4 pt-4">
        <div className="grid grid-cols-2 gap-3">
          {stats.map(s => (
            <div
              key={s.label}
              onClick={() => toast({ title: s.label, description: s.trend })}
              className="bg-card rounded-xl border border-border p-4 cursor-pointer active:bg-muted/30 transition-colors"
            >
              <div className={`w-9 h-9 rounded-lg ${s.bg} flex items-center justify-center mb-3`}>
                <s.icon className={`w-4.5 h-4.5 ${s.color}`} />
              </div>
              <p className="text-xl font-bold text-foreground">{s.value}<span className="text-xs font-normal text-muted-foreground ml-0.5">{s.unit}</span></p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 pt-5">
        <p className="text-sm font-medium text-foreground mb-3">月度业绩</p>
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          {monthly.map((m, i) => (
            <div
              key={m.month}
              onClick={() => setSelectedMonth(m)}
              className={`flex items-center justify-between px-4 py-3.5 cursor-pointer active:bg-muted/30 transition-colors ${i !== monthly.length - 1 ? 'border-b border-border' : ''}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-foreground w-8">{m.month}</span>
                <span className="text-xs text-muted-foreground">新增 {m.merchants} 家</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-medium text-success">{m.revenue}</span>
                <TrendingUp className="w-3.5 h-3.5 text-success" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedMonth} onOpenChange={open => !open && setSelectedMonth(null)}>
        <DialogContent className="max-w-[380px] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-base">{selectedMonth?.month}业绩明细</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              共新增 {selectedMonth?.merchants} 家商户，收益 {selectedMonth?.revenue}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-0 -mt-1">
            {selectedMonth?.daily.map((d, i) => (
              <div key={d.date} className={`flex items-center justify-between py-3 ${i !== (selectedMonth?.daily.length || 0) - 1 ? 'border-b border-border' : ''}`}>
                <div>
                  <p className="text-sm text-foreground">{d.date}</p>
                  <p className="text-[11px] text-muted-foreground">新增 {d.merchants} 家</p>
                </div>
                <span className="text-sm font-medium text-success">{d.revenue}</span>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyPerformancePage;
