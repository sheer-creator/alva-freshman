import { DashboardTest } from "./DashboardTest";
import type { Page } from "@/app/App";

interface Props {
  onNavigate: (page: Page) => void;
}

export function DashboardTestWrapper({ onNavigate }: Props) {
  return <DashboardTest onNavigate={onNavigate} />;
}
