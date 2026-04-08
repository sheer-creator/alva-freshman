import { lazy, Suspense, useState, useEffect, useTransition } from "react";
import SearchModal from "@/app/components/SearchModal";

export type Page = "home" | "docs" | "api-keys" | "explore-2" | "library" | "dashboard" | "workspace" | "agent" | "skills" | "alva-skills" | "user-profile" | "portfolio" | "portfolio-settings" | "pricing" | "billing" | "alva-chat" | "alva-chat-detail" | "referral-landing" | "playbook-referral" | `thread/${string}`;

/* ========== 按需加载页面 ========== */

const Home = lazy(() => import("@/pages/HomeV3"));
const ApiKeys = lazy(() => import("@/pages/ApiKeys"));
const Library = lazy(() => import("@/pages/Library"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const DashboardWorkspace = lazy(() => import("@/pages/DashboardWorkspace").then(m => ({ default: m.DashboardWorkspace })));
const Agent = lazy(() => import("@/pages/Agent"));
const Skills = lazy(() => import("@/pages/Skills"));
const OpenAlvaDocs = lazy(() => import("@/pages/OpenAlvaDocs"));

const UserProfile = lazy(() => import("@/pages/UserProfile"));
const Portfolio = lazy(() => import("@/pages/Portfolio"));
const PortfolioSettings = lazy(() => import("@/pages/PortfolioSettings"));
const Explore2 = lazy(() => import("@/pages/Explore2"));
const Pricing = lazy(() => import("@/pages/Pricing"));
const Billing = lazy(() => import("@/pages/Billing"));
const AlvaSkills = lazy(() => import("@/pages/AlvaSkills"));
const AlvaChat = lazy(() => import("@/pages/AlvaChat"));
const AlvaChatDetail = lazy(() => import("@/pages/AlvaChatDetail"));
const ReferralLanding = lazy(() => import("@/pages/ReferralLanding"));
const PlaybookReferral = lazy(() => import("@/pages/PlaybookReferral"));
const Thread = lazy(() => import("@/pages/Thread"));

/* ========== URL hash 路由工具 ========== */

const VALID_PAGES: Page[] = ["home", "docs", "api-keys", "explore-2", "library", "dashboard", "workspace", "agent", "skills", "alva-skills", "user-profile", "portfolio", "portfolio-settings", "pricing", "billing", "alva-chat", "alva-chat-detail", "referral-landing", "playbook-referral"];

function getPageFromHash(): Page {
  const hash = window.location.hash.slice(1);
  if (hash.startsWith('thread/')) return hash as Page;
  return VALID_PAGES.includes(hash as Page) ? (hash as Page) : "home";
}

export function getThreadId(page: Page): string | null {
  if (typeof page === 'string' && page.startsWith('thread/')) return page.slice(7);
  return null;
}

/* ========== App ========== */

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>(getPageFromHash);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [, startTransition] = useTransition();

  // 监听浏览器前进/后退
  useEffect(() => {
    const onHashChange = () => startTransition(() => setCurrentPage(getPageFromHash()));
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const openSearch = () => setIsSearchOpen(true);

  const navigate = (page: Page) => {
    window.location.hash = page;
    startTransition(() => setCurrentPage(page));
  };

  const threadId = getThreadId(currentPage);

  return (
    <>
      <Suspense>
        {currentPage === "home" && <Home onNavigate={navigate} onOpenSearch={openSearch} />}
        {currentPage === "api-keys" && <ApiKeys onNavigate={navigate} onOpenSearch={openSearch} />}
        {currentPage === "docs" && <OpenAlvaDocs onNavigate={navigate} onOpenSearch={openSearch} />}
        {currentPage === "skills" && <Skills onNavigate={navigate} onOpenSearch={openSearch} />}
        {currentPage === "alva-skills" && <AlvaSkills onNavigate={navigate} onOpenSearch={openSearch} />}
        {currentPage === "explore-2" && <Explore2 onNavigate={navigate} onOpenSearch={openSearch} />}
        {currentPage === "library" && <Library onNavigate={navigate} onOpenSearch={openSearch} />}
        {currentPage === "dashboard" && <Dashboard onNavigate={navigate} />}
        {currentPage === "workspace" && <DashboardWorkspace onNavigate={navigate} />}
        {currentPage === "agent" && <Agent onNavigate={navigate} />}
        {currentPage === "user-profile" && <UserProfile onNavigate={navigate} />}
        {currentPage === "portfolio" && <Portfolio onNavigate={navigate} />}
        {currentPage === "portfolio-settings" && <PortfolioSettings onNavigate={navigate} />}
        {currentPage === "pricing" && <Pricing onNavigate={navigate} />}
        {currentPage === "billing" && <Billing onNavigate={navigate} />}
        {currentPage === "alva-chat" && <AlvaChat onNavigate={navigate} onOpenSearch={openSearch} />}
        {currentPage === "alva-chat-detail" && <AlvaChatDetail onNavigate={navigate} onOpenSearch={openSearch} />}
        {currentPage === "referral-landing" && <ReferralLanding onNavigate={navigate} />}
        {currentPage === "playbook-referral" && <PlaybookReferral onNavigate={navigate} />}
        {threadId && <Thread threadId={threadId} onNavigate={navigate} />}
      </Suspense>
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
