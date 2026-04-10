import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

const legalContent: Record<string, string> = {
  '用户协议': `BD助手用户服务协议

一、总则
1.1 本协议是用户与BD助手平台之间关于使用BD助手服务所订立的协议。
1.2 用户在使用BD助手提供的各项服务前，应仔细阅读本服务协议。

二、服务内容
2.1 BD助手为用户提供商户拓展管理、分润结算、团队管理等一站式服务。
2.2 平台有权根据业务发展需要，调整服务内容和规则。

三、用户权利与义务
3.1 用户应提供真实、准确的个人信息进行注册和实名认证。
3.2 用户不得利用平台从事违法违规活动。
3.3 用户有权查看自己的收益明细和交易记录。

四、隐私保护
4.1 平台将依法保护用户的个人信息安全。
4.2 未经用户同意，平台不会向第三方提供用户个人信息。

五、免责声明
5.1 因不可抗力导致的服务中断，平台不承担责任。
5.2 用户因自身原因造成的损失，由用户自行承担。`,
  '隐私政策': `BD助手隐私政策

一、信息收集
我们收集的信息包括：
- 注册信息：姓名、手机号、身份证号等
- 设备信息：设备型号、操作系统版本等
- 使用信息：登录时间、操作记录等

二、信息使用
我们使用收集的信息用于：
- 提供、维护和改进我们的服务
- 处理交易和发送相关通知
- 提供客户支持服务

三、信息共享
我们不会将您的个人信息出售给第三方。仅在以下情况下共享：
- 获得您的明确同意
- 法律法规要求
- 保护平台和用户权益

四、信息安全
我们采用业界标准的安全技术和程序来保护您的信息安全。

五、联系我们
如有隐私相关问题，请联系：privacy@bdhelper.com`,
  '开源许可': `开源组件许可声明

本应用使用了以下开源组件：

1. React (MIT License)
   Copyright (c) Meta Platforms, Inc.

2. Tailwind CSS (MIT License)
   Copyright (c) Tailwind Labs, Inc.

3. Radix UI (MIT License)
   Copyright (c) WorkOS

4. Lucide Icons (ISC License)
   Copyright (c) Lucide Contributors

5. React Router (MIT License)
   Copyright (c) Remix Software Inc.

以上组件均在其各自的开源许可证下使用。
详细许可证文本请参阅各组件的官方仓库。`,
};

const links = [
  { label: '用户协议', path: '#' },
  { label: '隐私政策', path: '#' },
  { label: '开源许可', path: '#' },
];

const AboutPage = () => {
  const [openDoc, setOpenDoc] = useState('');

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="关于我们" />

      <div className="flex flex-col items-center pt-10 pb-6">
        <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-3">
          <span className="text-2xl font-bold text-primary-foreground">BD</span>
        </div>
        <p className="text-base font-semibold text-foreground">BD助手</p>
        <p className="text-xs text-muted-foreground mt-1">版本 v1.0.0</p>
      </div>

      <div className="px-4">
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          {links.map((l, i) => (
            <button
              key={l.label}
              onClick={() => setOpenDoc(l.label)}
              className={`w-full flex items-center justify-between px-4 py-3.5 active:bg-muted/50 transition-colors ${i !== links.length - 1 ? 'border-b border-border' : ''}`}
            >
              <span className="text-sm text-foreground">{l.label}</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>

      <div className="text-center mt-8">
        <p className="text-[11px] text-muted-foreground">© 2024 BD助手 All Rights Reserved</p>
      </div>

      <Dialog open={!!openDoc} onOpenChange={open => !open && setOpenDoc('')}>
        <DialogContent className="max-w-[380px] rounded-2xl max-h-[80vh] p-0">
          <DialogHeader className="px-5 pt-5 pb-3">
            <DialogTitle className="text-base">{openDoc}</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">请仔细阅读以下内容</DialogDescription>
          </DialogHeader>
          <ScrollArea className="px-5 pb-5 max-h-[60vh]">
            <p className="text-sm text-foreground whitespace-pre-line leading-6">
              {legalContent[openDoc] || ''}
            </p>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AboutPage;
