import { lazy } from "react";

// Trang chủ tải ngay (xem router.tsx); các trang còn lại tách bundle và lazy-load.
export const CoursesPage = lazy(() => import("@/pages/CoursesPage"));
export const CourseDetailPage = lazy(() => import("@/pages/CourseDetailPage"));
export const LearningPage = lazy(() => import("@/pages/LearningPage"));
export const LearningPathsPage = lazy(() => import("@/pages/LearningPathsPage"));
export const PracticePage = lazy(() => import("@/pages/PracticePage"));
export const VocabularyPage = lazy(() => import("@/pages/VocabularyPage"));
export const GrammarPage = lazy(() => import("@/pages/GrammarPage"));
export const LibraryPage = lazy(() => import("@/pages/LibraryPage"));
export const TeachersPage = lazy(() => import("@/pages/TeachersPage"));
export const TeacherDetailPage = lazy(() => import("@/pages/TeacherDetailPage"));
export const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
export const LoginPage = lazy(() => import("@/pages/LoginPage"));
export const RegisterPage = lazy(() => import("@/pages/RegisterPage"));
export const SearchPage = lazy(() => import("@/pages/SearchPage"));
export const InfoPage = lazy(() => import("@/pages/InfoPage"));
export const PlacementTestPage = lazy(() => import("@/pages/PlacementTestPage"));
export const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));
export const ListeningPage = lazy(() => import("@/pages/SkillPages").then((m) => ({ default: m.ListeningPage })));
export const SpeakingPage = lazy(() => import("@/pages/SkillPages").then((m) => ({ default: m.SpeakingPage })));
export const ReadingPage = lazy(() => import("@/pages/SkillPages").then((m) => ({ default: m.ReadingPage })));
export const WritingPage = lazy(() => import("@/pages/SkillPages").then((m) => ({ default: m.WritingPage })));
