import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useState } from "react";
import { useScrollReveal } from "./useScrollReveal";

let callback: IntersectionObserverCallback = () => {};
const observed = new Set<Element>();

class FakeIntersectionObserver {
  constructor(cb: IntersectionObserverCallback) { callback = cb; }
  observe(element: Element) { observed.add(element); }
  unobserve(element: Element) { observed.delete(element); }
  disconnect() { observed.clear(); }
}

function enter(element: Element) {
  act(() => callback([{ isIntersecting: true, target: element } as unknown as IntersectionObserverEntry], {} as IntersectionObserver));
}

function Page() {
  useScrollReveal();
  const [more, setMore] = useState(false);
  return (
    <main id="main">
      <section aria-label="Đầu trang" data-no-reveal />
      <section aria-label="Khóa học" />
      {more && <section aria-label="Thêm" />}
      <button type="button" onClick={() => setMore(true)}>Thêm section</button>
    </main>
  );
}

afterEach(() => { vi.unstubAllGlobals(); observed.clear(); });

describe("useScrollReveal", () => {
  it("hiện section khi cuộn tới, bỏ qua section có data-no-reveal và theo dõi section mới", async () => {
    vi.stubGlobal("IntersectionObserver", FakeIntersectionObserver);
    render(<Page />);
    const courses = screen.getByRole("region", { name: "Khóa học" });
    expect(document.documentElement).toHaveClass("reveal-on");
    expect(observed.has(courses)).toBe(true);
    expect(observed.has(screen.getByRole("region", { name: "Đầu trang" }))).toBe(false);

    enter(courses);
    expect(courses).toHaveClass("is-revealed");
    expect(observed.has(courses)).toBe(false);

    act(() => screen.getByRole("button", { name: "Thêm section" }).click());
    const added = screen.getByRole("region", { name: "Thêm" });
    await vi.waitFor(() => expect(observed.has(added)).toBe(true));
  });

  it("không ẩn nội dung khi người dùng giảm chuyển động", () => {
    vi.stubGlobal("IntersectionObserver", FakeIntersectionObserver);
    vi.stubGlobal("matchMedia", (query: string) => ({ matches: query.includes("reduce") }));
    render(<Page />);
    expect(document.documentElement).not.toHaveClass("reveal-on");
    expect(observed.size).toBe(0);
  });
});
