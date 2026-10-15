import { describe, expect, it } from "vitest";
import { act, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "./Header";
import { renderWithRouter } from "@/test/render";
import { useAuthStore } from "@/store/authStore";

const location = () => screen.getByTestId("location");

describe("Header", () => {
  const megaMenuTrigger = () =>
    within(screen.getByRole("navigation", { name: "Điều hướng chính" })).getByRole("button", { name: "Khóa học" });
  const ieltsLink = () => screen.queryByRole("link", { name: /^IELTS/ });

  it("chuột: hover mở mega menu, bấm lần đầu vẫn giữ mở, bấm lần hai mới đóng", async () => {
    const user = userEvent.setup();
    renderWithRouter(<Header />);
    const trigger = megaMenuTrigger();

    await user.click(trigger); // user-event phát pointerenter (chuột) rồi click
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(ieltsLink()).toHaveAttribute("href", "/courses?category=ielts");

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(ieltsLink()).not.toBeInTheDocument();
  });

  it("chuột: rời khỏi mục menu thì mega menu đóng", async () => {
    const user = userEvent.setup();
    renderWithRouter(<Header />);
    const trigger = megaMenuTrigger();

    await user.hover(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    await user.unhover(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("cảm ứng: chạm mở mega menu và không bị đóng ngay", async () => {
    const user = userEvent.setup();
    renderWithRouter(<Header />);
    const trigger = megaMenuTrigger();

    await user.pointer({ keys: "[TouchA]", target: trigger });
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(ieltsLink()).toBeInTheDocument();
  });

  it("bàn phím: Enter mở mega menu, Escape đóng", async () => {
    const user = userEvent.setup();
    renderWithRouter(<Header />);
    const trigger = megaMenuTrigger();

    trigger.focus();
    await user.keyboard("{Enter}");
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    await user.keyboard("{Escape}");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(ieltsLink()).not.toBeInTheDocument();
  });

  it("menu di động mở ra và tự đóng sau khi chuyển trang", async () => {
    const user = userEvent.setup();
    renderWithRouter(<Header />);
    const toggle = screen.getByRole("button", { name: "Mở menu" });

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    const mobileNav = screen.getByRole("navigation", { name: "Điều hướng di động" });

    await user.click(within(mobileNav).getByRole("link", { name: "Giảng viên" }));
    expect(location()).toHaveTextContent("/teachers");
    expect(screen.queryByRole("navigation", { name: "Điều hướng di động" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Mở menu" })).toHaveAttribute("aria-expanded", "false");
  });

  it("Ctrl+K mở tìm kiếm, hiện kết quả trực tiếp và Enter chuyển tới trang kết quả", async () => {
    const user = userEvent.setup();
    renderWithRouter(<Header />);

    await user.keyboard("{Control>}k{/Control}");
    const dialog = await screen.findByRole("dialog", { name: "Tìm kiếm" });
    const input = within(dialog).getByRole("searchbox", { name: "Từ khóa tìm kiếm" });
    expect(input).toHaveFocus();

    await user.type(input, "toeic");
    expect(await within(dialog).findByRole("link", { name: /TOEIC Listening & Reading 650\+/ })).toHaveAttribute("href", "/courses/toeic-650-plus");

    await user.keyboard("{Enter}");
    expect(location()).toHaveTextContent("/search?q=toeic");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("đóng hộp tìm kiếm bằng Escape", async () => {
    const user = userEvent.setup();
    renderWithRouter(<Header />);

    await user.click(screen.getByRole("button", { name: /Tìm kiếm/ }));
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("hiện Đăng nhập/Đăng ký khi chưa đăng nhập và nút Đăng xuất khi đã đăng nhập", async () => {
    const user = userEvent.setup();
    renderWithRouter(<Header />);
    expect(screen.getByRole("link", { name: "Đăng nhập" })).toHaveAttribute("href", "/login");

    act(() => useAuthStore.getState().signIn({ name: "Trần An", email: "an@example.com" }));
    const logout = await screen.findByRole("button", { name: "Đăng xuất" });
    expect(screen.getByRole("link", { name: /An/ })).toHaveAttribute("href", "/dashboard");

    await user.click(logout);
    expect(useAuthStore.getState().user).toBeNull();
    expect(screen.getByRole("link", { name: "Đăng nhập" })).toBeInTheDocument();
  });
});
