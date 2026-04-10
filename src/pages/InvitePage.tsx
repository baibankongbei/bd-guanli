import { useState } from 'react';
import { Copy, Share2, Gift, Users } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { toast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const records = [
  { name: '张明', date: '2024-03-20', status: '已激活', reward: '¥200', phone: '138****1234', activateTime: '2024-03-21 10:30' },
  { name: '王丽', date: '2024-03-15', status: '已激活', reward: '¥200', phone: '139****5678', activateTime: '2024-03-16 14:20' },
  { name: '刘伟', date: '2024-03-10', status: '待激活', reward: '—', phone: '137****9012', activateTime: '—' },
  { name: '陈静', date: '2024-02-28', status: '已激活', reward: '¥200', phone: '136****3456', activateTime: '2024-03-01 09:15' },
];

const InvitePage = () => {
  const inviteCode = 'BD2024LZF';
  const [selected, setSelected] = useState<typeof records[0] | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteCode);
    toast({ title: '已复制', description: '邀请码已复制到剪贴板' });
  };

  const handleShare = () => {
    toast({ title: '已生成分享链接', description: '邀请链接已复制，可直接粘贴分享' });
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="邀请好友" />

      <div className="px-4 pt-4">
        <div className="bg-primary rounded-xl p-5 relative overflow-hidden">
          <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-primary-foreground/5" />
          <div className="flex items-center gap-3 mb-4">
            <Gift className="w-6 h-6 text-primary-foreground" />
            <div>
              <p className="text-sm font-semibold text-primary-foreground">邀请好友加入</p>
              <p className="text-[11px] text-primary-foreground/60">每成功邀请一人奖励 ¥200</p>
            </div>
          </div>
          <div className="bg-primary-foreground/10 rounded-lg p-3 flex items-center justify-between">
            <div>
              <p className="text-[11px] text-primary-foreground/60">我的邀请码</p>
              <p className="text-lg font-bold text-primary-foreground tracking-wider">{inviteCode}</p>
            </div>
            <button onClick={handleCopy} className="w-9 h-9 rounded-lg bg-primary-foreground/20 flex items-center justify-center active:scale-95 transition-transform">
              <Copy className="w-4 h-4 text-primary-foreground" />
            </button>
          </div>
          <button onClick={handleShare} className="w-full mt-3 h-10 rounded-lg bg-primary-foreground text-primary text-sm font-medium flex items-center justify-center gap-2 active:opacity-90 transition-opacity">
            <Share2 className="w-4 h-4" />
            分享邀请链接
          </button>
        </div>
      </div>

      <div className="px-4 pt-4">
        <div className="bg-card rounded-xl border border-border p-4 flex items-center justify-around">
          <div className="text-center">
            <p className="text-xl font-bold text-foreground">12</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">已邀请</p>
          </div>
          <div className="w-px h-9 bg-border" />
          <div className="text-center">
            <p className="text-xl font-bold text-success">9</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">已激活</p>
          </div>
          <div className="w-px h-9 bg-border" />
          <div className="text-center">
            <p className="text-xl font-bold text-foreground">¥1,800</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">获得奖励</p>
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 pb-6">
        <p className="text-sm font-medium text-foreground mb-3">邀请记录</p>
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          {records.map((r, i) => (
            <div
              key={r.name + r.date}
              onClick={() => setSelected(r)}
              className={`flex items-center gap-3 px-4 py-3.5 cursor-pointer active:bg-muted/30 transition-colors ${i !== records.length - 1 ? 'border-b border-border' : ''}`}
            >
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <Users className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-foreground">{r.name}</p>
                <p className="text-[11px] text-muted-foreground">{r.date}</p>
              </div>
              <div className="text-right">
                <p className={`text-xs font-medium ${r.status === '已激活' ? 'text-success' : 'text-warning'}`}>{r.status}</p>
                <p className="text-[11px] text-muted-foreground">{r.reward}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={open => !open && setSelected(null)}>
        <DialogContent className="max-w-[380px] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-base">邀请详情</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">被邀请人信息</DialogDescription>
          </DialogHeader>
          {selected && (
            <div className="space-y-0 -mt-1">
              {[
                { label: '姓名', value: selected.name },
                { label: '手机号', value: selected.phone },
                { label: '邀请时间', value: selected.date },
                { label: '激活时间', value: selected.activateTime },
                { label: '状态', value: selected.status },
                { label: '奖励金额', value: selected.reward },
              ].map((row, i) => (
                <div key={row.label} className={`flex items-center justify-between py-3 ${i !== 5 ? 'border-b border-border' : ''}`}>
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

export default InvitePage;
