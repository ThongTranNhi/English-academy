import { PageHeader } from "@/components/shared/PageHeader";
import { Container } from "@/components/shared/Container";
import { PlacementTest } from "@/features/placement/PlacementTest";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function PlacementTestPage() {
  usePageMeta("Test xếp lớp CEFR", "Bài test xếp lớp tiếng Anh miễn phí theo khung CEFR A1–C2, có kết quả và gợi ý khóa học ngay.");
  return (
    <>
      <PageHeader
        title="Test xếp lớp CEFR"
        description="18 câu hỏi, khoảng 8 phút. Nhận ngay trình độ A1–C2 cùng lộ trình và khóa học phù hợp."
        breadcrumbs={[{ label: "Lộ trình", href: "/learning-paths" }, { label: "Test xếp lớp" }]}
      />
      <Container className="section-y">
        <PlacementTest />
      </Container>
    </>
  );
}
