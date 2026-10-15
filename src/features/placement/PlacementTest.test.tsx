import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PlacementTest } from "./PlacementTest";
import { placementQuestions } from "@/data/placement";
import { renderWithRouter } from "@/test/render";
import { useProgressStore } from "@/store/progressStore";

async function answerAll(user: ReturnType<typeof userEvent.setup>, pick: (index: number) => number) {
  for (let i = 0; i < placementQuestions.length; i++) {
    const q = placementQuestions[i];
    await user.click(screen.getByRole("radio", { name: q.options[pick(i)] }));
    await user.click(screen.getByRole("button", { name: i === placementQuestions.length - 1 ? "Xem kết quả" : /Câu tiếp/ }));
  }
}

describe("PlacementTest", () => {
  it("chỉ cho sang câu tiếp khi đã chọn đáp án, và quay lại câu trước được", async () => {
    const user = userEvent.setup();
    renderWithRouter(<PlacementTest />);
    await user.click(screen.getByRole("button", { name: /Bắt đầu làm bài/ }));

    expect(screen.getByText(`Câu 1/${placementQuestions.length}`)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Câu tiếp/ })).toBeDisabled();
    expect(screen.getByRole("button", { name: /Câu trước/ })).toBeDisabled();

    await user.click(screen.getByRole("radio", { name: placementQuestions[0].options[0] }));
    await user.click(screen.getByRole("button", { name: /Câu tiếp/ }));
    expect(screen.getByText(`Câu 2/${placementQuestions.length}`)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Câu trước/ }));
    expect(screen.getByRole("radio", { name: placementQuestions[0].options[0] })).toBeChecked();
  });

  it("trả lời đúng hết thì xếp C2, lưu kết quả và gợi ý khóa học", async () => {
    const user = userEvent.setup();
    renderWithRouter(<PlacementTest />);
    await user.click(screen.getByRole("button", { name: /Bắt đầu làm bài/ }));
    await answerAll(user, (i) => placementQuestions[i].answer);

    expect(screen.getByRole("heading", { name: "C2" })).toBeInTheDocument();
    expect(screen.getByText(`Đúng ${placementQuestions.length}/${placementQuestions.length} câu`)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Xem lộ trình C2/ })).toHaveAttribute("href", "/learning-paths#c2");
    expect(screen.getByRole("heading", { name: "Khóa học phù hợp với bạn" })).toBeInTheDocument();
    expect(useProgressStore.getState().placement).toMatchObject({ level: "C2", correct: placementQuestions.length });
  });

  it("sai từ cấp A2 trở lên thì xếp A1", async () => {
    const user = userEvent.setup();
    renderWithRouter(<PlacementTest />);
    await user.click(screen.getByRole("button", { name: /Bắt đầu làm bài/ }));
    await answerAll(user, (i) => {
      const q = placementQuestions[i];
      return q.level === "A1" ? q.answer : (q.answer + 1) % q.options.length;
    });
    expect(screen.getByRole("heading", { name: "A1" })).toBeInTheDocument();
  });
});
