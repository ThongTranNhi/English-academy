import {
  BookOpen, BookText, Briefcase, Ear, FileText, GraduationCap, Headphones, Languages, Mic, MessagesSquare,
  NotebookPen, PenLine, Plane, Podcast, Puzzle, Sparkles, Target, Trophy, Video, Utensils, Laptop, Leaf,
  HeartPulse, ShoppingBag, Users, Dumbbell, CloudSun, Building2, Smile, Newspaper, TrendingUp, type LucideIcon,
} from "lucide-react";

/** Map tên icon trong dữ liệu mẫu sang component Lucide. */
export const iconMap: Record<string, LucideIcon> = {
  BookOpen, BookText, Briefcase, Ear, FileText, GraduationCap, Headphones, Languages, Mic, MessagesSquare,
  NotebookPen, PenLine, Plane, Podcast, Puzzle, Sparkles, Target, Trophy, Video, Utensils, Laptop, Leaf, HeartPulse,
  ShoppingBag, Users, Dumbbell, CloudSun, Building2, Smile, Newspaper, TrendingUp,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? BookOpen;
}
