import type { LibraryItem, LibraryType } from "@/types";

export const libraryTypeLabels: Record<LibraryType, string> = {
  video: "Video",
  audio: "Audio",
  podcast: "Podcast",
  transcript: "Transcript",
  document: "Tài liệu PDF",
  blog: "Blog",
};

export const libraryItems: LibraryItem[] = [
  { id: "lib-1", title: "6 Minute Talk: Why we love coffee", type: "podcast", level: "B1", series: "6 Minute Talk", duration: "6:12", description: "Podcast ngắn về văn hóa cà phê, kèm 6 từ vựng chủ đề.", free: true, tone: "amber" },
  { id: "lib-2", title: "News in Slow English – Tuần 42", type: "audio", level: "A2", series: "Slow News", duration: "8:40", description: "Bản tin chậm, rõ, phù hợp người mới luyện nghe.", free: true, tone: "cyan" },
  { id: "lib-3", title: "Grammar in 3 Minutes: Present Perfect", type: "video", level: "B1", series: "Grammar in 3", duration: "3:05", description: "Video giải thích hiện tại hoàn thành qua ví dụ đời sống.", free: true, tone: "indigo" },
  { id: "lib-4", title: "Transcript: Living in a Smart City", type: "transcript", level: "B2", series: "Spotlight Stories", description: "Bản chép lời có chú thích từ vựng cho bài nghe B2.", free: true, tone: "emerald" },
  { id: "lib-5", title: "500 từ vựng IELTS theo chủ đề (PDF)", type: "document", level: "B2", description: "Bộ từ vựng học thuật chia theo 20 chủ đề thường gặp.", free: true, tone: "rose" },
  { id: "lib-6", title: "Pronunciation Series: Connected Speech", type: "video", level: "B1", series: "Sounds English", duration: "7:30", description: "Nối âm, nuốt âm và đồng hóa âm trong giao tiếp.", free: true, tone: "amber" },
  { id: "lib-7", title: "Spotlight: The History of Tea", type: "podcast", level: "B2", series: "Spotlight Stories", duration: "15:00", description: "Podcast kể chuyện, tốc độ chậm, có transcript.", free: true, tone: "navy" },
  { id: "lib-8", title: "5 sai lầm khi tự học Speaking", type: "blog", level: "A2", description: "Bài viết hướng dẫn tự luyện nói hiệu quả tại nhà.", free: true, tone: "indigo" },
  { id: "lib-9", title: "TOEIC Part 7 – Bộ đề đọc mẫu (PDF)", type: "document", level: "B1", description: "20 đoạn đọc mẫu có đáp án và giải thích.", free: false, tone: "cyan" },
  { id: "lib-10", title: "Everyday English: At the Airport", type: "video", level: "A2", series: "Everyday English", duration: "5:20", description: "Mẫu câu làm thủ tục, hỏi cửa ra máy bay, hành lý.", free: true, tone: "emerald" },
  { id: "lib-11", title: "Lesson Transcript: Job Interviews", type: "transcript", level: "B2", series: "English at Work", description: "Hội thoại phỏng vấn mẫu và phân tích cách trả lời.", free: true, tone: "rose" },
  { id: "lib-12", title: "Cách học từ vựng không quên", type: "blog", level: "A1", description: "Phương pháp lặp lại ngắt quãng và flashcard.", free: true, tone: "amber" },
];
