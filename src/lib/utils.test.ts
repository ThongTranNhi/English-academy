import { describe, expect, it } from "vitest";
import { formatPrice, initials, matchesQuery, normalize } from "./utils";

describe("normalize", () => {
  it("bỏ dấu tiếng Việt, chuyển chữ thường và cắt khoảng trắng", () => {
    expect(normalize("  Giao Tiếp Tự Tin  ")).toBe("giao tiep tu tin");
  });

  it("chuyển đ/Đ thành d", () => {
    expect(normalize("Đường đi")).toBe("duong di");
  });
});

describe("matchesQuery", () => {
  it("khớp không phân biệt dấu và hoa thường", () => {
    expect(matchesQuery("phat am", "Pronunciation", "Phát âm chuẩn")).toBe(true);
  });

  it("trả về false khi không trường nào khớp", () => {
    expect(matchesQuery("toeic", "IELTS Foundation", undefined)).toBe(false);
  });

  it("chuỗi rỗng khớp mọi thứ", () => {
    expect(matchesQuery("   ", "bất kỳ")).toBe(true);
  });
});

describe("formatPrice", () => {
  it("hiển thị 'Miễn phí' cho giá 0", () => {
    expect(formatPrice(0)).toBe("Miễn phí");
  });

  it("định dạng VND theo locale vi-VN", () => {
    expect(formatPrice(2490000)).toMatch(/^2\.490\.000\s?₫$/);
  });
});

describe("initials", () => {
  it("lấy chữ cái đầu của họ và tên", () => {
    expect(initials("Nguyễn Minh Anh")).toBe("NA");
  });

  it("lấy 2 ký tự đầu khi chỉ có một từ", () => {
    expect(initials("sarah")).toBe("SA");
  });
});
