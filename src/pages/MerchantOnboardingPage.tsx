import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, ChevronRight } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

const STEPS = ['商户信息', '法人信息', '补充信息', '门店信息', '结算信息', '商户认证'];

const PhotoUpload = ({ label }: { label: string }) => (
  <div className="flex flex-col items-center gap-1.5">
    <div className="w-full aspect-[3/2] bg-muted/50 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center cursor-pointer active:bg-muted/80 transition-colors">
      <Camera className="w-6 h-6 text-muted-foreground" />
      <span className="text-[11px] text-muted-foreground mt-1">点击上传</span>
    </div>
    <span className="text-[11px] text-muted-foreground">{label}</span>
  </div>
);

const FormRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-1.5">
    <label className="text-sm text-foreground font-medium">{label}</label>
    {children}
  </div>
);

const MerchantOnboardingPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [settlementType, setSettlementType] = useState('对公');
  const [submitDialog, setSubmitDialog] = useState(false);
  const [merchantType, setMerchantType] = useState('企业');

  const next = () => { if (step < 5) setStep(step + 1); };
  const prev = () => { if (step > 0) setStep(step - 1); };

  const handleSubmit = () => {
    setSubmitDialog(false);
    toast({ title: '提交成功', description: '商户进件资料已提交，请等待审核' });
    navigate('/merchants');
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title="商户进件" />

      {/* Progress */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between mb-2">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-medium ${i <= step ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>{i + 1}</div>
              {i < 5 && <div className={`w-4 sm:w-6 h-0.5 mx-0.5 ${i < step ? 'bg-primary' : 'bg-border'}`} />}
            </div>
          ))}
        </div>
        <p className="text-center text-sm font-medium text-foreground">{STEPS[step]}</p>
        <p className="text-center text-[11px] text-muted-foreground">步骤 {step + 1} / {STEPS.length}</p>
      </div>

      <div className="px-4 space-y-4 mt-2">
        {/* Step 1: 商户信息 */}
        {step === 0 && (
          <>
            <FormRow label="商户类型">
              <Select value={merchantType} onValueChange={setMerchantType}>
                <SelectTrigger className="h-10"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="个人">个人</SelectItem>
                  <SelectItem value="企业">企业</SelectItem>
                  <SelectItem value="小微">小微商户</SelectItem>
                </SelectContent>
              </Select>
            </FormRow>
            <div>
              <label className="text-sm text-foreground font-medium mb-1.5 block">营业执照</label>
              <PhotoUpload label="营业执照照片" />
            </div>
            <FormRow label="营业执照名称"><Input placeholder="请输入营业执照名称" className="h-10" /></FormRow>
            <FormRow label="统一社会信用代码"><Input placeholder="请输入18位社会信用代码" className="h-10" /></FormRow>
            <FormRow label="执照有效日期"><Input type="date" className="h-10" /></FormRow>
            <FormRow label="执照到期日期"><Input type="date" className="h-10" /></FormRow>
            <FormRow label="注册地址"><Input placeholder="请输入注册地址" className="h-10" /></FormRow>
            <FormRow label="证件类型">
              <Select defaultValue="营业执照">
                <SelectTrigger className="h-10"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="营业执照">营业执照</SelectItem>
                  <SelectItem value="个体工商户营业执照">个体工商户营业执照</SelectItem>
                </SelectContent>
              </Select>
            </FormRow>
          </>
        )}

        {/* Step 2: 法人信息 */}
        {step === 1 && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <PhotoUpload label="身份证人像面" />
              <PhotoUpload label="身份证国徽面" />
            </div>
            <FormRow label="法人姓名"><Input placeholder="请输入法人姓名" className="h-10" /></FormRow>
            <FormRow label="身份证号码"><Input placeholder="请输入18位身份证号码" className="h-10" /></FormRow>
            <FormRow label="证件有效期起"><Input type="date" className="h-10" /></FormRow>
            <FormRow label="证件有效期止"><Input type="date" className="h-10" /></FormRow>
          </>
        )}

        {/* Step 3: 补充信息 */}
        {step === 2 && (
          <>
            <FormRow label="商户简称"><Input placeholder="请输入商户简称" className="h-10" /></FormRow>
            <FormRow label="商户经营地址"><Input placeholder="请输入经营地址" className="h-10" /></FormRow>
            <FormRow label="经营品类">
              <Select defaultValue="餐饮">
                <SelectTrigger className="h-10"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="餐饮">餐饮</SelectItem>
                  <SelectItem value="零售">零售</SelectItem>
                  <SelectItem value="服务">生活服务</SelectItem>
                  <SelectItem value="教育">教育培训</SelectItem>
                  <SelectItem value="其他">其他</SelectItem>
                </SelectContent>
              </Select>
            </FormRow>
            <FormRow label="联系人"><Input placeholder="请输入联系人姓名" className="h-10" /></FormRow>
            <FormRow label="手机号"><Input placeholder="请输入联系手机号" className="h-10" type="tel" /></FormRow>
          </>
        )}

        {/* Step 4: 门店信息 */}
        {step === 3 && (
          <>
            <div className="grid grid-cols-3 gap-2">
              <PhotoUpload label="门头照" />
              <PhotoUpload label="内景照" />
              <PhotoUpload label="收银台照" />
            </div>
            <FormRow label="门店名称"><Input placeholder="请输入门店名称" className="h-10" /></FormRow>
            <FormRow label="门店地址"><Input placeholder="请输入门店详细地址" className="h-10" /></FormRow>
            <FormRow label="商户协议类型">
              <Select defaultValue="电子协议">
                <SelectTrigger className="h-10"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="电子协议">电子协议</SelectItem>
                  <SelectItem value="纸质协议">纸质协议</SelectItem>
                </SelectContent>
              </Select>
            </FormRow>
          </>
        )}

        {/* Step 5: 结算信息 */}
        {step === 4 && (
          <>
            <FormRow label="结算类型">
              <Select value={settlementType} onValueChange={setSettlementType}>
                <SelectTrigger className="h-10"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="对公">对公结算</SelectItem>
                  <SelectItem value="对私法人">对私法人结算</SelectItem>
                  <SelectItem value="对私非法人">对私非法人结算</SelectItem>
                </SelectContent>
              </Select>
            </FormRow>

            {settlementType === '对公' && (
              <>
                <PhotoUpload label="开户许可证照片" />
                <FormRow label="银行卡号"><Input placeholder="请输入对公银行账号" className="h-10" /></FormRow>
                <FormRow label="开户地"><Input placeholder="请输入开户地" className="h-10" /></FormRow>
                <FormRow label="开户银行"><Input placeholder="请输入开户银行名称" className="h-10" /></FormRow>
              </>
            )}

            {settlementType === '对私法人' && (
              <>
                <PhotoUpload label="银行卡照片" />
                <FormRow label="持卡人姓名"><Input placeholder="请输入持卡人姓名" className="h-10" /></FormRow>
                <FormRow label="证件号码"><Input placeholder="请输入身份证号码" className="h-10" /></FormRow>
                <FormRow label="银行卡号"><Input placeholder="请输入银行卡号" className="h-10" /></FormRow>
                <FormRow label="开户行"><Input placeholder="请输入开户行" className="h-10" /></FormRow>
                <FormRow label="开户银行"><Input placeholder="请输入开户银行全称" className="h-10" /></FormRow>
              </>
            )}

            {settlementType === '对私非法人' && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <PhotoUpload label="银行卡照片" />
                  <PhotoUpload label="法人授权函" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <PhotoUpload label="身份证人像面" />
                  <PhotoUpload label="身份证国徽面" />
                </div>
                <FormRow label="开户名"><Input placeholder="请输入开户名" className="h-10" /></FormRow>
                <FormRow label="证件号码"><Input placeholder="请输入身份证号码" className="h-10" /></FormRow>
                <FormRow label="证件有效期限"><Input type="date" className="h-10" /></FormRow>
                <FormRow label="银行卡号"><Input placeholder="请输入银行卡号" className="h-10" /></FormRow>
                <FormRow label="开户银行"><Input placeholder="请输入开户银行全称" className="h-10" /></FormRow>
              </>
            )}
          </>
        )}

        {/* Step 6: 商户认证 */}
        {step === 5 && (
          <>
            <div className="bg-card rounded-xl border border-border p-4 text-center space-y-4">
              <p className="text-sm font-medium text-foreground">支付平台认证</p>
              <p className="text-[11px] text-muted-foreground">请使用对应支付平台APP扫描以下二维码完成商户认证</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-28 h-28 bg-muted/50 border border-border rounded-lg flex items-center justify-center">
                    <span className="text-[10px] text-muted-foreground">微信认证二维码</span>
                  </div>
                  <span className="text-[11px] text-muted-foreground">微信支付</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-28 h-28 bg-muted/50 border border-border rounded-lg flex items-center justify-center">
                    <span className="text-[10px] text-muted-foreground">支付宝认证二维码</span>
                  </div>
                  <span className="text-[11px] text-muted-foreground">支付宝</span>
                </div>
              </div>
            </div>
            <div className="bg-muted/50 rounded-xl p-3 space-y-1">
              <p className="text-xs font-medium text-foreground">温馨提示</p>
              <p className="text-[11px] text-muted-foreground">1. 提交后预计1-3个工作日完成审核</p>
              <p className="text-[11px] text-muted-foreground">2. 审核结果将通过消息通知告知</p>
              <p className="text-[11px] text-muted-foreground">3. 如有问题请联系客服 400-888-8888</p>
            </div>
          </>
        )}
      </div>

      {/* Bottom Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 flex gap-3 z-20">
        {step > 0 && (
          <Button variant="outline" className="flex-1 h-11" onClick={prev}>上一步</Button>
        )}
        {step < 5 ? (
          <Button className="flex-1 h-11" onClick={next}>
            下一步 <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        ) : (
          <Button className="flex-1 h-11" onClick={() => setSubmitDialog(true)}>提交审核</Button>
        )}
      </div>

      {/* Submit Confirm Dialog */}
      <Dialog open={submitDialog} onOpenChange={setSubmitDialog}>
        <DialogContent className="max-w-[340px] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-base">确认提交</DialogTitle>
            <DialogDescription>提交后资料将进入审核流程，确认所有信息无误？</DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-row gap-2">
            <Button variant="outline" className="flex-1" onClick={() => setSubmitDialog(false)}>再检查</Button>
            <Button className="flex-1" onClick={handleSubmit}>确认提交</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MerchantOnboardingPage;
