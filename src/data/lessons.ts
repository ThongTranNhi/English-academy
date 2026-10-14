import type { Lesson } from "@/types";

/** Bài học đầy đủ nội dung mẫu. */
const detailed: Lesson[] = [
  {
    slug: "ielts-overview",
    courseSlug: "ielts-foundation-5-0",
    title: "Tổng quan bài thi IELTS Academic & General",
    type: "video", durationMinutes: 14, free: true,
    summary: "Hiểu cấu trúc 4 phần thi, thời gian và cách tính band điểm IELTS.",
    content: [
      "IELTS gồm 4 kỹ năng: Listening (30 phút), Reading (60 phút), Writing (60 phút) và Speaking (11–14 phút).",
      "Listening và Reading đều có 40 câu hỏi. Số câu đúng được quy đổi sang band từ 0 đến 9.",
      "Writing gồm Task 1 (mô tả biểu đồ hoặc viết thư) và Task 2 (bài luận). Task 2 chiếm trọng số gấp đôi Task 1.",
      "Band tổng là trung bình cộng 4 kỹ năng, làm tròn đến 0.5 gần nhất.",
    ],
    transcript: [
      { time: "00:00", text: "Welcome to the first lesson of IELTS Foundation." },
      { time: "00:08", text: "Today we'll look at the four parts of the test and how each one is scored." },
      { time: "00:20", text: "Let's start with Listening. You'll hear four recordings and answer forty questions." },
      { time: "00:41", text: "Reading also has forty questions, but the texts are different for Academic and General Training." },
      { time: "01:05", text: "Finally, your overall band is the average of the four skills." },
    ],
    vocabulary: [
      { word: "band score", meaning: "thang điểm IELTS (0–9)" },
      { word: "Academic", meaning: "hình thức thi học thuật" },
      { word: "General Training", meaning: "hình thức thi tổng quát" },
      { word: "overall", meaning: "tổng thể, chung" },
    ],
    quiz: [
      { id: "q1", question: "Bài thi Listening IELTS có bao nhiêu câu hỏi?", options: ["30", "40", "50", "60"], answer: 1 },
      { id: "q2", question: "Phần nào chiếm trọng số lớn hơn trong Writing?", options: ["Task 1", "Task 2", "Bằng nhau"], answer: 1, explanation: "Task 2 chiếm trọng số gấp đôi Task 1." },
      { id: "q3", question: "Band tổng 6.25 được làm tròn thành?", options: ["6.0", "6.5", "7.0"], answer: 1, explanation: "Điểm .25 được làm tròn lên .5." },
    ],
  },
  {
    slug: "comm-greetings",
    courseSlug: "everyday-communication",
    title: "Chào hỏi & giới thiệu bản thân tự nhiên",
    type: "video", durationMinutes: 12, free: true,
    summary: "Các mẫu câu chào hỏi theo mức độ trang trọng và cách giới thiệu bản thân.",
    content: [
      "Trang trọng: “Good morning. It's a pleasure to meet you.”",
      "Thân mật: “Hey! How's it going?” – trả lời “Not bad, you?”",
      "Giới thiệu: “I'm Lan. I work in marketing.” thay vì “My name is Lan. My job is marketing.”",
      "Kết thúc tự nhiên: “It was nice talking to you. See you around!”",
    ],
    transcript: [
      { time: "00:00", text: "Hi everyone, I'm Sarah. Let's talk about greetings." },
      { time: "00:06", text: "In English, the way you say hello depends on who you're talking to." },
      { time: "00:15", text: "With friends, you might say: Hey, how's it going?" },
      { time: "00:22", text: "At a job interview, you'd say: Good morning, it's a pleasure to meet you." },
    ],
    vocabulary: [
      { word: "How's it going?", meaning: "Dạo này thế nào? (thân mật)" },
      { word: "pleasure", meaning: "niềm vinh hạnh" },
      { word: "see you around", meaning: "hẹn gặp lại" },
    ],
    quiz: [
      { id: "q1", question: "Câu chào nào phù hợp khi phỏng vấn xin việc?", options: ["Hey, what's up?", "Good morning, it's a pleasure to meet you.", "Yo!"], answer: 1 },
      { id: "q2", question: "Trả lời tự nhiên cho “How's it going?” là:", options: ["Not bad, you?", "I am going.", "Yes, it is."], answer: 0 },
    ],
  },
  {
    slug: "toeic-part1-photos",
    courseSlug: "toeic-650-plus",
    title: "TOEIC Part 1 – Mô tả tranh",
    type: "audio", durationMinutes: 15, free: true,
    summary: "Chiến lược nghe Part 1, các bẫy về động từ và vị trí đồ vật.",
    content: [
      "Quan sát tranh trước khi nghe: ai, đang làm gì, ở đâu, đồ vật nào nổi bật.",
      "Cẩn thận bẫy âm giống nhau (walk / work) và bẫy thì bị động tiếp diễn (is being painted).",
      "Tranh không có người thường dùng cấu trúc bị động: “Chairs have been stacked.”",
    ],
    transcript: [
      { time: "00:00", text: "Number one. Look at the picture marked number one in your test book." },
      { time: "00:05", text: "(A) A man is typing on a keyboard." },
      { time: "00:09", text: "(B) A man is hanging a picture." },
      { time: "00:13", text: "(C) Some chairs have been stacked." },
    ],
    vocabulary: [
      { word: "stack", meaning: "xếp chồng" },
      { word: "lean against", meaning: "dựa vào" },
      { word: "be arranged", meaning: "được sắp xếp" },
    ],
    quiz: [
      { id: "q1", question: "Tranh không có người thường dùng cấu trúc nào?", options: ["Chủ động hiện tại đơn", "Bị động hoàn thành", "Tương lai đơn"], answer: 1 },
    ],
  },
  {
    slug: "b1-podcast-habits",
    courseSlug: "general-english-b1",
    title: "Podcast: Building Better Habits",
    type: "audio", durationMinutes: 18, free: true,
    summary: "Nghe podcast về thói quen, luyện nghe ý chính và chi tiết.",
    content: [
      "Nghe lần 1: xác định ý chính của từng đoạn.",
      "Nghe lần 2: ghi lại 3 lời khuyên cụ thể của diễn giả.",
      "Nghe lần 3: đọc transcript và shadowing đoạn 01:00–01:30.",
    ],
    transcript: [
      { time: "00:00", text: "Hello and welcome back to the English Academy podcast." },
      { time: "00:10", text: "Today we're talking about habits — why they're hard to build, and how to make them stick." },
      { time: "00:32", text: "One simple idea is to start small. Instead of running five kilometres, just put on your shoes." },
      { time: "01:00", text: "Another tip is to attach a new habit to something you already do every day." },
    ],
    vocabulary: [
      { word: "stick", meaning: "duy trì, bám trụ" },
      { word: "attach", meaning: "gắn kết" },
      { word: "routine", meaning: "thói quen hằng ngày" },
    ],
    quiz: [
      { id: "q1", question: "Lời khuyên đầu tiên của diễn giả là gì?", options: ["Start small", "Run every day", "Wake up early"], answer: 0 },
    ],
  },
];

