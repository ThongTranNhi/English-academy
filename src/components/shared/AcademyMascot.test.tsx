import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithRouter } from "@/test/render";
import { AcademyMascot } from "./AcademyMascot";

describe("Lumi", () => {
  it("chỉ mở gợi ý khi được yêu cầu và đóng sau khi chọn lộ trình", async () => {
    const user = userEvent.setup();
    renderWithRouter(<AcademyMascot />);
    expect(screen.queryByRole("link", { name: "Tìm lộ trình phù hợp" })).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Mở gợi ý học tập của Lumi" }));
    await user.click(screen.getByRole("link", { name: "Tìm lộ trình phù hợp" }));
    expect(screen.getByTestId("location")).toHaveTextContent("/learning-paths");
    expect(screen.queryByRole("link", { name: "Tìm lộ trình phù hợp" })).not.toBeInTheDocument();
  });

  it("cho phép dừng chuyển động, ẩn và hiện lại mascot", async () => {
    const user = userEvent.setup();
    renderWithRouter(<AcademyMascot />);
    await user.click(screen.getByRole("button", { name: "Mở gợi ý học tập của Lumi" }));
    await user.click(screen.getByRole("button", { name: "Dừng chuyển động" }));
    expect(screen.getByRole("button", { name: "Bật chuyển động" })).toHaveAttribute("aria-pressed", "true");
    await user.click(screen.getByRole("button", { name: "Ẩn Lumi" }));
    expect(screen.queryByRole("complementary")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Hiện Lumi" }));
    expect(screen.getByRole("button", { name: "Mở gợi ý học tập của Lumi" })).toBeInTheDocument();
  });
  it("đóng bằng Escape và trả focus về nút mở", async () => {
    const user = userEvent.setup();
    renderWithRouter(<AcademyMascot />);
    await user.click(screen.getByRole("button", { name: "Mở gợi ý học tập của Lumi" }));
    screen.getByRole("button", { name: "Đóng gợi ý của Lumi" }).focus();
    await user.keyboard("{Escape}");
    expect(screen.getByRole("button", { name: "Mở gợi ý học tập của Lumi" })).toHaveFocus();
    expect(screen.queryByRole("link", { name: "Tìm lộ trình phù hợp" })).not.toBeInTheDocument();
  });
});
