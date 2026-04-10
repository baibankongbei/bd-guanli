import { useState } from 'react';
import { CreditCard, Plus, Check, Camera, MoreVertical, Pencil, Trash2 } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from '@/hooks/use-toast';

interface BankCard {
  id: number;
  bank: string;
  type: string;
  tail: string;
  shortName: string;
  color: string;
  branch: string;
  address: string;
  name: string;
  phone: string;
}

const initialCards: BankCard[] = [
  { id: 1, bank: '中国工商银行', type: '储蓄卡', tail: '6218', shortName: '工商', color: 'from-red-500 to-red-600', branch: '杭州西湖支行', address: '浙江省杭州市', name: '李泽峰', phone: '138****8888' },
  { id: 2, bank: '招商银行', type: '储蓄卡', tail: '3589', shortName: '招商', color: 'from-red-400 to-orange-500', branch: '杭州城西支行', address: '浙江省杭州市', name: '李泽峰', phone: '138****8888' },
];

const BankCardsPage = () => {
  const [cards, setCards] = useState<BankCard[]>(initialCards);
  const [selectedId, setSelectedId] = useState(1);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [editingCard, setEditingCard] = useState<BankCard | null>(null);
  const [deletingCard, setDeletingCard] = useState<BankCard | null>(null);
  const [form, setForm] = useState({
    cardNumber: '', bankName: '', branch: '', address: '', name: '', phone: '', code: ''
  });
  const [editForm, setEditForm] = useState({
    bank: '', branch: '', address: '', name: '', phone: ''
  });
  const [countdown, setCountdown] = useState(0);
  const [nextId, setNextId] = useState(3);

  const handleSendCode = () => {
    if (countdown > 0) return;
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) { clearInterval(timer); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  const handleAdd = () => {
    if (!form.cardNumber || !form.bankName || !form.name) {
      toast({ title: '请完善信息', description: '请填写必要的银行卡信息', variant: 'destructive' });
      return;
    }
    const newCard: BankCard = {
      id: nextId,
      bank: form.bankName,
      type: '储蓄卡',
      tail: form.cardNumber.slice(-4),
      shortName: form.bankName.slice(0, 2),
      color: 'from-blue-500 to-blue-600',
      branch: form.branch,
      address: form.address,
      name: form.name,
      phone: form.phone,
    };
    setCards(prev => [...prev, newCard]);
    setNextId(prev => prev + 1);
    setShowAdd(false);
    setForm({ cardNumber: '', bankName: '', branch: '', address: '', name: '', phone: '', code: '' });
    toast({ title: '添加成功', description: '银行卡已成功添加' });
  };

  const openEdit = (card: BankCard) => {
    setEditingCard(card);
    setEditForm({ bank: card.bank, branch: card.branch, address: card.address, name: card.name, phone: card.phone });
    setShowEdit(true);
  };

  const handleEdit = () => {
    if (!editingCard) return;
    setCards(prev => prev.map(c => c.id === editingCard.id ? { ...c, bank: editForm.bank, branch: editForm.branch, address: editForm.address, name: editForm.name, phone: editForm.phone } : c));
    setShowEdit(false);
    setEditingCard(null);
    toast({ title: '修改成功', description: '银行卡信息已更新' });
  };

  const openDelete = (card: BankCard) => {
    setDeletingCard(card);
    setShowDelete(true);
  };

  const handleDelete = () => {
    if (!deletingCard) return;
    setCards(prev => prev.filter(c => c.id !== deletingCard.id));
    if (selectedId === deletingCard.id) {
      setSelectedId(cards.find(c => c.id !== deletingCard.id)?.id || 0);
    }
    setShowDelete(false);
    setDeletingCard(null);
    toast({ title: '删除成功', description: '银行卡已移除' });
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="我的银行卡" />

      {/* Card list */}
      <div className="px-4 pt-4 space-y-3">
        {cards.map(c => (
          <div
            key={c.id}
            onClick={() => setSelectedId(c.id)}
            className={`rounded-xl p-4 bg-gradient-to-r ${c.color} relative overflow-hidden cursor-pointer transition-all ${
              selectedId === c.id ? 'ring-2 ring-primary ring-offset-2' : ''
            }`}
          >
            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-white/5" />
            <div className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full bg-white/5" />
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-white/80" />
                <span className="text-sm font-medium text-white">{c.bank}</span>
              </div>
              <div className="flex items-center gap-1">
                {selectedId === c.id && (
                  <div className="w-5 h-5 rounded-full bg-white/30 flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={e => e.stopPropagation()}>
                    <button className="w-6 h-6 rounded-full flex items-center justify-center bg-white/10 active:bg-white/20">
                      <MoreVertical className="w-3.5 h-3.5 text-white" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={(e) => { e.stopPropagation(); openEdit(c); }}>
                      <Pencil className="w-4 h-4 mr-2" />编辑
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => { e.stopPropagation(); openDelete(c); }} className="text-destructive focus:text-destructive">
                      <Trash2 className="w-4 h-4 mr-2" />删除
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <p className="text-[11px] text-white/50">{c.type}</p>
            <p className="text-lg font-bold text-white tracking-[4px] mt-1">**** **** **** {c.tail}</p>
          </div>
        ))}

        {/* Add card button */}
        <button
          onClick={() => setShowAdd(true)}
          className="w-full bg-card rounded-xl border-2 border-dashed border-border py-5 flex flex-col items-center gap-2 active:bg-muted/50 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            <Plus className="w-5 h-5 text-muted-foreground" />
          </div>
          <span className="text-sm text-muted-foreground">添加提现银行卡</span>
        </button>
      </div>

      {/* Add card dialog */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="max-w-[380px] rounded-2xl p-0 max-h-[90vh] overflow-y-auto">
          <DialogHeader className="bg-primary px-5 py-4">
            <DialogTitle className="text-primary-foreground text-base">添加银行卡</DialogTitle>
            <DialogDescription className="text-primary-foreground/60 text-xs">请填写银行卡信息完成绑定</DialogDescription>
          </DialogHeader>
          <div className="p-5 space-y-4">
            <div className="aspect-[1.6] rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center gap-1.5 bg-muted/30 cursor-pointer active:bg-muted/50">
              <Camera className="w-5 h-5 text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground">银行卡正面</span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">银行卡号</label>
                <Input value={form.cardNumber} onChange={e => setForm({ ...form, cardNumber: e.target.value })} placeholder="请输入银行卡号" className="h-10" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">银行名称</label>
                <Input value={form.bankName} onChange={e => setForm({ ...form, bankName: e.target.value })} placeholder="自动识别或手动输入" className="h-10" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">开户行</label>
                <Input value={form.branch} onChange={e => setForm({ ...form, branch: e.target.value })} placeholder="请输入开户行名称" className="h-10" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">开户地址</label>
                <Input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} placeholder="请输入开户地址" className="h-10" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">户名</label>
                <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="请输入持卡人姓名" className="h-10" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">手机号</label>
                <Input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="请输入预留手机号" className="h-10" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">验证码</label>
                <div className="flex gap-2">
                  <Input value={form.code} onChange={e => setForm({ ...form, code: e.target.value })} placeholder="请输入验证码" className="flex-1 h-10" maxLength={6} />
                  <Button variant="outline" onClick={handleSendCode} disabled={countdown > 0} className="shrink-0 h-10 text-xs w-24">
                    {countdown > 0 ? `${countdown}s` : '获取验证码'}
                  </Button>
                </div>
              </div>
            </div>

            <Button onClick={handleAdd} className="w-full h-11 rounded-xl">确认添加</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit card dialog */}
      <Dialog open={showEdit} onOpenChange={setShowEdit}>
        <DialogContent className="max-w-[380px] rounded-2xl p-0 max-h-[90vh] overflow-y-auto">
          <DialogHeader className="bg-primary px-5 py-4">
            <DialogTitle className="text-primary-foreground text-base">编辑银行卡</DialogTitle>
            <DialogDescription className="text-primary-foreground/60 text-xs">修改银行卡绑定信息</DialogDescription>
          </DialogHeader>
          <div className="p-5 space-y-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">银行名称</label>
              <Input value={editForm.bank} onChange={e => setEditForm({ ...editForm, bank: e.target.value })} className="h-10" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">开户行</label>
              <Input value={editForm.branch} onChange={e => setEditForm({ ...editForm, branch: e.target.value })} className="h-10" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">开户地址</label>
              <Input value={editForm.address} onChange={e => setEditForm({ ...editForm, address: e.target.value })} className="h-10" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">户名</label>
              <Input value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} className="h-10" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">预留手机号</label>
              <Input value={editForm.phone} onChange={e => setEditForm({ ...editForm, phone: e.target.value })} className="h-10" />
            </div>
            <Button onClick={handleEdit} className="w-full h-11 rounded-xl mt-2">保存修改</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation dialog */}
      <Dialog open={showDelete} onOpenChange={setShowDelete}>
        <DialogContent className="max-w-[320px] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-base">确认删除</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              确定要删除 {deletingCard?.bank}（尾号{deletingCard?.tail}）吗？删除后不可恢复。
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 mt-2">
            <Button variant="outline" onClick={() => setShowDelete(false)} className="flex-1 h-10 rounded-xl">取消</Button>
            <Button variant="destructive" onClick={handleDelete} className="flex-1 h-10 rounded-xl">确认删除</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BankCardsPage;
