import { usePageMeta } from "@/hooks/usePageMeta";
import { HeroSection } from "@/features/home/HeroSection";
import { CategoriesSection } from "@/features/home/CategoriesSection";
import { FeaturedCoursesSection } from "@/features/home/FeaturedCoursesSection";
import { CefrSection } from "@/features/home/CefrSection";
import { FreeLearningSection } from "@/features/home/FreeLearningSection";
import { SkillsSection } from "@/features/home/SkillsSection";
import { VocabGrammarSection } from "@/features/home/VocabGrammarSection";
import { TeachersSection } from "@/features/home/TeachersSection";
import { LibrarySection } from "@/features/home/LibrarySection";
import { TestimonialsSection } from "@/features/home/TestimonialsSection";
import { CtaSection } from "@/features/home/CtaSection";
import { StartHereSection } from "@/features/home/StartHereSection";
import { AcademyStorySection } from "@/features/home/AcademyStorySection";
import { LumiChallengeSection } from "@/features/home/LumiChallengeSection";

export default function HomePage() {
  usePageMeta("", "English Academy: học tiếng Anh trực tuyến cùng giảng viên chuyên môn. IELTS, TOEIC, giao tiếp, lộ trình CEFR A1–C2.");
  return (
    <>
      <HeroSection />
      <StartHereSection />
      <LumiChallengeSection />
      <CategoriesSection />
      <AcademyStorySection />
      <FeaturedCoursesSection />
      <CefrSection />
      <FreeLearningSection />
      <SkillsSection />
      <VocabGrammarSection />
      <TeachersSection />
      <LibrarySection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
