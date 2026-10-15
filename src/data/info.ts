/** Nội dung trang thông tin tĩnh (FAQ, điều khoản…). Bản nháp – cần bộ phận pháp lý duyệt trước khi phát hành. */
export interface InfoPage {
  slug: string;
  title: string;
  sections: { heading: string; body: string }[];
}

export const infoPages: InfoPage[] = [
  {
    slug: "about",
    title: "Về English Academy",
    sections: [
      { heading: "Sứ mệnh", body: "Giúp người Việt học tiếng Anh hiệu quả với lộ trình rõ ràng, giảng viên tận tâm và công cụ luyện tập hằng ngày." },
      { heading: "Mô hình", body: "Học viện trực tuyến đa giảng viên: mỗi khóa học do giảng viên chuyên môn phụ trách, bám sát khung CEFR." },
    ],
  },
  {
    slug: "contact",
    title: "Liên hệ",
    sections: [
      { heading: "Tư vấn khóa học", body: "Email: jathong0107@gmail.com · Hotline: 0396 098 034." },
      { heading: "Hợp tác giảng dạy", body: "Gửi CV và chứng chỉ về jathong0107@gmail.com." },
    ],
  },
  {
    slug: "faq",
    title: "Câu hỏi thường gặp",
    sections: [
      { heading: "Tôi chưa biết trình độ của mình?", body: "Hãy xem trang Lộ trình CEFR để tự đánh giá, hoặc bắt đầu với bài học thử của khóa phù hợp." },
      { heading: "Có bài học miễn phí không?", body: "Có. Mỗi khóa học có bài học thử, và Thư viện có nhiều video, podcast, transcript miễn phí." },
      { heading: "Tiến độ học được lưu ở đâu?", body: "Ở phiên bản hiện tại, tiến độ chỉ lưu trên trình duyệt của bạn. Đồng bộ tài khoản sẽ có khi hệ thống backend hoàn thiện." },
    ],
  },
  {
    slug: "terms",
    title: "Điều khoản sử dụng",
    sections: [{ heading: "Bản nháp", body: "Nội dung điều khoản sử dụng đang được soạn thảo và sẽ được công bố trước khi mở đăng ký chính thức." }],
  },
  {
    slug: "privacy",
    title: "Chính sách bảo mật",
    sections: [{ heading: "Bản nháp", body: "Website hiện không thu thập hay gửi dữ liệu cá nhân về máy chủ. Chính sách đầy đủ sẽ được công bố khi có hệ thống tài khoản." }],
  },
  {
    slug: "refund",
    title: "Chính sách hoàn phí",
    sections: [{ heading: "Bản nháp", body: "Thanh toán trực tuyến chưa được hỗ trợ. Chính sách hoàn phí sẽ được công bố cùng tính năng thanh toán." }],
  },
];

export const getInfoPage = (slug: string) => infoPages.find((p) => p.slug === slug);
