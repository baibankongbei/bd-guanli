// 收益明细数据
export const revenueOverview = {
  todayRevenue: 2350.00,
  monthlyRevenue: 48600.00,
  pendingSettlement: 12400.00,
  withdrawable: 36200.00,
};

export const revenueList = [
  { id: 1, date: '2024-03-26', merchant: '某某某餐饮店', amount: 15000.00, ratio: '1.5%', profit: 225.00, status: 'settled' as const, settleTime: '2024-03-27 09:00', newUsers: 100, orders: 100, volume: 100.00 },
  { id: 2, date: '2024-03-26', merchant: '好味来火锅店', amount: 22000.00, ratio: '1.2%', profit: 264.00, status: 'settled' as const, settleTime: '2024-03-27 09:00', newUsers: 85, orders: 120, volume: 220.00 },
  { id: 3, date: '2024-03-25', merchant: '鲜果时光水果店', amount: 8500.00, ratio: '1.5%', profit: 127.50, status: 'pending' as const, settleTime: '', newUsers: 45, orders: 60, volume: 85.00 },
  { id: 4, date: '2024-03-25', merchant: '优品便利超市', amount: 31000.00, ratio: '1.0%', profit: 310.00, status: 'settled' as const, settleTime: '2024-03-26 10:30', newUsers: 120, orders: 200, volume: 310.00 },
  { id: 5, date: '2024-03-24', merchant: '星辰咖啡馆', amount: 12000.00, ratio: '1.5%', profit: 180.00, status: 'failed' as const, settleTime: '', newUsers: 30, orders: 80, volume: 120.00 },
  { id: 6, date: '2024-03-24', merchant: '美甲美睫工作室', amount: 6800.00, ratio: '2.0%', profit: 136.00, status: 'settled' as const, settleTime: '2024-03-25 09:00', newUsers: 25, orders: 40, volume: 68.00 },
  { id: 7, date: '2024-03-23', merchant: '老北京涮肉馆', amount: 45000.00, ratio: '1.2%', profit: 540.00, status: 'pending' as const, settleTime: '', newUsers: 150, orders: 300, volume: 450.00 },
  { id: 8, date: '2024-03-23', merchant: '乐购生活超市', amount: 18500.00, ratio: '1.0%', profit: 185.00, status: 'settled' as const, settleTime: '2024-03-24 09:00', newUsers: 60, orders: 90, volume: 185.00 },
];

// 门店列表
export const storeList = [
  { id: 'all', name: '默认全部' },
  { id: '1', name: '某某某餐饮店' },
  { id: '2', name: '好味来火锅店' },
  { id: '3', name: '鲜果时光水果店' },
  { id: '4', name: '优品便利超市' },
];

export const withdrawRecords = [
  { id: 1, applyTime: '2024-03-20 14:30', amount: 5000.00, status: 'success' as const, arriveTime: '2024-03-21 10:00', bank: '招商银行 **** 6789' },
  { id: 2, applyTime: '2024-03-15 09:00', amount: 8000.00, status: 'success' as const, arriveTime: '2024-03-16 10:00', bank: '招商银行 **** 6789' },
  { id: 3, applyTime: '2024-03-10 16:20', amount: 3000.00, status: 'processing' as const, arriveTime: '', bank: '工商银行 **** 1234' },
];

// 团队管理数据
export const teamOverview = {
  directMembers: 15,
  indirectMembers: 42,
  monthlyTeamRevenue: 86400.00,
  monthlyNewMerchants: 28,
};

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  status: 'active' | 'inactive';
  phone: string;
  joinDate: string;
  monthlyMerchants: number;
  monthlyRevenue: number;
  performance: MemberPerformance;
}

export interface MemberPerformance {
  // 本月
  currentMonth: PeriodData;
  // 上月
  lastMonth: PeriodData;
  // 本季度
  currentQuarter: PeriodData;
  // 近6个月趋势
  monthlyTrend: { month: string; merchants: number; revenue: number; transactions: number }[];
}

export interface PeriodData {
  merchants: number;
  revenue: number;
  transactions: number;
  transactionAmount: number;
  avgDealCycle: number; // 天
  conversionRate: number; // %
  activeRate: number; // %
  customerVisits: number;
  leadCount: number;
}

