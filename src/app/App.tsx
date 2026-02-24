import { useState } from "react";
import Home from "@/imports/Home";
import Explore from "@/imports/Explore";
import Library from "@/imports/Library";
import DashboardWrapper from "@/app/components/DashboardWrapper";
import { DashboardWorkspaceWrapper } from "@/imports/DashboardWorkspaceWrapper";
import { DashboardTestWrapper } from "@/imports/DashboardTestWrapper";
import SearchModal from "@/app/components/SearchModal";

export type Page = "home" | "explore" | "library" | "dashboard" | "workspace" | "test";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      {currentPage === "home" && <Home onNavigate={setCurrentPage} onOpenSearch={() => setIsSearchOpen(true)} />}
      {currentPage === "explore" && <Explore onNavigate={setCurrentPage} onOpenSearch={() => setIsSearchOpen(true)} />}
      {currentPage === "library" && <Library onNavigate={setCurrentPage} onOpenSearch={() => setIsSearchOpen(true)} />}
      {currentPage === "dashboard" && <DashboardWrapper onNavigate={setCurrentPage} onOpenSearch={() => setIsSearchOpen(true)} />}
      {currentPage === "workspace" && <DashboardWorkspaceWrapper onNavigate={setCurrentPage} />}
      {currentPage === "test" && <DashboardTestWrapper onNavigate={setCurrentPage} />}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}