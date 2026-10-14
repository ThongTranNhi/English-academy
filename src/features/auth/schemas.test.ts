import { describe, expect, it } from "vitest";
import { loginSchema, registerSchema } from "./schemas";

const validRegister = {
  name: "Lan Nguyễn",
  email: "lan@example.com",
  password: "matkhau123",
  confirmPassword: "matkhau123",
  goal: "ielts",
  agree: true,
};

function issuePaths(result: { success: boolean; error?: { issues: { path: PropertyKey[] }[] } }) {
  return result.error?.issues.map((i) => i.path.join(".")) ?? [];
}

describe("loginSchema", () => {
  it("chấp nhận email và mật khẩu hợp lệ", () => {
    expect(loginSchema.safeParse({ email: "a@b.vn", password: "123456" }).success).toBe(true);
  });

  it("từ chối email sai định dạng và mật khẩu quá ngắn", () => {
    const r = loginSchema.safeParse({ email: "khong-phai-email", password: "123" });
    expect(issuePaths(r)).toEqual(expect.arrayContaining(["email", "password"]));
  });
});

describe("registerSchema", () => {
  it("chấp nhận dữ liệu hợp lệ", () => {
    expect(registerSchema.safeParse(validRegister).success).toBe(true);
  });

  it("báo lỗi ở confirmPassword khi mật khẩu không khớp", () => {
    const r = registerSchema.safeParse({ ...validRegister, confirmPassword: "khac123456" });
    expect(issuePaths(r)).toEqual(["confirmPassword"]);
  });

  it("bắt buộc đồng ý điều khoản", () => {
    const r = registerSchema.safeParse({ ...validRegister, agree: false });
    expect(issuePaths(r)).toEqual(["agree"]);
  });

  it("chỉ chấp nhận mục tiêu trong danh sách", () => {
    const r = registerSchema.safeParse({ ...validRegister, goal: "sat" });
    expect(issuePaths(r)).toEqual(["goal"]);
  });

  it("họ tên chỉ có khoảng trắng bị từ chối", () => {
    const r = registerSchema.safeParse({ ...validRegister, name: "   " });
    expect(issuePaths(r)).toEqual(["name"]);
  });
});