export const teamMembers: TeamMember[] = [
  {
    id: 1, name: '王强', role: 'BD专员', status: 'active', phone: '138****1234', joinDate: '2023-06-15',
    monthlyMerchants: 5, monthlyRevenue: 3200.00,
    performance: {
      currentMonth: { merchants: 5, revenue: 3200, transactions: 120, transactionAmount: 85000, avgDealCycle: 5.2, conversionRate: 45, activeRate: 88, customerVisits: 32, leadCount: 11 },
      lastMonth: { merchants: 4, revenue: 2800, transactions: 98, transactionAmount: 72000, avgDealCycle: 6.1, conversionRate: 40, activeRate: 85, customerVisits: 28, leadCount: 10 },
      currentQuarter: { merchants: 14, revenue: 9200, transactions: 340, transactionAmount: 245000, avgDealCycle: 5.5, conversionRate: 42, activeRate: 86, customerVisits: 88, leadCount: 33 },
      monthlyTrend: [
        { month: '2023-10', merchants: 3, revenue: 2100, transactions: 80 },
        { month: '2023-11', merchants: 4, revenue: 2600, transactions: 95 },
        { month: '2023-12', merchants: 3, revenue: 2400, transactions: 88 },
        { month: '2024-01', merchants: 5, revenue: 3100, transactions: 110 },
        { month: '2024-02', merchants: 4, revenue: 2800, transactions: 98 },
        { month: '2024-03', merchants: 5, revenue: 3200, transactions: 120 },
      ],
    },
  },
  {
    id: 2, name: '李明', role: 'BD专员', status: 'active', phone: '139****5678', joinDate: '2023-08-01',
    monthlyMerchants: 8, monthlyRevenue: 5600.00,
    performance: {
      currentMonth: { merchants: 8, revenue: 5600, transactions: 210, transactionAmount: 156000, avgDealCycle: 3.8, conversionRate: 58, activeRate: 92, customerVisits: 45, leadCount: 14 },
      lastMonth: { merchants: 6, revenue: 4200, transactions: 180, transactionAmount: 128000, avgDealCycle: 4.2, conversionRate: 52, activeRate: 90, customerVisits: 38, leadCount: 12 },
      currentQuarter: { merchants: 20, revenue: 14800, transactions: 580, transactionAmount: 420000, avgDealCycle: 4.0, conversionRate: 55, activeRate: 91, customerVisits: 120, leadCount: 36 },
      monthlyTrend: [
        { month: '2023-10', merchants: 5, revenue: 3500, transactions: 140 },
        { month: '2023-11', merchants: 6, revenue: 4000, transactions: 160 },
        { month: '2023-12', merchants: 7, revenue: 4800, transactions: 185 },
        { month: '2024-01', merchants: 6, revenue: 4200, transactions: 170 },
        { month: '2024-02', merchants: 6, revenue: 4200, transactions: 180 },
        { month: '2024-03', merchants: 8, revenue: 5600, transactions: 210 },
      ],
    },
  },
  {
    id: 3, name: '张芳', role: '区域经理', status: 'active', phone: '136****9012', joinDate: '2023-03-10',
    monthlyMerchants: 3, monthlyRevenue: 8200.00,
    performance: {
      currentMonth: { merchants: 3, revenue: 8200, transactions: 350, transactionAmount: 280000, avgDealCycle: 7.5, conversionRate: 35, activeRate: 95, customerVisits: 18, leadCount: 9 },
      lastMonth: { merchants: 2, revenue: 7500, transactions: 320, transactionAmount: 256000, avgDealCycle: 8.0, conversionRate: 30, activeRate: 94, customerVisits: 15, leadCount: 7 },
      currentQuarter: { merchants: 8, revenue: 23500, transactions: 980, transactionAmount: 790000, avgDealCycle: 7.8, conversionRate: 32, activeRate: 95, customerVisits: 48, leadCount: 25 },
      monthlyTrend: [
        { month: '2023-10', merchants: 2, revenue: 6500, transactions: 280 },
        { month: '2023-11', merchants: 3, revenue: 7200, transactions: 310 },
        { month: '2023-12', merchants: 2, revenue: 6800, transactions: 295 },
        { month: '2024-01', merchants: 3, revenue: 7800, transactions: 330 },
        { month: '2024-02', merchants: 2, revenue: 7500, transactions: 320 },
        { month: '2024-03', merchants: 3, revenue: 8200, transactions: 350 },
      ],
    },
  },
  {
    id: 4, name: '陈涛', role: 'BD专员', status: 'inactive', phone: '137****3456', joinDate: '2023-09-20',
    monthlyMerchants: 0, monthlyRevenue: 0,
    performance: {
      currentMonth: { merchants: 0, revenue: 0, transactions: 0, transactionAmount: 0, avgDealCycle: 0, conversionRate: 0, activeRate: 0, customerVisits: 0, leadCount: 0 },
      lastMonth: { merchants: 3, revenue: 1800, transactions: 65, transactionAmount: 42000, avgDealCycle: 6.5, conversionRate: 35, activeRate: 78, customerVisits: 20, leadCount: 9 },
      currentQuarter: { merchants: 3, revenue: 1800, transactions: 65, transactionAmount: 42000, avgDealCycle: 6.5, conversionRate: 35, activeRate: 78, customerVisits: 20, leadCount: 9 },
      monthlyTrend: [
        { month: '2023-10', merchants: 2, revenue: 1200, transactions: 45 },
        { month: '2023-11', merchants: 3, revenue: 1500, transactions: 55 },
        { month: '2023-12', merchants: 2, revenue: 1400, transactions: 50 },
        { month: '2024-01', merchants: 3, revenue: 1800, transactions: 65 },
        { month: '2024-02', merchants: 3, revenue: 1800, transactions: 65 },
        { month: '2024-03', merchants: 0, revenue: 0, transactions: 0 },
      ],
    },
  },
  {
    id: 5, name: '赵丽', role: 'BD专员', status: 'active', phone: '135****7890', joinDate: '2023-11-05',
    monthlyMerchants: 6, monthlyRevenue: 4100.00,
    performance: {
      currentMonth: { merchants: 6, revenue: 4100, transactions: 155, transactionAmount: 112000, avgDealCycle: 4.5, conversionRate: 50, activeRate: 90, customerVisits: 38, leadCount: 12 },
      lastMonth: { merchants: 5, revenue: 3600, transactions: 130, transactionAmount: 95000, avgDealCycle: 5.0, conversionRate: 46, activeRate: 88, customerVisits: 32, leadCount: 11 },
      currentQuarter: { merchants: 16, revenue: 11300, transactions: 425, transactionAmount: 305000, avgDealCycle: 4.8, conversionRate: 48, activeRate: 89, customerVisits: 100, leadCount: 33 },
      monthlyTrend: [
        { month: '2023-10', merchants: 0, revenue: 0, transactions: 0 },
        { month: '2023-11', merchants: 2, revenue: 1200, transactions: 40 },
        { month: '2023-12', merchants: 4, revenue: 2800, transactions: 100 },
        { month: '2024-01', merchants: 5, revenue: 3600, transactions: 125 },
        { month: '2024-02', merchants: 5, revenue: 3600, transactions: 130 },
        { month: '2024-03', merchants: 6, revenue: 4100, transactions: 155 },
      ],
    },
  },
  {
    id: 6, name: '周杰', role: '高级BD', status: 'active', phone: '133****2345', joinDate: '2023-04-18',
    monthlyMerchants: 4, monthlyRevenue: 6800.00,
    performance: {
      currentMonth: { merchants: 4, revenue: 6800, transactions: 280, transactionAmount: 210000, avgDealCycle: 6.0, conversionRate: 40, activeRate: 93, customerVisits: 22, leadCount: 10 },
      lastMonth: { merchants: 3, revenue: 5500, transactions: 240, transactionAmount: 185000, avgDealCycle: 6.5, conversionRate: 38, activeRate: 92, customerVisits: 20, leadCount: 8 },
      currentQuarter: { merchants: 11, revenue: 18800, transactions: 760, transactionAmount: 580000, avgDealCycle: 6.2, conversionRate: 39, activeRate: 93, customerVisits: 62, leadCount: 28 },
      monthlyTrend: [
        { month: '2023-10', merchants: 3, revenue: 4800, transactions: 200 },
        { month: '2023-11', merchants: 4, revenue: 5500, transactions: 230 },
        { month: '2023-12', merchants: 3, revenue: 5200, transactions: 220 },
        { month: '2024-01', merchants: 4, revenue: 6500, transactions: 260 },
        { month: '2024-02', merchants: 3, revenue: 5500, transactions: 240 },
        { month: '2024-03', merchants: 4, revenue: 6800, transactions: 280 },
      ],
    },
  },
  {
    id: 7, name: '吴敏', role: 'BD专员', status: 'active', phone: '131****6789', joinDate: '2024-01-10',
    monthlyMerchants: 2, monthlyRevenue: 1500.00,
    performance: {
      currentMonth: { merchants: 2, revenue: 1500, transactions: 48, transactionAmount: 32000, avgDealCycle: 8.0, conversionRate: 28, activeRate: 80, customerVisits: 25, leadCount: 7 },
      lastMonth: { merchants: 1, revenue: 800, transactions: 30, transactionAmount: 20000, avgDealCycle: 9.5, conversionRate: 20, activeRate: 75, customerVisits: 18, leadCount: 5 },
      currentQuarter: { merchants: 5, revenue: 3500, transactions: 108, transactionAmount: 72000, avgDealCycle: 8.5, conversionRate: 25, activeRate: 78, customerVisits: 58, leadCount: 20 },
      monthlyTrend: [
        { month: '2023-10', merchants: 0, revenue: 0, transactions: 0 },
        { month: '2023-11', merchants: 0, revenue: 0, transactions: 0 },
        { month: '2023-12', merchants: 0, revenue: 0, transactions: 0 },
        { month: '2024-01', merchants: 2, revenue: 1200, transactions: 30 },
        { month: '2024-02', merchants: 1, revenue: 800, transactions: 30 },
        { month: '2024-03', merchants: 2, revenue: 1500, transactions: 48 },
      ],
    },
  },
];

