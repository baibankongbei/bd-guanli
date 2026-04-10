import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDownLeft, ArrowUpRight, Banknote, CreditCard, ChevronRight, RefreshCw, XCircle } from 'lucide-react';
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

const tabs = [
  { key: 'all' as const, label: '全部' },
  { key: 'income' as const, label: '收入明细' },
  { key: 'withdraw' as const, label: '提现明细' },
  { key: 'expense' as const, label: '支出明细' },
];

const getIcon = (type: string, status?: string) => {
  if (type === 'withdraw' && status === '提现失败') return <XCircle className="w-4 h-4 text-destructive" />;
  if (type === 'withdraw') return <ArrowUpRight className="w-4 h-4 text-primary" />;
  if (type === 'expense') return <RefreshCw className="w-4 h-4 text-destructive" />;
  return <ArrowDownLeft className="w-4 h-4 text-success" />;
};

const getIconBg = (type: string, status?: string) => {
  if (type === 'withdraw' && status === '提现失败') return 'bg-destructive/10';
  if (type === 'withdraw') return 'bg-primary/10';
  if (type === 'expense') return 'bg-destructive/10';
  return 'bg-success/10';
};

const WalletPage = () => {
  const [tab, setTab] = useState<'all' | 'income' | 'withdraw' | 'expense'>('all');
  const navigate = useNavigate();

  const filtered = tab === 'all' ? transactions : transactions.filter(t => t.type === tab);

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="我的钱包" />

      {/* Balance card */}
      <div className="bg-primary px-5 pt-6 pb-8 relative overflow-hidden">
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-primary-foreground/5" />
        <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-primary-foreground/5" />
        <p className="text-xs text-primary-foreground/60">总额金额 (元)</p>
        <p className="text-3xl font-bold text-primary-foreground mt-1">¥12,580.00</p>
        <div className="flex items-center gap-6 mt-4">
          <div>
            <p className="text-[11px] text-primary-foreground/50">可提现金额</p>
            <p className="text-sm font-semibold text-primary-foreground mt-0.5">¥10,580.00</p>
          </div>
          <div className="w-px h-8 bg-primary-foreground/10" />
          <div>
            <p className="text-[11px] text-primary-foreground/50">待结算金额</p>
            <p className="text-sm font-semibold text-primary-foreground mt-0.5">¥2,000.00</p>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="px-4 -mt-4 relative z-10 flex gap-3">
        <button
          onClick={() => navigate('/wallet/withdraw')}
          className="flex-1 h-11 bg-card rounded-xl shadow-sm border border-border flex items-center justify-center gap-2 text-sm font-medium text-foreground active:bg-muted/50 transition-colors"
        >
          <Banknote className="w-4 h-4 text-success" />
          提现
        </button>
        <button
          onClick={() => navigate('/profile/bank-cards')}
          className="flex-1 h-11 bg-card rounded-xl shadow-sm border border-border flex items-center justify-center gap-2 text-sm font-medium text-foreground active:bg-muted/50 transition-colors"
        >
          <CreditCard className="w-4 h-4 text-primary" />
          银行卡管理
        </button>
      </div>

      {/* Date header */}
      <div className="px-5 pt-5 pb-1">
        <p className="text-xs text-muted-foreground">2024年7月~</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 px-4 pb-2">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
              tab === t.key
                ? 'bg-primary text-primary-foreground font-medium'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Transaction list */}
      <div className="px-4 pb-6">
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          {filtered.length === 0 && (
            <div className="py-12 text-center text-sm text-muted-foreground">暂无记录</div>
          )}
          {filtered.map((t, i) => (
            <div
              key={t.id}
              onClick={() => navigate(`/wallet/detail/${t.id}`)}
              className={`flex items-center gap-3 px-4 py-3.5 cursor-pointer active:bg-muted/30 transition-colors ${
                i !== filtered.length - 1 ? 'border-b border-border' : ''
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${getIconBg(t.type, t.status)}`}>
                {getIcon(t.type, t.status)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground truncate">{t.title}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{t.time}</p>
              </div>
              <div className="text-right shrink-0">
                <p className={`text-sm font-medium ${
                  t.type === 'income' ? 'text-success' : t.status === '提现失败' ? 'text-destructive' : 'text-foreground'
                }`}>
                  {t.amount}
                </p>
                <p className="text-[10px] text-muted-foreground">余额 {t.balance}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground/50 shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
