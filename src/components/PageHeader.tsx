import type { ReactNode } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PageHeaderProps {
  title: string;
  /** 右侧区域，如状态标签 */
  right?: ReactNode;
}

const PageHeader = ({ title, right }: PageHeaderProps) => {
  const navigate = useNavigate();
  return (
    <div className="sticky top-0 z-10 flex items-center h-12 px-4 bg-primary text-primary-foreground gap-2">
      <button type="button" onClick={() => navigate(-1)} className="p-1 -ml-1 shrink-0">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <h1 className="text-base font-semibold flex-1 min-w-0 truncate">{title}</h1>
      {right != null && <div className="shrink-0 max-w-[55%]">{right}</div>}
    </div>
  );
};

export default PageHeader;
