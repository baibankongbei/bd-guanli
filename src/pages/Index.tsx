import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ChevronRight, Share2,
  Store, Wallet, Users, Navigation2, BarChart3, Gift, BookOpen, Target,
  Home, Bot, User, Bell, TrendingUp, QrCode, MessageCircle, Globe, Save
} from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

const notifications = [
  { id: 1, text: '您的商户"茶百道-人民路店"已通过审核', time: '10:30', date: '今天' },
  { id: 2, text: '本月团队业绩已超额完成，请查看详情', time: '09:15', date: '昨天' },
];

const workbenchItems = [
  { icon: Navigation2, label: '门店管理', path: '/leads', bg: 'bg-warning/10', iconColor: 'text-warning' },
  { icon: Store, label: '商户进件', path: '/merchants', bg: 'bg-primary/10', iconColor: 'text-primary' },
  { icon: Wallet, label: '收益明细', path: '/revenue', bg: 'bg-success/10', iconColor: 'text-success' },
  { icon: Users, label: '团队管理', path: '/team', bg: 'bg-accent/10', iconColor: 'text-accent' },
  { icon: BarChart3, label: '数据报表', path: '/reports', bg: 'bg-info/10', iconColor: 'text-info' },
  { icon: Gift, label: '活动管理', path: '/activities', bg: 'bg-destructive/10', iconColor: 'text-destructive' },
  { icon: BookOpen, label: '操作指南', path: '/guide', bg: 'bg-primary/10', iconColor: 'text-primary' },
  { icon: Headphones, label: '联系客服', path: '/support', bg: 'bg-accent/10', iconColor: 'text-accent' },
];

const marketingMaterials = [
  { id: 1, title: '新商户入驻推广海报', desc: '适用于地推和线上分享', tag: '热门', uses: '2.3k' },
  { id: 2, title: '商户收益对比图', desc: '展示合作前后收益变化', tag: '推荐', uses: '1.8k' },
];