// 团队业绩报表数据
export const teamReportData = {
  weekly: [
    { period: '第1周', merchants: 8, revenue: 12500, transactions: 380, transactionAmount: 285000 },
    { period: '第2周', merchants: 12, revenue: 18200, transactions: 520, transactionAmount: 410000 },
    { period: '第3周', merchants: 15, revenue: 22800, transactions: 680, transactionAmount: 530000 },
    { period: '第4周', merchants: 15, revenue: 32900, transactions: 820, transactionAmount: 650000 },
  ],
  monthly: [
    { period: '2023-10', merchants: 18, revenue: 23600, transactions: 850, transactionAmount: 680000 },
    { period: '2023-11', merchants: 24, revenue: 28300, transactions: 1020, transactionAmount: 820000 },
    { period: '2023-12', merchants: 21, revenue: 26600, transactions: 950, transactionAmount: 760000 },
    { period: '2024-01', merchants: 28, revenue: 34200, transactions: 1180, transactionAmount: 950000 },
    { period: '2024-02', merchants: 24, revenue: 29800, transactions: 1050, transactionAmount: 850000 },
    { period: '2024-03', merchants: 28, revenue: 86400, transactions: 1400, transactionAmount: 1120000 },
  ],
  quarterly: [
    { period: 'Q3 2023', merchants: 42, revenue: 52800, transactions: 1800, transactionAmount: 1450000 },
    { period: 'Q4 2023', merchants: 63, revenue: 78500, transactions: 2820, transactionAmount: 2260000 },
    { period: 'Q1 2024', merchants: 80, revenue: 150400, transactions: 3630, transactionAmount: 2920000 },
  ],
  memberRanking: [
    { name: '李明', merchants: 8, revenue: 5600, rank: 1 },
    { name: '周杰', merchants: 4, revenue: 6800, rank: 2 },
    { name: '赵丽', merchants: 6, revenue: 4100, rank: 3 },
    { name: '王强', merchants: 5, revenue: 3200, rank: 4 },
    { name: '张芳', merchants: 3, revenue: 8200, rank: 5 },
    { name: '吴敏', merchants: 2, revenue: 1500, rank: 6 },
  ],
  roleDistribution: [
    { name: 'BD专员', value: 5 },
    { name: '高级BD', value: 1 },
    { name: '区域经理', value: 1 },
  ],
};

/** 门店进件侧状态（资料展示） */
export type StoreOnboardingStatus = '待进件' | '进件中' | '进件成功';

/**
 * 审核阶段：BD 可操作仅 awaiting_bd。
 * BD 通过后 → awaiting_leader，列表/详情仍显示「审核中」，但 BD 的驳回/通过按钮置灰。
 */
export type StorePartnerDivision = '加盟店' | '合作店';

export type StoreReviewPhase = 'awaiting_bd' | 'awaiting_leader' | 'approved' | 'rejected';

export type StoreAuditDisplayStatus = '待审核' | '审核中' | '审核成功' | '审核失败';

