import type { GrammarLesson } from "@/types";

export const grammarLessons: GrammarLesson[] = [
  {
    slug: "present-simple", title: "Thì hiện tại đơn (Present Simple)", level: "A1",
    summary: "Diễn tả thói quen, sự thật hiển nhiên và lịch trình cố định.",
    structure: ["(+) S + V(s/es) + O", "(–) S + do/does + not + V + O", "(?) Do/Does + S + V + O?"],
    examples: ["She works in a bank.", "Water boils at 100°C.", "The train leaves at 7 a.m."],
    exercises: [
      { id: "e1", question: "My brother ___ football every Sunday.", options: ["play", "plays", "playing"], answer: 1 },
      { id: "e2", question: "___ they live in Da Nang?", options: ["Do", "Does", "Are"], answer: 0 },
      { id: "e3", question: "The sun ___ in the east.", options: ["rise", "rises", "is rising"], answer: 1, explanation: "Sự thật hiển nhiên dùng hiện tại đơn." },
    ],
  },
  {
    slug: "present-perfect", title: "Thì hiện tại hoàn thành (Present Perfect)", level: "B1",
    summary: "Hành động xảy ra trong quá khứ nhưng còn liên quan đến hiện tại.",
    structure: ["(+) S + have/has + V3", "(–) S + have/has + not + V3", "(?) Have/Has + S + V3?"],
    examples: ["I have lived here for five years.", "She has just finished her homework.", "Have you ever been to London?"],
    exercises: [
      { id: "e1", question: "I ___ this film three times.", options: ["saw", "have seen", "see"], answer: 1 },
      { id: "e2", question: "They have worked here ___ 2019.", options: ["for", "since", "ago"], answer: 1 },
      { id: "e3", question: "___ you ever tried sushi?", options: ["Did", "Have", "Has"], answer: 1 },
    ],
  },
  {
    slug: "conditionals", title: "Câu điều kiện loại 1, 2, 3", level: "B1",
    summary: "Diễn tả điều kiện có thật, không có thật ở hiện tại và quá khứ.",
    structure: ["Loại 1: If + S + V(s/es), S + will + V", "Loại 2: If + S + V2/were, S + would + V", "Loại 3: If + S + had + V3, S + would have + V3"],
    examples: ["If it rains, we will stay at home.", "If I were you, I would apply for the job.", "If she had studied, she would have passed."],
    exercises: [
      { id: "e1", question: "If I ___ rich, I would travel the world.", options: ["am", "were", "will be"], answer: 1 },
      { id: "e2", question: "If you heat ice, it ___.", options: ["melts", "melted", "would melt"], answer: 0, explanation: "Sự thật luôn đúng – điều kiện loại 0." },
      { id: "e3", question: "If he had left earlier, he ___ the train.", options: ["would catch", "would have caught", "will catch"], answer: 1 },
    ],
  },
  {
    slug: "passive-voice", title: "Câu bị động (Passive Voice)", level: "B2",
    summary: "Nhấn mạnh đối tượng chịu tác động của hành động.",
    structure: ["S + be + V3 (+ by O)", "Hiện tại: am/is/are + V3", "Quá khứ: was/were + V3"],
    examples: ["English is spoken all over the world.", "The bridge was built in 1990.", "The report will be finished tomorrow."],
    exercises: [
      { id: "e1", question: "This house ___ in 1920.", options: ["built", "was built", "is building"], answer: 1 },
      { id: "e2", question: "The letters ___ every morning.", options: ["are delivered", "delivered", "deliver"], answer: 0 },
    ],
  },
  {
    slug: "relative-clauses", title: "Mệnh đề quan hệ (Relative Clauses)", level: "B1",
    summary: "Bổ sung thông tin cho danh từ bằng who, which, that, whose, where.",
    structure: ["who – người", "which – vật", "whose – sở hữu", "where – nơi chốn"],
    examples: ["The woman who lives next door is a doctor.", "This is the book which I told you about.", "That's the café where we first met."],
    exercises: [
      { id: "e1", question: "The man ___ car was stolen called the police.", options: ["who", "whose", "which"], answer: 1 },
      { id: "e2", question: "This is the city ___ I was born.", options: ["which", "where", "who"], answer: 1 },
    ],
  },
  {
    slug: "inversion", title: "Đảo ngữ (Inversion)", level: "C1",
    summary: "Nhấn mạnh trong văn phong trang trọng bằng cách đảo trợ động từ lên trước chủ ngữ.",
    structure: ["Never/Rarely/Seldom + aux + S + V", "Not only + aux + S + V, but also…", "Hardly + had + S + V3 + when…"],
    examples: ["Never have I seen such a beautiful sunset.", "Not only did she win, but she also broke the record.", "Hardly had we arrived when it started to rain."],
    exercises: [
      { id: "e1", question: "Rarely ___ such dedication.", options: ["I have seen", "have I seen", "I saw"], answer: 1 },
      { id: "e2", question: "Not only ___ late, but he also forgot the documents.", options: ["he was", "was he", "he is"], answer: 1 },
    ],
  },
];

export const getGrammarLesson = (slug: string) => grammarLessons.find((g) => g.slug === slug);
