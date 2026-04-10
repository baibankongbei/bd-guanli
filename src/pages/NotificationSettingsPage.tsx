import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';

const initialSettings = [
  { key: 'merchant', label: '商户动态通知', desc: '商户审核、入驻状态变更', enabled: true },
  { key: 'revenue', label: '收益到账通知', desc: '分润收入到账提醒', enabled: true },
  { key: 'team', label: '团队消息通知', desc: '团队成员变动、业绩提醒', enabled: true },
  { key: 'activity', label: '活动推送通知', desc: '营销活动、优惠信息推送', enabled: false },
  { key: 'system', label: '系统通知', desc: '系统维护、版本更新提醒', enabled: true },
];

const NotificationSettingsPage = () => {
  const [settings, setSettings] = useState(initialSettings);

  const toggle = (key: string) => {
    setSettings(prev => prev.map(s => {
      if (s.key === key) {
        const newEnabled = !s.enabled;
        toast({ title: newEnabled ? `已开启${s.label}` : `已关闭${s.label}` });
        return { ...s, enabled: newEnabled };
      }
      return s;
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="消息设置" />
      <div className="px-4 pt-4">
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          {settings.map((s, i) => (
            <div key={s.key} className={`flex items-center justify-between px-4 py-3.5 ${i !== settings.length - 1 ? 'border-b border-border' : ''}`}>
              <div>
                <p className="text-sm text-foreground">{s.label}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{s.desc}</p>
              </div>
              <Switch checked={s.enabled} onCheckedChange={() => toggle(s.key)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationSettingsPage;