/** 展示用标签列表（最多 3 个），兼容仅有 storeLabel 的旧数据 */
export function getStoreTagsDisplay(store: StoreAudit): string[] {
  const fromArr = (store.storeTags ?? []).map(t => t?.trim()).filter(t => t && t !== '—');
  if (fromArr.length) return fromArr.slice(0, 3);
  const one = store.storeLabel?.trim();
  if (one && one !== '—') return [one];
  return [];
}

export function getStoreAuditDisplayStatus(phase: StoreReviewPhase): StoreAuditDisplayStatus {
  switch (phase) {
    case 'approved':
      return '审核成功';
    case 'rejected':
      return '审核失败';
    case 'awaiting_leader':
      return '审核中';
    default:
      return '待审核';
  }
}

/**
 * 资料待 BD 审核（待审核）时不可发起进件，列表/档案进件侧展示统一为「待进件」，
 * 避免出现「资料审核=待审核」与「进件=进件中」同时出现的矛盾。
 */
export function getDisplayOnboardingStatus(store: StoreAudit): StoreOnboardingStatus {
  if (store.phase === 'awaiting_bd') return '待进件';
  return store.onboardingStatus;
}

export interface StoreAudit {
  id: number;
  name: string;
  storeType: string;
  onboardingStatus: StoreOnboardingStatus;
  /** 列表卡片展示：联系人 + 电话摘要 */
  contact: string;
  deliveryMode: string;
  warehouse: string;
  boundBd: string;
  withdrawPhone: string;
  /** 完整展示地址（列表等） */
  address: string;
  merchantUid: string;
  storeCategory: string;
  /** 门店简称（对外简称，≠ 标签） */
  shortName: string;
  /** 门店标签，建议最多 3 个；与 storeLabel（主标签）保持同步 */
  storeTags: string[];
  /** 主标签，与 storeTags[0] 一致，便于表单单选 */
  storeLabel: string;
  detailAddress: string;
  mapHint: string;
  /** 运营/组织分组（华东新零售等） */
  storeGroup: string;
  /** 门店分组：加盟店或合作店（二选一）；草稿未填时可为空 */
  partnerDivision?: StorePartnerDivision;
  /** 省市区三级展示，如：浙江省 / 杭州市 / 西湖区 */
  regionCascade: string;
  /** 联系电话（表单） */
  contactPhone: string;
  /** 联系人姓名 */
  contactName: string;
  /** 是否已上传门头照 */
  frontPhotoUploaded: boolean;
  /** 演示：高亮配送仓库标签（待完善） */
  warehouseNeedsAttention?: boolean;
  phase: StoreReviewPhase;
  /** BD/负责人驳回文案 */
  rejectReason?: string;
  /** 系统类失败说明，用于深色失败弹窗 */
  systemFailureDetail?: string;
  submittedAt: string;
  bdApprovedAt?: string;
  /** 资料审核通过（终审通过）时间；门店档案「创建时间」展示，未通过前为空 */
  approvedAt?: string;
}

