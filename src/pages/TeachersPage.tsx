import { useState } from "react";
import { Search } from "lucide-react";
import { teachers } from "@/data/teachers";
import { PageHeader } from "@/components/shared/PageHeader";
import { Container } from "@/components/shared/Container";
import { EmptyState } from "@/components/shared/EmptyState";
import { Input } from "@/components/ui/input";
import { TeacherCard } from "@/features/teachers/TeacherCard";
import { matchesQuery } from "@/lib/utils";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function TeachersPage() {
  const [q, setQ] = useState("");
  usePageMeta("Đội ngũ giảng viên", "Đội ngũ giảng viên IELTS, TOEIC, giao tiếp và tiếng Anh thương mại của English Academy.");
  const list = teachers.filter((t) => matchesQuery(q, t.name, t.title, ...t.specialties));

  return (
    <>
      <PageHeader title="Đội ngũ giảng viên" description="Giảng viên có chứng chỉ quốc tế và nhiều năm kinh nghiệm giảng dạy." breadcrumbs={[{ label: "Giảng viên" }]} />
      <Container className="py-10 lg:py-14">
        <div className="relative mb-8 max-w-md">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" aria-hidden />
          <Input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Tìm theo tên hoặc chuyên môn…" aria-label="Tìm giảng viên" className="pl-10" />
        </div>
        {list.length === 0 ? (
          <EmptyState title="Không tìm thấy giảng viên" />
        ) : (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {list.map((t) => <li key={t.slug} className="flex [&>*]:flex-1"><TeacherCard teacher={t} /></li>)}
          </ul>
        )}
      </Container>
    </>
  );
}
