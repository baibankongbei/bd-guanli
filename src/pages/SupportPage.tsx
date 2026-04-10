import PageHeader from '@/components/PageHeader';
import { MessageCircle, Phone, Mail, ChevronRight, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const quickQuestions = [
  '商户进件失败怎么办？',
  '收益未到账如何处理？',
  '团队成员无法添加？',
];

const SupportPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="联系客服" />

      <div className="px-4 pt-4 pb-6 space-y-4">
        {/* Channels */}
        <div>
          <h2 className="text-sm font-semibold text-foreground mb-3">客服渠道</h2>
          <div className="space-y-2">
            <a href="#" className="flex items-center gap-3.5 bg-card rounded-xl p-4 border border-border">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-card-foreground">在线客服</p>
                <p className="text-xs text-muted-foreground">支持文字、图片沟通</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </a>

            <a href="tel:400-123-4567" className="flex items-center gap-3.5 bg-card rounded-xl p-4 border border-border">
              <div className="w-10 h-10 rounded-xl bg-success flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-success-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-card-foreground">电话客服</p>
                <p className="text-xs text-muted-foreground">400-123-4567</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </a>

            <a href="mailto:support@xxx.com" className="flex items-center gap-3.5 bg-card rounded-xl p-4 border border-border">
              <div className="w-10 h-10 rounded-xl bg-info flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-info-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-card-foreground">邮箱客服</p>
                <p className="text-xs text-muted-foreground">support@xxx.com</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </a>
          </div>
        </div>

        {/* Quick Questions */}
        <div>
          <h2 className="text-sm font-semibold text-foreground mb-3">常见问题快捷入口</h2>
          <div className="space-y-2">
            {quickQuestions.map((q, i) => (
              <button key={i} onClick={() => navigate('/guide')}
                className="w-full flex items-center gap-3 bg-card rounded-xl p-3.5 border border-border text-left hover:bg-muted/50 transition-colors">
                <HelpCircle className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm text-card-foreground">{q}</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto flex-shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