export const initialStoreAudits: StoreAudit[] = [
  {
    id: 1,
    name: '鲜丰水果文一西路店',
    storeType: '直营门店',
    onboardingStatus: '待进件',
    contact: '周敏 138****2201',
    deliveryMode: '配送',
    warehouse: '华东 RDC-杭州',
    boundBd: '王强',
    withdrawPhone: '138****2201',
    address: '浙江省杭州市西湖区文一西路 558 号',
    merchantUid: 'MU20260315001',
    storeCategory: '生鲜果蔬',
    shortName: '鲜丰-文一西路',
    storeTags: ['社区店', '生鲜', '华东'],
    storeLabel: '社区店',
    detailAddress: '文一西路 558 号 1 层临街',
    mapHint: '文一西路与古墩路交叉口东北角',
    storeGroup: '华东新零售',
    partnerDivision: '加盟店',
    regionCascade: '浙江省 / 杭州市 / 西湖区',
    contactPhone: '138****2201',
    contactName: '周敏',
    frontPhotoUploaded: true,
    phase: 'awaiting_bd',
    submittedAt: '2026-04-08 09:20',
  },
  {
    id: 2,
    name: '老城烧烤武林店',
    storeType: '加盟门店',
    onboardingStatus: '进件中',
    contact: '马东 139****8832',
    deliveryMode: '配送',
    warehouse: '杭州城市前置仓',
    boundBd: '李明',
    withdrawPhone: '139****8832',
    address: '浙江省杭州市拱墅区武林路 128 号',
    merchantUid: 'MU20260312008',
    storeCategory: '餐饮',
    shortName: '老城烧烤-武林',
    storeTags: ['夜市烧烤', '加盟'],
    storeLabel: '夜市烧烤',
    detailAddress: '武林路 128 号附 2',
    mapHint: '武林夜市牌坊南侧 50 米',
    storeGroup: '加盟餐饮',
    partnerDivision: '合作店',
    regionCascade: '浙江省 / 杭州市 / 拱墅区',
    contactPhone: '139****8832',
    contactName: '马东',
    frontPhotoUploaded: true,
    phase: 'awaiting_leader',
    submittedAt: '2026-04-06 14:05',
    bdApprovedAt: '2026-04-07 10:12',
  },
  {
    id: 3,
    name: '悦读时光书店',
    storeType: '联营门店',
    onboardingStatus: '进件成功',
    contact: '陈静 137****6610',
    deliveryMode: '配送',
    warehouse: '图书中央仓',
    boundBd: '赵丽',
    withdrawPhone: '137****6610',
    address: '浙江省杭州市滨江区江南大道 960 号',
    merchantUid: 'MU20260228003',
    storeCategory: '文化零售',
    shortName: '悦读-滨江店',
    storeTags: ['商场店', '文化零售'],
    storeLabel: '商场店',
    detailAddress: '江南大道 960 号 3F-301',
    mapHint: '滨江宝龙城 3 楼',
    storeGroup: '文化零售组',
    partnerDivision: '加盟店',
    regionCascade: '浙江省 / 杭州市 / 滨江区',
    contactPhone: '137****6610',
    contactName: '陈静',
    frontPhotoUploaded: true,
    phase: 'approved',
    submittedAt: '2026-03-28 11:40',
    bdApprovedAt: '2026-03-29 09:00',
    approvedAt: '2026-03-30 16:08',
  },
  {
    id: 4,
    name: '速达便利店（庆春店）',
    storeType: '加盟门店',
    onboardingStatus: '进件中',
    contact: '胡磊 136****0098',
    deliveryMode: '配送',
    warehouse: '华东 RDC-杭州',
    boundBd: '王强',
    withdrawPhone: '136****0098',
    address: '浙江省杭州市上城区庆春路 199 号',
    merchantUid: 'MU20260402015',
    storeCategory: '便利店',
    shortName: '速达-庆春',
    storeTags: ['写字楼配套', '便利店', '24h'],
    storeLabel: '写字楼配套',
    detailAddress: '庆春路 199 号大厦底商',
    mapHint: '庆春路中河路口',
    storeGroup: '便利店组',
    partnerDivision: '合作店',
    regionCascade: '浙江省 / 杭州市 / 上城区',
    contactPhone: '136****0098',
    contactName: '胡磊',
    frontPhotoUploaded: false,
    warehouseNeedsAttention: true,
    phase: 'rejected',
    rejectReason: '门店门头照与营业执照注册名称不一致，请重新拍摄清晰门头并上传。',
    submittedAt: '2026-04-02 16:30',
  },
  {
    id: 5,
    name: '轻健身工作室',
    storeType: '直营门店',
    onboardingStatus: '进件中',
    contact: '孙悦 135****7741',
    deliveryMode: '配送',
    warehouse: '—',
    boundBd: '周杰',
    withdrawPhone: '135****7741',
    address: '浙江省杭州市余杭区五常大道 1 号',
    merchantUid: 'MU20260405022',
    storeCategory: '生活服务',
    shortName: '轻健身-五常',
    storeTags: ['工作室'],
    storeLabel: '工作室',
    detailAddress: '五常大道 1 号 B 座 602',
    mapHint: '西溪软件园 B 座',
    storeGroup: '生活服务',
    partnerDivision: '加盟店',
    regionCascade: '浙江省 / 杭州市 / 余杭区',
    contactPhone: '135****7741',
    contactName: '孙悦',
    frontPhotoUploaded: true,
    phase: 'rejected',
    rejectReason: '支付机构风控校验未通过',
    systemFailureDetail: '商户结算账户四要素核验失败（开户名与法人姓名不一致）。请核对对公账户信息或更换结算卡后重新发起认证。',
    submittedAt: '2026-04-05 08:50',
  },
  {
    id: 6,
    name: '茶语小栈',
    storeType: '加盟门店',
    onboardingStatus: '待进件',
    contact: '林芳 158****3320',
    deliveryMode: '配送',
    warehouse: '华东 RDC-杭州',
    boundBd: '王强',
    withdrawPhone: '158****3320',
    address: '浙江省杭州市西湖区天目山路 398 号',
    merchantUid: 'MU20260409007',
    storeCategory: '茶饮',
    shortName: '茶语-城西银泰',
    storeTags: ['商场店', '茶饮', '外卖'],
    storeLabel: '商场店',
    detailAddress: '天目山路 398 号 1F-18 铺',
    mapHint: '城西银泰 1 楼茶饮区',
    storeGroup: '茶饮组',
    partnerDivision: '合作店',
    regionCascade: '浙江省 / 杭州市 / 西湖区',
    contactPhone: '158****3320',
    contactName: '林芳',
    frontPhotoUploaded: true,
    phase: 'awaiting_bd',
    submittedAt: '2026-04-09 13:25',
  },
  {
    id: 7,
    name: '晨光文具（滨江宝龙店）',
    storeType: '加盟门店',
    onboardingStatus: '进件中',
    contact: '郑凯 159****5566',
    deliveryMode: '配送',
    warehouse: '华东 RDC-杭州',
    boundBd: '赵丽',
    withdrawPhone: '159****5566',
    address: '浙江省杭州市滨江区滨盛路 3867 号',
    merchantUid: 'MU20260408031',
    storeCategory: '文化零售',
    shortName: '晨光-滨江宝龙',
    storeTags: ['商场店', '文具'],
    storeLabel: '商场店',
    detailAddress: '滨江宝龙城 B1-102',
    mapHint: '滨江宝龙城 B1 层超市旁',
    storeGroup: '文化零售组',
    partnerDivision: '加盟店',
    regionCascade: '浙江省 / 杭州市 / 滨江区',
    contactPhone: '159****5566',
    contactName: '郑凯',
    frontPhotoUploaded: true,
    phase: 'awaiting_leader',
    submittedAt: '2026-04-08 11:00',
    bdApprovedAt: '2026-04-09 09:30',
  },
];

// 活动管理数据
export const activities = [
  { id: 1, name: '春季满减活动', startTime: '2024-03-01', endTime: '2024-03-31', merchants: 80, status: 'active' as const, rules: '满30减5，满50减10', totalAmount: 120000, orders: 3500, avgPrice: 34.29 },
  { id: 2, name: '新商户入驻奖励', startTime: '2024-04-01', endTime: '2024-04-30', merchants: 0, status: 'upcoming' as const, rules: '新商户首月交易满1万奖励200元', totalAmount: 0, orders: 0, avgPrice: 0 },
  { id: 3, name: '春节红包活动', startTime: '2024-02-01', endTime: '2024-02-29', merchants: 120, status: 'ended' as const, rules: '随机红包0.5-5元', totalAmount: 250000, orders: 8200, avgPrice: 30.49 },
  { id: 4, name: '周末双倍积分', startTime: '2024-03-15', endTime: '2024-06-15', merchants: 55, status: 'active' as const, rules: '每周六日消费积分翻倍', totalAmount: 85000, orders: 2100, avgPrice: 40.48 },
];

