import { useState } from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Link, MemoryRouter, Route, Routes } from "react-router";
import { RouteFrame } from "./RouteFrame";

function Draft() {
  const [draft, setDraft] = useState("");
  return <><input aria-label="Ghi chú" value={draft} onChange={(event) => setDraft(event.target.value)} /><Link to="/?level=B1">Lọc cấp độ</Link><Link to="/#details">Đến nội dung</Link><Link to="/courses">Khóa học</Link></>;
}

describe("RouteFrame", () => {
  it("giữ ghi chú khi đổi bộ lọc hoặc hash, vẫn điều hướng sang trang khác", async () => {
    const user = userEvent.setup();
    render(<MemoryRouter><RouteFrame><Routes><Route path="/" element={<Draft />} /><Route path="/courses" element={<h1>Danh sách khóa học</h1>} /></Routes></RouteFrame></MemoryRouter>);
    await user.type(screen.getByRole("textbox", { name: "Ghi chú" }), "Giữ nội dung đang học");
    await user.click(screen.getByRole("link", { name: "Lọc cấp độ" }));
    expect(screen.getByRole("textbox")).toHaveValue("Giữ nội dung đang học");
    await user.click(screen.getByRole("link", { name: "Đến nội dung" }));
    expect(screen.getByRole("textbox")).toHaveValue("Giữ nội dung đang học");
    await user.click(screen.getByRole("link", { name: "Khóa học" }));
    expect(screen.getByRole("heading", { name: "Danh sách khóa học" })).toBeInTheDocument();
  });
});
