import { cn } from '@/lib/utils';

type StatusType = 'success' | 'pending' | 'failed' | 'active' | 'inactive' | 'unfollowed' | 'followed' | 'converted' | 'abandoned' | 'upcoming' | 'ended' | 'processing';

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  success: { label: '成功', className: 'bg-success/15 text-success' },
  settled: { label: '已结算', className: 'bg-success/15 text-success' },
  pending: { label: '待结算', className: 'bg-muted text-muted-foreground' },
  failed: { label: '结算失败', className: 'bg-destructive/15 text-destructive' },
  active: { label: '活跃', className: 'bg-success/15 text-success' },
  inactive: { label: '离职', className: 'bg-muted text-muted-foreground' },
  unfollowed: { label: '未跟进', className: 'bg-destructive/15 text-destructive' },
  followed: { label: '已跟进', className: 'bg-info/15 text-info' },
  converted: { label: '已转化', className: 'bg-success/15 text-success' },
  abandoned: { label: '已放弃', className: 'bg-muted text-muted-foreground' },
  upcoming: { label: '未开始', className: 'bg-info/15 text-info' },
  ended: { label: '已结束', className: 'bg-muted text-muted-foreground' },
  processing: { label: '处理中', className: 'bg-warning/15 text-warning' },
} as Record<string, { label: string; className: string }>;

interface StatusBadgeProps {
  status: StatusType | 'settled';
  label?: string;
}

const StatusBadge = ({ status, label }: StatusBadgeProps) => {
  const config = statusConfig[status] || { label: status, className: 'bg-muted text-muted-foreground' };
  return (
    <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium', config.className)}>
      {label || config.label}
    </span>
  );
};

export default StatusBadge;
