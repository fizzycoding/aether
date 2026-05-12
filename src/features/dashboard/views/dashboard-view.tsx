import { PageHeader } from "@/components/page-header";
import { HeroPattern } from "@/features/dashboard/components/hero-pattern";
import { DashboardHeader } from "../components/dashboard-header";
import { TextInputPannel } from "../components/text-input-pannel";
import { QuickActionsPanel } from "../components/quick-actions-panel";

export function DashboardView() {
  return (
    <div className="relative">
      <PageHeader title="Dashboard" className="lg:hidden" />
      <HeroPattern />
      <div className="relative z-10 space-y-8 p-4 lg:p-16">
        <DashboardHeader />
        <TextInputPannel />
        <QuickActionsPanel />
      </div>
    </div>
  );
}
