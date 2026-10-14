import { teachers } from "@/data/teachers";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TeacherCard } from "@/features/teachers/TeacherCard";

export function TeachersSection() {
  return (
    <section aria-labelledby="teachers-heading" className="section-y">
      <Container>
        <SectionHeading id="teachers-heading" eyebrow="Đội ngũ giảng viên" title="Học cùng những người thầy tận tâm" description="Giảng viên có chứng chỉ quốc tế, nhiều năm kinh nghiệm và chuyên môn rõ ràng." action={{ label: "Xem tất cả giảng viên", href: "/teachers" }} />
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teachers.slice(0, 4).map((t) => (
            <li key={t.slug} className="flex [&>*]:flex-1">
              <TeacherCard teacher={t} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
