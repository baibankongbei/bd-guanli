import { useState } from 'react';
import { ShieldCheck, CheckCircle2, Camera } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const VerificationPage = () => {
  const [showReVerify, setShowReVerify] = useState(false);

  const handleReVerify = () => {
    setShowReVerify(false);
    toast({ title: '已提交重新认证申请', description: '预计1-3个工作日内完成审核' });
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="实名认证" />

      <div className="px-4 pt-6">
        <div className="bg-card rounded-xl border border-border p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-success" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">已完成实名认证</p>
            <p className="text-xs text-muted-foreground mt-0.5">认证时间: 2024-01-10</p>
          </div>
        </div>

        <div className="mt-4 bg-card rounded-xl border border-border overflow-hidden">
          {[
            { label: '真实姓名', value: '李泽峰' },
            { label: '身份证号', value: '330***********2018' },
            { label: '认证状态', value: '已认证', highlight: true },
          ].map((item, i) => (
            <div key={item.label} className={`flex items-center justify-between px-4 py-3.5 ${i !== 2 ? 'border-b border-border' : ''}`}>
              <span className="text-sm text-muted-foreground">{item.label}</span>
              <span className={`text-sm ${item.highlight ? 'text-success font-medium' : 'text-foreground'}`}>{item.value}</span>
            </div>
          ))}
        </div>

        <p className="text-sm font-medium text-foreground mt-5 mb-3">证件照片</p>
        <div className="grid grid-cols-2 gap-3">
          {['身份证正面', '身份证反面'].map(label => (
            <div key={label} className="bg-card rounded-xl border border-border p-4 flex flex-col items-center gap-2">
              <div className="w-full aspect-[3/2] rounded-lg bg-muted flex items-center justify-center">
                <Camera className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>

        <Button onClick={() => setShowReVerify(true)} variant="outline" className="w-full mt-6 h-11 rounded-xl">
          重新认证
        </Button>
      </div>

      <Dialog open={showReVerify} onOpenChange={setShowReVerify}>
        <DialogContent className="max-w-[320px] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-base">重新认证</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              重新提交实名认证后，当前认证信息将被覆盖，审核期间不影响正常使用。确认继续？
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 mt-2">
            <Button variant="outline" onClick={() => setShowReVerify(false)} className="flex-1 h-10 rounded-xl">取消</Button>
            <Button onClick={handleReVerify} className="flex-1 h-10 rounded-xl">确认提交</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VerificationPage;