/** Bài học dạng tóm tắt cho phần còn lại của đề cương. */
type Brief = [slug: string, courseSlug: string, title: string, type: Lesson["type"], minutes: number, summary: string];

const briefs: Brief[] = [
  ["ielts-band-descriptors", "ielts-foundation-5-0", "Band descriptors: giám khảo chấm thế nào?", "reading", 10, "Bốn tiêu chí chấm Writing và Speaking."],
  ["ielts-listening-form-completion", "ielts-foundation-5-0", "Listening: Form Completion", "audio", 16, "Dự đoán loại thông tin cần điền và bẫy chính tả."],
  ["ielts-reading-skimming", "ielts-foundation-5-0", "Reading: Skimming & Scanning", "reading", 18, "Đọc lướt lấy ý chính và đọc quét tìm chi tiết."],
  ["ielts-writing-task2-structure", "ielts-foundation-5-0", "Writing Task 2: Cấu trúc 4 đoạn", "video", 20, "Mở bài – 2 thân bài – kết bài cho dạng Opinion."],
  ["ielts-speaking-part1", "ielts-foundation-5-0", "Speaking Part 1: Trả lời mở rộng", "video", 12, "Công thức trả lời Part 1 tự nhiên trong 2–3 câu."],
  ["intensive-coherence", "ielts-intensive-6-5", "Coherence & Cohesion nâng cao", "video", 22, "Liên kết ý bằng referencing và từ nối tinh tế."],
  ["intensive-lexical", "ielts-intensive-6-5", "Lexical Resource: Collocations học thuật", "reading", 18, "Collocations theo chủ đề Education, Environment."],
  ["intensive-speaking-part3", "ielts-intensive-6-5", "Speaking Part 3: Phát triển lập luận", "video", 20, "Mô hình PEEL cho câu trả lời Part 3."],
  ["toeic-part2-questions", "toeic-650-plus", "Part 2: Hỏi – Đáp", "audio", 14, "Nhận diện câu hỏi Wh-, Yes/No và câu trả lời gián tiếp."],
  ["toeic-part5-grammar", "toeic-650-plus", "Part 5: Ngữ pháp trọng tâm", "exercise", 20, "Từ loại, thì động từ và giới từ thường gặp."],
  ["comm-small-talk", "everyday-communication", "Small talk: thời tiết, cuối tuần, sở thích", "video", 13, "Duy trì cuộc trò chuyện bằng câu hỏi mở."],
  ["comm-ordering-food", "everyday-communication", "Gọi món tại nhà hàng", "video", 11, "Đặt bàn, gọi món, yêu cầu thanh toán."],
  ["found-ipa-vowels", "english-foundation-a1", "IPA: 20 nguyên âm", "video", 15, "Phân biệt nguyên âm ngắn, dài và nguyên âm đôi."],
  ["found-to-be", "english-foundation-a1", "Động từ to be", "video", 10, "am / is / are trong câu khẳng định, phủ định, nghi vấn."],
  ["found-present-simple", "english-foundation-a1", "Thì hiện tại đơn", "exercise", 12, "Diễn tả thói quen và sự thật hiển nhiên."],
  ["b1-reading-cities", "general-english-b1", "Reading: Cities of the Future", "reading", 15, "Đọc hiểu bài báo về đô thị thông minh."],
  ["biz-email-basics", "business-english-essentials", "Viết email chuyên nghiệp", "reading", 16, "Cấu trúc email, mở đầu và kết thúc lịch sự."],
  ["biz-meetings", "business-english-essentials", "Điều phối cuộc họp", "video", 18, "Mở đầu, chuyển ý, tổng kết cuộc họp."],
  ["pron-th-sounds", "pronunciation-masterclass", "Âm /θ/ và /ð/", "video", 10, "Vị trí lưỡi và bài luyện cặp từ tối thiểu."],
  ["pron-word-stress", "pronunciation-masterclass", "Trọng âm từ", "video", 12, "Quy tắc trọng âm cho từ 2–3 âm tiết."],
];

export const lessons: Lesson[] = [
  ...detailed,
  ...briefs.map(([slug, courseSlug, title, type, durationMinutes, summary]) => ({
    slug, courseSlug, title, type, durationMinutes, summary,
    content: [summary, "Nội dung chi tiết của bài học sẽ được cập nhật trong phiên bản tiếp theo."],
  })),
];

export const getLesson = (slug: string) => lessons.find((l) => l.slug === slug);
export const getLessonsByCourse = (courseSlug: string) => lessons.filter((l) => l.courseSlug === courseSlug);