// 数据报表 - 图表数据
export const reportChartData = {
  merchantTrend: [
    { month: '2023-10', newMerchants: 18, totalMerchants: 120, activeMerchants: 98 },
    { month: '2023-11', newMerchants: 24, totalMerchants: 144, activeMerchants: 115 },
    { month: '2023-12', newMerchants: 21, totalMerchants: 165, activeMerchants: 132 },
    { month: '2024-01', newMerchants: 28, totalMerchants: 193, activeMerchants: 158 },
    { month: '2024-02', newMerchants: 24, totalMerchants: 217, activeMerchants: 175 },
    { month: '2024-03', newMerchants: 50, totalMerchants: 267, activeMerchants: 220 },
  ],
  transactionTrend: [
    { month: '2023-10', amount: 680000, count: 850, avgAmount: 800 },
    { month: '2023-11', amount: 820000, count: 1020, avgAmount: 804 },
    { month: '2023-12', amount: 760000, count: 950, avgAmount: 800 },
    { month: '2024-01', amount: 950000, count: 1180, avgAmount: 805 },
    { month: '2024-02', amount: 850000, count: 1050, avgAmount: 810 },
    { month: '2024-03', amount: 1120000, count: 1400, avgAmount: 800 },
  ],
  revenueTrend: [
    { month: '2023-10', revenue: 23600, settled: 21000, pending: 2600 },
    { month: '2023-11', revenue: 28300, settled: 25500, pending: 2800 },
    { month: '2023-12', revenue: 26600, settled: 24000, pending: 2600 },
    { month: '2024-01', revenue: 34200, settled: 30800, pending: 3400 },
    { month: '2024-02', revenue: 29800, settled: 27000, pending: 2800 },
    { month: '2024-03', revenue: 48600, settled: 36200, pending: 12400 },
  ],
  industryDistribution: [
    { name: '餐饮', value: 120, percentage: 45 },
    { name: '零售', value: 75, percentage: 28 },
    { name: '服务', value: 45, percentage: 17 },
    { name: '其他', value: 27, percentage: 10 },
  ],
  areaDistribution: [
    { name: '西湖区', value: 68, percentage: 25 },
    { name: '滨江区', value: 52, percentage: 20 },
    { name: '余杭区', value: 48, percentage: 18 },
    { name: '拱墅区', value: 38, percentage: 14 },
    { name: '上城区', value: 35, percentage: 13 },
    { name: '萧山区', value: 26, percentage: 10 },
  ],
  areaBarData: [
    { area: '西湖区', merchants: 68, revenue: 18500 },
    { area: '滨江区', merchants: 52, revenue: 14200 },
    { area: '余杭区', merchants: 48, revenue: 12800 },
    { area: '拱墅区', merchants: 38, revenue: 9600 },
    { area: '上城区', merchants: 35, revenue: 8800 },
    { area: '萧山区', merchants: 26, revenue: 6500 },
  ],
};

// 操作指南数据
export const guides = [
  {
    id: 'merchant-onboarding',
    title: '商户进件指南',
    steps: [
      '步骤1：点击"商户进件" -> "新增商户"',
      '步骤2：填写商户基础信息（法人姓名、企业名称、联系方式等）',
      '步骤3：上传营业执照、法人身份证正反面',
      '步骤4：选择进件渠道（汇付天下、支付宝等）',
      '步骤5：提交审核，等待平台审核通过',
    ],
  },
  {
    id: 'withdrawal',
    title: '收益提现指南',
    steps: [
      '步骤1：进入"收益明细"页面',
      '步骤2：点击"提现申请"按钮',
      '步骤3：输入提现金额（不超过可提现金额）',
      '步骤4：选择到账银行卡',
      '步骤5：确认提现信息并提交',
    ],
  },
  {
    id: 'team',
    title: '团队管理指南',
    steps: [
      '步骤1：进入"团队管理"页面',
      '步骤2：点击"添加成员"按钮',
      '步骤3：输入成员手机号、姓名、角色',
      '步骤4：发送邀请链接',
      '步骤5：成员确认后自动加入团队',
    ],
  },
];

// 商户进件数据
export type MerchantStatus = '进件成功' | '审核中' | '已驳回';
export type SettlementType = '对公' | '对私法人' | '对私非法人';
export type MerchantChannel = '汇付天下' | '支付宝' | '微信支付' | '银联商务' | '—';

/** 商户详情（进件资料全量字段，供详情页 1:1 展示） */
export type MerchantCategoryType = '企业' | '个体工商户' | '小微商户';

export interface ManagedMerchant {
  id: number;
  name: string;
  shortName: string;
  businessLicense: string;
  merchantNo: string;
  status: MerchantStatus;
  rate: string;
  paymentAuth: string;
  channel: MerchantChannel;
  applicationDate: string;
  merchantDate: string;
  contact: string;
  phone: string;
  legalPerson: string;
  idNumber: string;
  industry: string;
  address: string;
  bankAccount: string;
  bankName: string;
  settlementType: SettlementType;
  rejectReason?: string;
  /** 执照信息 */
  merchantCategory: MerchantCategoryType;
  licenseName: string;
  registrationCode: string;
  licenseValidFrom: string;
  licenseValidTo: string;
  licenseDocumentType: string;
  registeredRegion: string;
  registeredDetailAddress: string;
  /** 法人证件 */
  legalIdDocType: string;
  idValidFrom: string;
  idValidTo: string;
  idIssuingAuthority: string;
  /** 经营信息 */
  operatingName: string;
  operatingRegion: string;
  operatingDetailAddress: string;
  merchantTypeLabel: string;
  /** 结算 */
  settlementAccountName: string;
  branchName: string;
  isLegalPersonSettlement: boolean;
  /** 门店 */
  storeName: string;
  /** 协议与认证 */
  agreementType: string;
  eSignStatus: string;
  realNameAuthStatus: string;
  /** 对私非法人时：结算人及授权（有则展示对应分区） */
  settlorName?: string;
  settlorIdNumber?: string;
}

