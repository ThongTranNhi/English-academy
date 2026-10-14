import type { VocabTopic } from "@/types";

export const vocabTopics: VocabTopic[] = [
  {
    slug: "travel", title: "Du lịch", level: "A2", icon: "Plane", tone: "cyan",
    words: [
      { word: "itinerary", phonetic: "/aɪˈtɪnərəri/", partOfSpeech: "n", meaning: "lịch trình", example: "Our itinerary includes three days in Hoi An." },
      { word: "luggage", phonetic: "/ˈlʌɡɪdʒ/", partOfSpeech: "n", meaning: "hành lý", example: "Please don't leave your luggage unattended." },
      { word: "boarding pass", phonetic: "/ˈbɔːdɪŋ pɑːs/", partOfSpeech: "n", meaning: "thẻ lên máy bay", example: "Have your boarding pass ready at the gate." },
      { word: "delay", phonetic: "/dɪˈleɪ/", partOfSpeech: "n/v", meaning: "sự trì hoãn", example: "The flight was delayed by two hours." },
      { word: "sightseeing", phonetic: "/ˈsaɪtsiːɪŋ/", partOfSpeech: "n", meaning: "tham quan", example: "We spent the afternoon sightseeing." },
      { word: "accommodation", phonetic: "/əˌkɒməˈdeɪʃn/", partOfSpeech: "n", meaning: "chỗ ở", example: "The price includes accommodation and breakfast." },
    ],
  },
  {
    slug: "work", title: "Công việc", level: "B1", icon: "Briefcase", tone: "indigo",
    words: [
      { word: "deadline", phonetic: "/ˈdedlaɪn/", partOfSpeech: "n", meaning: "hạn chót", example: "We need to meet the deadline on Friday." },
      { word: "colleague", phonetic: "/ˈkɒliːɡ/", partOfSpeech: "n", meaning: "đồng nghiệp", example: "My colleagues are very supportive." },
      { word: "promotion", phonetic: "/prəˈməʊʃn/", partOfSpeech: "n", meaning: "sự thăng chức", example: "She got a promotion last month." },
      { word: "negotiate", phonetic: "/nɪˈɡəʊʃieɪt/", partOfSpeech: "v", meaning: "đàm phán", example: "They negotiated a better contract." },
      { word: "workload", phonetic: "/ˈwɜːkləʊd/", partOfSpeech: "n", meaning: "khối lượng công việc", example: "My workload has doubled this year." },
    ],
  },
  {
    slug: "food", title: "Ẩm thực", level: "A1", icon: "Utensils", tone: "amber",
    words: [
      { word: "delicious", phonetic: "/dɪˈlɪʃəs/", partOfSpeech: "adj", meaning: "ngon", example: "This pho is delicious!" },
      { word: "recipe", phonetic: "/ˈresəpi/", partOfSpeech: "n", meaning: "công thức nấu ăn", example: "Can you share the recipe?" },
      { word: "spicy", phonetic: "/ˈspaɪsi/", partOfSpeech: "adj", meaning: "cay", example: "I don't like spicy food." },
      { word: "ingredient", phonetic: "/ɪnˈɡriːdiənt/", partOfSpeech: "n", meaning: "nguyên liệu", example: "Fresh ingredients make a big difference." },
      { word: "dessert", phonetic: "/dɪˈzɜːt/", partOfSpeech: "n", meaning: "món tráng miệng", example: "Let's order dessert." },
    ],
  },
  {
    slug: "technology", title: "Công nghệ", level: "B2", icon: "Laptop", tone: "navy",
    words: [
      { word: "innovation", phonetic: "/ˌɪnəˈveɪʃn/", partOfSpeech: "n", meaning: "sự đổi mới", example: "Innovation drives economic growth." },
      { word: "device", phonetic: "/dɪˈvaɪs/", partOfSpeech: "n", meaning: "thiết bị", example: "Turn off all electronic devices." },
      { word: "privacy", phonetic: "/ˈprɪvəsi/", partOfSpeech: "n", meaning: "quyền riêng tư", example: "Online privacy is a growing concern." },
      { word: "automate", phonetic: "/ˈɔːtəmeɪt/", partOfSpeech: "v", meaning: "tự động hóa", example: "Many tasks can now be automated." },
      { word: "breakthrough", phonetic: "/ˈbreɪkθruː/", partOfSpeech: "n", meaning: "bước đột phá", example: "It was a major scientific breakthrough." },
    ],
  },
  {
    slug: "environment", title: "Môi trường", level: "B2", icon: "Leaf", tone: "emerald",
    words: [
      { word: "pollution", phonetic: "/pəˈluːʃn/", partOfSpeech: "n", meaning: "ô nhiễm", example: "Air pollution is a serious problem in big cities." },
      { word: "renewable", phonetic: "/rɪˈnjuːəbl/", partOfSpeech: "adj", meaning: "tái tạo được", example: "Solar power is a renewable energy source." },
      { word: "sustainable", phonetic: "/səˈsteɪnəbl/", partOfSpeech: "adj", meaning: "bền vững", example: "We need more sustainable transport." },
      { word: "emission", phonetic: "/iˈmɪʃn/", partOfSpeech: "n", meaning: "khí thải", example: "Carbon emissions must be reduced." },
    ],
  },
  {
    slug: "health", title: "Sức khỏe", level: "B1", icon: "HeartPulse", tone: "rose",
    words: [
      { word: "symptom", phonetic: "/ˈsɪmptəm/", partOfSpeech: "n", meaning: "triệu chứng", example: "A fever is a common symptom of flu." },
      { word: "prescription", phonetic: "/prɪˈskrɪpʃn/", partOfSpeech: "n", meaning: "đơn thuốc", example: "You need a prescription for this medicine." },
      { word: "recover", phonetic: "/rɪˈkʌvə(r)/", partOfSpeech: "v", meaning: "hồi phục", example: "She recovered quickly after the surgery." },
      { word: "balanced diet", phonetic: "/ˈbælənst ˈdaɪət/", partOfSpeech: "n", meaning: "chế độ ăn cân bằng", example: "A balanced diet keeps you healthy." },
    ],
  },
];

export const getVocabTopic = (slug: string) => vocabTopics.find((t) => t.slug === slug);
