import { act, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LUMI_IDLE_SWAP_MS, LUMI_SLEEP_AFTER_MS } from "@/lib/lumi";
import { LumiCharacter } from "./LumiCharacter";

const src = (container: HTMLElement) => container.querySelector("img")?.getAttribute("src");

describe("LumiCharacter", () => {
  it("chọn bộ hình động theo cảm xúc", () => {
    const { container, rerender } = render(<LumiCharacter mood="celebrate" />);
    expect(src(container)).toBe("/images/lumi/lumi-celebrate.webp");
    rerender(<LumiCharacter mood="encourage" />);
    expect(src(container)).toBe("/images/lumi/lumi-sad.webp");
    rerender(<LumiCharacter mood="curious" />);
    expect(src(container)).toBe("/images/lumi/lumi-think.webp");
    rerender(<LumiCharacter mood="happy" />);
    expect(src(container)).toBe("/images/lumi/lumi-happy.webp");
  });

  it("idle đổi giữa vẫy chào và đọc sách, rồi ngủ gật; phản ứng mới đánh thức Lumi", () => {
    vi.useFakeTimers();
    try {
      const { container, rerender } = render(<LumiCharacter />);
      expect(src(container)).toBe("/images/lumi/lumi-wave.webp");
      act(() => vi.advanceTimersByTime(LUMI_IDLE_SWAP_MS));
      expect(src(container)).toBe("/images/lumi/lumi-read.webp");
      act(() => vi.advanceTimersByTime(LUMI_IDLE_SWAP_MS));
      expect(src(container)).toBe("/images/lumi/lumi-wave.webp");
      act(() => vi.advanceTimersByTime(LUMI_SLEEP_AFTER_MS));
      expect(src(container)).toBe("/images/lumi/lumi-sleepy.webp");
      act(() => vi.advanceTimersByTime(LUMI_IDLE_SWAP_MS));
      expect(src(container)).toBe("/images/lumi/lumi-sleepy.webp");
      rerender(<LumiCharacter mood="curious" sequence={1} />);
      rerender(<LumiCharacter mood="idle" sequence={1} />);
      expect(src(container)).toBe("/images/lumi/lumi-wave.webp");
    } finally { vi.useRealTimers(); }
  });

  it("dùng ảnh tĩnh và không đổi hình khi tắt chuyển động", () => {
    vi.useFakeTimers();
    try {
      const { container } = render(<LumiCharacter motion={false} />);
      expect(src(container)).toBe("/images/lumi/lumi-wave-still.webp");
      act(() => vi.advanceTimersByTime(LUMI_SLEEP_AFTER_MS));
      expect(src(container)).toBe("/images/lumi/lumi-wave-still.webp");
    } finally { vi.useRealTimers(); }
  });

  it("tôn trọng cài đặt giảm chuyển động của hệ điều hành", () => {
    vi.stubGlobal("matchMedia", (query: string) => ({ matches: query.includes("reduce"), addEventListener: () => {}, removeEventListener: () => {} }));
    try {
      const { container } = render(<LumiCharacter mood="celebrate" />);
      expect(src(container)).toBe("/images/lumi/lumi-celebrate-still.webp");
    } finally { vi.unstubAllGlobals(); }
  });
});
