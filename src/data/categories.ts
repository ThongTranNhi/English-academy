import type { Category, CourseCategory } from "@/types";

export const courseCategoryLabels: Record<CourseCategory, string> = {
  general: "General English",
  ielts: "IELTS",
  toeic: "TOEIC",
  communication: "Giao tiếp",
  business: "Tiếng Anh thương mại",
};

export const homeCategories: Category[] = [
  { key: "ielts", label: "IELTS", description: "Luyện thi band 5.0 – 7.5+", href: "/courses?category=ielts", icon: "Trophy", tone: "indigo" },
  { key: "toeic", label: "TOEIC", description: "Listening & Reading 450 – 850+", href: "/courses?category=toeic", icon: "Target", tone: "cyan" },
  { key: "communication", label: "Giao tiếp", description: "Phản xạ nói tự nhiên", href: "/courses?category=communication", icon: "MessagesSquare", tone: "amber" },
  { key: "grammar", label: "Grammar", description: "Bài học & bài tập ngữ pháp", href: "/grammar", icon: "BookText", tone: "emerald" },
  { key: "vocabulary", label: "Vocabulary", description: "Flashcard & quiz theo chủ đề", href: "/vocabulary", icon: "Languages", tone: "rose" },
  { key: "skills", label: "4 kỹ năng", description: "Nghe – Nói – Đọc – Viết", href: "/practice", icon: "Sparkles", tone: "navy" },
];
