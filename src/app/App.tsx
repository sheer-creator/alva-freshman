import { useState } from "react";
import Home from "@/imports/Home";
import Explore from "@/imports/Explore";
import Library from "@/imports/Library";
import DashboardWrapper from "@/app/components/DashboardWrapper";
import SearchModal from "@/app/components/SearchModal";

export type Page = "home" | "explore" | "library" | "dashboard";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      {currentPage === "home" && <Home onNavigate={setCurrentPage} onOpenSearch={() => setIsSearchOpen(true)} />}
      {currentPage === "explore" && <Explore onNavigate={setCurrentPage} onOpenSearch={() => setIsSearchOpen(true)} />}
      {currentPage === "library" && <Library onNavigate={setCurrentPage} onOpenSearch={() => setIsSearchOpen(true)} />}
      {currentPage === "dashboard" && <DashboardWrapper onNavigate={setCurrentPage} onOpenSearch={() => setIsSearchOpen(true)} />}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}