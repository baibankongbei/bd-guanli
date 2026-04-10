import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Download, Settings2, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { reportChartData } from '@/data/mockData';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, Area, AreaChart, ComposedChart } from 'recharts';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const reportTypes = ['商户发展报表', '交易流水报表', '分润收益报表', '区域分布报表'] as const;
const COLORS = ['hsl(220,70%,45%)', 'hsl(38,90%,55%)', 'hsl(145,60%,42%)', 'hsl(0,72%,55%)', 'hsl(210,80%,55%)', 'hsl(280,60%,55%)'];

const fmt = (n: number) => `¥${n.toLocaleString('zh-CN', { minimumFractionDigits: 0 })}`;

const ReportsPage = () => {
  const [selected, setSelected] = useState<string>(reportTypes[0]);
  const [showCustom, setShowCustom] = useState(false);
  const { toast } = useToast();

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="数据报表" />

      {/* Type Tabs */}
      <div className="px-4 pt-3 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {reportTypes.map(t => (
            <button key={t} onClick={() => setSelected(t)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${selected === t ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Report Content */}
      <div className="px-4 mt-4 pb-24">
        {/* ===== 商户发展报表 ===== */}
        {selected === '商户发展报表' && (
          <div className="space-y-3">
            <div className="bg-card rounded-xl p-4 border border-border">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">2023-10 至 2024-03</p>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-card rounded-xl p-3 border border-border text-center">
                <p className="text-[10px] text-muted-foreground">累计商户</p>
                <p className="text-lg font-bold text-primary mt-0.5">267家</p>
              </div>
              <div className="bg-card rounded-xl p-3 border border-border text-center">
                <p className="text-[10px] text-muted-foreground">本月新增</p>
                <p className="text-lg font-bold text-accent mt-0.5">50家</p>
              </div>
              <div className="bg-card rounded-xl p-3 border border-border text-center">
                <p className="text-[10px] text-muted-foreground">转化率</p>
                <p className="text-lg font-bold text-success mt-0.5">50%</p>
              </div>
            </div>

            {/* Merchant Trend Line Chart */}
            <div className="bg-card rounded-xl p-4 border border-border">
              <p className="text-xs font-semibold mb-3">商户增长趋势</p>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={reportChartData.merchantTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,15%,90%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} tickFormatter={v => v.slice(5)} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip contentStyle={{ fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Line type="monotone" dataKey="totalMerchants" name="总商户" stroke={COLORS[0]} strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="activeMerchants" name="活跃商户" stroke={COLORS[2]} strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="newMerchants" name="新增商户" stroke={COLORS[1]} strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Industry Pie Chart */}
            <div className="bg-card rounded-xl p-4 border border-border">
              <p className="text-xs font-semibold mb-3">行业分布</p>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={reportChartData.industryDistribution} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value"
                    label={({ name, percentage }) => `${name} ${percentage}%`} labelLine={{ strokeWidth: 1 }}>
                    {reportChartData.industryDistribution.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: 12 }} formatter={(value: number) => `${value}家`} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* New Merchants Bar */}
            <div className="bg-card rounded-xl p-4 border border-border">
              <p className="text-xs font-semibold mb-3">月度新增商户对比</p>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={reportChartData.merchantTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,15%,90%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} tickFormatter={v => v.slice(5)} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip contentStyle={{ fontSize: 12 }} />
                  <Bar dataKey="newMerchants" name="新增商户" fill={COLORS[0]} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* ===== 交易流水报表 ===== */}
        {selected === '交易流水报表' && (
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-card rounded-xl p-3 border border-border text-center">
                <p className="text-[10px] text-muted-foreground">本月交易额</p>
                <p className="text-base font-bold text-primary mt-0.5">¥112万</p>
              </div>
              <div className="bg-card rounded-xl p-3 border border-border text-center">
                <p className="text-[10px] text-muted-foreground">交易笔数</p>
                <p className="text-base font-bold text-accent mt-0.5">1,400笔</p>
              </div>
              <div className="bg-card rounded-xl p-3 border border-border text-center">
                <p className="text-[10px] text-muted-foreground">平均客单价</p>
                <p className="text-base font-bold text-success mt-0.5">¥800</p>
              </div>
            </div>

            {/* Transaction Amount Area Chart */}
            <div className="bg-card rounded-xl p-4 border border-border">
              <p className="text-xs font-semibold mb-3">交易金额趋势</p>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={reportChartData.transactionTrend}>
                  <defs>
                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS[0]} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={COLORS[0]} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,15%,90%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} tickFormatter={v => v.slice(5)} />
                  <YAxis tick={{ fontSize: 10 }} tickFormatter={v => `${(v / 10000).toFixed(0)}万`} />
                  <Tooltip contentStyle={{ fontSize: 12 }} formatter={(value: number) => fmt(value)} />
                  <Area type="monotone" dataKey="amount" name="交易金额" stroke={COLORS[0]} strokeWidth={2} fill="url(#colorAmount)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Transaction Count Bar */}
            <div className="bg-card rounded-xl p-4 border border-border">
              <p className="text-xs font-semibold mb-3">交易笔数对比</p>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={reportChartData.transactionTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,15%,90%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} tickFormatter={v => v.slice(5)} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip contentStyle={{ fontSize: 12 }} />
                  <Bar dataKey="count" name="交易笔数" fill={COLORS[1]} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Avg Amount Line */}
            <div className="bg-card rounded-xl p-4 border border-border">
              <p className="text-xs font-semibold mb-3">平均客单价走势</p>
              <ResponsiveContainer width="100%" height={160}>
                <LineChart data={reportChartData.transactionTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,15%,90%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} tickFormatter={v => v.slice(5)} />
                  <YAxis tick={{ fontSize: 10 }} domain={['auto', 'auto']} />
                  <Tooltip contentStyle={{ fontSize: 12 }} formatter={(v: number) => `¥${v}`} />
                  <Line type="monotone" dataKey="avgAmount" name="客单价" stroke={COLORS[2]} strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* ===== 分润收益报表 ===== */}
        {selected === '分润收益报表' && (
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-card rounded-xl p-3 border border-border text-center">
                <p className="text-[10px] text-muted-foreground">本月收益</p>
                <p className="text-base font-bold text-primary mt-0.5">¥48,600</p>
              </div>
              <div className="bg-card rounded-xl p-3 border border-border text-center">
                <p className="text-[10px] text-muted-foreground">已结算</p>
                <p className="text-base font-bold text-success mt-0.5">¥36,200</p>
              </div>
              <div className="bg-card rounded-xl p-3 border border-border text-center">
                <p className="text-[10px] text-muted-foreground">待结算</p>
                <p className="text-base font-bold text-accent mt-0.5">¥12,400</p>
              </div>
            </div>

            {/* Revenue Stacked Area */}
            <div className="bg-card rounded-xl p-4 border border-border">
              <p className="text-xs font-semibold mb-3">收益趋势（已结算 vs 待结算）</p>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={reportChartData.revenueTrend}>
                  <defs>
                    <linearGradient id="colorSettled" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS[2]} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={COLORS[2]} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS[1]} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={COLORS[1]} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,15%,90%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} tickFormatter={v => v.slice(5)} />
                  <YAxis tick={{ fontSize: 10 }} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
                  <Tooltip contentStyle={{ fontSize: 12 }} formatter={(v: number) => fmt(v)} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Area type="monotone" dataKey="settled" name="已结算" stroke={COLORS[2]} strokeWidth={2} fill="url(#colorSettled)" />
                  <Area type="monotone" dataKey="pending" name="待结算" stroke={COLORS[1]} strokeWidth={2} fill="url(#colorPending)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Total Revenue Bar */}
            <div className="bg-card rounded-xl p-4 border border-border">
              <p className="text-xs font-semibold mb-3">月度总收益对比</p>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={reportChartData.revenueTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,15%,90%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} tickFormatter={v => v.slice(5)} />
                  <YAxis tick={{ fontSize: 10 }} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
                  <Tooltip contentStyle={{ fontSize: 12 }} formatter={(v: number) => fmt(v)} />
                  <Bar dataKey="revenue" name="总收益" fill={COLORS[0]} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Revenue Table */}
            <div className="bg-card rounded-xl p-4 border border-border overflow-x-auto">
              <p className="text-xs font-semibold mb-2">收益明细表</p>
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-1.5 text-muted-foreground font-medium">月份</th>
                    <th className="text-right py-1.5 text-muted-foreground font-medium">总收益</th>
                    <th className="text-right py-1.5 text-muted-foreground font-medium">已结算</th>
                    <th className="text-right py-1.5 text-muted-foreground font-medium">待结算</th>
                  </tr>
                </thead>
                <tbody>
                  {reportChartData.revenueTrend.map(d => (
                    <tr key={d.month} className="border-b border-border/50">
                      <td className="py-1.5">{d.month}</td>
                      <td className="text-right font-medium">{fmt(d.revenue)}</td>
                      <td className="text-right text-success">{fmt(d.settled)}</td>
                      <td className="text-right text-accent">{fmt(d.pending)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===== 区域分布报表 ===== */}
        {selected === '区域分布报表' && (
          <div className="space-y-3">
            {/* Area Pie */}
            <div className="bg-card rounded-xl p-4 border border-border">
              <p className="text-xs font-semibold mb-3">区域商户分布</p>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={reportChartData.areaDistribution} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="value"
                    label={({ name, percentage }) => `${name} ${percentage}%`} labelLine={{ strokeWidth: 1 }}>
                    {reportChartData.areaDistribution.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: 12 }} formatter={(v: number) => `${v}家`} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Area Bar */}
            <div className="bg-card rounded-xl p-4 border border-border">
              <p className="text-xs font-semibold mb-3">区域商户 & 收益对比</p>
              <ResponsiveContainer width="100%" height={200}>
                <ComposedChart data={reportChartData.areaBarData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,15%,90%)" />
                  <XAxis type="number" tick={{ fontSize: 10 }} />
                  <YAxis dataKey="area" type="category" tick={{ fontSize: 10 }} width={50} />
                  <Tooltip contentStyle={{ fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="merchants" name="商户数" fill={COLORS[0]} radius={[0, 4, 4, 0]} barSize={12} />
                  <Bar dataKey="revenue" name="收益(¥)" fill={COLORS[1]} radius={[0, 4, 4, 0]} barSize={12} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Area Table */}
            <div className="bg-card rounded-xl p-4 border border-border">
              <p className="text-xs font-semibold mb-2">区域数据明细</p>
              <div className="space-y-2">
                {reportChartData.areaBarData.map((d, i) => (
                  <div key={d.area} className="flex items-center gap-2">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${i < 3 ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'}`}>{i + 1}</span>
                    <span className="text-sm flex-1">{d.area}</span>
                    <span className="text-xs text-muted-foreground">{d.merchants}家</span>
                    <span className="text-xs font-semibold text-primary w-16 text-right">{fmt(d.revenue)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border flex gap-3">
        <Button onClick={() => toast({ title: '导出成功', description: '报表已导出为Excel格式' })} className="flex-1 h-11 rounded-xl">
          <Download className="w-4 h-4 mr-1" /> 导出报表
        </Button>
        <Button variant="outline" onClick={() => setShowCustom(true)} className="flex-1 h-11 rounded-xl">
          <Settings2 className="w-4 h-4 mr-1" /> 自定义报表
        </Button>
      </div>

      {/* Custom Report Dialog */}
      <Dialog open={showCustom} onOpenChange={setShowCustom}>
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader><DialogTitle>自定义报表</DialogTitle></DialogHeader>
          <div className="space-y-3 pt-2">
            <div>
              <Label className="text-xs text-muted-foreground">报表类型</Label>
              <Select>
                <SelectTrigger className="mt-1"><SelectValue placeholder="选择报表类型" /></SelectTrigger>
                <SelectContent>
                  {reportTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">开始时间</Label>
              <Input type="date" className="mt-1" defaultValue="2024-01-01" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">结束时间</Label>
              <Input type="date" className="mt-1" defaultValue="2024-03-31" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">行业筛选</Label>
              <Select>
                <SelectTrigger className="mt-1"><SelectValue placeholder="全部行业" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部行业</SelectItem>
                  <SelectItem value="餐饮">餐饮</SelectItem>
                  <SelectItem value="零售">零售</SelectItem>
                  <SelectItem value="服务">服务</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">区域筛选</Label>
              <Select>
                <SelectTrigger className="mt-1"><SelectValue placeholder="全部区域" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部区域</SelectItem>
                  <SelectItem value="西湖区">西湖区</SelectItem>
                  <SelectItem value="滨江区">滨江区</SelectItem>
                  <SelectItem value="余杭区">余杭区</SelectItem>
                  <SelectItem value="拱墅区">拱墅区</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">导出格式</Label>
              <Select>
                <SelectTrigger className="mt-1"><SelectValue placeholder="选择格式" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full" onClick={() => { toast({ title: '报表生成中', description: '自定义报表正在生成，请稍候...' }); setShowCustom(false); }}>生成报表</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReportsPage;
