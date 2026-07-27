import { lazy, Suspense, useState, useEffect, useTransition } from "react";
import SearchModal from "@/app/components/SearchModal";
import { ChatProvider } from "@/app/components/chat/ChatContext";

export type Page = "new-chat" | "docs" | "api-keys" | "explore" | "explore-2" | "agent" | "alva-agent" | "alva-skills" | "user-profile" | "account" | "portfolio" | "portfolio-settings" | "pricing" | "billing" | "creator-earnings" | "automations" | "alva-chat-detail" | "referral-landing" | "playbook-referral" | "template-screener" | "template-thesis" | "template-whatif" | "template-notification" | "screener" | `thread/${string}` | `share/${string}`;

/* ========== 按需加载页面 ========== */

const NewChat = lazy(() => import("@/pages/NewChat"));
const ApiKeys = lazy(() => import("@/pages/ApiKeys"));
const AgentDesign = lazy(() => import("@/pages/AgentDesign"));
const OpenAlvaDocs = lazy(() => import("@/pages/OpenAlvaDocs"));

const UserProfile = lazy(() => import("@/pages/UserProfile"));
const Account = lazy(() => import("@/pages/Account"));
const AlvaAgentSettings = lazy(() => import("@/pages/AlvaAgentSettings"));
const Portfolio = lazy(() => import("@/pages/Portfolio"));
const PortfolioSettings = lazy(() => import("@/pages/PortfolioSettings"));
const Explore2 = lazy(() => import("@/pages/Explore2"));
const Explore = lazy(() => import("@/pages/Explore"));
const Pricing = lazy(() => import("@/pages/Pricing"));
const Billing = lazy(() => import("@/pages/Billing"));
const CreatorEarnings = lazy(() => import("@/pages/CreatorEarnings"));
const AlvaSkills = lazy(() => import("@/pages/AlvaSkills"));
const AlvaChatDetail = lazy(() => import("@/pages/AlvaChatDetail"));
const ReferralLanding = lazy(() => import("@/pages/ReferralLanding"));
const PlaybookReferral = lazy(() => import("@/pages/PlaybookReferral"));
const Thread = lazy(() => import("@/pages/Thread"));
const ConversationShare = lazy(() => import("@/pages/ConversationShare"));
const Automations = lazy(() => import("@/pages/Automations"));
const TemplateScreener = lazy(() => import("@/pages/TemplateScreener"));
const TemplateThesis = lazy(() => import("@/pages/TemplateThesis"));
const TemplateWhatif = lazy(() => import("@/pages/TemplateWhatif"));
const TemplateNotification = lazy(() => import("@/pages/TemplateNotification"));
const Screener = lazy(() => import("@/pages/Screener"));

/* ========== URL hash 路由工具 ========== */

const VALID_PAGES: Page[] = ["new-chat", "docs", "api-keys", "explore", "explore-2", "agent", "alva-agent", "alva-skills", "user-profile", "account", "portfolio", "portfolio-settings", "pricing", "billing", "creator-earnings", "automations", "alva-chat-detail", "referral-landing", "playbook-referral", "template-screener", "template-thesis", "template-whatif", "template-notification", "screener"];

function getPageFromHash(): Page {
  const hash = window.location.hash.slice(1);
  if (hash.startsWith('thread/')) return hash as Page;
  if (hash.startsWith('share/') && hash.length > 6) return hash as Page;
  // 频道深链形如 #agent?concept=K&tab=tasks，路由只认 ? 之前的部分
  const base = hash.split('?')[0];
  if (base === 'notifications') return 'automations';
  return VALID_PAGES.includes(base as Page) ? (base as Page) : "agent";
}

export function getThreadId(page: Page): string | null {
  if (typeof page === 'string' && page.startsWith('thread/')) return page.slice(7);
  return null;
}

function getShareId(page: Page): string | null {
  if (typeof page === 'string' && page.startsWith('share/')) return page.slice(6);
  return null;
}

/* ========== App ========== */

const SETTINGS_PAGES: Page[] = ["account", "billing", "portfolio-settings", "alva-agent", "automations", "api-keys"];

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>(getPageFromHash);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [, startTransition] = useTransition();

  // 监听浏览器前进/后退 + 记录进入 settings 前的 page
  useEffect(() => {
    // 初次进入：若当前非 settings，立即记为 returnPage
    const init = getPageFromHash();
    if (!SETTINGS_PAGES.includes(init)) {
      sessionStorage.setItem('settingsReturnPage', init);
    }

    let prev = init;
    const onHashChange = () => {
      const next = getPageFromHash();
      // 离开 settings 前/切换中：只要上一个页面不是 settings，就更新 returnPage
      if (!SETTINGS_PAGES.includes(prev)) {
        sessionStorage.setItem('settingsReturnPage', prev);
      }
      prev = next;
      startTransition(() => setCurrentPage(next));
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const openSearch = () => setIsSearchOpen(true);

  const navigate = (page: Page) => {
    window.location.hash = page;
    startTransition(() => {
      setCurrentPage(page);
    });
  };

  const threadId = getThreadId(currentPage);
  const shareId = getShareId(currentPage);

  return (
    <ChatProvider activePage={currentPage}>
      <Suspense>
        {currentPage === "new-chat" && <NewChat onNavigate={navigate} />}
        {currentPage === "api-keys" && <ApiKeys onNavigate={navigate} />}
        {currentPage === "docs" && <OpenAlvaDocs onNavigate={navigate} onOpenSearch={openSearch} />}
        {currentPage === "alva-skills" && <AlvaSkills onNavigate={navigate} onOpenSearch={openSearch} />}
        {currentPage === "explore" && <Explore onNavigate={navigate} />}
        {currentPage === "explore-2" && <Explore2 onNavigate={navigate} onOpenSearch={openSearch} />}
        {currentPage === "agent" && <AgentDesign onNavigate={navigate} />}
        {currentPage === "user-profile" && <UserProfile onNavigate={navigate} />}
        {currentPage === "account" && <Account onNavigate={navigate} />}
        {currentPage === "alva-agent" && <AlvaAgentSettings onNavigate={navigate} />}
        {currentPage === "portfolio" && <Portfolio onNavigate={navigate} />}
        {currentPage === "portfolio-settings" && <PortfolioSettings onNavigate={navigate} />}
        {currentPage === "pricing" && <Pricing onNavigate={navigate} />}
        {currentPage === "billing" && <Billing onNavigate={navigate} />}
        {currentPage === "creator-earnings" && <CreatorEarnings onNavigate={navigate} />}
        {currentPage === "automations" && <Automations onNavigate={navigate} />}
        {currentPage === "alva-chat-detail" && <AlvaChatDetail onNavigate={navigate} onOpenSearch={openSearch} />}
        {currentPage === "referral-landing" && <ReferralLanding onNavigate={navigate} />}
        {currentPage === "playbook-referral" && <PlaybookReferral onNavigate={navigate} />}
        {currentPage === "template-screener" && <TemplateScreener onNavigate={navigate} />}
        {currentPage === "template-thesis" && <TemplateThesis onNavigate={navigate} />}
        {currentPage === "template-whatif" && <TemplateWhatif onNavigate={navigate} />}
        {currentPage === "template-notification" && <TemplateNotification onNavigate={navigate} />}
        {currentPage === "screener" && <Screener onNavigate={navigate} />}
        {threadId && <Thread threadId={threadId} onNavigate={navigate} />}
        {shareId && <ConversationShare key={shareId} shareId={shareId} onNavigate={navigate} />}
      </Suspense>
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </ChatProvider>
  );
}
