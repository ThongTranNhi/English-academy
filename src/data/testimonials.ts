import type { Testimonial } from "@/types";

/**
 * Dữ liệu mẫu cho giai đoạn frontend. Trước khi đưa lên production,
 * thay bằng phản hồi thật đã được học viên đồng ý công khai, và chỉ đặt
 * `verified: true` khi đã đối chiếu kết quả (bảng điểm, chứng chỉ).
 */
export const testimonials: Testimonial[] = [
  {
    id: "t1", name: "Hoàng Thảo Vy", role: "Sinh viên năm 3", courseSlug: "ielts-foundation-5-0", tone: "indigo", verified: true,
    quote: "Lần đầu tiên mình hiểu tại sao bài Writing bị chấm thấp. Cô Minh Anh chữa từng câu và chỉ rõ tiêu chí nào cần cải thiện.",
    result: "IELTS 5.0 → 6.5 sau 4 tháng",
  },
  {
    id: "t2", name: "Đỗ Minh Quân", role: "Kỹ sư phần mềm", courseSlug: "toeic-650-plus", tone: "cyan", verified: true,
    quote: "Lịch học linh hoạt, bài tập chia theo từng Part nên mình học được cả lúc nghỉ trưa ở công ty.",
    result: "TOEIC 480 → 785",
  },
  {
    id: "t3", name: "Nguyễn Thị Hồng", role: "Nhân viên kinh doanh", courseSlug: "everyday-communication", tone: "amber", verified: true,
    quote: "Trước đây mình rất ngại nói. Sau khóa học, mình đã tự tin gọi điện cho đối tác nước ngoài.",
    result: "Hoàn thành 30/30 bài, chứng nhận khóa học",
  },
  {
    id: "t4", name: "Trần Gia Huy", role: "Học sinh lớp 11", courseSlug: "english-foundation-a1", tone: "emerald", verified: false,
    quote: "Bài học ngắn, có flashcard ôn mỗi ngày nên mình không bị nản như khi tự học.",
    result: "Lên trình độ A2 sau 10 tuần",
  },
];
