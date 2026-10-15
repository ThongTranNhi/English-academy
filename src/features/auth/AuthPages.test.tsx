import { describe, expect, it } from "vitest";
import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithRouter } from "@/test/render";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import { useAuthStore } from "@/store/authStore";
import { passwordScore } from "./passwordStrength";

describe("trang đăng nhập", () => {
  it("báo lỗi và Lumi động viên khi gửi form trống", async () => {
    const user = userEvent.setup();
    renderWithRouter(<LoginPage />, { route: "/login" });
    await user.click(screen.getByRole("button", { name: "Đăng nhập (demo)" }));
    expect(await screen.findByText("Email không hợp lệ")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Ôi, còn vài ô chưa đúng. Mình sửa lại nhé!")).toBeInTheDocument();
  });

  it("hiện và ẩn mật khẩu", async () => {
    const user = userEvent.setup();
    renderWithRouter(<LoginPage />, { route: "/login" });
    const password = screen.getByLabelText("Mật khẩu");
    expect(password).toHaveAttribute("type", "password");
    await user.click(screen.getByRole("button", { name: "Hiện mật khẩu" }));
    expect(password).toHaveAttribute("type", "text");
    await user.click(screen.getByRole("button", { name: "Ẩn mật khẩu" }));
    expect(password).toHaveAttribute("type", "password");
  });

  it("Lumi che mắt khi hiện mật khẩu và mở mắt khi ẩn lại", async () => {
    const user = userEvent.setup();
    const { container } = renderWithRouter(<LoginPage />, { route: "/login" });
    const lumi = () => container.querySelector("aside img")?.getAttribute("src");
    expect(lumi()).not.toContain("lumi-cover");
    await user.click(screen.getByRole("button", { name: "Hiện mật khẩu" }));
    expect(lumi()).toBe("/images/lumi/lumi-cover.webp");
    expect(screen.getByText("Mình che mắt rồi, không nhìn trộm đâu!")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Ẩn mật khẩu" }));
    expect(lumi()).not.toContain("lumi-cover");
    expect(screen.getByText("Xong rồi, mình mở mắt ra nhé!")).toBeInTheDocument();
  });

  it("đăng nhập thành công rồi chuyển sang Dashboard", async () => {
    const user = userEvent.setup();
    renderWithRouter(<LoginPage />, { route: "/login" });
    await user.type(screen.getByLabelText("Email"), "lan@example.com");
    await user.type(screen.getByLabelText("Mật khẩu"), "secret123");
    await user.click(screen.getByRole("button", { name: "Đăng nhập (demo)" }));
    expect(await screen.findByRole("button", { name: "Đăng nhập thành công!" })).toBeDisabled();
    expect(useAuthStore.getState().user).toEqual({ name: "lan", email: "lan@example.com" });
    await waitFor(() => expect(screen.getByTestId("location")).toHaveTextContent("/dashboard"), { timeout: 3000 });
  });
});

describe("trang đăng ký", () => {
  it("chọn mục tiêu bằng nút thẻ, chấm độ mạnh mật khẩu và tạo tài khoản", async () => {
    const user = userEvent.setup();
    renderWithRouter(<RegisterPage />, { route: "/register" });
    await user.type(screen.getByLabelText("Họ và tên"), "Nguyễn Văn An");
    await user.type(screen.getByLabelText("Email"), "an@example.com");
    await user.type(screen.getByLabelText("Mật khẩu"), "abc");
    expect(screen.getByText("Độ mạnh mật khẩu: Yếu")).toBeInTheDocument();
    await user.type(screen.getByLabelText("Mật khẩu"), "DEF12!");
    expect(screen.getByText("Độ mạnh mật khẩu: Mạnh")).toBeInTheDocument();
    await user.type(screen.getByLabelText("Xác nhận mật khẩu"), "abcDEF12!");
    await user.click(screen.getByRole("radio", { name: "IELTS" }));
    expect(screen.getByRole("radio", { name: "IELTS" })).toBeChecked();
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: "Tạo tài khoản (demo)" }));
    expect(await screen.findByText("Chào mừng An đến với Academy!")).toBeInTheDocument();
    await waitFor(() => expect(screen.getByTestId("location")).toHaveTextContent("/dashboard"), { timeout: 3000 });
  });

  it("Lumi vẫn che mắt khi còn một ô mật khẩu đang hiện", async () => {
    const user = userEvent.setup();
    const { container } = renderWithRouter(<RegisterPage />, { route: "/register" });
    const lumi = () => container.querySelector("aside img")?.getAttribute("src");
    const [password, confirm] = screen.getAllByRole("button", { name: "Hiện mật khẩu" });
    await user.click(password);
    await user.click(confirm);
    await user.click(screen.getAllByRole("button", { name: "Ẩn mật khẩu" })[0]);
    expect(lumi()).toBe("/images/lumi/lumi-cover.webp");
    await user.click(screen.getByRole("button", { name: "Ẩn mật khẩu" }));
    expect(lumi()).not.toContain("lumi-cover");
  });

  it("báo lỗi khi chưa chọn mục tiêu và chưa đồng ý điều khoản", async () => {
    const user = userEvent.setup();
    renderWithRouter(<RegisterPage />, { route: "/register" });
    await user.click(screen.getByRole("button", { name: "Tạo tài khoản (demo)" }));
    expect(await screen.findByText("Vui lòng chọn mục tiêu")).toBeInTheDocument();
    expect(screen.getByText("Bạn cần đồng ý với điều khoản")).toBeInTheDocument();
    const tabs = screen.getByRole("navigation", { name: "Chọn đăng nhập hoặc đăng ký" });
    expect(within(tabs).getByRole("link", { name: "Đăng ký" })).toHaveAttribute("aria-current", "page");
    expect(within(tabs).getByRole("link", { name: "Đăng nhập" })).toHaveAttribute("href", "/login");
  });
});

describe("passwordScore", () => {
  it("cộng điểm theo độ dài, chữ hoa/thường, số và ký tự đặc biệt", () => {
    expect(passwordScore("")).toBe(0);
    expect(passwordScore("abc")).toBe(0);
    expect(passwordScore("abcdefgh")).toBe(1);
    expect(passwordScore("abcdEFGH")).toBe(2);
    expect(passwordScore("abcdEF12")).toBe(3);
    expect(passwordScore("abcDEF12!")).toBe(4);
  });
});
