import type { CefrInfo } from "@/types";

export const cefrLevels: CefrInfo[] = [
  {
    level: "A1", name: "Beginner", weeks: 8, tone: "emerald",
    goal: "Giới thiệu bản thân và trao đổi những thông tin rất cơ bản.",
    canDo: ["Chào hỏi, giới thiệu tên, tuổi, quê quán", "Hiểu câu ngắn, chậm về chủ đề quen thuộc", "Điền biểu mẫu đơn giản"],
    contents: ["Bảng chữ cái & phát âm cơ bản", "Thì hiện tại đơn, to be", "500 từ vựng thông dụng"],
  },
  {
    level: "A2", name: "Elementary", weeks: 10, tone: "cyan",
    goal: "Giao tiếp trong các tình huống hằng ngày quen thuộc.",
    canDo: ["Mua sắm, hỏi đường, gọi món", "Kể lại sự việc đã xảy ra", "Viết tin nhắn, email ngắn"],
    contents: ["Quá khứ đơn, tương lai gần", "So sánh hơn – nhất", "1.000 từ vựng theo chủ đề"],
  },
  {
    level: "B1", name: "Intermediate", weeks: 12, tone: "indigo",
    goal: "Xử lý phần lớn tình huống khi du lịch, học tập và làm việc.",
    canDo: ["Trình bày ý kiến và lý do", "Hiểu ý chính bản tin, podcast chậm", "Viết đoạn văn mạch lạc"],
    contents: ["Hiện tại hoàn thành, câu điều kiện 1–2", "Mệnh đề quan hệ", "Kỹ năng nghe ý chính"],
  },
  {
    level: "B2", name: "Upper-Intermediate", weeks: 14, tone: "amber",
    goal: "Trao đổi trôi chảy với người bản ngữ về nhiều chủ đề.",
    canDo: ["Thảo luận, tranh luận có lập luận", "Đọc hiểu bài báo, bài phân tích", "Viết bài luận có cấu trúc"],
    contents: ["Câu bị động, câu tường thuật", "Collocations & idioms phổ biến", "Viết luận nghị luận"],
  },
  {
    level: "C1", name: "Advanced", weeks: 16, tone: "rose",
    goal: "Sử dụng tiếng Anh linh hoạt trong học thuật và công việc chuyên môn.",
    canDo: ["Thuyết trình chuyên sâu", "Hiểu hàm ý trong văn bản dài", "Viết báo cáo, đề xuất"],
    contents: ["Đảo ngữ, câu chẻ", "Từ vựng học thuật (AWL)", "Kỹ năng tóm tắt, diễn giải"],
  },
  {
    level: "C2", name: "Proficiency", weeks: 16, tone: "navy",
    goal: "Sử dụng tiếng Anh gần như người bản ngữ, chính xác và tinh tế.",
    canDo: ["Hiểu gần như mọi thứ nghe và đọc được", "Diễn đạt sắc thái nghĩa tinh tế", "Viết văn bản phức tạp, phong cách"],
    contents: ["Văn phong & sắc thái", "Thành ngữ, ẩn dụ nâng cao", "Phân tích diễn ngôn"],
  },
];
