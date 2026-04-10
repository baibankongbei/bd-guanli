interface StatCardProps {
  label: string;
  value: string;
  highlight?: boolean;
}

const StatCard = ({ label, value, highlight }: StatCardProps) => (
  <div className="flex-1 min-w-0">
    <p className="text-xs text-primary-foreground/70 mb-1 truncate">{label}</p>
    <p className={`font-bold truncate ${highlight ? 'text-lg' : 'text-sm'}`}>{value}</p>
  </div>
);

export default StatCard;
