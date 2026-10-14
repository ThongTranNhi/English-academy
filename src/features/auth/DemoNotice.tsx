import { Info } from "lucide-react";

export function DemoNotice() {
  return (
    <p className="flex gap-2 rounded-xl border border-amber-200 bg-highlight-soft p-3 text-xs text-amber-800">
      <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
      Đây là giao diện mô phỏng. Chưa có máy chủ nên không tài khoản nào được tạo hay lưu lại; thông tin bạn nhập không được gửi đi.
    </p>
  );
}
