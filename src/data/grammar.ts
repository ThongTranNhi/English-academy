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
  {
    slug: "articles", title: "Mạo từ a, an, the", level: "A1",
    summary: "Dùng a/an cho danh từ đếm được số ít chưa xác định, the cho đối tượng đã xác định.",
    structure: ["a + phụ âm: a book, a university", "an + nguyên âm: an apple, an hour", "the + danh từ đã xác định hoặc duy nhất: the sun, the book on the table"],
    examples: ["I bought a new phone yesterday.", "She is an engineer.", "The moon looks beautiful tonight."],
    exercises: [
      { id: "e1", question: "She wants to be ___ doctor.", options: ["a", "an", "the"], answer: 0 },
      { id: "e2", question: "It takes ___ hour to get there.", options: ["a", "an", "the"], answer: 1, explanation: "\"hour\" bắt đầu bằng nguyên âm /aʊ/ vì chữ h câm." },
      { id: "e3", question: "___ Earth goes around the Sun.", options: ["A", "An", "The"], answer: 2 },
    ],
  },
  {
    slug: "present-continuous", title: "Thì hiện tại tiếp diễn (Present Continuous)", level: "A1",
    summary: "Diễn tả hành động đang xảy ra lúc nói hoặc kế hoạch đã sắp xếp trong tương lai gần.",
    structure: ["(+) S + am/is/are + V-ing", "(–) S + am/is/are + not + V-ing", "(?) Am/Is/Are + S + V-ing?"],
    examples: ["I am studying English now.", "They are playing football in the park.", "We are meeting the client tomorrow."],
    exercises: [
      { id: "e1", question: "Look! The baby ___.", options: ["sleeps", "is sleeping", "sleep"], answer: 1 },
      { id: "e2", question: "What ___ you doing right now?", options: ["are", "do", "is"], answer: 0 },
      { id: "e3", question: "I ___ (not / work) today. It's Sunday.", options: ["am not working", "don't working", "not work"], answer: 0 },
    ],
  },
  {
    slug: "past-simple", title: "Thì quá khứ đơn (Past Simple)", level: "A2",
    summary: "Diễn tả hành động đã xảy ra và kết thúc tại thời điểm xác định trong quá khứ.",
    structure: ["(+) S + V2/V-ed", "(–) S + did not + V", "(?) Did + S + V?"],
    examples: ["We visited Hoi An last summer.", "She didn't go to school yesterday.", "Did you watch the match?"],
    exercises: [
      { id: "e1", question: "I ___ to the cinema last night.", options: ["go", "went", "gone"], answer: 1 },
      { id: "e2", question: "___ she call you yesterday?", options: ["Does", "Did", "Was"], answer: 1 },
      { id: "e3", question: "They ___ the test last week.", options: ["didn't pass", "didn't passed", "not passed"], answer: 0, explanation: "Sau did not dùng động từ nguyên mẫu." },
    ],
  },
  {
    slug: "future-forms", title: "Tương lai: will, be going to, hiện tại tiếp diễn", level: "A2",
    summary: "Phân biệt quyết định tức thời, dự định có sẵn và lịch hẹn đã sắp xếp.",
    structure: ["will + V: quyết định tức thời, dự đoán", "be going to + V: dự định, dự đoán có căn cứ", "be + V-ing: kế hoạch đã sắp xếp cụ thể"],
    examples: ["I'm thirsty. I'll get some water.", "Look at those clouds! It's going to rain.", "I'm flying to Hanoi on Friday."],
    exercises: [
      { id: "e1", question: "The phone is ringing. I ___ answer it.", options: ["will", "am going to", "am answering"], answer: 0, explanation: "Quyết định ngay lúc nói dùng will." },
      { id: "e2", question: "She has bought a ticket. She ___ visit Japan.", options: ["will", "is going to", "visits"], answer: 1 },
      { id: "e3", question: "We ___ dinner with our parents tonight. It's all arranged.", options: ["have", "are having", "will having"], answer: 1 },
    ],
  },
  {
    slug: "comparatives", title: "So sánh hơn và so sánh nhất", level: "A2",
    summary: "So sánh hai hay nhiều đối tượng với tính từ ngắn, dài và bất quy tắc.",
    structure: ["Tính từ ngắn: adj-er + than / the adj-est", "Tính từ dài: more/most + adj", "Bất quy tắc: good – better – the best, bad – worse – the worst"],
    examples: ["Hanoi is colder than Saigon in winter.", "This is the most interesting book I've read.", "Her English is better than mine."],
    exercises: [
      { id: "e1", question: "This bag is ___ than that one.", options: ["cheaper", "more cheap", "cheapest"], answer: 0 },
      { id: "e2", question: "It was the ___ day of my life.", options: ["good", "better", "best"], answer: 2 },
      { id: "e3", question: "Learning grammar is ___ than I thought.", options: ["more easy", "easier", "easyer"], answer: 1 },
    ],
  },
  {
    slug: "modal-verbs", title: "Động từ khuyết thiếu (Modal Verbs)", level: "A2",
    summary: "can, must, should, may, might: khả năng, bắt buộc, lời khuyên và phỏng đoán.",
    structure: ["can/could + V: khả năng, xin phép", "must/have to + V: bắt buộc", "should + V: lời khuyên", "may/might + V: khả năng xảy ra"],
    examples: ["You should drink more water.", "Students must wear uniforms.", "It might rain this afternoon."],
    exercises: [
      { id: "e1", question: "You look tired. You ___ go to bed early.", options: ["should", "must not", "can't"], answer: 0 },
      { id: "e2", question: "Visitors ___ smoke inside the museum.", options: ["mustn't", "don't have to", "might"], answer: 0 },
      { id: "e3", question: "Take an umbrella. It ___ rain later.", options: ["must", "might", "should"], answer: 1 },
    ],
  },
  {
    slug: "past-continuous", title: "Thì quá khứ tiếp diễn (Past Continuous)", level: "B1",
    summary: "Hành động đang diễn ra tại một thời điểm trong quá khứ, thường bị hành động khác xen vào.",
    structure: ["(+) S + was/were + V-ing", "Kết hợp: S + was/were + V-ing + when + S + V2", "While + S + was/were + V-ing, S + V2"],
    examples: ["I was cooking when she called.", "At 8 p.m. yesterday, we were watching TV.", "While he was driving, it started to snow."],
    exercises: [
      { id: "e1", question: "I ___ a shower when the phone rang.", options: ["took", "was taking", "am taking"], answer: 1 },
      { id: "e2", question: "What ___ you doing at 9 o'clock last night?", options: ["did", "were", "was"], answer: 1 },
      { id: "e3", question: "While we were walking, we ___ an old friend.", options: ["were meeting", "met", "meet"], answer: 1 },
    ],
  },
  {
    slug: "gerunds-infinitives", title: "Danh động từ và động từ nguyên mẫu", level: "B1",
    summary: "Động từ nào đi với V-ing, động từ nào đi với to V, và khi nghĩa thay đổi.",
    structure: ["V-ing sau: enjoy, avoid, finish, mind, suggest", "to V sau: want, decide, hope, plan, agree", "Đổi nghĩa: stop/remember/try + V-ing hoặc to V"],
    examples: ["I enjoy reading in the evening.", "She decided to study abroad.", "Remember to lock the door."],
    exercises: [
      { id: "e1", question: "He avoided ___ the question.", options: ["to answer", "answering", "answer"], answer: 1 },
      { id: "e2", question: "We hope ___ you again soon.", options: ["seeing", "to see", "see"], answer: 1 },
      { id: "e3", question: "I stopped ___ coffee because it kept me awake.", options: ["drinking", "to drink", "drink"], answer: 0, explanation: "stop + V-ing: bỏ hẳn một việc; stop + to V: dừng lại để làm việc khác." },
    ],
  },
  {
    slug: "reported-speech", title: "Câu tường thuật (Reported Speech)", level: "B1",
    summary: "Chuyển lời nói trực tiếp sang gián tiếp: lùi thì, đổi đại từ và trạng từ.",
    structure: ["Lùi thì: am/is → was, will → would, V1 → V2", "Đổi trạng từ: now → then, tomorrow → the next day", "Câu hỏi: asked + if/wh- + S + V"],
    examples: ["She said (that) she was tired.", "He told me he would call the next day.", "They asked where I lived."],
    exercises: [
      { id: "e1", question: "\"I am busy,\" he said. → He said he ___ busy.", options: ["is", "was", "were"], answer: 1 },
      { id: "e2", question: "\"Do you like tea?\" → She asked me ___ tea.", options: ["if I liked", "do I like", "if did I like"], answer: 0 },
      { id: "e3", question: "\"I'll come tomorrow.\" → He said he would come ___.", options: ["tomorrow", "the next day", "yesterday"], answer: 1 },
    ],
  },
  {
    slug: "past-perfect", title: "Thì quá khứ hoàn thành (Past Perfect)", level: "B2",
    summary: "Hành động xảy ra trước một hành động hoặc thời điểm khác trong quá khứ.",
    structure: ["(+) S + had + V3", "Kết hợp: By the time + S + V2, S + had + V3", "After + S + had + V3, S + V2"],
    examples: ["When we arrived, the film had already started.", "She had never seen snow before she moved to Canada.", "After he had finished work, he went to the gym."],
    exercises: [
      { id: "e1", question: "By the time I got to the station, the train ___.", options: ["left", "had left", "has left"], answer: 1 },
      { id: "e2", question: "I ___ the book before I watched the film.", options: ["had read", "have read", "was reading"], answer: 0 },
      { id: "e3", question: "They were tired because they ___ all day.", options: ["had walked", "walk", "have walked"], answer: 0 },
    ],
  },
  {
    slug: "wish-clauses", title: "Câu ước với wish và if only", level: "B2",
    summary: "Ước muốn trái với hiện tại, quá khứ và mong muốn thay đổi trong tương lai.",
    structure: ["Hiện tại: S + wish + S + V2/were", "Quá khứ: S + wish + S + had + V3", "Tương lai/phàn nàn: S + wish + S + would + V"],
    examples: ["I wish I had more free time.", "She wishes she had studied harder.", "I wish you would stop talking."],
    exercises: [
      { id: "e1", question: "I wish I ___ speak Japanese.", options: ["can", "could", "will"], answer: 1 },
      { id: "e2", question: "He wishes he ___ that car last year.", options: ["didn't buy", "hadn't bought", "wouldn't buy"], answer: 1 },
      { id: "e3", question: "If only it ___ so hot today!", options: ["isn't", "weren't", "won't be"], answer: 1 },
    ],
  },
  {
    slug: "mixed-conditionals", title: "Câu điều kiện hỗn hợp", level: "C1",
    summary: "Kết hợp điều kiện loại 2 và 3 khi nguyên nhân và kết quả thuộc hai thời điểm khác nhau.",
    structure: ["Quá khứ → hiện tại: If + S + had + V3, S + would + V", "Hiện tại → quá khứ: If + S + V2/were, S + would have + V3"],
    examples: ["If I had taken the job, I would be living in London now.", "If she weren't so shy, she would have spoken at the meeting.", "If we had left earlier, we wouldn't be stuck in traffic."],
    exercises: [
      { id: "e1", question: "If I had studied medicine, I ___ a doctor now.", options: ["would be", "would have been", "will be"], answer: 0 },
      { id: "e2", question: "If he ___ afraid of flying, he would have visited us last year.", options: ["isn't", "weren't", "hadn't been"], answer: 1 },
      { id: "e3", question: "If they hadn't missed the bus, they ___ here by now.", options: ["would be", "would have", "will be"], answer: 0 },
    ],
  },
  {
    slug: "cleft-sentences", title: "Câu chẻ (Cleft Sentences)", level: "C1",
    summary: "Nhấn mạnh một thành phần trong câu bằng It is… that… và What… is…",
    structure: ["It + is/was + thành phần nhấn mạnh + that/who + mệnh đề", "What + S + V + is/was + thành phần nhấn mạnh", "All (that) + S + V + is/was…"],
    examples: ["It was Lan who won the prize.", "What I need is a long holiday.", "All I want is a quiet place to study."],
    exercises: [
      { id: "e1", question: "___ was the noise that woke me up.", options: ["It", "What", "This"], answer: 0 },
      { id: "e2", question: "___ surprised me was her calm reaction.", options: ["It", "What", "That"], answer: 1 },
      { id: "e3", question: "It was in 2020 ___ they moved to Da Nang.", options: ["which", "that", "what"], answer: 1 },
    ],
  },
  {
    slug: "subjunctive", title: "Thức giả định (Subjunctive)", level: "C2",
    summary: "Dùng động từ nguyên mẫu sau các động từ, tính từ biểu thị yêu cầu, đề xuất trong văn phong trang trọng.",
    structure: ["S + suggest/recommend/insist + (that) + S + V (nguyên mẫu)", "It is essential/vital/important + that + S + V", "Phủ định: S + not + V"],
    examples: ["The committee recommended that the plan be approved.", "It is essential that every student attend the briefing.", "She insisted that he not leave early."],
    exercises: [
      { id: "e1", question: "The doctor suggested that she ___ more rest.", options: ["gets", "get", "got"], answer: 1 },
      { id: "e2", question: "It is vital that the report ___ submitted on time.", options: ["is", "be", "was"], answer: 1 },
      { id: "e3", question: "They insisted that he ___ the meeting.", options: ["not attend", "doesn't attend", "not attends"], answer: 0 },
    ],
  },
];

export const getGrammarLesson = (slug: string) => grammarLessons.find((g) => g.slug === slug);
