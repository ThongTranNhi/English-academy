import type { Lesson } from "@/types";

/** Bài học các khóa Giao tiếp: Giao tiếp hằng ngày, Pronunciation Masterclass, Tiếng Anh du lịch. */
export const communicationLessons: Lesson[] = [
  {
    slug: "comm-small-talk", courseSlug: "everyday-communication",
    title: "Small talk: thời tiết, cuối tuần, sở thích", type: "video", durationMinutes: 13,
    summary: "Duy trì cuộc trò chuyện bằng câu hỏi mở.",
    content: [
      "Small talk là cầu nối trước khi vào việc chính – ở công sở, quán cà phê hay sự kiện.",
      "Dùng câu hỏi mở (What/How) thay vì Yes/No: “How was your weekend?” tốt hơn “Did you have a good weekend?”.",
      "Công thức trả lời 1 + 1: trả lời câu hỏi + kể thêm một chi tiết, rồi hỏi lại “How about you?”.",
      "Chủ đề an toàn: thời tiết, cuối tuần, đồ ăn, phim ảnh. Tránh hỏi lương, tuổi, tôn giáo khi mới quen.",
    ],
    transcript: [
      { time: "00:00", speaker: "Anna", text: "Morning, Minh! How was your weekend?" },
      { time: "00:03", speaker: "Minh", text: "Pretty good, thanks. I went hiking in Ba Vi with some friends. How about you?" },
      { time: "00:09", speaker: "Anna", text: "Oh nice! I just stayed in and binge-watched a new series." },
      { time: "00:14", speaker: "Minh", text: "Sounds relaxing. What's it called? I'm looking for something new to watch." },
    ],
    vocabulary: [
      { word: "How was your weekend?", meaning: "Cuối tuần của bạn thế nào?" },
      { word: "stay in", meaning: "ở nhà" },
      { word: "binge-watch", meaning: "xem liền nhiều tập" },
      { word: "Sounds relaxing.", meaning: "Nghe thư giãn đấy." },
    ],
    quiz: [
      { id: "q1", question: "Câu hỏi nào mở hơn?", options: ["Did you go out?", "What did you get up to?", "Was it fun?"], answer: 1 },
      { id: "q2", question: "Minh làm gì cuối tuần?", options: ["Ở nhà xem phim", "Đi leo núi", "Đi làm thêm"], answer: 1 },
      { id: "q3", question: "Chủ đề nào nên tránh khi mới quen?", options: ["Thời tiết", "Phim ảnh", "Mức lương"], answer: 2 },
    ],
  },
  {
    slug: "comm-ordering-food", courseSlug: "everyday-communication",
    title: "Gọi món tại nhà hàng", type: "video", durationMinutes: 11,
    summary: "Đặt bàn, gọi món, yêu cầu thanh toán.",
    content: [
      "Đặt bàn: “I'd like to book a table for two at seven, please.”",
      "Gọi món lịch sự với “I'll have…” hoặc “Could I get…?” thay vì “I want…”.",
      "Hỏi thêm: “Is this dish spicy?”, “Do you have any vegetarian options?”.",
      "Thanh toán: “Could we have the bill, please?” (Anh) / “Check, please.” (Mỹ). Chia tiền: “Can we pay separately?”.",
    ],
    transcript: [
      { time: "00:00", speaker: "Waiter", text: "Good evening. Are you ready to order?" },
      { time: "00:03", speaker: "Customer", text: "Yes, I'll have the grilled salmon, please. Is it served with rice?" },
      { time: "00:09", speaker: "Waiter", text: "It comes with salad, but we can do rice instead." },
      { time: "00:13", speaker: "Customer", text: "Rice would be great. And could I get a glass of orange juice?" },
      { time: "00:18", speaker: "Waiter", text: "Certainly. I'll be right back with your drink." },
    ],
    vocabulary: [
      { word: "I'll have…", meaning: "Cho tôi món…" },
      { word: "served with", meaning: "ăn kèm với" },
      { word: "instead", meaning: "thay vào đó" },
      { word: "the bill", meaning: "hóa đơn" },
    ],
    quiz: [
      { id: "q1", question: "Khách gọi món chính gì?", options: ["Cá hồi nướng", "Gà nướng", "Salad"], answer: 0 },
      { id: "q2", question: "Món chính vốn ăn kèm với gì?", options: ["Cơm", "Salad", "Khoai tây"], answer: 1 },
      { id: "q3", question: "Câu yêu cầu thanh toán lịch sự ở Anh là?", options: ["Give me money paper.", "Could we have the bill, please?", "I pay now."], answer: 1 },
    ],
  },
  {
    slug: "pron-th-sounds", courseSlug: "pronunciation-masterclass",
    title: "Âm /θ/ và /ð/", type: "video", durationMinutes: 10, free: true,
    summary: "Vị trí lưỡi và bài luyện cặp từ tối thiểu.",
    content: [
      "Đặt đầu lưỡi giữa hai hàm răng, thổi hơi nhẹ: /θ/ là âm vô thanh (think), /ð/ là âm hữu thanh – cổ họng rung (this).",
      "Lỗi phổ biến của người Việt: đọc “think” thành “tink” hoặc “sink”, “this” thành “dis”.",
      "Cặp từ tối thiểu để luyện: think – sink, thank – tank, three – tree, they – day.",
      "Luyện câu: “I think these three things are worth thinking about.”",
    ],
    transcript: [
      { time: "00:00", text: "Put the tip of your tongue between your teeth." },
      { time: "00:05", text: "Now blow gently: th, th. Think. Three. Thank you." },
      { time: "00:12", text: "For the voiced sound, add vibration: this, that, mother, weather." },
      { time: "00:20", text: "Listen and compare: think, sink. Three, tree. They, day." },
    ],
    vocabulary: [
      { word: "voiceless", meaning: "vô thanh" },
      { word: "voiced", meaning: "hữu thanh" },
      { word: "tongue", meaning: "lưỡi" },
      { word: "minimal pair", meaning: "cặp từ tối thiểu" },
    ],
    quiz: [
      { id: "q1", question: "Từ nào chứa âm /ð/ (hữu thanh)?", options: ["think", "mother", "three"], answer: 1 },
      { id: "q2", question: "Khi phát âm /θ/, lưỡi đặt ở đâu?", options: ["Chạm vòm họng", "Giữa hai hàm răng", "Cong ra sau"], answer: 1 },
    ],
  },
  {
    slug: "pron-word-stress", courseSlug: "pronunciation-masterclass",
    title: "Trọng âm từ", type: "video", durationMinutes: 12,
    summary: "Quy tắc trọng âm cho từ 2–3 âm tiết.",
    content: [
      "Đa số danh từ và tính từ 2 âm tiết nhấn âm 1: TAble, HAPpy, PROduct.",
      "Đa số động từ 2 âm tiết nhấn âm 2: deCIDE, beGIN, proDUCE.",
      "Cùng một từ có thể đổi trọng âm theo từ loại: a PREsent (món quà) – to preSENT (trình bày); a REcord – to reCORD.",
      "Từ có đuôi -tion, -sion, -ic: nhấn âm ngay trước đuôi – inforMAtion, deCIsion, eCOnomic.",
    ],
    transcript: [
      { time: "00:00", text: "Listen to the stress: TAble, HAPpy, PROduct." },
      { time: "00:06", text: "Now some verbs: deCIDE, beGIN, proDUCE." },
      { time: "00:12", text: "The same word can change: I got a PREsent. I will preSENT my project." },
      { time: "00:19", text: "With -tion endings, stress the syllable before: inforMAtion, eduCAtion." },
    ],
    vocabulary: [
      { word: "syllable", meaning: "âm tiết" },
      { word: "stress", meaning: "trọng âm" },
      { word: "present (n) / present (v)", meaning: "món quà / trình bày" },
      { word: "ending", meaning: "đuôi từ" },
    ],
    quiz: [
      { id: "q1", question: "Động từ “record” nhấn âm nào?", options: ["Âm 1: REcord", "Âm 2: reCORD"], answer: 1 },
      { id: "q2", question: "“education” nhấn ở âm tiết nào?", options: ["E", "du", "ca"], answer: 2 },
      { id: "q3", question: "Danh từ 2 âm tiết thường nhấn âm thứ mấy?", options: ["Âm 1", "Âm 2"], answer: 0 },
    ],
  },
  {
    slug: "travel-hotel", courseSlug: "travel-english",
    title: "Đặt và nhận phòng khách sạn", type: "video", durationMinutes: 11,
    summary: "Hỏi giá, tiện nghi và yêu cầu dịch vụ phòng.",
    content: [
      "Nhận phòng: “Hi, I have a reservation under the name Nguyen.”",
      "Hỏi tiện nghi: “Is breakfast included?”, “What time is check-out?”, “What's the Wi-Fi password?”.",
      "Yêu cầu: “Could I have an extra towel?”, “Could you give me a wake-up call at six?”.",
      "Báo sự cố: “The air conditioning in my room isn't working.”",
    ],
    transcript: [
      { time: "00:00", speaker: "Guest", text: "Hi, I have a reservation under the name Linh Tran." },
      { time: "00:04", speaker: "Receptionist", text: "Welcome! Yes, a double room for three nights. Could I see your passport?" },
      { time: "00:10", speaker: "Guest", text: "Here you are. Is breakfast included?" },
      { time: "00:13", speaker: "Receptionist", text: "Yes, it's served from six thirty to ten in the restaurant on the ground floor." },
      { time: "00:20", speaker: "Guest", text: "Great. And what time is check-out?" },
      { time: "00:23", speaker: "Receptionist", text: "Check-out is at noon. Here's your key card – room 512." },
    ],
    vocabulary: [
      { word: "reservation", meaning: "đặt chỗ trước" },
      { word: "included", meaning: "đã bao gồm" },
      { word: "check-out", meaning: "trả phòng" },
      { word: "key card", meaning: "thẻ từ mở cửa" },
    ],
    quiz: [
      { id: "q1", question: "Khách ở mấy đêm?", options: ["2 đêm", "3 đêm", "5 đêm"], answer: 1 },
      { id: "q2", question: "Giờ trả phòng là mấy giờ?", options: ["10 giờ sáng", "12 giờ trưa", "6 giờ 30"], answer: 1 },
      { id: "q3", question: "Bữa sáng phục vụ ở đâu?", options: ["Tầng trệt", "Tầng 5", "Tại phòng"], answer: 0 },
    ],
  },
  {
    slug: "travel-directions", courseSlug: "travel-english",
    title: "Hỏi đường và đi tàu điện", type: "video", durationMinutes: 10,
    summary: "Mẫu câu hỏi đường, mua vé và đổi tuyến.",
    content: [
      "Hỏi đường lịch sự: “Excuse me, could you tell me how to get to the museum?”",
      "Chỉ đường: go straight, turn left/right, it's on your left, it's next to/opposite the bank.",
      "Tàu điện: “Which line goes to the airport?”, “Do I need to change trains?”, “A single/return ticket, please.”",
      "Xác nhận lại: “So I take the green line and get off at Central Station, right?”",
    ],
    transcript: [
      { time: "00:00", speaker: "Tourist", text: "Excuse me, could you tell me how to get to the National Museum?" },
      { time: "00:05", speaker: "Local", text: "Sure. Take the red line two stops to Central Station." },
      { time: "00:10", speaker: "Local", text: "Then change to the blue line and get off at Museum Square." },
      { time: "00:15", speaker: "Tourist", text: "So, red line, then blue line to Museum Square. Thanks a lot!" },
    ],
    vocabulary: [
      { word: "get to", meaning: "đi đến" },
      { word: "change trains", meaning: "đổi tàu" },
      { word: "get off", meaning: "xuống (xe, tàu)" },
      { word: "opposite", meaning: "đối diện" },
    ],
    quiz: [
      { id: "q1", question: "Du khách đổi sang tuyến nào?", options: ["Tuyến đỏ", "Tuyến xanh dương", "Tuyến xanh lá"], answer: 1 },
      { id: "q2", question: "Đổi tàu ở ga nào?", options: ["Museum Square", "Central Station", "Airport"], answer: 1 },
    ],
  },
  {
    slug: "travel-problems", courseSlug: "travel-english",
    title: "Xử lý sự cố khi du lịch", type: "audio", durationMinutes: 12,
    summary: "Báo mất hành lý, lỡ chuyến bay và đi khám bệnh.",
    content: [
      "Mất hành lý: đến quầy “Lost Baggage” – “My suitcase didn't arrive. Here's my baggage tag.”",
      "Lỡ chuyến bay: “I missed my connecting flight. Could you put me on the next one?”",
      "Khám bệnh: “I've had a fever since yesterday.”, “I'm allergic to penicillin.”",
      "Luôn giữ bình tĩnh và xin giấy tờ xác nhận: “Could I have a reference number, please?”",
    ],
    transcript: [
      { time: "00:00", speaker: "Traveller", text: "Hi, my suitcase didn't come out on the carousel." },
      { time: "00:04", speaker: "Agent", text: "I'm sorry to hear that. Do you have your baggage tag?" },
      { time: "00:08", speaker: "Traveller", text: "Yes, here it is. It's a large black suitcase with a red ribbon on the handle." },
      { time: "00:14", speaker: "Agent", text: "Thank you. It's still in Bangkok. We'll deliver it to your hotel tomorrow morning." },
      { time: "00:21", speaker: "Traveller", text: "Could I have a reference number, please?" },
    ],
    vocabulary: [
      { word: "baggage tag", meaning: "thẻ hành lý" },
      { word: "carousel", meaning: "băng chuyền hành lý" },
      { word: "connecting flight", meaning: "chuyến bay nối chuyến" },
      { word: "reference number", meaning: "mã tham chiếu" },
    ],
    quiz: [
      { id: "q1", question: "Va-li có đặc điểm gì?", options: ["Màu đỏ, nơ đen", "Màu đen, nơ đỏ ở tay cầm", "Màu xanh, cỡ nhỏ"], answer: 1 },
      { id: "q2", question: "Va-li hiện đang ở đâu?", options: ["Bangkok", "Khách sạn", "Băng chuyền"], answer: 0 },
      { id: "q3", question: "Khi nào va-li được giao?", options: ["Tối nay", "Sáng mai", "Tuần sau"], answer: 1 },
    ],
  },
];
