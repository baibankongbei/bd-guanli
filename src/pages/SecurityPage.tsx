import { useState } from 'react';
import { ChevronRight, Smartphone, Lock, Monitor, ShieldAlert, Trash2 } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';

const SecurityPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [showVerify, setShowVerify] = useState(false);
  const [showRemoveDevice, setShowRemoveDevice] = useState(false);
  const [removingDevice, setRemovingDevice] = useState('');
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [countdown, setCountdown] = useState(0);

  const [pwForm, setPwForm] = useState({ old: '', new1: '', new2: '' });
  const [phoneForm, setPhoneForm] = useState({ phone: '', code: '' });

  const [devices, setDevices] = useState([
    { name: 'iPhone 15 Pro', time: '当前设备', current: true },
    { name: 'iPad Air', time: '2024-03-25 14:30', current: false },
    { name: 'Chrome - MacBook', time: '2024-03-20 09:15', current: false },
  ]);

  const items = [
    { icon: Lock, label: '修改密码', desc: '上次修改: 2024-02-15', iconColor: 'text-primary', bg: 'bg-primary/10', action: () => setShowPassword(true) },
    { icon: Smartphone, label: '手机绑定', desc: '138****8888', iconColor: 'text-success', bg: 'bg-success/10', action: () => setShowPhone(true) },
    { icon: ShieldAlert, label: '安全验证', desc: smsEnabled ? '已开启短信验证' : '已关闭短信验证', iconColor: 'text-warning', bg: 'bg-warning/10', action: () => setShowVerify(true) },
  ];

  const handleSendCode = () => {
    if (countdown > 0) return;
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown(prev => { if (prev <= 1) { clearInterval(timer); return 0; } return prev - 1; });
    }, 1000);
  };

  const handlePasswordSubmit = () => {
    if (!pwForm.old || !pwForm.new1 || !pwForm.new2) {
      toast({ title: '请完善信息', variant: 'destructive' }); return;
    }
    if (pwForm.new1 !== pwForm.new2) {
      toast({ title: '两次密码不一致', variant: 'destructive' }); return;
    }
    toast({ title: '密码修改成功' });
    setShowPassword(false);
    setPwForm({ old: '', new1: '', new2: '' });
  };

  const handlePhoneSubmit = () => {
    if (!phoneForm.phone || !phoneForm.code) {
      toast({ title: '请完善信息', variant: 'destructive' }); return;
    }
    toast({ title: '手机号绑定成功' });
    setShowPhone(false);
    setPhoneForm({ phone: '', code: '' });
  };

  const handleRemoveDevice = () => {
    setDevices(prev => prev.filter(d => d.name !== removingDevice));
    setShowRemoveDevice(false);
    toast({ title: '设备已移除' });
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="账号安全" />

      <div className="px-4 pt-4">
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          {items.map((item, i) => (
            <button key={item.label} onClick={item.action} className={`w-full flex items-center gap-3 px-4 py-3.5 active:bg-muted/50 transition-colors ${i !== items.length - 1 ? 'border-b border-border' : ''}`}>
              <div className={`w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center`}>
                <item.icon className={`w-4 h-4 ${item.iconColor}`} />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm text-foreground">{item.label}</p>
                <p className="text-[11px] text-muted-foreground">{item.desc}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-5">
        <p className="text-sm font-medium text-foreground mb-3">登录设备</p>
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          {devices.map((d, i) => (
            <div key={d.name} className={`flex items-center gap-3 px-4 py-3.5 ${i !== devices.length - 1 ? 'border-b border-border' : ''}`}>
              <Monitor className="w-4 h-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm text-foreground">{d.name}</p>
                <p className="text-[11px] text-muted-foreground">{d.time}</p>
              </div>
              {d.current ? (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-success/10 text-success">当前</span>
              ) : (
                <button
                  onClick={() => { setRemovingDevice(d.name); setShowRemoveDevice(true); }}
                  className="w-7 h-7 rounded-lg flex items-center justify-center bg-destructive/10 active:bg-destructive/20"
                >
                  <Trash2 className="w-3.5 h-3.5 text-destructive" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Password dialog */}
      <Dialog open={showPassword} onOpenChange={setShowPassword}>
        <DialogContent className="max-w-[380px] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-base">修改密码</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">请输入旧密码和新密码</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Input type="password" placeholder="请输入旧密码" value={pwForm.old} onChange={e => setPwForm({ ...pwForm, old: e.target.value })} className="h-10" />
            <Input type="password" placeholder="请输入新密码" value={pwForm.new1} onChange={e => setPwForm({ ...pwForm, new1: e.target.value })} className="h-10" />
            <Input type="password" placeholder="请再次确认新密码" value={pwForm.new2} onChange={e => setPwForm({ ...pwForm, new2: e.target.value })} className="h-10" />
            <Button onClick={handlePasswordSubmit} className="w-full h-10 rounded-xl">确认修改</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Phone dialog */}
      <Dialog open={showPhone} onOpenChange={setShowPhone}>
        <DialogContent className="max-w-[380px] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-base">手机绑定</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">当前绑定: 138****8888</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Input placeholder="请输入新手机号" value={phoneForm.phone} onChange={e => setPhoneForm({ ...phoneForm, phone: e.target.value })} className="h-10" />
            <div className="flex gap-2">
              <Input placeholder="请输入验证码" value={phoneForm.code} onChange={e => setPhoneForm({ ...phoneForm, code: e.target.value })} className="flex-1 h-10" maxLength={6} />
              <Button variant="outline" onClick={handleSendCode} disabled={countdown > 0} className="shrink-0 h-10 text-xs w-24">
                {countdown > 0 ? `${countdown}s` : '获取验证码'}
              </Button>
            </div>
            <Button onClick={handlePhoneSubmit} className="w-full h-10 rounded-xl">确认绑定</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Verify dialog */}
      <Dialog open={showVerify} onOpenChange={setShowVerify}>
        <DialogContent className="max-w-[380px] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-base">安全验证设置</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">管理提现等敏感操作的验证方式</DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm text-foreground">短信验证</p>
              <p className="text-[11px] text-muted-foreground">提现时需要短信验证码</p>
            </div>
            <Switch checked={smsEnabled} onCheckedChange={(v) => { setSmsEnabled(v); toast({ title: v ? '已开启短信验证' : '已关闭短信验证' }); }} />
          </div>
        </DialogContent>
      </Dialog>

      {/* Remove device dialog */}
      <Dialog open={showRemoveDevice} onOpenChange={setShowRemoveDevice}>
        <DialogContent className="max-w-[320px] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-base">移除设备</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              确定要移除「{removingDevice}」吗？移除后该设备需要重新登录。
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 mt-2">
            <Button variant="outline" onClick={() => setShowRemoveDevice(false)} className="flex-1 h-10 rounded-xl">取消</Button>
            <Button variant="destructive" onClick={handleRemoveDevice} className="flex-1 h-10 rounded-xl">确认移除</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SecurityPage;
