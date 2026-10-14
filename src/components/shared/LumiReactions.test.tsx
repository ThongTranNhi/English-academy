import { act, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { renderWithRouter } from "@/test/render";
import { AcademyMascot } from "./AcademyMascot";
import { Quiz } from "./Quiz";
import { Flashcards } from "@/features/vocabulary/Flashcards";
import { cueLumi } from "@/lib/lumi";

describe("learning reactions", () => {
  it("ăn mừng quiz đúng, động viên khi còn câu sai", async () => {
    const user = userEvent.setup();
    renderWithRouter(<><AcademyMascot /><Quiz id="lumi-quiz" questions={[{ id: "cat", question: "Con mèo?", options: ["cat", "dog"], answer: 0 }]} /></>);
    await user.click(screen.getByRole("radio", { name: "cat" }));
    await user.click(screen.getByRole("button", { name: "Nộp bài" }));
    expect(screen.getByText("Tuyệt vời! Bạn đã trả lời đúng tất cả!")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Làm lại" }));
    await user.click(screen.getByRole("radio", { name: "dog" }));
    await user.click(screen.getByRole("button", { name: "Nộp bài" }));
    expect(screen.getByText("Bạn đã hoàn thành bài! Cùng xem giải thích để học tiếp nhé.")).toBeInTheDocument();
  });

  it("ăn mừng khi đánh dấu từ đã thuộc", async () => {
    const user = userEvent.setup();
    renderWithRouter(<><AcademyMascot /><Flashcards words={[{ word: "cat", phonetic: "/kæt/", partOfSpeech: "n", meaning: "con mèo", example: "A cat." }]} /></>);
    await user.click(screen.getByRole("button", { name: "Đánh dấu đã thuộc" }));
    expect(screen.getByText("Thêm một từ đã thuộc! Cùng Lumi tiến bộ từng chút nhé.")).toBeInTheDocument();
  });

  it("kích hoạt lại cùng một phản ứng và kết thúc đúng hạn", () => {
    vi.useFakeTimers();
    try {
      renderWithRouter(<AcademyMascot />);
      act(() => cueLumi("celebrate", "Lần đầu"));
      act(() => vi.advanceTimersByTime(2000));
      act(() => cueLumi("celebrate", "Lần tiếp theo"));
      act(() => vi.advanceTimersByTime(1000));
      expect(screen.getByText("Lần tiếp theo")).toBeInTheDocument();
      act(() => vi.advanceTimersByTime(1800));
      expect(screen.queryByText("Lần tiếp theo")).not.toBeInTheDocument();
    } finally { vi.useRealTimers(); }
  });
});
