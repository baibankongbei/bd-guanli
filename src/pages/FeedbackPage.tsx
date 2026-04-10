import { useState } from 'react';
import { Camera, MessageSquare } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { toast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const categories = ['功能建议', '问题反馈', '体验优化', '其他'];

const historyFeedback = [
  { id: 1, category: '功能建议', content: '希望能增加团队数据对比功能，方便查看各成员业绩排名', date: '2024-03-15', status: '已回复', reply: '感谢您的建议！此功能已列入开发计划，预计下个版本上线。' },
  { id: 2, category: '问题反馈', content: '提现到账时间较慢，希望能加快处理速度', date: '2024-03-08', status: '处理中', reply: '我们正在优化结算流程，预计本月完成升级。' },
  { id: 3, category: '体验优化', content: '首页数据加载有时较慢', date: '2024-02-20', status: '已解决', reply: '已在v1.0.1版本中优化数据加载性能，请更新体验。' },
];

const FeedbackPage = () => {
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [selectedFeedback, setSelectedFeedback] = useState<typeof historyFeedback[0] | null>(null);

  const handleSubmit = () => {
    if (!category || !content.trim()) {
      toast({ title: '请完善信息', description: '请选择分类并填写反馈内容', variant: 'destructive' });
      return;
    }
    toast({ title: '提交成功', description: '感谢您的反馈，我们会尽快处理' });
    setCategory('');
    setContent('');
    setImages([]);
  };

  const handleAddImage = () => {
    if (images.length >= 3) {
      toast({ title: '最多上传3张图片', variant: 'destructive' });
      return;
    }
    setImages(prev => [...prev, `img_${prev.length + 1}`]);
    toast({ title: '图片已添加' });
  };

  const statusColor: Record<string, string> = {
    '已回复': 'text-success bg-success/10',
    '处理中': 'text-warning bg-warning/10',
    '已解决': 'text-primary bg-primary/10',
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="意见反馈" />
      <div className="px-4 pt-4">
        <p className="text-sm font-medium text-foreground mb-3">反馈类型</p>
        <div className="flex flex-wrap gap-2 mb-5">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${category === c ? 'bg-primary text-primary-foreground' : 'bg-card border border-border text-foreground'}`}
            >
              {c}
            </button>
          ))}
        </div>

        <p className="text-sm font-medium text-foreground mb-3">反馈内容</p>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="请详细描述您的问题或建议..."
          className="w-full h-36 bg-card border border-border rounded-xl p-3.5 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <p className="text-[11px] text-muted-foreground mt-1 text-right">{content.length}/500</p>

        {/* Image upload */}
        <p className="text-sm font-medium text-foreground mb-3 mt-2">附件图片（选填）</p>
        <div className="flex gap-2 mb-4">
          {images.map((img, i) => (
            <div key={i} className="w-16 h-16 rounded-lg bg-muted border border-border flex items-center justify-center">
              <Camera className="w-4 h-4 text-muted-foreground" />
            </div>
          ))}
          {images.length < 3 && (
            <button onClick={handleAddImage} className="w-16 h-16 rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center gap-0.5 active:bg-muted/50">
              <Camera className="w-4 h-4 text-muted-foreground" />
              <span className="text-[9px] text-muted-foreground">{images.length}/3</span>
            </button>
          )}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full mt-2 h-11 rounded-xl bg-primary text-primary-foreground text-sm font-medium active:opacity-90 transition-opacity"
        >
          提交反馈
        </button>

        {/* History */}
        <p className="text-sm font-medium text-foreground mt-6 mb-3">历史反馈</p>
        <div className="bg-card rounded-xl border border-border overflow-hidden mb-6">
          {historyFeedback.map((f, i) => (
            <div
              key={f.id}
              onClick={() => setSelectedFeedback(f)}
              className={`px-4 py-3.5 cursor-pointer active:bg-muted/30 transition-colors ${i !== historyFeedback.length - 1 ? 'border-b border-border' : ''}`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-sm text-foreground">{f.category}</span>
                </div>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${statusColor[f.status]}`}>{f.status}</span>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-1">{f.content}</p>
              <p className="text-[10px] text-muted-foreground/60 mt-1">{f.date}</p>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedFeedback} onOpenChange={open => !open && setSelectedFeedback(null)}>
        <DialogContent className="max-w-[380px] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-base">反馈详情</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">{selectedFeedback?.date} · {selectedFeedback?.category}</DialogDescription>
          </DialogHeader>
          {selectedFeedback && (
            <div className="space-y-4 -mt-1">
              <div>
                <p className="text-xs text-muted-foreground mb-1">反馈内容</p>
                <p className="text-sm text-foreground bg-muted/50 rounded-lg p-3">{selectedFeedback.content}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-xs text-muted-foreground">官方回复</p>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${statusColor[selectedFeedback.status]}`}>{selectedFeedback.status}</span>
                </div>
                <p className="text-sm text-foreground bg-primary/5 rounded-lg p-3 border border-primary/10">{selectedFeedback.reply}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FeedbackPage;
