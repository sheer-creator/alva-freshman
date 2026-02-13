import { useState } from "react";
import Dashboard from "@/imports/Dashboard";
import type { Page } from "@/app/App";

interface DashboardWrapperProps {
  onNavigate?: (page: Page) => void;
  onOpenSearch?: () => void;
}

export default function DashboardWrapper({ onNavigate, onOpenSearch }: DashboardWrapperProps) {
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);

  const handleNavigateToHome = () => {
    onNavigate?.("home");
  };

  const handleNavigateToExplore = () => {
    onNavigate?.("explore");
  };

  const handleNavigateToLibrary = () => {
    onNavigate?.("library");
  };

  const handleSearchClick = () => {
    onOpenSearch?.();
  };

  const handleAboutClick = () => {
    window.open("https://alva.ai/landing", "_blank");
  };

  return (
    <Dashboard
      onNavigateToHome={handleNavigateToHome}
      onNavigateToExplore={handleNavigateToExplore}
      onNavigateToLibrary={handleNavigateToLibrary}
      onSearchClick={handleSearchClick}
      onAboutClick={handleAboutClick}
      isUserInfoOpen={isUserInfoOpen}
      onUserInfoToggle={() => setIsUserInfoOpen(!isUserInfoOpen)}
      onUserInfoClose={() => setIsUserInfoOpen(false)}
    />
  );
}
