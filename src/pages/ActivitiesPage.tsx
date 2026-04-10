import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import StatusBadge from '@/components/StatusBadge';
import { activities } from '@/data/mockData';
import { Plus, Copy, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const fmt = (n: number) => `¥${n.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}`;

const ActivitiesPage = () => {
  const [showDetail, setShowDetail] = useState<number | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const { toast } = useToast();
  const detail = activities.find(a => a.id === showDetail);

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="活动管理" />

      {/* Actions */}
      <div className="flex gap-3 px-4 mt-3">
        <Button onClick={() => setShowCreate(true)} className="flex-1 h-10 rounded-xl bg-accent text-accent-foreground hover:bg-accent/90">
          <Plus className="w-4 h-4 mr-1" /> 创建新活动
        </Button>
      </div>

      {/* List */}
      <div className="px-4 mt-4 pb-6 space-y-2.5">
        {activities.map(a => (
          <div key={a.id} className="bg-card rounded-xl p-3.5 border border-border">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-card-foreground">{a.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{a.startTime} 至 {a.endTime}</p>
              </div>
              <StatusBadge status={a.status} label={a.status === 'active' ? '进行中' : a.status === 'upcoming' ? '未开始' : '已结束'} />
            </div>
            <div className="flex items-center justify-between mt-2.5 pt-2.5 border-t border-border">
              <span className="text-xs text-muted-foreground">参与商户：{a.merchants}家</span>
              <div className="flex gap-1.5">
                <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => setShowDetail(a.id)}>
                  <Eye className="w-3 h-3 mr-0.5" />详情
                </Button>
                <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => toast({ title: '活动已复制' })}>
                  <Copy className="w-3 h-3 mr-0.5" />复制
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Dialog */}
      <Dialog open={showDetail !== null} onOpenChange={() => setShowDetail(null)}>
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader><DialogTitle>{detail?.name}</DialogTitle></DialogHeader>
          {detail && (
            <div className="space-y-3 pt-2">
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground">活动规则</p>
                <p className="text-sm mt-1">{detail.rules}</p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-muted/50 rounded-lg p-2.5 text-center">
                  <p className="text-[10px] text-muted-foreground">总交易额</p>
                  <p className="text-xs font-bold mt-0.5">{fmt(detail.totalAmount)}</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-2.5 text-center">
                  <p className="text-[10px] text-muted-foreground">参与订单</p>
                  <p className="text-xs font-bold mt-0.5">{detail.orders}单</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-2.5 text-center">
                  <p className="text-[10px] text-muted-foreground">客单价</p>
                  <p className="text-xs font-bold mt-0.5">¥{detail.avgPrice}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">参与商户：{detail.merchants}家</p>
                <p className="text-xs text-muted-foreground">活动时间：{detail.startTime} 至 {detail.endTime}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Create Dialog */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader><DialogTitle>创建新活动</DialogTitle></DialogHeader>
          <div className="space-y-3 pt-2">
            <Input placeholder="活动名称" />
            <Input placeholder="开始时间（如 2024-04-01）" />
            <Input placeholder="结束时间（如 2024-04-30）" />
            <Input placeholder="活动规则" />
            <Input placeholder="参与商户范围" />
            <Button className="w-full" onClick={() => { toast({ title: '活动已创建' }); setShowCreate(false); }}>创建</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ActivitiesPage;
