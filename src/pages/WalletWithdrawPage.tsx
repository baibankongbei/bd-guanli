import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Info } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const WalletWithdrawPage = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [showVerify, setShowVerify] = useState(false);
  const [verifyCode, setVerifyCode] = useState('');
  const [countdown, setCountdown] = useState(0);
  const availableAmount = 10580.0;
  const phone = '138****6688';

  const handleWithdrawAll = () => {
    setAmount(availableAmount.toFixed(2));
  };

  const handleSubmit = () => {
    const val = parseFloat(amount);
    if (!val || val < 1 || val > availableAmount) return;
    setShowVerify(true);
  };

  const handleSendCode = () => {
    if (countdown > 0) return;
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) { clearInterval(timer); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  const handleConfirmVerify = () => {
    if (verifyCode.length < 4) return;
    setShowVerify(false);
    navigate('/wallet');
  };

  const isValid = parseFloat(amount) >= 1 && parseFloat(amount) <= availableAmount;

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="提现" />

      <div className="px-4 pt-4 space-y-4">
        {/* Available amount */}
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">可提现金额</span>
            <span className="text-lg font-bold text-foreground">¥{availableAmount.toLocaleString('en', { minimumFractionDigits: 2 })}</span>
          </div>
        </div>

        {/* Amount input */}
        <div className="bg-card rounded-xl border border-border p-4 space-y-3">
          <label className="text-sm font-medium text-foreground">提现金额</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xl font-bold text-foreground">¥</span>
            <Input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="请输入提现金额"
              className="pl-8 h-12 text-xl font-bold border-0 border-b border-border rounded-none focus-visible:ring-0 bg-transparent"
            />
            <button
              onClick={handleWithdrawAll}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-xs text-primary font-medium"
            >
              全部提现
            </button>
          </div>
          <p className="text-[11px] text-muted-foreground">最低提现金额1元</p>
        </div>

        {/* Bank card selector */}
        <div
          onClick={() => navigate('/profile/bank-cards')}
          className="bg-card rounded-xl border border-border p-4 flex items-center justify-between cursor-pointer active:bg-muted/30 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
              <span className="text-xs font-bold text-destructive">工商</span>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">中国工商银行</p>
              <p className="text-[11px] text-muted-foreground">储蓄卡 尾号6218</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </div>

        {/* Withdraw rules */}
        <div className="bg-card rounded-xl border border-border p-4 space-y-2">
          <div className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs font-medium text-foreground">提现规则</span>
          </div>
          <ul className="space-y-1 text-[11px] text-muted-foreground leading-relaxed">
            <li>• 提现金额最低1元，单笔最高50,000元</li>
            <li>• 提现申请提交后，预计1-3个工作日到账</li>
            <li>• 每笔提现收取0.1%手续费，最低0.1元</li>
            <li>• 提现到账银行卡需为本人实名认证银行卡</li>
            <li>• 如遇节假日，到账时间可能延迟</li>
          </ul>
        </div>

        {/* Submit button */}
        <Button
          onClick={handleSubmit}
          disabled={!isValid}
          className="w-full h-12 rounded-xl text-base font-medium"
        >
          确认提现
        </Button>
      </div>

      {/* Verification dialog */}
      <Dialog open={showVerify} onOpenChange={setShowVerify}>
        <DialogContent className="max-w-[340px] rounded-2xl p-0 overflow-hidden">
          <DialogHeader className="bg-primary px-5 py-4">
            <DialogTitle className="text-primary-foreground text-base">身份验证</DialogTitle>
          </DialogHeader>
          <div className="p-5 space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              验证码将发送至 <span className="text-foreground font-medium">{phone}</span>
            </p>
            <div className="flex gap-2">
              <Input
                value={verifyCode}
                onChange={e => setVerifyCode(e.target.value)}
                placeholder="请输入验证码"
                maxLength={6}
                className="flex-1 h-11 text-center text-lg tracking-[8px] font-medium"
              />
              <Button
                variant="outline"
                onClick={handleSendCode}
                disabled={countdown > 0}
                className="shrink-0 h-11 text-xs w-24"
              >
                {countdown > 0 ? `${countdown}s` : '获取验证码'}
              </Button>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-[11px] text-muted-foreground">
                提现金额：<span className="text-foreground font-medium">¥{amount || '0.00'}</span>
              </p>
              <p className="text-[11px] text-muted-foreground mt-1">
                到账银行卡：<span className="text-foreground">工商银行 尾号6218</span>
              </p>
            </div>
            <Button onClick={handleConfirmVerify} disabled={verifyCode.length < 4} className="w-full h-11 rounded-xl">
              确认提现
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WalletWithdrawPage;
