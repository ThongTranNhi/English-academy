import { BookOpen, type LucideProps } from "lucide-react";
import { iconMap } from "@/lib/icons";

/** Render icon Lucide theo tên lưu trong dữ liệu mẫu (tra trong bảng icon tĩnh). */
export function DynamicIcon({ name, ...props }: LucideProps & { name: string }) {
  const Icon = iconMap[name] ?? BookOpen;
  return <Icon {...props} />;
}
