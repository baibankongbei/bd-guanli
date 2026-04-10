import { useNavigate } from 'react-router-dom';
import { Bell, ChevronRight, CheckCheck } from 'lucide-react';
import PageHeader from '@/components/PageHeader';

const allMessages = [
  { id: 1, text: '您的商户"茶百道-人民路店"已通过审核', time: '10:30', date: '今天', read: false, type: '审核通知' },
  { id: 2, text: '本月团队业绩已超额完成，请查看详情', time: '09:15', date: '今天', read: false, type: '业绩通知' },
  { id: 3, text: '新商户"星辰咖啡馆"入驻申请待审核', time: '16:40', date: '昨天', read: false, type: '审核通知' },
  { id: 4, text: '团队成员王强已完成本月KPI目标', time: '14:20', date: '昨天', read: true, type: '团队通知' },
  { id: 5, text: '系统将于今晚22:00进行例行维护', time: '11:00', date: '昨天', read: true, type: '系统通知' },
  { id: 6, text: '商户"好味来火锅店"交易异常提醒', time: '09:30', date: '3月25日', read: true, type: '风控提醒' },
  { id: 7, text: '本周拓客素材已更新，请查看最新物料', time: '08:00', date: '3月25日', read: true, type: '素材更新' },
  { id: 8, text: '您的提现申请 ¥5,000 已到账', time: '10:00', date: '3月24日', read: true, type: '财务通知' },
  { id: 9, text: '商户"鲜果时光"反馈设备故障，请及时处理', time: '15:30', date: '3月24日', read: true, type: '售后通知' },
  { id: 10, text: '3月份业务排行榜已发布，您排名第2', time: '09:00', date: '3月23日', read: true, type: '业绩通知' },
];

const MessagesPage = () => {
  const navigate = useNavigate();

  const unreadCount = allMessages.filter(m => !m.read).length;

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="消息通知" />

      {/* Summary */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            共 {allMessages.length} 条消息，{unreadCount} 条未读
          </p>
          <button className="flex items-center gap-1 text-xs text-primary active:opacity-70">
            <CheckCheck className="w-3.5 h-3.5" />
            全部已读
          </button>
        </div>
      </div>

      {/* Message list */}
      <div className="px-4 space-y-2 pb-6">
        {allMessages.map(msg => (
          <button
            key={msg.id}
            onClick={() => navigate(`/messages/${msg.id}`)}
            className="w-full bg-card rounded-xl border border-border p-4 text-left active:bg-muted/50 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="mt-1 flex-shrink-0">
                {!msg.read ? (
                  <div className="w-2 h-2 rounded-full bg-primary" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-transparent" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] px-2 py-0.5 bg-primary/10 text-primary rounded">{msg.type}</span>
                  <span className="text-[11px] text-muted-foreground">{msg.date} {msg.time}</span>
                </div>
                <p className={`text-sm ${msg.read ? 'text-muted-foreground' : 'text-card-foreground font-medium'}`}>
                  {msg.text}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MessagesPage;
