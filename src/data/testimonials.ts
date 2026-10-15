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
  {
    id: "t5", name: "Lý Minh Khôi", role: "Chuyên viên phân tích dữ liệu", courseSlug: "ielts-advanced-7-5", tone: "navy", verified: true,
    quote: "Mỗi tuần một đề full test và được chữa kỹ từng câu sai. Cô Khánh Linh chỉ ra đúng thói quen làm bài khiến mình mất điểm Reading.",
    result: "IELTS 7.0 → 8.0 sau 3 tháng",
  },
  {
    id: "t6", name: "Phan Ngọc Trâm", role: "Sinh viên năm cuối", courseSlug: "ielts-speaking-intensive", tone: "amber", verified: true,
    quote: "Thầy James không bắt học thuộc mẫu câu mà dạy cách nói như đang trò chuyện. Mình bớt run hẳn khi vào phòng thi.",
    result: "Speaking 5.5 → 7.0",
  },
  {
    id: "t7", name: "Vũ Thành Đạt", role: "Kế toán", courseSlug: "toeic-master-850", tone: "emerald", verified: true,
    quote: "Phần đoạn đọc ba trước đây mình toàn bỏ. Sau khóa học mình làm kịp hết Part 7 mà vẫn còn 5 phút soát lại.",
    result: "TOEIC 690 → 880",
  },
  {
    id: "t8", name: "Chị Lê Thanh Mai", role: "Phụ huynh bé Bông, 7 tuổi", courseSlug: "kids-english-starters", tone: "rose", verified: false,
    quote: "Bé nhà mình tối nào cũng đòi mở bài hát của cô Bảo Châu. Báo cáo hằng tuần giúp mình biết con đang học đến đâu.",
    result: "Bé tự giới thiệu bản thân bằng tiếng Anh sau 2 tháng",
  },
  {
    id: "t9", name: "Ngô Quốc Thái", role: "Kỹ sư cơ khí", courseSlug: "job-interview-english", tone: "indigo", verified: true,
    quote: "Buổi phỏng vấn thử có ghi hình giúp mình thấy mình nói lan man thế nào. Áp dụng khung STAR xong, mình đậu vòng phỏng vấn công ty Nhật.",
    result: "Nhận offer từ công ty đa quốc gia",
  },
  {
    id: "t10", name: "Đặng Thùy Linh", role: "Hướng dẫn viên du lịch", courseSlug: "travel-english", tone: "cyan", verified: false,
    quote: "Thầy Michael kể rất nhiều chuyện thật khi đi du lịch, học không chán chút nào. Giờ mình tự tin dẫn đoàn khách nước ngoài.",
    result: "Hoàn thành khóa học trong 5 tuần",
  },
  {
    id: "t11", name: "Trương Hải Yến", role: "Trưởng nhóm marketing", courseSlug: "presentation-skills", tone: "amber", verified: true,
    quote: "Bài thuyết trình cuối khóa của mình được sếp người Úc khen là rõ ràng và cuốn hút. Phần hỏi đáp không còn đáng sợ nữa.",
    result: "Thuyết trình trước ban giám đốc khu vực",
  },
  {
    id: "t12", name: "Hồ Gia Bảo", role: "Học sinh lớp 8", courseSlug: "teens-english-a2", tone: "emerald", verified: false,
    quote: "Trước em hay nhầm các thì, giờ làm bài kiểm tra trên lớp được 9 điểm. Các bài tập ngắn nên em làm mỗi tối được.",
    result: "Điểm tiếng Anh học kỳ từ 6.5 lên 9.0",
  },
];
