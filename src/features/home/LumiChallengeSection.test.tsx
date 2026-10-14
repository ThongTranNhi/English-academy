import { describe, expect, it } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithRouter } from "@/test/render";
import { LumiChallengeSection } from "./LumiChallengeSection";

describe("Lumi challenge", () => {
  it("động viên khi sai, cho phép sửa đáp án và chơi lại", async () => {
    const user = userEvent.setup();
    renderWithRouter(<LumiChallengeSection />);
    await user.click(screen.getByRole("button", { name: "dog" }));
    expect(within(screen.getByRole("region", { name: "Một thử thách cùng Lumi!" })).getByRole("status")).toHaveTextContent("Mình thử lại nhé");
    expect(screen.getByRole("button", { name: "cat" })).toBeEnabled();
    await user.click(screen.getByRole("button", { name: "cat" }));
    expect(within(screen.getByRole("region", { name: "Một thử thách cùng Lumi!" })).getByRole("status")).toHaveTextContent("Đúng rồi! Cat là con mèo");
    expect(screen.getByRole("button", { name: "cat" })).toBeDisabled();
    await user.click(screen.getByRole("button", { name: "Chơi lại" }));
    expect(screen.getByRole("button", { name: "cat" })).toBeEnabled();
    expect(within(screen.getByRole("region", { name: "Một thử thách cùng Lumi!" })).getByRole("status")).toHaveTextContent("Chọn một đáp án");
  });

  it("cho phép chào và tắt chuyển động mà vẫn làm được câu hỏi", async () => {
    const user = userEvent.setup();
    renderWithRouter(<LumiChallengeSection />);
    await user.click(screen.getByRole("button", { name: "Chào Lumi" }));
    expect(screen.getByText("Xin chào! Cùng chơi một câu hỏi nhé!")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Tắt chuyển động của Lumi" }));
    expect(screen.getByRole("button", { name: "Bật chuyển động của Lumi" })).toHaveAttribute("aria-pressed", "true");
    await user.click(screen.getByRole("button", { name: "cat" }));
    expect(within(screen.getByRole("region", { name: "Một thử thách cùng Lumi!" })).getByRole("status")).toHaveTextContent("Giỏi lắm");
  });
});
