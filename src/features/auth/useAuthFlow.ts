import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useLumiReaction } from "@/hooks/useLumiReaction";

export type AuthStatus = "idle" | "loading" | "success";

/** Thời gian Lumi ăn mừng trước khi chuyển sang Dashboard. */
export const AUTH_SUCCESS_DELAY_MS = 900;
const FAKE_REQUEST_MS = 450;
/** Giữ lời nhắc lỗi của Lumi, không để gợi ý khi focus (form tự focus ô sai đầu tiên) đè mất. */
const ALERT_HOLD_MS = 2000;

/** Trạng thái dùng chung của form đăng nhập/đăng ký: phản ứng của Lumi, nút gửi và hiệu ứng rung khi nhập sai. */
export function useAuthFlow() {
  const navigate = useNavigate();
  const { reaction, react } = useLumiReaction(false);
  const [status, setStatus] = useState<AuthStatus>("idle");
  const [shake, setShake] = useState(0);
  const [peeking, setPeeking] = useState<string[]>([]);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const lastAlert = useRef(0);
  useEffect(() => () => clearTimeout(timer.current), []);

  const focusField = useCallback((message: string) => {
    if (Date.now() - lastAlert.current < ALERT_HOLD_MS) return;
    react("curious", message, true);
  }, [react]);

  const invalid = useCallback(() => {
    setShake((count) => count + 1);
    lastAlert.current = Date.now();
    react("encourage", "Ôi, còn vài ô chưa đúng. Mình sửa lại nhé!");
  }, [react]);

  // Lumi che mắt chừng nào còn ô mật khẩu đang hiện chữ.
  const passwordVisibility = useCallback((id: string, visible: boolean) => {
    const next = visible ? [...peeking.filter((field) => field !== id), id] : peeking.filter((field) => field !== id);
    setPeeking(next);
    if (!visible && next.length === 0) react("wave", "Xong rồi, mình mở mắt ra nhé!");
  }, [peeking, react]);

  // Mô phỏng một yêu cầu tới máy chủ, rồi để Lumi ăn mừng trước khi chuyển trang.
  const succeed = useCallback(async (action: () => void, message: string) => {
    setStatus("loading");
    await new Promise((resolve) => { timer.current = setTimeout(resolve, FAKE_REQUEST_MS); });
    action();
    setStatus("success");
    react("celebrate", message);
    timer.current = setTimeout(() => navigate("/dashboard"), AUTH_SUCCESS_DELAY_MS);
  }, [navigate, react]);

  const lumi = peeking.length > 0 && status !== "success" ? { mood: "shy" as const, sequence: reaction.sequence, message: "Mình che mắt rồi, không nhìn trộm đâu!" } : reaction;

  return { lumi, status, shake: shake === 0 ? undefined : shake % 2 ? "a" : "b", focusField, invalid, succeed, passwordVisibility };
}
