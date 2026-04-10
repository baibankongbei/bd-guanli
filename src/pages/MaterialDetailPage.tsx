import { useParams } from 'react-router-dom';
import { Share2, Download, Eye, Clock, Users } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';

const materials = [
  { id: 1, title: '新商户入驻推广海报', desc: '适用于地推和线上分享，突出费率优势和入驻流程简便', tag: '热门', uses: '2.3k', category: '推广海报', updateTime: '2024-03-25', detail: '这套推广海报包含3个尺寸版本（手机海报、朋友圈九宫格、A4打印版），主打"0元入驻、当天开通"的核心卖点。设计风格简洁大气，配色采用品牌蓝+活力橙，视觉冲击力强。海报底部预留二维码区域，可自动生成您的专属推广码，商户扫码即可开始入驻流程。适用场景：地推扫街、商圈驻点、线上朋友圈分享、微信群推广。' },
  { id: 2, title: '商户收益对比图', desc: '展示合作前后收益变化，数据可视化说服力强', tag: '推荐', uses: '1.8k', category: '数据图表', updateTime: '2024-03-24', detail: '基于真实合作商户数据制作的收益对比信息图，直观展示商户接入平台后在客流量、客单价、复购率等关键指标上的提升。包含柱状图、折线图和数据卡片三种展示形式，可根据实际情况调整数据。特别适合面对有数据分析意识的中大型商户，用数据说话更有说服力。' },
  { id: 3, title: '节日营销活动模板', desc: '春节/中秋等节日活动方案，可直接套用', tag: '新品', uses: '960', category: '活动方案', updateTime: '2024-03-23', detail: '涵盖全年12个重要节日/节气的营销活动方案模板，每个方案包含：活动主题、活动时间、优惠力度建议、宣传物料、执行步骤和预期效果评估。商户可直接套用或根据自身情况调整。帮助商户提升节日期间的营业额，同时增强商户对平台的粘性和依赖度。' },
  { id: 4, title: '商户成功案例集', desc: '精选10个合作商户的真实案例，增强信任感', tag: '推荐', uses: '1.5k', category: '案例分享', updateTime: '2024-03-22', detail: '精选10个不同行业、不同规模的合作商户成功案例，每个案例包含：商户基本情况、合作前痛点、解决方案、合作后数据变化和商户评价。覆盖餐饮、零售、服务、教育等主要行业，针对不同类型的潜在商户可选择对应行业的案例进行展示。真实数据+商户背书，大幅提升签约转化率。' },
  { id: 5, title: '费率方案对比表', desc: '与竞品费率对比，突出性价比优势', tag: '热门', uses: '2.1k', category: '数据图表', updateTime: '2024-03-21', detail: '将我们的费率方案与市场上主要竞品进行全方位对比，包括：基础费率、封顶费率、结算周期、到账时间、技术服务费等维度。以表格+图表形式清晰呈现，一目了然。特别标注我们的优势项，帮助BD快速打消商户对费率的疑虑。' },
  { id: 6, title: '地推话术指南', desc: '包含20个常见场景的应对话术和技巧', tag: '实用', uses: '3.2k', category: '培训资料', updateTime: '2024-03-20', detail: '由资深BD团队总结的实战话术指南，覆盖20个常见拓客场景：初次上门、电话邀约、费率谈判、竞品对比、异议处理、促成签约等。每个场景提供3-5种话术变体，配合应对策略和注意事项。新人BD可快速上手，老BD也能从中获得新的灵感。' },
  { id: 7, title: '商户入驻操作手册', desc: '图文并茂的入驻操作步骤，可发给商户参考', tag: '基础', uses: '4.1k', category: '操作手册', updateTime: '2024-03-19', detail: '面向商户的入驻操作指南，采用图文步骤式排版，每一步都配有手机截图和文字说明。内容包括：注册账户、提交资料、等待审核、激活设备、首笔交易测试、常见问题解答。可直接转发给商户，减少BD的指导时间，提升入驻效率。' },
  { id: 8, title: '朋友圈营销文案合集', desc: '30条精选朋友圈文案，配图建议', tag: '新品', uses: '680', category: '营销文案', updateTime: '2024-03-18', detail: '30条经过优化的朋友圈营销文案，涵盖：新商户入驻捷报、业绩里程碑分享、行业动态解读、平台优势介绍、限时优惠活动等5大类别。每条文案都附有配图建议和最佳发布时间，帮助BD打造专业的个人品牌形象，通过社交传播吸引更多潜在商户。' },
];

const MaterialDetailPage = () => {
  const { id } = useParams();
  const material = materials.find(m => m.id === Number(id));

  if (!material) {
    return (
      <div className="min-h-screen bg-background">
        <PageHeader title="素材详情" />
        <div className="flex items-center justify-center py-20">
          <p className="text-muted-foreground text-sm">素材不存在</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title="素材详情" />

      <div className="px-4 py-4 space-y-4">
        {/* Preview */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="w-full h-48 bg-muted flex items-center justify-center">
            <Share2 className="w-12 h-12 text-muted-foreground/40" />
          </div>
        </div>

        {/* Info */}
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs px-2.5 py-1 bg-primary/10 text-primary rounded-md font-medium">{material.tag}</span>
            <span className="text-xs px-2.5 py-1 bg-muted text-muted-foreground rounded-md">{material.category}</span>
          </div>
          <h2 className="text-base font-semibold text-card-foreground">{material.title}</h2>
          <p className="text-sm text-muted-foreground mt-2">{material.desc}</p>

          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              <span>更新于 {material.updateTime}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Users className="w-3.5 h-3.5" />
              <span>{material.uses} 次使用</span>
            </div>
          </div>
        </div>

        {/* Detail */}
        <div className="bg-card rounded-xl border border-border p-4">
          <p className="text-sm font-medium text-card-foreground mb-2">素材说明</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{material.detail}</p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 flex gap-3 z-50">
        <Button variant="outline" className="flex-1 gap-2">
          <Eye className="w-4 h-4" />
          预览
        </Button>
        <Button className="flex-1 gap-2">
          <Download className="w-4 h-4" />
          使用素材
        </Button>
      </div>
    </div>
  );
};

export default MaterialDetailPage;
