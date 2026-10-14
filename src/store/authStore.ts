import { create } from "zustand";

interface DemoUser {
  name: string;
  email: string;
}

interface AuthState {
  user: DemoUser | null;
  signIn: (user: DemoUser) => void;
  signOut: () => void;
}

/**
 * Phiên đăng nhập mô phỏng, chỉ tồn tại trong bộ nhớ của tab.
 * Không lưu mật khẩu và không gửi dữ liệu đi đâu – chưa có backend.
 */
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  signIn: (user) => set({ user }),
  signOut: () => set({ user: null }),
}));
