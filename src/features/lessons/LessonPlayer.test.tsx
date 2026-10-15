import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LessonPlayer } from "./LessonPlayer";

/** Giả lập Web Speech API: giữ lại các câu đã "đọc" để test kích hoạt sự kiện kết thúc. */
class FakeUtterance {
  lang = "";
  rate = 1;
  onend: (() => void) | null = null;
  constructor(public text: string) {}
}

const spoken: FakeUtterance[] = [];
const synth = { speak: vi.fn((u: FakeUtterance) => spoken.push(u)), cancel: vi.fn() };

const transcript = [
  { time: "00:00", speaker: "A", text: "Hello there." },
  { time: "00:03", speaker: "B", text: "Hi, how are you?" },
  { time: "00:06", text: "Thanks for listening." },
];

const line = (text: RegExp) => screen.getByRole("button", { name: text });
const finishCurrent = () => act(() => spoken.at(-1)!.onend!());

describe("LessonPlayer", () => {
  beforeEach(() => {
    spoken.length = 0;
    vi.stubGlobal("SpeechSynthesisUtterance", FakeUtterance);
    Object.defineProperty(window, "speechSynthesis", { value: synth, configurable: true });
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    delete (window as { speechSynthesis?: unknown }).speechSynthesis;
  });

  it("đọc lần lượt từng câu, tô sáng câu đang đọc và dừng ở cuối", async () => {
    const user = userEvent.setup();
    render(<LessonPlayer kind="audio" transcript={transcript} />);

    await user.click(screen.getByRole("button", { name: "Phát" }));
    expect(spoken.map((u) => u.text)).toEqual(["Hello there."]);
    expect(line(/Hello there/)).toHaveAttribute("aria-current", "true");

    finishCurrent();
    expect(spoken.at(-1)!.text).toBe("Hi, how are you?");
    expect(line(/how are you/)).toHaveAttribute("aria-current", "true");
    expect(line(/Hello there/)).not.toHaveAttribute("aria-current");

    finishCurrent();
    finishCurrent();
    expect(spoken).toHaveLength(3);
    expect(screen.getByRole("button", { name: "Phát" })).toBeInTheDocument();
  });

  it("bấm vào một câu để nghe câu đó; tạm dừng thì hủy giọng đọc và bỏ qua sự kiện cũ", async () => {
    const user = userEvent.setup();
    render(<LessonPlayer kind="audio" transcript={transcript} />);

    await user.click(line(/Thanks for listening/));
    expect(spoken.at(-1)!.text).toBe("Thanks for listening.");

    await user.click(screen.getByRole("button", { name: "Tạm dừng" }));
    expect(synth.cancel).toHaveBeenCalled();
    const countAfterPause = spoken.length;
    finishCurrent(); // sự kiện end do cancel gây ra không được phát tiếp
    expect(spoken).toHaveLength(countAfterPause);
  });

  it("đổi tốc độ áp dụng cho câu đang đọc", async () => {
    const user = userEvent.setup();
    render(<LessonPlayer kind="audio" transcript={transcript} />);
    await user.click(screen.getByRole("button", { name: "Phát" }));
    await user.click(screen.getByRole("button", { name: "0.75x" }));
    expect(spoken.at(-1)).toMatchObject({ text: "Hello there.", rate: 0.75 });
    expect(screen.getByRole("button", { name: "0.75x" })).toHaveAttribute("aria-pressed", "true");
  });

  it("trình duyệt không hỗ trợ giọng đọc thì vô hiệu nút phát nhưng vẫn hiện transcript", () => {
    delete (window as { speechSynthesis?: unknown }).speechSynthesis;
    render(<LessonPlayer kind="audio" transcript={transcript} />);
    expect(screen.getByRole("button", { name: "Phát" })).toBeDisabled();
    expect(screen.getByText(/không hỗ trợ giọng đọc/)).toBeInTheDocument();
    expect(screen.getByText("Thanks for listening.")).toBeInTheDocument();
  });
});
