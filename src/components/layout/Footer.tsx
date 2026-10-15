import { Link } from "react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { footerColumns } from "@/data/navigation";
import { Container } from "@/components/shared/Container";
import { Logo } from "@/components/shared/Logo";
import { SocialIcons } from "@/components/shared/SocialIcons";

export function Footer() {
  return (
    <footer className="bg-night text-slate-300">
      <div aria-hidden className="rainbow-bar h-2" />
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.6fr_repeat(4,1fr)] lg:py-16">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo invert />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
            Học viện tiếng Anh trực tuyến với đội ngũ giảng viên chuyên môn, lộ trình CEFR rõ ràng và hệ thống luyện tập 4 kỹ năng.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-slate-400">
            <li className="flex items-center gap-2"><MapPin className="size-4 shrink-0" aria-hidden /> Hà Nội, Việt Nam</li>
            <li className="flex items-center gap-2"><Phone className="size-4 shrink-0" aria-hidden /> 0396 098 034</li>
            <li className="flex items-center gap-2"><Mail className="size-4 shrink-0" aria-hidden /> jathong0107@gmail.com</li>
          </ul>
          <div className="mt-6">
            <SocialIcons />
          </div>
        </div>
        {footerColumns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="mb-4 text-sm font-extrabold uppercase tracking-wider text-sun">{col.title}</h2>
            <ul className="space-y-2.5 text-sm">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-slate-300 transition-colors hover:text-sky">{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} English Academy · jathong · ThongTranNhi. Bảo lưu mọi quyền.</p>
          <p>Thông tin pháp lý: Giấy phép hoạt động giáo dục – đang cập nhật.</p>
        </Container>
      </div>
    </footer>
  );
}
