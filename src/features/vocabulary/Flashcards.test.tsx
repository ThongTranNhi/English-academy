import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { VocabWord } from "@/types";
import { Flashcards } from "./Flashcards";
import { useProgressStore } from "@/store/progressStore";

const words: VocabWord[] = [
  { word: "apple", phonetic: "/ˈæpl/", partOfSpeech: "n", meaning: "quả táo", example: "I eat an apple." },
  { word: "run", phonetic: "/rʌn/", partOfSpeech: "v", meaning: "chạy", example: "I run every day." },
  { word: "happy", phonetic: "/ˈhæpi/", partOfSpeech: "adj", meaning: "vui vẻ", example: "She is happy." },
];

const card = () => screen.getByRole("button", { name: /Bấm để/ });

describe("Flashcards", () => {
  it("lật thẻ để xem nghĩa và lật lại", async () => {
    const user = userEvent.setup();
    render(<Flashcards words={words} />);

    expect(card()).toHaveAccessibleName(/Từ: apple/);
    await user.click(card());
    expect(card()).toHaveAccessibleName(/Mặt sau: quả táo/);
    await user.click(card());
    expect(card()).toHaveAccessibleName(/Từ: apple/);
  });

  it("chuyển thẻ tới/lui và quay vòng ở hai đầu", async () => {
    const user = userEvent.setup();
    render(<Flashcards words={words} />);

    await user.click(screen.getByRole("button", { name: "Thẻ tiếp theo" }));
    expect(screen.getByText("Thẻ 2/3")).toBeInTheDocument();
    expect(card()).toHaveAccessibleName(/Từ: run/);

    await user.click(screen.getByRole("button", { name: "Thẻ trước" }));
    await user.click(screen.getByRole("button", { name: "Thẻ trước" }));
    expect(screen.getByText("Thẻ 3/3")).toBeInTheDocument();
    expect(card()).toHaveAccessibleName(/Từ: happy/);
  });

  it("chuyển thẻ thì thẻ mới hiện mặt trước", async () => {
    const user = userEvent.setup();
    render(<Flashcards words={words} />);

    await user.click(card());
    await user.click(screen.getByRole("button", { name: "Thẻ tiếp theo" }));
    expect(card()).toHaveAccessibleName(/Từ: run/);
  });

  it("đánh dấu đã thuộc cập nhật bộ đếm và store, bấm lại để bỏ", async () => {
    const user = userEvent.setup();
    render(<Flashcards words={words} />);

    await user.click(screen.getByRole("button", { name: /Đánh dấu đã thuộc/ }));
    expect(screen.getByText("Đã thuộc 1/3")).toBeInTheDocument();
    expect(useProgressStore.getState().learnedWords).toEqual(["apple"]);
    expect(screen.getByRole("button", { name: /Đã thuộc/, pressed: true })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Đã thuộc/, pressed: true }));
    expect(screen.getByText("Đã thuộc 0/3")).toBeInTheDocument();
    expect(useProgressStore.getState().learnedWords).toEqual([]);
  });
});
