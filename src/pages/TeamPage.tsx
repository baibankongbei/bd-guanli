import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import StatusBadge from '@/components/StatusBadge';
import { teamOverview, teamMembers, teamReportData, type TeamMember } from '@/data/mockData';
import { UserPlus, FileSpreadsheet, BarChart3, Edit, Trash2, TrendingUp, Users, ShoppingBag, DollarSign, Target, Clock, Eye, ArrowRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const fmt = (n: number) => `¥${n.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}`;
const CHART_COLORS = ['hsl(220,70%,45%)', 'hsl(38,90%,55%)', 'hsl(145,60%,42%)', 'hsl(0,72%,55%)', 'hsl(210,80%,55%)'];

const TeamPage = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [showPerformance, setShowPerformance] = useState<TeamMember | null>(null);
  const [showEdit, setShowEdit] = useState<TeamMember | null>(null);
  const [showRemove, setShowRemove] = useState<TeamMember | null>(null);
  const [showReport, setShowReport] = useState(false);
  const [perfPeriod, setPerfPeriod] = useState<'currentMonth' | 'lastMonth' | 'currentQuarter'>('currentMonth');
  const [reportPeriod, setReportPeriod] = useState<'weekly' | 'monthly' | 'quarterly'>('monthly');
  const [editStatus, setEditStatus] = useState<string>('active');
  const [inheritTo, setInheritTo] = useState('');
  const [inheritEnabled, setInheritEnabled] = useState(false);
  const { toast } = useToast();

  const activeMembers = teamMembers.filter(m => m.status === 'active');

  const periodLabels = { currentMonth: '本月', lastMonth: '上月', currentQuarter: '本季度' };
  const reportPeriodLabels = { weekly: '本月按周', monthly: '近6个月', quarterly: '近3季度' };

  return (
    <div className="min-h-screen bg-background pb-6">
      <PageHeader title="团队管理" />

      {/* Overview */}
      <div className="bg-primary text-primary-foreground px-5 pt-4 pb-6">
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: '直属团队', value: `${teamOverview.directMembers}人`, icon: Users },
            { label: '间接团队', value: `${teamOverview.indirectMembers}人`, icon: Users },
            { label: '本月团队收益', value: fmt(teamOverview.monthlyTeamRevenue), icon: DollarSign },
            { label: '本月新增商户', value: `${teamOverview.monthlyNewMerchants}家`, icon: ShoppingBag },
          ].map(s => (
            <div key={s.label} className="bg-primary-foreground/10 rounded-lg p-3">
              <p className="text-[10px] opacity-70">{s.label}</p>
              <p className="text-base font-bold mt-0.5">{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 px-4 -mt-3">
        <Button onClick={() => setShowAdd(true)} className="flex-1 h-11 rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 shadow-sm">
          <UserPlus className="w-4 h-4 mr-1.5" /> 添加成员
        </Button>
        <Button variant="outline" onClick={() => setShowReport(true)} className="flex-1 h-11 rounded-xl shadow-sm">
          <FileSpreadsheet className="w-4 h-4 mr-1.5" /> 业绩报表
        </Button>
      </div>

      {/* Members List */}
      <div className="px-4 mt-4">
        <h2 className="text-sm font-semibold text-foreground mb-3">团队成员 ({teamMembers.length})</h2>
        <div className="space-y-2.5">
          {teamMembers.map(m => (
            <div key={m.id} className="bg-card rounded-xl p-3.5 border border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                    {m.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-card-foreground">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.role} · {m.phone}</p>
                  </div>
                </div>
                <StatusBadge status={m.status} />
              </div>
              <div className="flex items-center justify-between mt-2.5 pt-2.5 border-t border-border text-xs text-muted-foreground">
                <span>本月商户：{m.monthlyMerchants}家</span>
                <span className="font-semibold text-primary">{fmt(m.monthlyRevenue)}</span>
              </div>
              <div className="flex gap-1.5 mt-2.5">
                <Button size="sm" variant="ghost" className="h-7 text-xs flex-1" onClick={() => setShowPerformance(m)}>
                  <Eye className="w-3 h-3 mr-0.5" />查看业绩
                </Button>
                <Button size="sm" variant="ghost" className="h-7 text-xs flex-1" onClick={() => { setShowEdit(m); setEditStatus(m.status); setInheritEnabled(false); setInheritTo(''); }}>
                  <Edit className="w-3 h-3 mr-0.5" />编辑
                </Button>
                <Button size="sm" variant="ghost" className="h-7 text-xs flex-1 text-destructive hover:text-destructive" onClick={() => { setShowRemove(m); setInheritEnabled(false); setInheritTo(''); }}>
                  <Trash2 className="w-3 h-3 mr-0.5" />移除
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== Performance Dialog ===== */}
      <Dialog open={showPerformance !== null} onOpenChange={() => setShowPerformance(null)}>
        <DialogContent className="max-w-[95vw] mx-auto max-h-[90vh] overflow-y-auto p-4">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" /> {showPerformance?.name} - 业绩详情
            </DialogTitle>
          </DialogHeader>
          {showPerformance && (
            <div className="space-y-4 pt-1">
              {/* Period Tabs */}
              <div className="flex gap-1.5">
                {(Object.keys(periodLabels) as Array<keyof typeof periodLabels>).map(p => (
                  <button key={p} onClick={() => setPerfPeriod(p)}
                    className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors ${perfPeriod === p ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                    {periodLabels[p]}
                  </button>
                ))}
              </div>

              {/* Core KPIs */}
              {(() => {
                const d = showPerformance.performance[perfPeriod];
                return (
                  <>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: '发展商户', value: `${d.merchants}家`, icon: ShoppingBag },
                        { label: '分润收益', value: fmt(d.revenue), icon: DollarSign },
                        { label: '交易笔数', value: `${d.transactions}笔`, icon: TrendingUp },
                      ].map(k => (
                        <div key={k.label} className="bg-muted/50 rounded-lg p-2.5 text-center">
                          <k.icon className="w-4 h-4 mx-auto text-primary mb-1" />
                          <p className="text-[10px] text-muted-foreground">{k.label}</p>
                          <p className="text-sm font-bold mt-0.5">{k.value}</p>
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: '交易金额', value: fmt(d.transactionAmount) },
                        { label: '平均成交周期', value: `${d.avgDealCycle}天` },
                        { label: '转化率', value: `${d.conversionRate}%` },
                        { label: '商户活跃率', value: `${d.activeRate}%` },
                        { label: '客户拜访数', value: `${d.customerVisits}次` },
                        { label: '线索获取数', value: `${d.leadCount}条` },
                      ].map(k => (
                        <div key={k.label} className="flex items-center justify-between bg-muted/30 rounded-lg px-3 py-2">
                          <span className="text-xs text-muted-foreground">{k.label}</span>
                          <span className="text-xs font-semibold">{k.value}</span>
                        </div>
                      ))}
                    </div>
                  </>
                );
              })()}

              {/* Trend Chart */}
              <div className="bg-muted/30 rounded-lg p-3">
                <p className="text-xs font-semibold mb-2">近6个月趋势</p>
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={showPerformance.performance.monthlyTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,15%,90%)" />
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} tickFormatter={v => v.slice(5)} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip contentStyle={{ fontSize: 12 }} />
                    <Line type="monotone" dataKey="revenue" name="收益(¥)" stroke={CHART_COLORS[0]} strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="merchants" name="商户(家)" stroke={CHART_COLORS[1]} strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Comparison vs Last Period */}
              {perfPeriod === 'currentMonth' && (
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs font-semibold mb-2">环比上月</p>
                  {(() => {
                    const curr = showPerformance.performance.currentMonth;
                    const prev = showPerformance.performance.lastMonth;
                    const items = [
                      { label: '商户数', curr: curr.merchants, prev: prev.merchants },
                      { label: '收益', curr: curr.revenue, prev: prev.revenue },
                      { label: '转化率', curr: curr.conversionRate, prev: prev.conversionRate, suffix: '%' },
                      { label: '拜访数', curr: curr.customerVisits, prev: prev.customerVisits },
                    ];
                    return (
                      <div className="space-y-1.5">
                        {items.map(it => {
                          const diff = prev.merchants > 0 || prev.revenue > 0 ? ((it.curr - it.prev) / (it.prev || 1) * 100) : 0;
                          return (
                            <div key={it.label} className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">{it.label}</span>
                              <div className="flex items-center gap-2">
                                <span>{it.curr}{it.suffix || ''}</span>
                                <span className={diff >= 0 ? 'text-success' : 'text-destructive'}>
                                  {diff >= 0 ? '↑' : '↓'}{Math.abs(diff).toFixed(1)}%
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ===== Edit Dialog ===== */}
      <Dialog open={showEdit !== null} onOpenChange={() => setShowEdit(null)}>
        <DialogContent className="max-w-sm mx-auto max-h-[85vh] overflow-y-auto">
          <DialogHeader><DialogTitle>编辑成员信息</DialogTitle></DialogHeader>
          {showEdit && (
            <div className="space-y-4 pt-2">
              <div>
                <Label className="text-xs text-muted-foreground">姓名</Label>
                <Input defaultValue={showEdit.name} className="mt-1" />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">手机号</Label>
                <Input defaultValue={showEdit.phone} className="mt-1" />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">角色</Label>
                <Select defaultValue={showEdit.role}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BD专员">BD专员</SelectItem>
                    <SelectItem value="高级BD">高级BD</SelectItem>
                    <SelectItem value="区域经理">区域经理</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">状态</Label>
                <Select value={editStatus} onValueChange={setEditStatus}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">活跃</SelectItem>
                    <SelectItem value="inactive">离职</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 离职数据继承 */}
              {editStatus === 'inactive' && (
                <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-3.5 space-y-3">
                  <div className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-destructive" />
                    <p className="text-sm font-medium text-destructive">离职数据继承</p>
                  </div>
                  <p className="text-xs text-muted-foreground">设置离职后，该成员名下的商户、线索等数据需要继承给其他成员。</p>
                  
                  <div className="flex items-center justify-between">
                    <Label className="text-xs">启用数据继承</Label>
                    <Switch checked={inheritEnabled} onCheckedChange={setInheritEnabled} />
                  </div>

                  {inheritEnabled && (
                    <>
                      <div>
                        <Label className="text-xs text-muted-foreground">继承商户数据给</Label>
                        <Select value={inheritTo} onValueChange={setInheritTo}>
                          <SelectTrigger className="mt-1"><SelectValue placeholder="选择接收人" /></SelectTrigger>
                          <SelectContent>
                            {activeMembers.filter(m => m.id !== showEdit.id).map(m => (
                              <SelectItem key={m.id} value={m.name}>{m.name} ({m.role})</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="bg-card rounded-lg p-2.5 space-y-1.5">
                        <p className="text-xs font-medium">将继承以下数据：</p>
                        <div className="text-xs text-muted-foreground space-y-1">
                          <p>• 名下商户：{showEdit.monthlyMerchants > 0 ? `${showEdit.performance.currentQuarter.merchants}家` : '0家'}</p>
                          <p>• 跟进中线索：{showEdit.performance.currentMonth.leadCount}条</p>
                          <p>• 历史分润数据保留不转移</p>
                        </div>
                      </div>
                    </>
                  )}

                  {!inheritEnabled && (
                    <p className="text-xs text-warning">⚠ 未启用继承，离职后数据将标记为"待分配"状态</p>
                  )}
                </div>
              )}

              <Button className="w-full" onClick={() => {
                if (editStatus === 'inactive' && inheritEnabled && !inheritTo) {
                  toast({ title: '请选择数据继承人', variant: 'destructive' });
                  return;
                }
                toast({
                  title: '保存成功',
                  description: editStatus === 'inactive' && inheritEnabled
                    ? `成员已标记离职，数据已继承给${inheritTo}`
                    : '成员信息已更新'
                });
                setShowEdit(null);
              }}>保存</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ===== Remove Dialog ===== */}
      <Dialog open={showRemove !== null} onOpenChange={() => setShowRemove(null)}>
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader><DialogTitle className="text-destructive">移除团队成员</DialogTitle></DialogHeader>
          {showRemove && (
            <div className="space-y-4 pt-2">
              <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-3.5">
                <p className="text-sm">确定要将 <span className="font-bold">{showRemove.name}</span> 从团队中移除吗？</p>
                <p className="text-xs text-muted-foreground mt-1">移除后该成员将无法访问团队资源。</p>
              </div>

              <div className="bg-muted/50 rounded-xl p-3.5 space-y-3">
                <p className="text-sm font-medium">数据继承设置</p>
                <p className="text-xs text-muted-foreground">移除前请处理该成员名下的业务数据。</p>

                <div className="flex items-center justify-between">
                  <Label className="text-xs">启用数据继承</Label>
                  <Switch checked={inheritEnabled} onCheckedChange={setInheritEnabled} />
                </div>

                {inheritEnabled && (
                  <div>
                    <Label className="text-xs text-muted-foreground">继承数据给</Label>
                    <Select value={inheritTo} onValueChange={setInheritTo}>
                      <SelectTrigger className="mt-1"><SelectValue placeholder="选择接收人" /></SelectTrigger>
                      <SelectContent>
                        {activeMembers.filter(m => m.id !== showRemove.id).map(m => (
                          <SelectItem key={m.id} value={m.name}>{m.name} ({m.role})</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {inheritEnabled && (
                  <div className="bg-card rounded-lg p-2.5 space-y-1.5">
                    <p className="text-xs font-medium">将继承以下数据：</p>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>• 名下商户及交易数据</p>
                      <p>• 跟进中的门店</p>
                      <p>• 未完成的活动任务</p>
                    </div>
                  </div>
                )}

                {!inheritEnabled && (
                  <p className="text-xs text-warning">⚠ 未启用继承，数据将标记为"待分配"状态</p>
                )}
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setShowRemove(null)}>取消</Button>
                <Button variant="destructive" className="flex-1" onClick={() => {
                  if (inheritEnabled && !inheritTo) {
                    toast({ title: '请选择数据继承人', variant: 'destructive' });
                    return;
                  }
                  toast({
                    title: '成员已移除',
                    description: inheritEnabled ? `数据已继承给${inheritTo}` : '数据已标记为待分配'
                  });
                  setShowRemove(null);
                }}>确认移除</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ===== Add Member Dialog ===== */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader><DialogTitle>添加成员</DialogTitle></DialogHeader>
          <div className="space-y-3 pt-2">
            <div>
              <Label className="text-xs text-muted-foreground">手机号</Label>
              <Input placeholder="请输入手机号" className="mt-1" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">姓名</Label>
              <Input placeholder="请输入姓名" className="mt-1" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">角色</Label>
              <Select>
                <SelectTrigger className="mt-1"><SelectValue placeholder="选择角色" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="BD专员">BD专员</SelectItem>
                  <SelectItem value="高级BD">高级BD</SelectItem>
                  <SelectItem value="区域经理">区域经理</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full" onClick={() => { toast({ title: '邀请已发送', description: '邀请链接已通过短信发送' }); setShowAdd(false); }}>发送邀请</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ===== Team Performance Report ===== */}
      <Dialog open={showReport} onOpenChange={setShowReport}>
        <DialogContent className="max-w-[95vw] mx-auto max-h-[90vh] overflow-y-auto p-4">
          <DialogHeader><DialogTitle>团队业绩报表</DialogTitle></DialogHeader>
          <div className="space-y-4 pt-1">
            {/* Period Tabs */}
            <div className="flex gap-1.5">
              {(Object.keys(reportPeriodLabels) as Array<keyof typeof reportPeriodLabels>).map(p => (
                <button key={p} onClick={() => setReportPeriod(p)}
                  className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors ${reportPeriod === p ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  {reportPeriodLabels[p]}
                </button>
              ))}
            </div>

            {/* Summary Cards */}
            {(() => {
              const data = teamReportData[reportPeriod];
              const totalMerchants = data.reduce((s, d) => s + d.merchants, 0);
              const totalRevenue = data.reduce((s, d) => s + d.revenue, 0);
              const totalTx = data.reduce((s, d) => s + d.transactions, 0);
              return (
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-primary/10 rounded-lg p-2.5 text-center">
                    <p className="text-[10px] text-muted-foreground">总商户</p>
                    <p className="text-sm font-bold text-primary">{totalMerchants}家</p>
                  </div>
                  <div className="bg-accent/10 rounded-lg p-2.5 text-center">
                    <p className="text-[10px] text-muted-foreground">总收益</p>
                    <p className="text-sm font-bold text-accent">{fmt(totalRevenue)}</p>
                  </div>
                  <div className="bg-success/10 rounded-lg p-2.5 text-center">
                    <p className="text-[10px] text-muted-foreground">总交易</p>
                    <p className="text-sm font-bold text-success">{totalTx}笔</p>
                  </div>
                </div>
              );
            })()}

            {/* Revenue & Merchants Trend */}
            <div className="bg-muted/30 rounded-lg p-3">
              <p className="text-xs font-semibold mb-2">收益 & 商户趋势</p>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={teamReportData[reportPeriod]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,15%,90%)" />
                  <XAxis dataKey="period" tick={{ fontSize: 10 }} tickFormatter={v => reportPeriod === 'monthly' ? v.slice(5) : v} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip contentStyle={{ fontSize: 12 }} />
                  <Bar dataKey="revenue" name="收益(¥)" fill={CHART_COLORS[0]} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="merchants" name="商户(家)" fill={CHART_COLORS[1]} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Transaction Trend */}
            <div className="bg-muted/30 rounded-lg p-3">
              <p className="text-xs font-semibold mb-2">交易趋势</p>
              <ResponsiveContainer width="100%" height={160}>
                <LineChart data={teamReportData[reportPeriod]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,15%,90%)" />
                  <XAxis dataKey="period" tick={{ fontSize: 10 }} tickFormatter={v => reportPeriod === 'monthly' ? v.slice(5) : v} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip contentStyle={{ fontSize: 12 }} />
                  <Line type="monotone" dataKey="transactions" name="交易笔数" stroke={CHART_COLORS[2]} strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Role Distribution Pie */}
            <div className="bg-muted/30 rounded-lg p-3">
              <p className="text-xs font-semibold mb-2">角色分布</p>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={teamReportData.roleDistribution} cx="50%" cy="50%" innerRadius={35} outerRadius={60} dataKey="value" label={({ name, value }) => `${name}(${value})`} labelLine={{ strokeWidth: 1 }}>
                    {teamReportData.roleDistribution.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Member Ranking */}
            <div className="bg-muted/30 rounded-lg p-3">
              <p className="text-xs font-semibold mb-2">成员排名（本月收益）</p>
              <div className="space-y-1.5">
                {teamReportData.memberRanking.map((m, i) => (
                  <div key={m.name} className="flex items-center gap-2 text-xs">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${i < 3 ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'}`}>
                      {i + 1}
                    </span>
                    <span className="flex-1">{m.name}</span>
                    <span className="text-muted-foreground">{m.merchants}家</span>
                    <span className="font-semibold w-20 text-right">{fmt(m.revenue)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Period Detail Table */}
            <div className="bg-muted/30 rounded-lg p-3 overflow-x-auto">
              <p className="text-xs font-semibold mb-2">数据明细</p>
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-1.5 text-muted-foreground font-medium">周期</th>
                    <th className="text-right py-1.5 text-muted-foreground font-medium">商户</th>
                    <th className="text-right py-1.5 text-muted-foreground font-medium">收益</th>
                    <th className="text-right py-1.5 text-muted-foreground font-medium">交易</th>
                  </tr>
                </thead>
                <tbody>
                  {teamReportData[reportPeriod].map(d => (
                    <tr key={d.period} className="border-b border-border/50">
                      <td className="py-1.5">{d.period}</td>
                      <td className="text-right">{d.merchants}家</td>
                      <td className="text-right font-medium">{fmt(d.revenue)}</td>
                      <td className="text-right">{d.transactions}笔</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Button variant="outline" className="w-full" onClick={() => toast({ title: '导出成功', description: '报表已导出为Excel格式' })}>
              <FileSpreadsheet className="w-4 h-4 mr-1" /> 导出Excel报表
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeamPage;
