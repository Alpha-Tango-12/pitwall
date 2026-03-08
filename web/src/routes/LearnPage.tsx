import { useAppStore } from "@/stores/app-store";
import { PageHeader } from "@/components/layout/PageHeader";
import { LearnSectionNav } from "@/components/learn/LearnSectionNav";
import { GlossarySection } from "@/components/learn/GlossarySection";
import { FlagsSection } from "@/components/learn/FlagsSection";
import { WeekendSection } from "@/components/learn/WeekendSection";
import { StrategySection } from "@/components/learn/StrategySection";
import { PointsSection } from "@/components/learn/PointsSection";

export function LearnPage() {
  const learnSection = useAppStore((state) => state.learnSection);
  const setLearnSection = useAppStore((state) => state.setLearnSection);

  return (
    <div>
      <PageHeader
        title="Learn F1"
        subtitle="Understand the sport — flags, strategy, and everything in between."
      />
      <div className="space-y-4">
        <LearnSectionNav active={learnSection} onChange={setLearnSection} />
        {learnSection === "glossary" && <GlossarySection />}
        {learnSection === "flags" && <FlagsSection />}
        {learnSection === "weekend" && <WeekendSection />}
        {learnSection === "strategy" && <StrategySection />}
        {learnSection === "points" && <PointsSection />}
      </div>
    </div>
  );
}
