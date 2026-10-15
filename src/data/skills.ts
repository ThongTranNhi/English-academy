import type { Skill, SkillInfo } from "@/types";

export const skills: SkillInfo[] = [
  {
    skill: "listening", label: "Luyện nghe", english: "Listening", icon: "Headphones", tone: "cyan",
    description: "Nghe hội thoại, bản tin và podcast có transcript, luyện nghe ý chính và chi tiết.",
    tips: ["Nghe 3 lần: ý chính → chi tiết → shadowing", "Đọc trước câu hỏi, gạch chân từ khóa", "Ghi chép bằng ký hiệu ngắn"],
    exercises: [
      { id: "l1", title: "Form Completion: Booking a Hotel", level: "B1", format: "IELTS Listening Part 1", durationMinutes: 10, description: "Điền thông tin đặt phòng khách sạn." },
      { id: "l2", title: "Daily Conversations: At the Café", level: "A2", format: "Hội thoại ngắn", durationMinutes: 6, description: "Nghe và chọn đáp án đúng." },
      { id: "l3", title: "Lecture: Climate & Cities", level: "C1", format: "IELTS Listening Part 4", durationMinutes: 12, description: "Bài giảng học thuật, điền từ vào ghi chú." },
      { id: "l4", title: "TOEIC Part 3: Office Talk", level: "B1", format: "TOEIC Listening", durationMinutes: 9, description: "Hội thoại 3 người tại văn phòng." },
      { id: "l5", title: "Numbers & Spelling Dictation", level: "A1", format: "Nghe chép", durationMinutes: 5, description: "Nghe và viết số điện thoại, tên riêng." },
      { id: "l6", title: "Podcast: The Science of Sleep", level: "B2", format: "Podcast", durationMinutes: 14, description: "Nghe ý chính và ghi chú chi tiết." },
      { id: "l7", title: "Panel Discussion: Future of Work", level: "C2", format: "Thảo luận học thuật", durationMinutes: 16, description: "Nhận diện quan điểm của từng diễn giả." },
    ],
  },
  {
    skill: "speaking", label: "Luyện nói", english: "Speaking", icon: "Mic", tone: "amber",
    description: "Luyện phản xạ, phát âm và trả lời theo chủ đề IELTS Speaking và giao tiếp.",
    tips: ["Trả lời mở rộng: ý chính + lý do + ví dụ", "Ghi âm lại và tự nghe", "Shadowing 10 phút mỗi ngày"],
    exercises: [
      { id: "s1", title: "Part 1: Hometown & Daily Routine", level: "B1", format: "IELTS Speaking Part 1", durationMinutes: 8, description: "Trả lời 6 câu hỏi ngắn về bản thân." },
      { id: "s2", title: "Describe a memorable trip", level: "B2", format: "IELTS Speaking Part 2", durationMinutes: 4, description: "Cue card: 1 phút chuẩn bị, 2 phút nói." },
      { id: "s3", title: "Shadowing: Ordering Coffee", level: "A2", format: "Shadowing", durationMinutes: 5, description: "Nhại lại hội thoại theo tốc độ người bản ngữ." },
      { id: "s4", title: "Debate: Remote Work", level: "C1", format: "Thảo luận", durationMinutes: 10, description: "Trình bày quan điểm và phản biện." },
      { id: "s5", title: "Introduce Yourself", level: "A1", format: "Giới thiệu bản thân", durationMinutes: 4, description: "Nói 5 câu về tên, tuổi, sở thích." },
      { id: "s6", title: "Part 3: Technology & Society", level: "B2", format: "IELTS Speaking Part 3", durationMinutes: 8, description: "Trả lời câu hỏi thảo luận có lập luận." },
      { id: "s7", title: "Persuasive Pitch", level: "C2", format: "Thuyết trình ngắn", durationMinutes: 6, description: "Thuyết phục nhà đầu tư trong 90 giây." },
    ],
  },
  {
    skill: "reading", label: "Luyện đọc", english: "Reading", icon: "BookOpen", tone: "indigo",
    description: "Đọc hiểu bài báo, câu chuyện và đề IELTS/TOEIC theo cấp độ.",
    tips: ["Skim tiêu đề và câu chủ đề trước", "Scan tìm tên riêng, số liệu", "Đoán nghĩa từ qua ngữ cảnh"],
    exercises: [
      { id: "r1", title: "True / False / Not Given: Coffee History", level: "B2", format: "IELTS Reading", durationMinutes: 20, description: "13 câu hỏi về lịch sử cà phê." },
      { id: "r2", title: "Short Story: The Lost Key", level: "A2", format: "Đọc truyện", durationMinutes: 8, description: "Truyện ngắn có chú thích từ vựng." },
      { id: "r3", title: "Matching Headings: Smart Cities", level: "B2", format: "IELTS Reading", durationMinutes: 18, description: "Ghép tiêu đề với đoạn văn." },
      { id: "r4", title: "TOEIC Part 7: Emails & Notices", level: "B1", format: "TOEIC Reading", durationMinutes: 15, description: "Đọc email, thông báo và trả lời câu hỏi." },
      { id: "r5", title: "Signs & Notices", level: "A1", format: "Đọc biển báo", durationMinutes: 5, description: "Hiểu biển báo, thực đơn và lịch trình đơn giản." },
      { id: "r6", title: "Opinion Article: Fast Fashion", level: "C1", format: "Đọc phản biện", durationMinutes: 20, description: "Xác định lập luận và giọng điệu tác giả." },
      { id: "r7", title: "Literary Extract: Classic Novel", level: "C2", format: "Đọc văn học", durationMinutes: 25, description: "Phân tích ẩn ý và biện pháp tu từ." },
    ],
  },
  {
    skill: "writing", label: "Luyện viết", english: "Writing", icon: "PenLine", tone: "emerald",
    description: "Viết đoạn văn, email và bài luận IELTS theo cấu trúc, kèm bài mẫu.",
    tips: ["Lập dàn ý 5 phút trước khi viết", "Mỗi đoạn một ý chính rõ ràng", "Dành 3 phút cuối để soát lỗi"],
    exercises: [
      { id: "w1", title: "Task 1: Line Graph – Internet Users", level: "B2", format: "IELTS Writing Task 1", durationMinutes: 20, description: "Mô tả xu hướng trong biểu đồ đường." },
      { id: "w2", title: "Task 2: Opinion – Online Learning", level: "B2", format: "IELTS Writing Task 2", durationMinutes: 40, description: "Đồng ý hay không đồng ý về học trực tuyến." },
      { id: "w3", title: "Email: Asking for Information", level: "A2", format: "Email", durationMinutes: 15, description: "Viết email hỏi thông tin khóa học." },
      { id: "w4", title: "Paragraph: My Favourite Place", level: "A1", format: "Đoạn văn", durationMinutes: 10, description: "Viết 80–100 từ về một địa điểm yêu thích." },
      { id: "w5", title: "Story: An Unexpected Day", level: "B1", format: "Viết truyện ngắn", durationMinutes: 25, description: "Kể chuyện bằng thì quá khứ và từ nối thời gian." },
      { id: "w6", title: "Report: Survey Results", level: "C1", format: "Báo cáo", durationMinutes: 35, description: "Trình bày kết quả khảo sát và đề xuất." },
      { id: "w7", title: "Essay: The Value of Art", level: "C2", format: "Bài luận học thuật", durationMinutes: 45, description: "Lập luận đa chiều với văn phong học thuật." },
    ],
  },
];

export const getSkill = (skill: Skill) => skills.find((s) => s.skill === skill)!;
