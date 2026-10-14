import { Volume2 } from "lucide-react";
import { canSpeak, speak } from "@/lib/speech";
import { cn } from "@/lib/utils";

/** Nút phát âm dùng giọng đọc của trình duyệt. Ẩn nếu trình duyệt không hỗ trợ. */
export function SpeakButton({ text, label, className }: { text: string; label?: string; className?: string }) {
  if (!canSpeak()) return null;
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        speak(text);
      }}
      aria-label={label ?? `Nghe phát âm: ${text}`}
      className={cn("inline-flex size-8 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary-soft", className)}
    >
      <Volume2 className="size-4" aria-hidden />
    </button>
  );
}
