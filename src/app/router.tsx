import { createBrowserRouter } from "react-router";
import { MainLayout } from "@/components/layout/MainLayout";
import HomePage from "@/pages/HomePage";
import {
  CoursesPage, CourseDetailPage, LearningPage, LearningPathsPage, PracticePage, VocabularyPage, GrammarPage,
  LibraryPage, TeachersPage, TeacherDetailPage, DashboardPage, LoginPage, RegisterPage, SearchPage, InfoPage,
  NotFoundPage, ListeningPage, SpeakingPage, ReadingPage, WritingPage,
} from "./lazyPages";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/courses", element: <CoursesPage /> },
      { path: "/courses/:slug", element: <CourseDetailPage /> },
      { path: "/learning/:slug", element: <LearningPage /> },
      { path: "/learning-paths", element: <LearningPathsPage /> },
      { path: "/listening", element: <ListeningPage /> },
      { path: "/speaking", element: <SpeakingPage /> },
      { path: "/reading", element: <ReadingPage /> },
      { path: "/writing", element: <WritingPage /> },
      { path: "/vocabulary", element: <VocabularyPage /> },
      { path: "/grammar", element: <GrammarPage /> },
      { path: "/practice", element: <PracticePage /> },
      { path: "/library", element: <LibraryPage /> },
      { path: "/teachers", element: <TeachersPage /> },
      { path: "/teachers/:slug", element: <TeacherDetailPage /> },
      { path: "/dashboard", element: <DashboardPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/search", element: <SearchPage /> },
      { path: "/help/:slug", element: <InfoPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