const tabs = [
  { icon: Home, label: '首页', path: '/' },
  { icon: Bot, label: 'AI', path: '/ai' },
  { icon: User, label: '我的', path: '/profile' },
];

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [qrOpen, setQrOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-primary px-5 pt-12 pb-8 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary-foreground/5" />
        <div className="absolute -bottom-16 -left-8 w-32 h-32 rounded-full bg-primary-foreground/5" />

        <div className="flex items-center gap-3 relative z-10">
          <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center ring-2 ring-primary-foreground/10">
            <User className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <p className="text-base font-semibold text-primary-foreground">李泽峰，早上好</p>
            <p className="text-xs text-primary-foreground/60 mt-0.5">高级业务经理</p>
          </div>
        </div>
      </div>

      {/* Stats card */}
      <div className="px-4 -mt-4 relative z-10">
        <div className="bg-card rounded-xl shadow-sm border border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="text-center">
                <p className="text-[11px] text-muted-foreground">已发展门店</p>
                <p className="text-xl font-bold text-foreground mt-1">50<span className="text-[11px] font-normal text-muted-foreground ml-0.5">家</span></p>
              </div>
              <div className="w-px h-9 bg-border" />
              <div className="text-center">
                <p className="text-[11px] text-muted-foreground">本月新增</p>
                <p className="text-xl font-bold text-success mt-1">8<span className="text-[11px] font-normal text-muted-foreground ml-0.5">家</span></p>
              </div>
              <div className="w-px h-9 bg-border" />
              <div className="text-center">
                <p className="text-[11px] text-muted-foreground">今日收益</p>
                <p className="text-xl font-bold text-foreground mt-1">¥2,350</p>
              </div>
            </div>
            <TrendingUp className="w-4 h-4 text-success" />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="px-4 pt-4">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            <Bell className="w-3.5 h-3.5 text-muted-foreground" />
            <p className="text-sm font-medium text-foreground">消息通知</p>
          </div>
          <button onClick={() => navigate('/messages')} className="flex items-center text-xs text-muted-foreground active:opacity-70">
            更多 <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          {notifications.map((n, i) => (
            <button
              key={n.id}
              onClick={() => navigate(`/messages/${n.id}`)}
              className={`w-full flex items-center gap-3 px-3.5 py-3 text-left active:bg-muted/50 transition-colors ${i !== notifications.length - 1 ? 'border-b border-border' : ''}`}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              <p className="text-[13px] text-card-foreground truncate flex-1">{n.text}</p>
              <span className="text-[11px] text-muted-foreground flex-shrink-0">{n.time}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Workbench */}
      <div className="px-4 pt-4">
        <p className="text-sm font-medium text-foreground mb-3">工作台</p>
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="grid grid-cols-4 gap-y-5">
            {workbenchItems.map(item => (
              <button key={item.label} onClick={() => navigate(item.path)} className="flex flex-col items-center gap-2 active:scale-95 transition-transform">
                <div className={`w-11 h-11 rounded-xl ${item.bg} flex items-center justify-center`}>
                  <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                </div>
                <span className="text-xs text-foreground">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Marketing Materials */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between mb-2.5">
          <p className="text-sm font-medium text-foreground">拓客素材</p>
          <button onClick={() => navigate('/materials')} className="flex items-center text-xs text-muted-foreground active:opacity-70">
            更多 <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="space-y-3">
          {marketingMaterials.map(m => (
            <button
              key={m.id}
              onClick={() => navigate(`/materials/${m.id}`)}
              className="w-full bg-card rounded-xl border border-border p-4 active:bg-muted/50 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                  <Share2 className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-card-foreground">{m.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{m.desc}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[11px] px-2 py-0.5 bg-primary/10 text-primary rounded">{m.tag}</span>
                    <span className="text-[11px] text-muted-foreground">{m.uses} 次使用</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Floating QR button */}
      <button
        onClick={() => setQrOpen(true)}
        className="fixed bottom-20 right-4 z-40 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center active:scale-95 transition-transform"
        style={{ boxShadow: '0 4px 14px hsl(var(--primary) / 0.4)' }}
      >
        <QrCode className="w-5 h-5" />
      </button>

      {/* QR Dialog */}
      <Dialog open={qrOpen} onOpenChange={setQrOpen}>
        <DialogContent className="max-w-[340px] p-0 rounded-2xl overflow-hidden border-0 shadow-2xl">
          <DialogTitle className="sr-only">我的推广二维码</DialogTitle>
          {/* Gradient header */}
          <div className="bg-gradient-to-br from-primary via-primary to-primary/80 px-6 pt-7 pb-10 relative">
            <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-primary-foreground/[0.06]" />
            <div className="absolute bottom-2 -left-4 w-16 h-16 rounded-full bg-primary-foreground/[0.04]" />
            <div className="flex items-center gap-3.5 relative z-10">
              <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center ring-2 ring-primary-foreground/20 backdrop-blur-sm">
                <User className="w-5.5 h-5.5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-[15px] font-semibold text-primary-foreground tracking-wide">李泽峰</p>
                <p className="text-[11px] text-primary-foreground/60 mt-0.5">高级业务经理 · BD20240001</p>
              </div>
            </div>
          </div>
          {/* QR code area */}
          <div className="-mt-6 px-5 relative z-10">
            <div className="bg-card rounded-2xl border border-border shadow-lg p-6 flex flex-col items-center">
              <div className="w-[180px] h-[180px] bg-white rounded-xl flex items-center justify-center border border-border/50 p-3">
                <div className="grid grid-cols-7 gap-[3px] w-full h-full">
                  {Array.from({ length: 49 }).map((_, i) => {
                    const filled = [0,1,2,3,4,5,6,7,13,14,20,21,22,23,24,25,26,27,28,29,30,34,35,42,43,44,45,46,47,48,
                      8,9,10,11,12,15,16,17,18,19,31,32,33,36,37,38,39,40,41].includes(i) 
                      ? Math.random() > 0.35 : Math.random() > 0.6;
                    return (
                      <div key={i} className={`rounded-[2px] ${filled ? 'bg-foreground' : 'bg-muted/40'}`} />
                    );
                  })}
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-xs text-muted-foreground">扫一扫，立即了解合作详情</p>
                <p className="text-[10px] text-muted-foreground/60 mt-1">二维码有效期 30 天</p>
              </div>
            </div>
          </div>
          {/* Action buttons */}
          <div className="px-5 pb-5 pt-4 space-y-2">
            <button className="w-full h-11 rounded-xl text-[13px] font-medium flex items-center justify-center gap-2 text-white active:opacity-90 transition-all active:scale-[0.98]" style={{ background: 'linear-gradient(135deg, #07C160, #06AD56)' }}>
              <MessageCircle className="w-4 h-4" />
              分享给微信好友
            </button>
            <button className="w-full h-11 rounded-xl text-[13px] font-medium flex items-center justify-center gap-2 text-white active:opacity-90 transition-all active:scale-[0.98]" style={{ background: 'linear-gradient(135deg, #07C160, #06AD56)' }}>
              <Globe className="w-4 h-4" />
              分享到朋友圈
            </button>
            <button className="w-full h-11 rounded-xl text-[13px] font-medium flex items-center justify-center gap-2 bg-muted text-foreground active:opacity-90 transition-all active:scale-[0.98]">
              <Save className="w-4 h-4" />
              保存图片
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bottom tab bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border flex justify-around py-1.5 z-50">
        {tabs.map(tab => {
          const active = location.pathname === tab.path;
          return (
            <button key={tab.path} onClick={() => navigate(tab.path)} className="flex flex-col items-center gap-0.5 py-1 px-5 relative">
              {active && <div className="absolute -top-1.5 w-5 h-0.5 bg-primary rounded-full" />}
              <tab.icon className={`w-5 h-5 ${active ? 'text-primary' : 'text-muted-foreground'}`} />
              <span className={`text-[11px] ${active ? 'text-primary font-medium' : 'text-muted-foreground'}`}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Index;
