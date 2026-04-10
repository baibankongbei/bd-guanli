import { useParams } from 'react-router-dom';
import { CheckCircle, XCircle, ArrowDownLeft, RefreshCw } from 'lucide-react';
import PageHeader from '@/components/PageHeader';

interface Transaction {
  id: number;
  type: 'income' | 'withdraw' | 'expense';
  subtype: string;
  title: string;
  amount: string;
  balance: string;
  time: string;
  status: string;
  orderId: string;
  fee?: string;
  storeId?: string;
}

const transactions: Transaction[] = [
  { id: 1, type: 'income', subtype: '分润收入', title: '茶百道-人民路店 分润收入', amount: '+¥86.50', balance: '¥12,580.00', time: '2024-07-28 14:30', status: '已到账', orderId: 'FR20240728143000001', storeId: 'MD20240101' },
  { id: 2, type: 'income', subtype: '分润入', title: '星辰咖啡馆 分润入', amount: '+¥120.00', balance: '¥12,493.50', time: '2024-07-27 09:15', status: '已到账', orderId: 'FR20240727091500002', storeId: 'MD20240035' },
  { id: 3, type: 'withdraw', subtype: '余额提现', title: '余额提现', amount: '-¥2,000.00', balance: '¥12,373.50', time: '2024-07-26 16:40', status: '提现成功', orderId: 'TX20240726164000003', fee: '¥2.00' },
  { id: 4, type: 'income', subtype: '实地核实', title: '鲜果时光 实地核实奖励', amount: '+¥45.30', balance: '¥14,373.50', time: '2024-07-25 11:20', status: '已到账', orderId: 'SD20240725112000004', storeId: 'MD20240088' },
  { id: 6, type: 'withdraw', subtype: '余额提现', title: '余额提现', amount: '-¥5,000.00', balance: '¥14,396.20', time: '2024-07-22 10:00', status: '提现失败', orderId: 'TX20240722100000006', fee: '¥0.00' },
  { id: 7, type: 'income', subtype: '分润收入', title: '悦来茶馆 分润收入', amount: '+¥210.00', balance: '¥19,396.20', time: '2024-07-20 15:30', status: '已到账', orderId: 'FR20240720153000007', storeId: 'MD20240102' },
  { id: 8, type: 'expense', subtype: '服务费', title: '平台服务费扣除', amount: '-¥15.00', balance: '¥19,186.20', time: '2024-07-18 09:00', status: '已扣除', orderId: 'ZC20240718090000008' },
];

const DetailRow = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
  <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
    <span className="text-sm text-muted-foreground">{label}</span>
    <span className={`text-sm ${highlight ? 'font-medium text-foreground' : 'text-foreground'}`}>{value}</span>
  </div>
);

const WalletDetailPage = () => {
  const { id } = useParams();
  const transaction = transactions.find(t => t.id === Number(id));

  if (!transaction) {
    return (
      <div className="min-h-screen bg-background">
        <PageHeader title="交易详情" />
        <div className="flex items-center justify-center h-60 text-sm text-muted-foreground">记录不存在</div>
      </div>
    );
  }

  const isWithdraw = transaction.type === 'withdraw';
  const isIncome = transaction.type === 'income';
  const isFailed = transaction.status === '提现失败';

  const getStatusIcon = () => {
    if (isFailed) return <XCircle className="w-10 h-10 text-destructive" />;
    if (isWithdraw) return <CheckCircle className="w-10 h-10 text-success" />;
    if (isIncome) return <ArrowDownLeft className="w-10 h-10 text-success" />;
    return <RefreshCw className="w-10 h-10 text-destructive" />;
  };

  const getTitle = () => {
    if (isWithdraw && isFailed) return '提现失败';
    if (isWithdraw) return '提现成功';
    if (isIncome) return '收入明细';
    return '支出明细';
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="交易详情" />

      {/* Status header */}
      <div className="flex flex-col items-center pt-8 pb-6">
        {getStatusIcon()}
        <p className="text-base font-medium text-foreground mt-3">{getTitle()}</p>
        <p className={`text-2xl font-bold mt-1 ${isIncome ? 'text-success' : isFailed ? 'text-destructive' : 'text-foreground'}`}>
          {transaction.amount}
        </p>
        {isWithdraw && (
          <span className={`mt-2 text-xs px-2.5 py-1 rounded-full ${
            isFailed ? 'bg-destructive/10 text-destructive' : 'bg-success/10 text-success'
          }`}>
            {transaction.status}
          </span>
        )}
      </div>

      {/* Detail card */}
      <div className="px-4 pb-6">
        <div className="bg-card rounded-xl border border-border px-4">
          {isWithdraw && (
            <>
              <DetailRow label="提现时间" value={transaction.time} />
              <DetailRow label="交易单号" value={transaction.orderId} />
              <DetailRow label="提现金额" value={transaction.amount} highlight />
              <DetailRow label="手续费" value={transaction.fee || '¥0.00'} />
              <DetailRow label="剩余余额" value={transaction.balance} highlight />
              {isFailed && <DetailRow label="失败原因" value="银行卡信息有误，请核实" />}
            </>
          )}
          {isIncome && (
            <>
              <DetailRow label="收入类型" value={transaction.subtype} />
              <DetailRow label="收入时间" value={transaction.time} />
              <DetailRow label="交易单号" value={transaction.orderId} />
              <DetailRow label="收入金额" value={transaction.amount} highlight />
              <DetailRow label="剩余余额" value={transaction.balance} highlight />
              {transaction.storeId && <DetailRow label="分润门店编号" value={transaction.storeId} />}
            </>
          )}
          {transaction.type === 'expense' && (
            <>
              <DetailRow label="支出类型" value={transaction.subtype} />
              <DetailRow label="支出时间" value={transaction.time} />
              <DetailRow label="交易单号" value={transaction.orderId} />
              <DetailRow label="支出金额" value={transaction.amount} highlight />
              <DetailRow label="剩余余额" value={transaction.balance} highlight />
              {transaction.storeId && <DetailRow label="关联门店编号" value={transaction.storeId} />}
            </>
          )}
        </div>
      </div>

      {/* Timeline for withdraw */}
      {isWithdraw && (
        <div className="px-4 pb-8">
          <div className="bg-card rounded-xl border border-border p-4">
            <p className="text-xs font-medium text-foreground mb-3">处理进度</p>
            <div className="space-y-0">
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className={`w-2.5 h-2.5 rounded-full ${isFailed ? 'bg-destructive' : 'bg-success'}`} />
                  <div className="w-px h-8 bg-border" />
                </div>
                <div className="pb-3">
                  <p className="text-xs font-medium text-foreground">{isFailed ? '提现失败' : '提现成功'}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{transaction.time}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                  <div className="w-px h-8 bg-border" />
                </div>
                <div className="pb-3">
                  <p className="text-xs font-medium text-foreground">银行处理中</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{transaction.time}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
                </div>
                <div>
                  <p className="text-xs font-medium text-foreground">提现申请</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{transaction.time}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletDetailPage;
