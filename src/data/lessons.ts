import type { Lesson } from "@/types";
import { ieltsLessons } from "./lesson-content/ielts";
import { toeicLessons } from "./lesson-content/toeic";
import { communicationLessons } from "./lesson-content/communication";
import { businessLessons } from "./lesson-content/business";
import { generalLessons } from "./lesson-content/general";

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
      { id: "q2", question: "Tranh chỉ có ghế xếp chồng, không có người. Câu nào đúng?", options: ["A man is stacking chairs.", "Some chairs have been stacked.", "Chairs are being painted."], answer: 1, explanation: "Không có người trong tranh nên “is stacking” và “are being painted” (đang diễn ra) đều sai." },
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
      { id: "q2", question: "Lời khuyên thứ hai là gì?", options: ["Thưởng cho bản thân mỗi ngày", "Gắn thói quen mới vào việc bạn đã làm hằng ngày", "Rủ bạn bè cùng tập"], answer: 1, explanation: "“Attach a new habit to something you already do every day.”" },
    ],
  },
  {
    slug: "travel-airport-checkin",
    courseSlug: "travel-english",
    title: "Làm thủ tục tại sân bay",
    type: "video", durationMinutes: 12, free: true,
    summary: "Mẫu câu check-in, gửi hành lý và qua cửa an ninh.",
    content: [
      "Tại quầy check-in, nhân viên thường hỏi hộ chiếu, điểm đến và số kiện hành lý ký gửi.",
      "Dùng \"Could I have a window seat, please?\" để xin ghế cạnh cửa sổ một cách lịch sự.",
      "Ở cửa an ninh, bạn sẽ nghe các yêu cầu như \"Please remove your laptop from your bag\".",
      "Luôn kiểm tra số cửa (gate) và giờ lên máy bay (boarding time) trên thẻ lên máy bay.",
    ],
    transcript: [
      { time: "00:00", text: "Good morning. Can I see your passport, please?" },
      { time: "00:05", text: "Sure, here you are. I'm flying to Singapore." },
      { time: "00:11", text: "Are you checking in any bags today?" },
      { time: "00:15", text: "Just one suitcase. Could I have a window seat, please?" },
      { time: "00:22", text: "No problem. Here's your boarding pass. You're at gate 14, and boarding starts at 9:40." },
    ],
    vocabulary: [
      { word: "check in", meaning: "làm thủ tục" },
      { word: "suitcase", meaning: "va li" },
      { word: "window seat", meaning: "ghế cạnh cửa sổ" },
      { word: "gate", meaning: "cửa ra máy bay" },
    ],
    quiz: [
      { id: "q1", question: "Hành khách muốn ngồi ở đâu?", options: ["Aisle seat", "Window seat", "Middle seat"], answer: 1 },
      { id: "q2", question: "Giờ bắt đầu lên máy bay là mấy giờ?", options: ["9:14", "9:40", "10:40"], answer: 1 },
      { id: "q3", question: "\"Are you checking in any bags?\" nghĩa là gì?", options: ["Bạn có ký gửi hành lý không?", "Bạn có mang túi xách không?", "Bạn đã kiểm tra túi chưa?"], answer: 0 },
    ],
  },
  {
    slug: "interview-tell-me-about-yourself",
    courseSlug: "job-interview-english",
    title: "Trả lời \"Tell me about yourself\"",
    type: "video", durationMinutes: 15, free: true,
    summary: "Công thức hiện tại – quá khứ – tương lai cho câu hỏi mở đầu buổi phỏng vấn.",
    content: [
      "Đây gần như luôn là câu hỏi đầu tiên. Nhà tuyển dụng muốn nghe phần tóm tắt nghề nghiệp, không phải tiểu sử.",
      "Hiện tại: vị trí và trách nhiệm chính của bạn. Quá khứ: một hoặc hai thành tích liên quan. Tương lai: lý do bạn muốn vị trí này.",
      "Giữ câu trả lời trong khoảng 60–90 giây và kết thúc bằng điểm nối với công việc đang ứng tuyển.",
    ],
    transcript: [
      { time: "00:00", text: "So, tell me a little about yourself." },
      { time: "00:04", text: "Sure. I'm currently a marketing executive at a retail company, where I manage our social media campaigns." },
      { time: "00:14", text: "Last year, I led a campaign that increased online sales by twenty percent." },
      { time: "00:22", text: "Now I'm looking for a role where I can work with international brands, which is why I'm excited about this position." },
    ],
    vocabulary: [
      { word: "currently", meaning: "hiện tại" },
      { word: "campaign", meaning: "chiến dịch" },
      { word: "increase", meaning: "tăng" },
      { word: "position", meaning: "vị trí công việc" },
    ],
    quiz: [
      { id: "q1", question: "Câu trả lời mẫu bắt đầu bằng phần nào?", options: ["Quá khứ", "Hiện tại", "Tương lai"], answer: 1 },
      { id: "q2", question: "Thành tích được nhắc đến là gì?", options: ["Tăng 20% doanh số online", "Tuyển 20 nhân viên", "Mở 20 cửa hàng"], answer: 0 },
      { id: "q3", question: "Độ dài lý tưởng của câu trả lời?", options: ["10–20 giây", "60–90 giây", "5 phút"], answer: 1 },
    ],
  },
  {
    slug: "kids-colors-animals",
    courseSlug: "kids-english-starters",
    title: "Màu sắc và con vật",
    type: "video", durationMinutes: 10, free: true,
    summary: "Bé học 6 màu sắc và 6 con vật qua bài hát \"What colour is it?\".",
    content: [
      "Hỏi màu sắc: \"What colour is it?\" – Trả lời: \"It's red.\"",
      "Kết hợp màu và con vật: \"a yellow duck\", \"a brown dog\", \"a green frog\".",
      "Trò chơi cuối bài: nghe mô tả và chọn đúng con vật có màu tương ứng.",
    ],
    transcript: [
      { time: "00:00", text: "Hello, everyone! Let's sing and learn colours." },
      { time: "00:06", text: "What colour is it? It's yellow. It's a yellow duck!" },
      { time: "00:14", text: "What colour is it? It's green. It's a green frog!" },
      { time: "00:22", text: "Great job! Now point to the brown dog." },
    ],
    vocabulary: [
      { word: "colour", meaning: "màu sắc" },
      { word: "duck", meaning: "con vịt" },
      { word: "frog", meaning: "con ếch" },
      { word: "brown", meaning: "màu nâu" },
    ],
    quiz: [
      { id: "q1", question: "Con vịt trong bài hát có màu gì?", options: ["Yellow", "Green", "Brown"], answer: 0 },
      { id: "q2", question: "\"frog\" là con gì?", options: ["Con chó", "Con ếch", "Con mèo"], answer: 1 },
    ],
  },
  {
    slug: "task1-line-graph",
    courseSlug: "ielts-writing-task-1",
    title: "Line graph: Mô tả xu hướng",
    type: "video", durationMinutes: 20, free: true,
    summary: "Viết overview và mô tả xu hướng tăng, giảm, dao động bằng ngôn ngữ chính xác.",
    content: [
      "Bước 1 – Paraphrase đề bài trong một câu, không chép nguyên văn.",
      "Bước 2 – Overview: nêu 2 đặc điểm nổi bật nhất (xu hướng chung và giá trị cao nhất), không đưa số liệu chi tiết.",
      "Bước 3 – Hai đoạn thân bài nhóm các đường có xu hướng giống nhau, dẫn số liệu cụ thể kèm năm.",
      "Đa dạng cấu trúc: \"rose sharply\", \"a sharp rise\", \"there was a sharp rise in…\".",
    ],
    transcript: [
      { time: "00:00", text: "In this lesson, we'll describe a line graph about internet users in three countries." },
      { time: "00:09", text: "First, notice the overall trend: all three lines go up, but at different speeds." },
      { time: "00:19", text: "Your overview could be: Overall, internet use increased in all three countries, with Canada remaining the highest throughout." },
      { time: "00:33", text: "Then, in the body paragraphs, we add specific figures and compare them." },
    ],
    vocabulary: [
      { word: "overview", meaning: "đoạn tổng quan" },
      { word: "fluctuate", meaning: "dao động" },
      { word: "plateau", meaning: "chững lại" },
      { word: "throughout", meaning: "suốt cả giai đoạn" },
    ],
    quiz: [
      { id: "q1", question: "Overview có nên chứa số liệu chi tiết không?", options: ["Có", "Không", "Chỉ khi biểu đồ có ít số liệu"], answer: 1, explanation: "Overview nêu đặc điểm chung; số liệu cụ thể để ở thân bài." },
      { id: "q2", question: "Cụm nào diễn tả \"chững lại\"?", options: ["rose sharply", "levelled off", "fluctuated"], answer: 1 },
      { id: "q3", question: "Nên nhóm các đường như thế nào trong thân bài?", options: ["Theo thứ tự trong chú thích", "Theo xu hướng giống nhau", "Ngẫu nhiên"], answer: 1 },
    ],
  },
  {
    slug: "present-opening",
    courseSlug: "presentation-skills",
    title: "Mở đầu bài thuyết trình cuốn hút",
    type: "video", durationMinutes: 14, free: true,
    summary: "Ba cách mở đầu: câu hỏi, con số bất ngờ và câu chuyện ngắn.",
    content: [
      "30 giây đầu quyết định khán giả có tiếp tục lắng nghe hay không.",
      "Mở bằng câu hỏi: \"How many hours did you spend in meetings last week?\"",
      "Mở bằng con số: \"Seventy percent of customers never complain – they simply leave.\"",
      "Sau phần mở đầu, giới thiệu lộ trình bài nói: \"Today I'll cover three things…\"",
    ],
    transcript: [
      { time: "00:00", text: "Good afternoon, everyone. Let me start with a question." },
      { time: "00:05", text: "How many of you have waited more than ten minutes for customer support this month?" },
      { time: "00:13", text: "Quite a few hands. Today I'll show you how we cut our waiting time in half." },
      { time: "00:21", text: "I'll cover three things: the problem, our solution, and the results." },
    ],
    vocabulary: [
      { word: "audience", meaning: "khán giả" },
      { word: "cover", meaning: "trình bày, đề cập" },
      { word: "cut in half", meaning: "giảm một nửa" },
      { word: "signpost", meaning: "từ dẫn dắt, chuyển ý" },
    ],
    quiz: [
      { id: "q1", question: "Diễn giả mở đầu bằng cách nào?", options: ["Một câu hỏi", "Một câu chuyện", "Một câu trích dẫn"], answer: 0 },
      { id: "q2", question: "Bài nói gồm mấy phần chính?", options: ["2", "3", "4"], answer: 1 },
    ],
  },
  {
    slug: "vocab-word-roots",
    courseSlug: "academic-vocabulary-b2",
    title: "Gốc từ Latin & Hy Lạp thường gặp",
    type: "reading", durationMinutes: 15, free: true,
    summary: "Đoán nghĩa hàng trăm từ học thuật nhờ 12 gốc từ phổ biến.",
    content: [
      "\"bio\" (sự sống): biology, biography, antibiotic.",
      "\"dict\" (nói): predict, dictionary, contradict.",
      "\"port\" (mang): transport, export, portable.",
      "\"spect\" (nhìn): inspect, spectator, perspective.",
      "Mẹo: khi gặp từ mới, tách tiền tố – gốc – hậu tố rồi ghép nghĩa lại.",
    ],
    vocabulary: [
      { word: "predict", meaning: "dự đoán" },
      { word: "portable", meaning: "có thể mang theo" },
      { word: "perspective", meaning: "góc nhìn" },
      { word: "contradict", meaning: "mâu thuẫn, phản bác" },
    ],
    quiz: [
      { id: "q1", question: "Gốc \"spect\" mang nghĩa gì?", options: ["Nói", "Nhìn", "Mang"], answer: 1 },
      { id: "q2", question: "Từ nào chứa gốc \"port\" (mang)?", options: ["export", "predict", "biology"], answer: 0 },
      { id: "q3", question: "\"contradict\" gồm contra (ngược lại) + dict (nói), nghĩa là?", options: ["Đồng ý", "Phản bác", "Dịch thuật"], answer: 1 },
    ],
  },
];

export const lessons: Lesson[] = [
  ...detailed,
  ...ieltsLessons,
  ...toeicLessons,
  ...communicationLessons,
  ...businessLessons,
  ...generalLessons,
];

export const getLesson = (slug: string) => lessons.find((l) => l.slug === slug);
export const getLessonsByCourse = (courseSlug: string) => lessons.filter((l) => l.courseSlug === courseSlug);
