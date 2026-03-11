import { lazy, Suspense, useState, useEffect } from "react";
import SearchModal from "@/app/components/SearchModal";

export type Page = "home" | "home-b" | "home-c" | "docs" | "api-keys" | "explore" | "library" | "dashboard" | "workspace" | "test" | "nvda" | "popular-stock" | "tsla-overview" | "tsla-tracking" | "skills" | "playbook-detail" | "user-profile";

/* ========== 按需加载页面 ========== */

const Home = lazy(() => import("@/pages/Home"));
const HomeB = lazy(() => import("@/pages/HomeB"));
const HomeC = lazy(() => import("@/pages/HomeC"));
const ApiKeys = lazy(() => import("@/pages/ApiKeys"));
const Explore = lazy(() => import("@/pages/Explore"));
const Library = lazy(() => import("@/pages/Library"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const DashboardWorkspace = lazy(() => import("@/pages/DashboardWorkspace").then(m => ({ default: m.DashboardWorkspace })));
const DashboardTest = lazy(() => import("@/pages/DashboardTest").then(m => ({ default: m.DashboardTest })));
const NVDADashboard = lazy(() => import("@/pages/NVDADashboard"));
const DashboardPopularStock = lazy(() => import("@/pages/DashboardPopularStock").then(m => ({ default: m.DashboardPopularStock })));
const DashboardTSLAOverview = lazy(() => import("@/pages/DashboardTSLAOverview").then(m => ({ default: m.DashboardTSLAOverview })));
const DashboardTSLATracking = lazy(() => import("@/pages/DashboardTSLATracking").then(m => ({ default: m.DashboardTSLATracking })));
const Skills = lazy(() => import("@/pages/Skills"));
const OpenAlvaDocs = lazy(() => import("@/pages/OpenAlvaDocs"));
const PlaybookDetail = lazy(() => import("@/pages/PlaybookDetail").then(m => ({ default: m.PlaybookDetail })));
const UserProfile = lazy(() => import("@/pages/UserProfile"));

/* ========== URL hash 路由工具 ========== */

const VALID_PAGES: Page[] = ["home", "home-b", "home-c", "docs", "api-keys", "explore", "library", "dashboard", "workspace", "test", "nvda", "popular-stock", "tsla-overview", "tsla-tracking", "skills", "playbook-detail", "user-profile"];

function getPageFromHash(): Page {
  const hash = window.location.hash.slice(1) as Page;
  return VALID_PAGES.includes(hash) ? hash : "home";
}

/* ========== App ========== */

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>(getPageFromHash);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // 监听浏览器前进/后退
  useEffect(() => {
    const onHashChange = () => setCurrentPage(getPageFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const openSearch = () => setIsSearchOpen(true);

  const navigate = (page: Page) => {
    window.location.hash = page;
    setCurrentPage(page);
  };

  return (
    <>
      <Suspense>
        {currentPage === "home" && <Home onNavigate={navigate} onOpenSearch={openSearch} />}
        {currentPage === "home-b" && <HomeB onNavigate={navigate} onOpenSearch={openSearch} />}
        {currentPage === "home-c" && <HomeC onNavigate={navigate} onOpenSearch={openSearch} />}
        {currentPage === "api-keys" && <ApiKeys onNavigate={navigate} onOpenSearch={openSearch} />}
        {currentPage === "docs" && <OpenAlvaDocs onNavigate={navigate} onOpenSearch={openSearch} />}
        {currentPage === "skills" && <Skills onNavigate={navigate} onOpenSearch={openSearch} />}
        {currentPage === "explore" && <Explore onNavigate={navigate} onOpenSearch={openSearch} />}
        {currentPage === "library" && <Library onNavigate={navigate} onOpenSearch={openSearch} />}
        {currentPage === "dashboard" && <Dashboard onNavigate={navigate} />}
        {currentPage === "workspace" && <DashboardWorkspace onNavigate={navigate} />}
        {currentPage === "test" && <DashboardTest onNavigate={navigate} />}
        {currentPage === "nvda" && <NVDADashboard onNavigate={navigate} />}
        {currentPage === "popular-stock" && <DashboardPopularStock onNavigate={navigate} />}
        {currentPage === "tsla-overview" && <DashboardTSLAOverview onNavigate={navigate} />}
        {currentPage === "tsla-tracking" && <DashboardTSLATracking onNavigate={navigate} />}
        {currentPage === "playbook-detail" && <PlaybookDetail onNavigate={navigate} />}
        {currentPage === "user-profile" && <UserProfile onNavigate={navigate} />}
      </Suspense>
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
