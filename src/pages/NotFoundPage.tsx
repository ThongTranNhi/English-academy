import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/Container";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function NotFoundPage() {
  usePageMeta("Không tìm thấy trang");
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="bg-gradient-to-r from-primary to-accent bg-clip-text text-7xl font-extrabold text-transparent">404</p>
      <h1 className="mt-4 text-2xl font-bold">Không tìm thấy trang</h1>
      <p className="mt-2 max-w-md text-slate-600">Trang bạn tìm có thể đã bị di chuyển hoặc không tồn tại.</p>
      <div className="mt-8 flex gap-3">
        <Button asChild><Link to="/">Về trang chủ</Link></Button>
        <Button asChild variant="outline"><Link to="/courses">Xem khóa học</Link></Button>
      </div>
    </Container>
  );
}
