import { useParams } from 'react-router-dom';
import { Bell, Clock, Tag } from 'lucide-react';
import PageHeader from '@/components/PageHeader';

const allMessages = [
  { id: 1, text: '您的商户"茶百道-人民路店"已通过审核', time: '10:30', date: '2024-03-26', type: '审核通知', detail: '您提交的商户"茶百道-人民路店"入驻申请已通过平台审核。该商户已可正常使用全部功能，包括收款、营销活动参与、数据报表查看等。请及时通知商户完成设备激活和首笔交易测试。如有任何问题，请联系客服。' },
  { id: 2, text: '本月团队业绩已超额完成，请查看详情', time: '09:15', date: '2024-03-26', type: '业绩通知', detail: '截至今日，您的团队本月已完成新增商户28家，超额完成目标（25家）12%。团队总收益达¥86,400，较上月增长18.5%。表现突出的成员：李明（8家）、赵丽（6家）、王强（5家）。请继续保持优秀的业务拓展势头！' },
  { id: 3, text: '新商户"星辰咖啡馆"入驻申请待审核', time: '16:40', date: '2024-03-25', type: '审核通知', detail: '商户"星辰咖啡馆"已提交入驻申请，所需资料已全部上传。请在24小时内完成初审，确认营业执照、法人信息及结算账户信息的准确性。审核通过后系统将自动通知商户。' },
  { id: 4, text: '团队成员王强已完成本月KPI目标', time: '14:20', date: '2024-03-25', type: '团队通知', detail: '团队成员王强已提前完成本月KPI目标：新增商户5家（目标5家），月度收益¥3,200。王强本月客户转化率达45%，平均成交周期5.2天，表现优秀。建议给予适当激励。' },
  { id: 5, text: '系统将于今晚22:00进行例行维护', time: '11:00', date: '2024-03-25', type: '系统通知', detail: '为提升系统稳定性和用户体验，平台将于今晚22:00-次日02:00进行例行系统维护升级。维护期间，部分功能可能暂时无法使用，包括：数据报表导出、提现申请、新商户注册。收款功能不受影响。请提前做好相关工作安排。' },
  { id: 6, text: '商户"好味来火锅店"交易异常提醒', time: '09:30', date: '2024-03-25', type: '风控提醒', detail: '商户"好味来火锅店"近3日交易量较历史平均水平下降超过40%，可能存在设备故障或经营异常。建议尽快联系商户确认情况，必要时安排上门检查设备状态。' },
  { id: 7, text: '本周拓客素材已更新，请查看最新物料', time: '08:00', date: '2024-03-25', type: '素材更新', detail: '本周平台已更新3套拓客素材，包括：1.春季商户招募海报 2.费率优惠对比图 3.成功案例分享模板。所有素材已适配手机端分享，可直接转发至微信朋友圈或商户群。前往拓客素材页面查看和下载。' },
  { id: 8, text: '您的提现申请 ¥5,000 已到账', time: '10:00', date: '2024-03-24', type: '财务通知', detail: '您于2024-03-23 14:30提交的提现申请（金额：¥5,000.00）已成功处理，资金已转入您的招商银行账户（尾号6789）。预计1-2个工作日到账，请注意查收。如有疑问，请联系财务客服。' },
  { id: 9, text: '商户"鲜果时光"反馈设备故障，请及时处理', time: '15:30', date: '2024-03-24', type: '售后通知', detail: '商户"鲜果时光水果店"通过客服渠道反馈其收款设备无法正常开机，已影响正常收款。设备编号：POS-2024031201。请在24小时内安排技术人员上门检修或更换设备。商户联系人：陈先生，电话：138****5678。' },
  { id: 10, text: '3月份业务排行榜已发布，您排名第2', time: '09:00', date: '2024-03-23', type: '业绩通知', detail: '2024年3月份区域业务排行榜已发布。您的综合排名为第2名（共15人），较上月提升1位。评分维度：新增商户数（28家，排名第1）、商户活跃率（92%，排名第3）、客户满意度（4.8/5.0，排名第2）。继续努力，争取下月冲击榜首！' },
];

const MessageDetailPage = () => {
  const { id } = useParams();
  const message = allMessages.find(m => m.id === Number(id));

  if (!message) {
    return (
      <div className="min-h-screen bg-background">
        <PageHeader title="消息详情" />
        <div className="flex items-center justify-center py-20">
          <p className="text-muted-foreground text-sm">消息不存在</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="消息详情" />

      <div className="px-4 py-4">
        <div className="bg-card rounded-xl border border-border p-5">
          {/* Type badge */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs px-2.5 py-1 bg-primary/10 text-primary rounded-md font-medium">{message.type}</span>
          </div>

          {/* Title */}
          <h2 className="text-base font-semibold text-card-foreground leading-relaxed">{message.text}</h2>

          {/* Meta */}
          <div className="flex items-center gap-4 mt-3 pb-4 border-b border-border">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              <span>{message.date} {message.time}</span>
            </div>
          </div>

          {/* Content */}
          <div className="mt-4">
            <p className="text-sm text-card-foreground leading-relaxed">{message.detail}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageDetailPage;
