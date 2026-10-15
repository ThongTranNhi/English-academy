import type { Lesson } from "@/types";

/** Bài học các khóa Tiếng Anh thương mại: Business Essentials, Phỏng vấn, Thuyết trình. */
export const businessLessons: Lesson[] = [
  {
    slug: "biz-email-basics", courseSlug: "business-english-essentials",
    title: "Viết email chuyên nghiệp", type: "reading", durationMinutes: 16, free: true,
    summary: "Cấu trúc email, mở đầu và kết thúc lịch sự.",
    content: [
      "Tiêu đề (subject) cụ thể: “Request: Q3 sales report by Friday” tốt hơn “Report”.",
      "Lời chào: “Dear Mr. Smith,” (trang trọng), “Hi Sarah,” (đồng nghiệp thân).",
      "Câu đầu nêu mục đích: “I'm writing to follow up on our meeting last Tuesday.”",
      "Yêu cầu lịch sự: “Could you please…?”, “I would appreciate it if you could…”.",
      "Kết thư: “Please let me know if you have any questions.” + “Best regards,” / “Kind regards,”.",
    ],
    vocabulary: [
      { word: "follow up on", meaning: "trao đổi tiếp về" },
      { word: "appreciate", meaning: "trân trọng, cảm kích" },
      { word: "attached", meaning: "được đính kèm" },
      { word: "Kind regards", meaning: "Trân trọng (kết thư)" },
    ],
    quiz: [
      { id: "q1", question: "Tiêu đề email nào tốt nhất?", options: ["Hello", "Report", "Request: Q3 sales report by Friday"], answer: 2 },
      { id: "q2", question: "Câu nào lịch sự hơn?", options: ["Send me the file.", "Could you please send me the file?", "File now."], answer: 1 },
      { id: "q3", question: "Kết thư trang trọng phù hợp là:", options: ["Best regards,", "Cheers mate,", "Bye!"], answer: 0 },
    ],
  },
  {
    slug: "biz-meetings", courseSlug: "business-english-essentials",
    title: "Điều phối cuộc họp", type: "video", durationMinutes: 18,
    summary: "Mở đầu, chuyển ý, tổng kết cuộc họp.",
    content: [
      "Mở đầu: “Let's get started. The purpose of today's meeting is to…”.",
      "Mời phát biểu: “Lan, what's your view on this?”, “Does anyone have anything to add?”.",
      "Giữ đúng hướng: “That's a good point, but let's come back to it later.”",
      "Tổng kết: “To sum up, we've agreed to… Hoa will send the minutes by tomorrow.”",
    ],
    transcript: [
      { time: "00:00", speaker: "Chair", text: "Okay everyone, let's get started. The purpose of today's meeting is to plan the product launch." },
      { time: "00:07", speaker: "Chair", text: "First item on the agenda: the launch date. Tuan, what's your view?" },
      { time: "00:12", speaker: "Tuan", text: "I'd suggest the first week of November, after the trade fair." },
      { time: "00:17", speaker: "Chair", text: "Good point. Let's park the budget question for now and come back to it at the end." },
      { time: "00:24", speaker: "Chair", text: "To sum up, we've agreed on November the fifth. Mai will circulate the minutes." },
    ],
    vocabulary: [
      { word: "agenda item", meaning: "mục trong chương trình họp" },
      { word: "park (a topic)", meaning: "tạm gác (một vấn đề)" },
      { word: "circulate", meaning: "gửi cho mọi người" },
      { word: "launch", meaning: "ra mắt" },
    ],
    quiz: [
      { id: "q1", question: "Ngày ra mắt được chốt là?", options: ["1/11", "5/11", "Tuần sau hội chợ"], answer: 1 },
      { id: "q2", question: "“Let's park the budget question” nghĩa là?", options: ["Hủy ngân sách", "Tạm gác vấn đề ngân sách", "Tăng ngân sách"], answer: 1 },
      { id: "q3", question: "Ai sẽ gửi biên bản họp?", options: ["Tuan", "Chair", "Mai"], answer: 2 },
    ],
  },
  {
    slug: "interview-cv", courseSlug: "job-interview-english",
    title: "Viết CV tiếng Anh", type: "reading", durationMinutes: 18,
    summary: "Động từ hành động và cách định lượng thành tích.",
    content: [
      "Bắt đầu mỗi gạch đầu dòng bằng động từ hành động ở quá khứ: led, launched, reduced, increased, managed.",
      "Định lượng thành tích: “Increased social media engagement by 40% in six months” mạnh hơn “Responsible for social media”.",
      "Mục Profile 2–3 câu: bạn là ai, thế mạnh nổi bật, mục tiêu nghề nghiệp.",
      "CV tiếng Anh thường không cần ảnh, ngày sinh hay tình trạng hôn nhân; dài 1–2 trang.",
    ],
    vocabulary: [
      { word: "action verb", meaning: "động từ hành động" },
      { word: "quantify", meaning: "định lượng" },
      { word: "engagement", meaning: "mức độ tương tác" },
      { word: "achievement", meaning: "thành tích" },
    ],
    quiz: [
      { id: "q1", question: "Gạch đầu dòng nào ấn tượng hơn?", options: ["Responsible for sales", "Increased sales by 25% in one year", "Did sales work"], answer: 1 },
      { id: "q2", question: "CV tiếng Anh thường KHÔNG cần mục nào?", options: ["Kinh nghiệm làm việc", "Tình trạng hôn nhân", "Học vấn"], answer: 1 },
    ],
  },
  {
    slug: "interview-star", courseSlug: "job-interview-english",
    title: "Khung trả lời STAR", type: "video", durationMinutes: 16,
    summary: "Situation – Task – Action – Result cho câu hỏi hành vi.",
    content: [
      "Câu hỏi hành vi: “Tell me about a time you handled a difficult customer / met a tight deadline.”",
      "S – Situation: bối cảnh ngắn gọn. T – Task: nhiệm vụ của bạn. A – Action: bạn đã làm gì (phần dài nhất). R – Result: kết quả, nên có số liệu.",
      "Dùng “I” thay vì “we” ở phần Action để thể hiện vai trò cá nhân.",
      "Chuẩn bị sẵn 4–5 câu chuyện STAR có thể dùng cho nhiều câu hỏi khác nhau.",
    ],
    transcript: [
      { time: "00:00", speaker: "Interviewer", text: "Tell me about a time you worked under pressure." },
      { time: "00:04", speaker: "Candidate", text: "Last year, two days before a client presentation, our designer fell ill." },
      { time: "00:10", speaker: "Candidate", text: "My task was to make sure the slides were finished on time." },
      { time: "00:15", speaker: "Candidate", text: "I reorganised the team's workload, took over the charts myself, and worked with a freelancer on the visuals." },
      { time: "00:24", speaker: "Candidate", text: "As a result, we delivered on time, and the client signed a twelve-month contract." },
    ],
    vocabulary: [
      { word: "under pressure", meaning: "dưới áp lực" },
      { word: "workload", meaning: "khối lượng công việc" },
      { word: "take over", meaning: "đảm nhận thay" },
      { word: "deliver", meaning: "hoàn thành, bàn giao" },
    ],
    quiz: [
      { id: "q1", question: "Phần nào nên dài nhất trong STAR?", options: ["Situation", "Action", "Result"], answer: 1 },
      { id: "q2", question: "Câu “As a result, we delivered on time…” là phần nào?", options: ["Task", "Action", "Result"], answer: 2 },
    ],
  },
  {
    slug: "present-signposting", courseSlug: "presentation-skills",
    title: "Từ dẫn dắt và chuyển ý", type: "video", durationMinutes: 12,
    summary: "Moving on to…, Let's look at…, To sum up…",
    content: [
      "Signposting giúp khán giả biết bạn đang ở đâu trong bài nói.",
      "Giới thiệu cấu trúc: “I've divided my talk into three parts.”",
      "Chuyển ý: “Moving on to…”, “Now let's turn to…”, “That brings me to my next point.”",
      "Nhấn mạnh: “What I'd like to highlight is…”, “The key takeaway here is…”.",
      "Kết thúc: “To sum up…”, “Thank you for listening. I'm happy to take any questions.”",
    ],
    transcript: [
      { time: "00:00", text: "Good morning. Today I'll talk about our new mobile app." },
      { time: "00:05", text: "I've divided my talk into three parts: the problem, our solution, and next steps." },
      { time: "00:12", text: "Let's start with the problem." },
      { time: "00:16", text: "That brings me to my second point: how our app solves it." },
      { time: "00:22", text: "To sum up, the app saves users around twenty minutes a day. Thank you for listening." },
    ],
    vocabulary: [
      { word: "signpost", meaning: "từ dẫn dắt" },
      { word: "turn to", meaning: "chuyển sang" },
      { word: "highlight", meaning: "nhấn mạnh" },
      { word: "key takeaway", meaning: "điểm mấu chốt cần nhớ" },
    ],
    quiz: [
      { id: "q1", question: "Bài thuyết trình chia làm mấy phần?", options: ["2", "3", "4"], answer: 1 },
      { id: "q2", question: "Cụm nào dùng để chuyển ý?", options: ["That brings me to my next point.", "Good morning.", "Thank you for listening."], answer: 0 },
    ],
  },
  {
    slug: "present-qa", courseSlug: "presentation-skills",
    title: "Xử lý phần hỏi đáp", type: "video", durationMinutes: 14,
    summary: "Làm rõ câu hỏi, câu trả lời mở và khi chưa biết đáp án.",
    content: [
      "Cảm ơn và nhắc lại câu hỏi để cả phòng nghe rõ và bạn có thêm thời gian suy nghĩ.",
      "Làm rõ: “Just to make sure I understand, are you asking about…?”",
      "Khi chưa biết: “That's a great question. I don't have the exact figure, but I'll email it to you after the session.”",
      "Câu hỏi lạc đề: “That's slightly outside today's topic, but I'm happy to discuss it afterwards.”",
    ],
    transcript: [
      { time: "00:00", speaker: "Audience", text: "How much will the new system cost in the first year?" },
      { time: "00:04", speaker: "Presenter", text: "Thanks for the question. You're asking about the first-year cost, right?" },
      { time: "00:09", speaker: "Presenter", text: "I don't have the exact figure with me, but it's within the approved budget." },
      { time: "00:15", speaker: "Presenter", text: "I'll send you a detailed breakdown by email this afternoon." },
    ],
    vocabulary: [
      { word: "clarify", meaning: "làm rõ" },
      { word: "exact figure", meaning: "con số chính xác" },
      { word: "breakdown", meaning: "bảng chi tiết" },
      { word: "afterwards", meaning: "sau đó" },
    ],
    quiz: [
      { id: "q1", question: "Khi chưa biết đáp án, nên làm gì?", options: ["Đoán đại một con số", "Hứa gửi thông tin sau", "Bỏ qua câu hỏi"], answer: 1 },
      { id: "q2", question: "Vì sao nên nhắc lại câu hỏi?", options: ["Để cả phòng nghe rõ và có thời gian nghĩ", "Để kéo dài thời gian", "Vì bắt buộc"], answer: 0 },
    ],
  },
];
