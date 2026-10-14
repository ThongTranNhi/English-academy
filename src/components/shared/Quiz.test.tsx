import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { QuizQuestion } from "@/types";
import { Quiz } from "./Quiz";
import { useProgressStore } from "@/store/progressStore";

const questions: QuizQuestion[] = [
  { id: "q1", question: "2 + 2 = ?", options: ["3", "4"], answer: 1 },
  { id: "q2", question: "Thủ đô Việt Nam?", options: ["Hà Nội", "Huế"], answer: 0, explanation: "Hà Nội là thủ đô." },
];

describe("Quiz", () => {
  it("chỉ cho nộp bài khi đã trả lời hết các câu", async () => {
    const user = userEvent.setup();
    render(<Quiz id="t" questions={questions} />);
    const submit = screen.getByRole("button", { name: "Nộp bài" });

    expect(submit).toBeDisabled();
    await user.click(screen.getByRole("radio", { name: "4" }));
    expect(submit).toBeDisabled();
    await user.click(screen.getByRole("radio", { name: "Huế" }));
    expect(submit).toBeEnabled();
  });

  it("chấm điểm, hiện giải thích và lưu điểm vào tiến độ", async () => {
    const user = userEvent.setup();
    render(<Quiz id="quiz-test" questions={questions} />);

    await user.click(screen.getByRole("radio", { name: "4" })); // đúng
    await user.click(screen.getByRole("radio", { name: "Huế" })); // sai
    await user.click(screen.getByRole("button", { name: "Nộp bài" }));

    expect(screen.getByRole("status")).toHaveTextContent("Đúng 1/2 câu");
    expect(screen.getByText(/Hà Nội là thủ đô/)).toBeInTheDocument();
    expect(screen.getAllByRole("radio").every((r) => (r as HTMLInputElement).disabled)).toBe(true);
    expect(useProgressStore.getState().quizScores["quiz-test"]).toBe(50);
  });

  it("làm lại xóa đáp án nhưng giữ điểm cao nhất", async () => {
    const user = userEvent.setup();
    render(<Quiz id="retry" questions={questions} />);

    await user.click(screen.getByRole("radio", { name: "4" }));
    await user.click(screen.getByRole("radio", { name: "Hà Nội" }));
    await user.click(screen.getByRole("button", { name: "Nộp bài" }));
    expect(useProgressStore.getState().quizScores.retry).toBe(100);

    await user.click(screen.getByRole("button", { name: /Làm lại/ }));
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(screen.getAllByRole("radio").some((r) => (r as HTMLInputElement).checked)).toBe(false);

    await user.click(screen.getByRole("radio", { name: "3" }));
    await user.click(screen.getByRole("radio", { name: "Huế" }));
    await user.click(screen.getByRole("button", { name: "Nộp bài" }));
    expect(screen.getByRole("status")).toHaveTextContent("Đúng 0/2 câu");
    expect(useProgressStore.getState().quizScores.retry).toBe(100);
  });
});
