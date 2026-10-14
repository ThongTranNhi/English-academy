import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import { useProgressStore } from "@/store/progressStore";
import { useAuthStore } from "@/store/authStore";

// Mỗi test bắt đầu với DOM, localStorage và store sạch.
afterEach(() => {
  cleanup();
  localStorage.clear();
  useProgressStore.getState().reset();
  useAuthStore.getState().signOut();
});
