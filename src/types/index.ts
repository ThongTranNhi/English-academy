export type CefrLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
export type Skill = "listening" | "speaking" | "reading" | "writing";
export type CourseCategory = "general" | "ielts" | "toeic" | "communication" | "business";
export type Tone = "indigo" | "cyan" | "amber" | "navy" | "emerald" | "rose";

export interface Teacher {
  slug: string;
  /** Avatar minh họa trong public/images/teachers; thiếu thì hiện chữ cái viết tắt. */
  photo?: string;
  name: string;
  title: string;
  specialties: string[];
  certificates: string[];
  experienceYears: number;
  bio: string;
  rating: number;
  students: number;
  tone: Tone;
}

export interface CourseModule {
  title: string;
  lessonSlugs: string[];
}

export interface Course {
  slug: string;
  title: string;
  /** Ảnh bìa trong public/images/courses; thiếu thì dùng ảnh bìa gradient. */
  image?: string;
  category: CourseCategory;
  level: CefrLevel;
  teacherSlug: string;
  shortDescription: string;
  description: string;
  lessonsCount: number;
  durationHours: number;
  price: number;
  originalPrice?: number;
  badge?: "Bestseller" | "Mới" | "Học thử miễn phí";
  rating: number;
  students: number;
  outcomes: string[];
  modules: CourseModule[];
  tone: Tone;
  featured?: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  answer: number;
  explanation?: string;
}

export interface Lesson {
  slug: string;
  courseSlug: string;
  title: string;
  type: "video" | "audio" | "reading" | "exercise";
  durationMinutes: number;
  summary: string;
  content: string[];
  transcript?: { time: string; text: string }[];
  vocabulary?: { word: string; meaning: string }[];
  quiz?: QuizQuestion[];
  free?: boolean;
}

export interface Category {
  key: string;
  label: string;
  description: string;
  href: string;
  icon: string;
  tone: Tone;
}

export interface CefrInfo {
  level: CefrLevel;
  name: string;
  goal: string;
  canDo: string[];
  contents: string[];
  weeks: number;
  tone: Tone;
}

export type LibraryType = "video" | "audio" | "podcast" | "transcript" | "document" | "blog";

export interface LibraryItem {
  id: string;
  /** Ảnh minh họa trong public/images/library; thiếu thì dùng ảnh bìa gradient. */
  image?: string;
  title: string;
  type: LibraryType;
  level: CefrLevel;
  series?: string;
  duration?: string;
  description: string;
  free: boolean;
  tone: Tone;
}

export interface VocabWord {
  word: string;
  phonetic: string;
  partOfSpeech: string;
  meaning: string;
  example: string;
}

export interface VocabTopic {
  slug: string;
  title: string;
  level: CefrLevel;
  icon: string;
  tone: Tone;
  words: VocabWord[];
}

export interface GrammarLesson {
  slug: string;
  title: string;
  level: CefrLevel;
  summary: string;
  structure: string[];
  examples: string[];
  exercises: QuizQuestion[];
}

export interface SkillExercise {
  id: string;
  title: string;
  level: CefrLevel;
  format: string;
  durationMinutes: number;
  description: string;
}

export interface SkillInfo {
  skill: Skill;
  label: string;
  english: string;
  description: string;
  icon: string;
  tone: Tone;
  tips: string[];
  exercises: SkillExercise[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  courseSlug: string;
  quote: string;
  result: string;
  verified: boolean;
  tone: Tone;
}

export interface NavChild {
  label: string;
  href: string;
  description?: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}
