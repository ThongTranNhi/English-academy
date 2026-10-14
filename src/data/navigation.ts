import type { NavItem } from "@/types";

export const mainNav: NavItem[] = [
  {
    label: "Khóa học",
    href: "/courses",
    children: [
      { label: "General English", href: "/courses?category=general", description: "Tiếng Anh tổng quát theo CEFR" },
      { label: "IELTS", href: "/courses?category=ielts", description: "Luyện thi band 5.0 – 7.5+" },
      { label: "TOEIC", href: "/courses?category=toeic", description: "Listening & Reading 450 – 850+" },
      { label: "Giao tiếp", href: "/courses?category=communication", description: "Phản xạ và phát âm" },
      { label: "Tiếng Anh thương mại", href: "/courses?category=business", description: "Email, họp, thuyết trình" },
    ],
  },
  {
    label: "Lộ trình",
    href: "/learning-paths",
    children: ["A1", "A2", "B1", "B2", "C1", "C2"].map((lv) => ({
      label: `Cấp độ ${lv}`,
      href: `/learning-paths#${lv.toLowerCase()}`,
    })),
  },
  {
    label: "Luyện tập",
    href: "/practice",
    children: [
      { label: "Listening", href: "/listening", description: "Luyện nghe có transcript" },
      { label: "Speaking", href: "/speaking", description: "Phản xạ & phát âm" },
      { label: "Reading", href: "/reading", description: "Đọc hiểu theo cấp độ" },
      { label: "Writing", href: "/writing", description: "Bài luận, email, đoạn văn" },
    ],
  },
  {
    label: "Từ vựng",
    href: "/vocabulary",
    children: [
      { label: "Chủ đề", href: "/vocabulary#topics", description: "Từ vựng theo chủ đề" },
      { label: "Flashcard", href: "/vocabulary#flashcard", description: "Lật thẻ ghi nhớ" },
      { label: "Quiz", href: "/vocabulary#quiz", description: "Kiểm tra nhanh" },
    ],
  },
  {
    label: "Ngữ pháp",
    href: "/grammar",
    children: [
      { label: "Bài học", href: "/grammar#lessons", description: "Cấu trúc & ví dụ" },
      { label: "Bài tập", href: "/grammar#exercises", description: "Thực hành có giải thích" },
    ],
  },
  {
    label: "Thư viện",
    href: "/library",
    children: [
      { label: "Video", href: "/library?type=video" },
      { label: "Audio", href: "/library?type=audio" },
      { label: "Podcast", href: "/library?type=podcast" },
      { label: "Transcript", href: "/library?type=transcript" },
      { label: "Tài liệu", href: "/library?type=document" },
    ],
  },
  { label: "Giảng viên", href: "/teachers" },
];

export const footerColumns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Khóa học",
    links: [
      { label: "Tất cả khóa học", href: "/courses" },
      { label: "Lộ trình CEFR", href: "/learning-paths" },
      { label: "Luyện thi IELTS", href: "/courses?category=ielts" },
      { label: "Luyện thi TOEIC", href: "/courses?category=toeic" },
    ],
  },
  {
    title: "Học miễn phí",
    links: [
      { label: "Bài học miễn phí", href: "/library" },
      { label: "Thư viện", href: "/library" },
      { label: "Podcast", href: "/library?type=podcast" },
      { label: "Từ vựng & Flashcard", href: "/vocabulary" },
    ],
  },
  {
    title: "Học viện",
    links: [
      { label: "Giảng viên", href: "/teachers" },
      { label: "Về học viện", href: "/help/about" },
      { label: "Liên hệ", href: "/help/contact" },
    ],
  },
  {
    title: "Hỗ trợ",
    links: [
      { label: "FAQ", href: "/help/faq" },
      { label: "Điều khoản sử dụng", href: "/help/terms" },
      { label: "Chính sách bảo mật", href: "/help/privacy" },
      { label: "Chính sách hoàn phí", href: "/help/refund" },
    ],
  },
];
