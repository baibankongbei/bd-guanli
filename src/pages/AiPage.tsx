import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Bot, User } from 'lucide-react';

const tabs = [
  { icon: Home, label: '首页', path: '/' },
  { icon: Bot, label: 'AI', path: '/ai' },
  { icon: User, label: '我的', path: '/profile' },
];

const AiPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background pb-20 flex items-center justify-center">
      <div className="text-center">
        <Bot className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
        <p className="text-lg font-medium text-foreground">AI 助手</p>
        <p className="text-sm text-muted-foreground mt-1">即将上线，敬请期待</p>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border flex justify-around py-2">
        {tabs.map(tab => {
          const active = location.pathname === tab.path;
          return (
            <button key={tab.path} onClick={() => navigate(tab.path)} className="flex flex-col items-center gap-0.5 py-1 px-4">
              <tab.icon className={`w-5 h-5 ${active ? 'text-primary' : 'text-muted-foreground'}`} />
              <span className={`text-xs ${active ? 'text-primary font-medium' : 'text-muted-foreground'}`}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AiPage;
