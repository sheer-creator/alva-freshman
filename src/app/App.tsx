import { lazy, Suspense, useState } from "react";
import SearchModal from "@/app/components/SearchModal";

export type Page = "home" | "explore" | "library" | "dashboard" | "workspace" | "test" | "nvda";

/* ========== 按需加载页面 ========== */

const Home = lazy(() => import("@/pages/Home"));
const Explore = lazy(() => import("@/pages/Explore"));
const Library = lazy(() => import("@/pages/Library"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const DashboardWorkspace = lazy(() => import("@/pages/DashboardWorkspace").then(m => ({ default: m.DashboardWorkspace })));
const DashboardTest = lazy(() => import("@/pages/DashboardTest").then(m => ({ default: m.DashboardTest })));
const NVDADashboard = lazy(() => import("@/pages/NVDADashboard"));

/* ========== App ========== */

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const openSearch = () => setIsSearchOpen(true);

  return (
    <>
      <Suspense>
        {currentPage === "home" && <Home onNavigate={setCurrentPage} onOpenSearch={openSearch} />}
        {currentPage === "explore" && <Explore onNavigate={setCurrentPage} onOpenSearch={openSearch} />}
        {currentPage === "library" && <Library onNavigate={setCurrentPage} onOpenSearch={openSearch} />}
        {currentPage === "dashboard" && <Dashboard onNavigate={setCurrentPage} />}
        {currentPage === "workspace" && <DashboardWorkspace onNavigate={setCurrentPage} />}
        {currentPage === "test" && <DashboardTest onNavigate={setCurrentPage} />}
        {currentPage === "nvda" && <NVDADashboard onNavigate={setCurrentPage} />}
      </Suspense>
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
