import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import { guides, faqs } from '@/data/mockData';
import { ChevronDown, ChevronRight, HelpCircle, BookOpen } from 'lucide-react';

const categories = ['商户进件指南', '收益提现指南', '团队管理指南', '系统使用常见问题'] as const;

const GuidePage = () => {
  const [activeGuide, setActiveGuide] = useState<string | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [tab, setTab] = useState<'guide' | 'faq'>('guide');

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="操作指南" />

      {/* Tabs */}
      <div className="flex px-4 pt-3 gap-2">
        <button onClick={() => setTab('guide')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${tab === 'guide' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
          <BookOpen className="w-4 h-4" /> 操作指南
        </button>
        <button onClick={() => setTab('faq')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${tab === 'faq' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
          <HelpCircle className="w-4 h-4" /> 常见问题
        </button>
      </div>

      <div className="px-4 mt-4 pb-6">
        {tab === 'guide' && (
          <div className="space-y-2">
            {guides.map(g => (
              <div key={g.id} className="bg-card rounded-xl border border-border overflow-hidden">
                <button onClick={() => setActiveGuide(activeGuide === g.id ? null : g.id)}
                  className="w-full flex items-center justify-between px-4 py-3.5 text-left">
                  <span className="text-sm font-medium text-card-foreground">{g.title}</span>
                  {activeGuide === g.id ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                </button>
                {activeGuide === g.id && (
                  <div className="px-4 pb-4 space-y-2">
                    {g.steps.map((s, i) => (
                      <div key={i} className="flex gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                          {i + 1}
                        </div>
                        <p className="text-sm text-muted-foreground">{s.replace(/^步骤\d+：/, '')}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === 'faq' && (
          <div className="space-y-2">
            {faqs.map((f, i) => (
              <div key={i} className="bg-card rounded-xl border border-border overflow-hidden">
                <button onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-4 py-3.5 text-left">
                  <span className="text-sm font-medium text-card-foreground">{f.q}</span>
                  {activeFaq === i ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                </button>
                {activeFaq === i && (
                  <div className="px-4 pb-4">
                    <p className="text-sm text-muted-foreground">{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GuidePage;