export const managedMerchants: ManagedMerchant[] = [
  {
    id: 1,
    name: '杭州茶百道餐饮管理有限公司',
    shortName: '茶百道-人民路店',
    businessLicense: '91330100MA2KXXXXXX',
    merchantNo: 'MCH20240101001',
    status: '进件成功',
    rate: '0.38%',
    paymentAuth: '已认证',
    channel: '汇付天下',
    applicationDate: '2024-01-10',
    merchantDate: '2024-01-15',
    contact: '张经理',
    phone: '138****1234',
    legalPerson: '张明辉',
    idNumber: '330102********1234',
    industry: '餐饮',
    address: '浙江省杭州市西湖区',
    bankAccount: '3301**********8801',
    bankName: '中国建设银行',
    settlementType: '对公',
    merchantCategory: '企业',
    licenseName: '杭州茶百道餐饮管理有限公司',
    registrationCode: '91330100MA2KXXXXXX',
    licenseValidFrom: '2019-03-15',
    licenseValidTo: '长期',
    licenseDocumentType: '普通',
    registeredRegion: '浙江省 / 杭州市 / 西湖区',
    registeredDetailAddress: '文三路 259 号昌地火炬大厦 1 幢 801 室',
    legalIdDocType: '身份证',
    idValidFrom: '2015-08-20',
    idValidTo: '2035-08-20',
    idIssuingAuthority: '杭州市公安局西湖分局',
    operatingName: '茶百道（人民路店）',
    operatingRegion: '浙江省 / 杭州市 / 西湖区',
    operatingDetailAddress: '人民路 88 号 1 层临街商铺',
    merchantTypeLabel: '餐饮、台账服务类',
    settlementAccountName: '杭州茶百道餐饮管理有限公司',
    branchName: '中国建设银行杭州高新支行',
    isLegalPersonSettlement: true,
    storeName: '茶百道-人民路店',
    agreementType: '电子协议',
    eSignStatus: '已签署',
    realNameAuthStatus: '法人实名认证已通过',
  },
  {
    id: 2,
    name: '杭州星辰咖啡有限公司',
    shortName: '星辰咖啡馆',
    businessLicense: '91330100MA2KYYYYYY',
    merchantNo: 'MCH20240035002',
    status: '进件成功',
    rate: '0.35%',
    paymentAuth: '已认证',
    channel: '支付宝',
    applicationDate: '2024-02-15',
    merchantDate: '2024-02-20',
    contact: '王老板',
    phone: '139****5678',
    legalPerson: '王建国',
    idNumber: '330105********5678',
    industry: '餐饮',
    address: '浙江省杭州市拱墅区',
    bankAccount: '6217****9012',
    bankName: '中国工商银行',
    settlementType: '对私法人',
    merchantCategory: '企业',
    licenseName: '杭州星辰咖啡有限公司',
    registrationCode: '91330100MA2KYYYYYY',
    licenseValidFrom: '2021-06-01',
    licenseValidTo: '长期',
    licenseDocumentType: '普通',
    registeredRegion: '浙江省 / 杭州市 / 拱墅区',
    registeredDetailAddress: '莫干山路 166 号 2 幢 302',
    legalIdDocType: '身份证',
    idValidFrom: '2012-11-10',
    idValidTo: '2032-11-10',
    idIssuingAuthority: '杭州市公安局拱墅分局',
    operatingName: '星辰咖啡馆（莫干山路店）',
    operatingRegion: '浙江省 / 杭州市 / 拱墅区',
    operatingDetailAddress: '莫干山路 166 号底商',
    merchantTypeLabel: '餐饮、服务类',
    settlementAccountName: '王建国',
    branchName: '中国工商银行杭州分行营业部',
    isLegalPersonSettlement: true,
    storeName: '星辰咖啡馆',
    agreementType: '电子协议',
    eSignStatus: '已签署',
    realNameAuthStatus: '法人实名认证已通过',
  },
  {
    id: 3,
    name: '杭州鲜果时光商贸有限公司',
    shortName: '鲜果时光-中山店',
    businessLicense: '91330100MA2KZZZZZZ',
    merchantNo: 'MCH20240088003',
    status: '审核中',
    rate: '0.40%',
    paymentAuth: '未认证',
    channel: '微信支付',
    applicationDate: '2024-03-20',
    merchantDate: '',
    contact: '李店长',
    phone: '137****9012',
    legalPerson: '李秀芳',
    idNumber: '330102********9012',
    industry: '零售',
    address: '浙江省杭州市上城区',
    bankAccount: '6228****3456',
    bankName: '中国建设银行',
    settlementType: '对公',
    merchantCategory: '企业',
    licenseName: '杭州鲜果时光商贸有限公司',
    registrationCode: '91330100MA2KZZZZZZ',
    licenseValidFrom: '2022-01-08',
    licenseValidTo: '长期',
    licenseDocumentType: '普通',
    registeredRegion: '浙江省 / 杭州市 / 上城区',
    registeredDetailAddress: '中山中路 200 号 5 楼',
    legalIdDocType: '身份证',
    idValidFrom: '2018-04-22',
    idValidTo: '2038-04-22',
    idIssuingAuthority: '杭州市公安局上城区分局',
    operatingName: '鲜果时光（中山店）',
    operatingRegion: '浙江省 / 杭州市 / 上城区',
    operatingDetailAddress: '中山中路 200 号 1 层',
    merchantTypeLabel: '零售、台账类',
    settlementAccountName: '杭州鲜果时光商贸有限公司',
    branchName: '中国建设银行杭州吴山支行',
    isLegalPersonSettlement: true,
    storeName: '鲜果时光-中山店',
    agreementType: '电子协议',
    eSignStatus: '待签署',
    realNameAuthStatus: '认证审核中',
  },
  {
    id: 4,
    name: '麦香面包坊(个体)',
    shortName: '麦香面包坊',
    businessLicense: '92330100MA2KXXXXAB',
    merchantNo: 'MCH20240120004',
    status: '已驳回',
    rate: '0.38%',
    paymentAuth: '未认证',
    channel: '汇付天下',
    applicationDate: '2024-03-22',
    merchantDate: '',
    contact: '赵师傅',
    phone: '136****3456',
    legalPerson: '赵大力',
    idNumber: '330108********3456',
    industry: '餐饮',
    address: '浙江省杭州市滨江区',
    bankAccount: '6222****7890',
    bankName: '中国农业银行',
    settlementType: '对私非法人',
    merchantCategory: '个体工商户',
    licenseName: '杭州滨江麦香面包坊',
    registrationCode: '92330100MA2KXXXXAB',
    licenseValidFrom: '2023-05-01',
    licenseValidTo: '长期',
    licenseDocumentType: '普通',
    registeredRegion: '浙江省 / 杭州市 / 滨江区',
    registeredDetailAddress: '江南大道 500 号 3 幢 101',
    legalIdDocType: '身份证',
    idValidFrom: '2014-09-01',
    idValidTo: '2034-09-01',
    idIssuingAuthority: '杭州市公安局滨江分局',
    operatingName: '麦香面包坊',
    operatingRegion: '浙江省 / 杭州市 / 滨江区',
    operatingDetailAddress: '江南大道 500 号底商',
    merchantTypeLabel: '餐饮、服务类',
    settlementAccountName: '赵丽',
    branchName: '中国农业银行杭州滨江支行',
    isLegalPersonSettlement: false,
    storeName: '麦香面包坊',
    agreementType: '电子协议',
    eSignStatus: '未签署',
    realNameAuthStatus: '未通过',
    settlorName: '赵丽',
    settlorIdNumber: '330108********8899',
    rejectReason: '营业执照照片模糊，无法识别统一社会信用代码，请重新上传清晰照片。',
  },
  {
    id: 5,
    name: '杭州老王餐饮管理有限公司',
    shortName: '老王烧烤',
    businessLicense: '91330100MA2KXXXXCD',
    merchantNo: 'MCH20230188005',
    status: '进件成功',
    rate: '0.35%',
    paymentAuth: '已认证',
    channel: '银联商务',
    applicationDate: '2023-11-05',
    merchantDate: '2023-11-10',
    contact: '王大叔',
    phone: '135****7890',
    legalPerson: '王大伟',
    idNumber: '330110********7890',
    industry: '餐饮',
    address: '浙江省杭州市余杭区',
    bankAccount: '6216****2345',
    bankName: '中国银行',
    settlementType: '对公',
    merchantCategory: '企业',
    licenseName: '杭州老王餐饮管理有限公司',
    registrationCode: '91330100MA2KXXXXCD',
    licenseValidFrom: '2020-02-18',
    licenseValidTo: '长期',
    licenseDocumentType: '普通',
    registeredRegion: '浙江省 / 杭州市 / 余杭区',
    registeredDetailAddress: '文一西路 800 号 12 层',
    legalIdDocType: '身份证',
    idValidFrom: '2011-07-15',
    idValidTo: '2031-07-15',
    idIssuingAuthority: '杭州市公安局余杭分局',
    operatingName: '老王烧烤（文一西路店）',
    operatingRegion: '浙江省 / 杭州市 / 余杭区',
    operatingDetailAddress: '文一西路 800 号 1 层',
    merchantTypeLabel: '餐饮、台账服务类',
    settlementAccountName: '杭州老王餐饮管理有限公司',
    branchName: '中国银行杭州余杭支行',
    isLegalPersonSettlement: true,
    storeName: '老王烧烤',
    agreementType: '电子协议',
    eSignStatus: '已签署',
    realNameAuthStatus: '法人实名认证已通过',
  },
];

