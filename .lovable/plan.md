

## Plan: Generate Comprehensive PRD Document

### Overview
Generate a detailed product PRD in Markdown format covering all functional modules of the BD (Business Development) mobile application, organized by functional area with field specifications, enum values, boundary values, business flows, preconditions, and permission rules.

### Document Structure

The PRD will be written to `/mnt/documents/PRD_BD_App.md` and will contain the following sections:

#### 1. Global Definitions
- Product overview, target users (BD specialists, regional managers, senior BD)
- Global preconditions: login authentication, real-name verification, role-based access
- Standardized components catalog (StatusBadge, PageHeader, StatCard, NavLink, PhotoUpload, FormRow)
- Icon definitions with descriptions (lucide-react icons used across all modules)
- Global permission matrix by role

#### 2. Module 1: Home Dashboard (首页)
- Stats card fields, notification list, workbench grid, marketing materials
- QR code sharing dialog flow
- Bottom tab navigation logic

#### 3. Module 2: Merchant Management (商户管理)
- **List page**: Search, tabs (全部/入驻中/已入驻), card fields, FAB button
- **Detail page**: Header card, 4 stat cards, transaction trend chart, 3 info tabs (法人/进件/已入), action buttons by status
- **Onboarding wizard (6 steps)**: Each step's fields, photo upload specs, settlement type variants
- Status enum: 未入驻/已入驻/审核中/已驳回
- Channel enum: 汇付天下/支付宝/微信支付/银联商务
- Settlement type enum: 对公/对私法人/对私非法人
- Button display rules by status
- Forward flow: 未入驻 → 审核中 → 已入驻
- Reverse flow: 审核中 → 已驳回 → 重新提交 → 审核中
- Boundary values for all form fields

#### 4. Module 3: Revenue Details (收益明细)
- Filter logic (store + period), summary stats, grouped list
- Revenue status enum: settled/pending/failed
- Data fields per revenue item

#### 5. Module 4: Wallet (我的钱包)
- Balance card, action buttons, transaction list with tabs
- Transaction type enum: income/withdraw/expense
- Withdrawal flow, detail page
- Boundary: withdraw min ¥1.00, max ¥50,000.00

#### 6. Module 5: Team Management (团队管理)
- Overview stats, member list, add/edit/remove dialogs
- Performance detail with charts (line, bar, pie)
- Team report with period filters
- Member status enum: active/inactive
- Role enum: BD专员/高级BD/区域经理

#### 7. Module 6: Merchant Leads (商户线索)
- Tabs: 已领取/待领取
- Source enum: 地推/线上广告/转介绍/其他
- Status enum: unfollowed/followed/converted/abandoned
- Follow-up records with type enum: 电话/上门拜访/微信沟通/邮件/其他
- Follow-up result enum: 有意向/需再跟进/暂无意向/已转化/已放弃
- Lead lifecycle flow

#### 8. Module 7: Activities Management (活动管理)
- Activity status enum: active/upcoming/ended
- Create/view detail flows

#### 9. Module 8: Profile & Settings (我的)
- Menu structure, wallet entry, logout flow
- Sub-pages: bank cards, verification, security, notification settings, feedback, about

#### 10. Business Flow Diagrams (ASCII)
- Merchant onboarding flow
- Lead conversion flow
- Withdrawal flow
- Data flow diagram (user actions → state changes → UI updates)

#### 11. Exception Handling
- Network errors, form validation failures, empty states, timeout handling

#### 12. Precondition Summary Table
- Page-level access conditions
- Button-level operation preconditions
- Status-based UI rules

### Technical Approach
- Write the complete markdown file to `/mnt/documents/PRD_BD_App.md` using `code--exec`
- Content derived entirely from the actual codebase (mockData.ts, all page components)
- All enum values extracted from TypeScript type definitions
- All field names from actual component props and data structures

### Output
Single markdown file (~15,000-20,000 chars) at `/mnt/documents/PRD_BD_App.md`

