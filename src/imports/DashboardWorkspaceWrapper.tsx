import { DashboardWorkspace } from "./DashboardWorkspace";
import type { Page } from "@/app/App";

interface Props {
  onNavigate: (page: Page) => void;
}

export function DashboardWorkspaceWrapper({ onNavigate }: Props) {
  return <DashboardWorkspace onNavigate={onNavigate} />;
}