export const merchantTransactionHistory = [
  { date: '03-20', amount: 12500, count: 85 },
  { date: '03-21', amount: 18200, count: 120 },
  { date: '03-22', amount: 15800, count: 98 },
  { date: '03-23', amount: 22400, count: 145 },
  { date: '03-24', amount: 19600, count: 130 },
  { date: '03-25', amount: 28500, count: 185 },
  { date: '03-26', amount: 24800, count: 160 },
  { date: '03-27', amount: 31200, count: 200 },
  { date: '03-28', amount: 16500, count: 108 },
  { date: '03-29', amount: 20800, count: 138 },
  { date: '03-30', amount: 26300, count: 172 },
  { date: '03-31', amount: 29100, count: 190 },
];

export const faqs = [
  { q: '商户进件审核多久能通过？', a: '一般1-3个工作日，如遇节假日顺延。' },
  { q: '收益如何提现？', a: '进入"收益明细" -> "提现申请"，填写金额和银行卡信息即可。' },
  { q: '团队成员无法添加怎么办？', a: '请确认对方手机号正确且未加入其他团队，如仍有问题请联系客服。' },
  { q: '商户进件失败怎么办？', a: '请检查上传的资料是否清晰完整，常见原因为营业执照模糊或信息不匹配。' },
  { q: '收益未到账如何处理？', a: '提现后1-3个工作日到账，如超时请联系客服提供提现单号。' },
];
