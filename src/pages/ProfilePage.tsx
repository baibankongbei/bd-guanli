import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Home, Bot, User, ChevronRight, Wallet, Store, BarChart3, UserPlus,
  CreditCard, ShieldCheck, Lock, BellRing, MessageSquare, Info, LogOut
} from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const tabs = [
  { icon: Home, label: '首页', path: '/' },
  { icon: Bot, label: 'AI', path: '/ai' },
  { icon: User, label: '我的', path: '/profile' },
];

const menuGroups = [
  {
    title: '业务管理',
    items: [
      { icon: Store, label: '商户进件', path: '/merchants', iconColor: 'text-primary', bg: 'bg-primary/10' },
      { icon: BarChart3, label: '我的业绩', path: '/profile/performance', iconColor: 'text-info', bg: 'bg-info/10' },
      { icon: UserPlus, label: '邀请好友', path: '/profile/invite', iconColor: 'text-success', bg: 'bg-success/10' },
    ],
  },
  {
    title: '资产管理',
    items: [
      { icon: CreditCard, label: '我的银行卡', path: '/profile/bank-cards', iconColor: 'text-primary', bg: 'bg-primary/10' },
      { icon: ShieldCheck, label: '实名认证', path: '/profile/verification', iconColor: 'text-warning', bg: 'bg-warning/10' },
    ],
  },
  {
    title: '系统设置',
    items: [
      { icon: Lock, label: '账号安全', path: '/profile/security', iconColor: 'text-destructive', bg: 'bg-destructive/10' },
      { icon: BellRing, label: '消息设置', path: '/profile/notifications-settings', iconColor: 'text-accent', bg: 'bg-accent/10' },
      { icon: MessageSquare, label: '意见反馈', path: '/profile/feedback', iconColor: 'text-info', bg: 'bg-info/10' },
      { icon: Info, label: '关于我们', path: '/profile/about', iconColor: 'text-muted-foreground', bg: 'bg-muted' },
    ],
  },
];

const ProfilePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [logoutOpen, setLogoutOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-primary px-5 pt-12 pb-10 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary-foreground/5" />
        <div className="flex items-center gap-3.5 relative z-10">
          <div className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center ring-2 ring-primary-foreground/10">
            <User className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-lg font-bold text-primary-foreground">李泽峰</p>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary-foreground/20 text-primary-foreground/90 font-medium">高级业务经理</span>
            </div>
            <p className="text-xs text-primary-foreground/60 mt-1">ID: BD20240001</p>
          </div>
        </div>
      </div>

      {/* Wallet card */}
      <div className="px-4 -mt-5 relative z-10">
        <button
          onClick={() => navigate('/wallet')}
          className="w-full bg-card rounded-xl shadow-sm border border-border p-4 active:bg-muted/50 transition-colors text-left"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">我的钱包</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">余额 ¥12,580.00</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
        </button>
      </div>

      {/* Menu groups */}
      <div className="px-4 pt-4 space-y-3">
        {menuGroups.map(group => (
          <div key={group.title}>
            <p className="text-xs text-muted-foreground mb-2 px-1">{group.title}</p>
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              {group.items.map((item, i) => (
                <button
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 active:bg-muted/50 transition-colors ${i !== group.items.length - 1 ? 'border-b border-border' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center`}>
                    <item.icon className={`w-4 h-4 ${item.iconColor}`} />
                  </div>
                  <span className="text-sm text-foreground flex-1 text-left">{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Logout */}
      <div className="px-4 pt-3">
        <button
          onClick={() => setLogoutOpen(true)}
          className="w-full bg-card rounded-xl border border-border py-3.5 flex items-center justify-center gap-2 active:bg-muted/50 transition-colors"
        >
          <LogOut className="w-4 h-4 text-destructive" />
          <span className="text-sm text-destructive font-medium">退出登录</span>
        </button>
      </div>

      <p className="text-center text-[11px] text-muted-foreground mt-4 pb-4">版本号 v1.0.0</p>

      {/* Logout dialog */}
      <Dialog open={logoutOpen} onOpenChange={setLogoutOpen}>
        <DialogContent className="max-w-[300px] rounded-2xl">
          <DialogTitle className="text-center text-base font-semibold">确认退出</DialogTitle>
          <DialogDescription className="text-center text-sm text-muted-foreground">确定要退出当前账号吗？</DialogDescription>
          <div className="flex gap-3 mt-2">
            <button onClick={() => setLogoutOpen(false)} className="flex-1 h-10 rounded-lg border border-border text-sm text-foreground active:bg-muted/50 transition-colors">取消</button>
            <button onClick={() => setLogoutOpen(false)} className="flex-1 h-10 rounded-lg bg-destructive text-destructive-foreground text-sm font-medium active:opacity-90 transition-opacity">退出</button>
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

export default ProfilePage;
