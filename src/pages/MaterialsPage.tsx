import { useNavigate } from 'react-router-dom';
import { Share2, Download, Eye, ChevronRight } from 'lucide-react';
import PageHeader from '@/components/PageHeader';

const materials = [
  { id: 1, title: '新商户入驻推广海报', desc: '适用于地推和线上分享，突出费率优势和入驻流程简便', tag: '热门', uses: '2.3k', category: '推广海报' },
  { id: 2, title: '商户收益对比图', desc: '展示合作前后收益变化，数据可视化说服力强', tag: '推荐', uses: '1.8k', category: '数据图表' },
  { id: 3, title: '节日营销活动模板', desc: '春节/中秋等节日活动方案，可直接套用', tag: '新品', uses: '960', category: '活动方案' },
  { id: 4, title: '商户成功案例集', desc: '精选10个合作商户的真实案例，增强信任感', tag: '推荐', uses: '1.5k', category: '案例分享' },
  { id: 5, title: '费率方案对比表', desc: '与竞品费率对比，突出性价比优势', tag: '热门', uses: '2.1k', category: '数据图表' },
  { id: 6, title: '地推话术指南', desc: '包含20个常见场景的应对话术和技巧', tag: '实用', uses: '3.2k', category: '培训资料' },
  { id: 7, title: '商户入驻操作手册', desc: '图文并茂的入驻操作步骤，可发给商户参考', tag: '基础', uses: '4.1k', category: '操作手册' },
  { id: 8, title: '朋友圈营销文案合集', desc: '30条精选朋友圈文案，配图建议', tag: '新品', uses: '680', category: '营销文案' },
];

const MaterialsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="拓客素材" />

      <div className="px-4 py-3">
        <p className="text-sm text-muted-foreground mb-3">共 {materials.length} 套素材</p>
        <div className="space-y-3">
          {materials.map(m => (
            <button
              key={m.id}
              onClick={() => navigate(`/materials/${m.id}`)}
              className="w-full bg-card rounded-xl border border-border p-4 text-left active:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                  <Share2 className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-card-foreground">{m.title}</p>
                  <p className="text-xs text-muted-foreground mt-1 truncate">{m.desc}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[11px] px-2 py-0.5 bg-primary/10 text-primary rounded">{m.tag}</span>
                    <span className="text-[11px] text-muted-foreground">{m.uses} 次使用</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MaterialsPage;
