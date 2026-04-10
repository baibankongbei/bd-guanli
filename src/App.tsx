import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import RevenuePage from "./pages/RevenuePage.tsx";
import TeamPage from "./pages/TeamPage.tsx";
import LeadsPage from "./pages/LeadsPage.tsx";
import StoreDetailPage from "./pages/StoreDetailPage.tsx";
import StoreEditPage from "./pages/StoreEditPage.tsx";
import StoreWorkspacePage from "./pages/StoreWorkspacePage.tsx";
import { StoreAuditProvider } from "./contexts/StoreAuditContext.tsx";
import ReportsPage from "./pages/ReportsPage.tsx";
import ActivitiesPage from "./pages/ActivitiesPage.tsx";
import GuidePage from "./pages/GuidePage.tsx";
import SupportPage from "./pages/SupportPage.tsx";
import AiPage from "./pages/AiPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import MessagesPage from "./pages/MessagesPage.tsx";
import MessageDetailPage from "./pages/MessageDetailPage.tsx";
import MaterialsPage from "./pages/MaterialsPage.tsx";
import MaterialDetailPage from "./pages/MaterialDetailPage.tsx";
import WalletPage from "./pages/WalletPage.tsx";
import WalletWithdrawPage from "./pages/WalletWithdrawPage.tsx";
import WalletDetailPage from "./pages/WalletDetailPage.tsx";
import MyMerchantsPage from "./pages/MyMerchantsPage.tsx";
import MerchantManagementPage from "./pages/MerchantManagementPage.tsx";
import MerchantDetailPage from "./pages/MerchantDetailPage.tsx";
import MerchantOnboardingPage from "./pages/MerchantOnboardingPage.tsx";
import MyPerformancePage from "./pages/MyPerformancePage.tsx";
import InvitePage from "./pages/InvitePage.tsx";
import BankCardsPage from "./pages/BankCardsPage.tsx";
import VerificationPage from "./pages/VerificationPage.tsx";
import SecurityPage from "./pages/SecurityPage.tsx";
import NotificationSettingsPage from "./pages/NotificationSettingsPage.tsx";
import FeedbackPage from "./pages/FeedbackPage.tsx";
import AboutPage from "./pages/AboutPage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <StoreAuditProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/revenue" element={<RevenuePage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/leads" element={<LeadsPage />} />
          <Route path="/leads/:id/edit" element={<StoreEditPage />} />
          <Route path="/leads/:id/workspace" element={<StoreWorkspacePage />} />
          <Route path="/leads/:id" element={<StoreDetailPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/guide" element={<GuidePage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/ai" element={<AiPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/messages/:id" element={<MessageDetailPage />} />
          <Route path="/materials" element={<MaterialsPage />} />
          <Route path="/materials/:id" element={<MaterialDetailPage />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/wallet/withdraw" element={<WalletWithdrawPage />} />
          <Route path="/wallet/detail/:id" element={<WalletDetailPage />} />
          <Route path="/profile/merchants" element={<MyMerchantsPage />} />
          <Route path="/merchants" element={<MerchantManagementPage />} />
          <Route path="/merchants/onboarding" element={<MerchantOnboardingPage />} />
          <Route path="/merchants/:id" element={<MerchantDetailPage />} />
          <Route path="/profile/performance" element={<MyPerformancePage />} />
          <Route path="/profile/invite" element={<InvitePage />} />
          <Route path="/profile/bank-cards" element={<BankCardsPage />} />
          <Route path="/profile/verification" element={<VerificationPage />} />
          <Route path="/profile/security" element={<SecurityPage />} />
          <Route path="/profile/notifications-settings" element={<NotificationSettingsPage />} />
          <Route path="/profile/feedback" element={<FeedbackPage />} />
          <Route path="/profile/about" element={<AboutPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </StoreAuditProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
