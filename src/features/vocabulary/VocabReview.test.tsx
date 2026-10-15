import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { VocabWord } from "@/types";
import { VocabReview } from "./VocabReview";
import { useProgressStore } from "@/store/progressStore";

const words: VocabWord[] = [
  { word: "itinerary", phonetic: "/aɪˈtɪnərəri/", partOfSpeech: "n", meaning: "lịch trình", example: "Our itinerary is busy." },
  { word: "luggage", phonetic: "/ˈlʌɡɪdʒ/", partOfSpeech: "n", meaning: "hành lý", example: "My luggage is heavy." },
];

describe("VocabReview", () => {
  it("hiện số từ mới, ẩn nghĩa đến khi bấm Hiện đáp án", async () => {
    const user = userEvent.setup();
    render(<VocabReview words={words} />);
    expect(screen.getByText("Hôm nay: 0 từ cần ôn · 2 từ mới")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Bắt đầu ôn" }));
    expect(screen.getByText("itinerary")).toBeInTheDocument();
    expect(screen.queryByText("lịch trình")).not.toBeInTheDocument();
    expect(screen.queryByRole("group", { name: /Bạn nhớ từ này/ })).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Hiện đáp án/ }));
    expect(screen.getByText("lịch trình")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Dễ\s*4 ngày/ })).toBeInTheDocument();
  });

  it("chấm Quên thì từ quay lại cuối phiên; xong phiên thì lịch ôn được lưu", async () => {
    const user = userEvent.setup();
    render(<VocabReview words={words} />);
    await user.click(screen.getByRole("button", { name: "Bắt đầu ôn" }));

    await user.click(screen.getByRole("button", { name: /Hiện đáp án/ }));
    await user.click(screen.getByRole("button", { name: /^Quên/ }));
    expect(screen.getByText("luggage")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Hiện đáp án/ }));
    await user.click(screen.getByRole("button", { name: /^Nhớ/ }));
    expect(screen.getByText("itinerary")).toBeInTheDocument(); // từ bị quên quay lại

    await user.click(screen.getByRole("button", { name: /Hiện đáp án/ }));
    await user.click(screen.getByRole("button", { name: /^Dễ/ }));

    expect(screen.getByRole("status")).toHaveTextContent("Xong phiên ôn hôm nay");
    expect(screen.getByRole("status")).toHaveTextContent("Bạn đã ôn 3 lượt");
    const { srs } = useProgressStore.getState();
    expect(srs.luggage.interval).toBe(1);
    // Từ mới bị quên rồi chấm Dễ: chưa tính là "lapse" (chỉ tính khi quên từ đã thuộc).
    expect(srs.itinerary).toMatchObject({ reps: 1, lapses: 0, interval: 4, ease: 2.45 });
  });
});
