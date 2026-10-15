import type { PlacementQuestion } from "@/features/placement/scorePlacement";

/** Bài test xếp lớp: 3 câu cho mỗi cấp CEFR, sắp từ dễ đến khó. */
export const placementQuestions: PlacementQuestion[] = [
  // A1
  { id: "a1-1", level: "A1", skill: "grammar", question: "My sister ___ a teacher.", options: ["am", "is", "are", "be"], answer: 1 },
  { id: "a1-2", level: "A1", skill: "vocabulary", question: "Chọn từ trái nghĩa với “hot”.", options: ["cold", "warm", "big", "fast"], answer: 0 },
  {
    id: "a1-3", level: "A1", skill: "reading",
    passage: "Hi, I'm Lan. I'm from Da Nang. I live with my parents and my brother. I go to school by bike.",
    question: "Lan đi học bằng gì?", options: ["Xe buýt", "Đi bộ", "Xe máy", "Xe đạp"], answer: 3,
  },
  // A2
  { id: "a2-1", level: "A2", skill: "grammar", question: "Yesterday we ___ to the cinema.", options: ["go", "goes", "went", "have gone"], answer: 2 },
  { id: "a2-2", level: "A2", skill: "grammar", question: "This book is ___ than that one.", options: ["interesting", "more interesting", "most interesting", "interestinger"], answer: 1 },
  { id: "a2-3", level: "A2", skill: "vocabulary", question: "Bạn muốn đặt phòng khách sạn, câu nào phù hợp nhất?", options: ["I'd like to book a room, please.", "I want buy a room.", "Give me room now.", "Do you room have?"], answer: 0 },
  // B1
  { id: "b1-1", level: "B1", skill: "grammar", question: "I ___ in Hanoi since 2020.", options: ["live", "lived", "am living", "have lived"], answer: 3 },
  { id: "b1-2", level: "B1", skill: "grammar", question: "If it rains tomorrow, we ___ the picnic.", options: ["cancel", "will cancel", "would cancel", "cancelled"], answer: 1 },
  {
    id: "b1-3", level: "B1", skill: "reading",
    passage: "The library will close early on Friday because of staff training. Books due on Friday can be returned on Saturday without a late fee.",
    question: "Điều gì đúng theo thông báo?", options: ["Trả sách thứ Bảy không bị phạt", "Thư viện đóng cửa cả thứ Sáu", "Nhân viên nghỉ phép thứ Sáu", "Phải trả sách trước thứ Năm"], answer: 0,
  },
  // B2
  { id: "b2-1", level: "B2", skill: "grammar", question: "The new bridge ___ by the end of next year.", options: ["will complete", "will have been completed", "has completed", "is completing"], answer: 1 },
  { id: "b2-2", level: "B2", skill: "vocabulary", question: "The government plans to ___ the problem of air pollution.", options: ["tackle", "make", "do", "take"], answer: 0, explanation: "Collocation: tackle a problem." },
  {
    id: "b2-3", level: "B2", skill: "reading",
    passage: "Although remote work offers flexibility, many employees report feeling isolated. Companies are therefore experimenting with hybrid models that combine home and office days.",
    question: "Vì sao các công ty thử mô hình hybrid?", options: ["Để giảm chi phí văn phòng", "Vì luật lao động mới", "Vì nhân viên cảm thấy cô lập khi làm từ xa", "Để tăng giờ làm việc"], answer: 2,
  },
  // C1
  { id: "c1-1", level: "C1", skill: "grammar", question: "Not only ___ the deadline, but she also exceeded expectations.", options: ["she met", "did she meet", "she did meet", "met she"], answer: 1 },
  { id: "c1-2", level: "C1", skill: "vocabulary", question: "Chọn từ gần nghĩa nhất với “meticulous”.", options: ["careless", "generous", "anxious", "thorough"], answer: 3 },
  {
    id: "c1-3", level: "C1", skill: "reading",
    passage: "While the findings are encouraging, the authors caution that the sample was small and drawn from a single region, so the results may not generalise.",
    question: "Tác giả nhấn mạnh điều gì?", options: ["Kết quả cần thận trọng vì mẫu nhỏ và hẹp", "Kết quả chắc chắn đúng mọi nơi", "Nghiên cứu đã thất bại", "Cần nhiều tiền hơn cho nghiên cứu"], answer: 0,
  },
  // C2
  { id: "c2-1", level: "C2", skill: "grammar", question: "Had I known about the delay, I ___ a later train.", options: ["would take", "will have taken", "would have taken", "had taken"], answer: 2 },
  { id: "c2-2", level: "C2", skill: "vocabulary", question: "His explanation was so ___ that nobody could follow it.", options: ["lucid", "succinct", "convoluted", "candid"], answer: 2 },
  {
    id: "c2-3", level: "C2", skill: "reading",
    passage: "The minister's remarks were less a policy announcement than a trial balloon, floated to gauge public reaction before any commitment was made.",
    question: "“Trial balloon” trong đoạn văn có nghĩa là gì?", options: ["Một chính sách đã được thông qua", "Một lễ hội ngoài trời", "Một lời xin lỗi công khai", "Một ý tưởng tung ra để thăm dò phản ứng"], answer: 3,
  },
];
