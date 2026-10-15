import { Link } from "react-router";
import { libraryItems, libraryTypeLabels } from "@/data/library";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { LibraryCover } from "@/features/lessons/LibraryCover";

export function FreeLearningSection() {
  const picks = (["video", "audio", "podcast", "transcript"] as const).map((type) => libraryItems.find((i) => i.type === type && i.free)!);

  return (
    <section aria-labelledby="free-heading" className="section-y bg-night">
      <Container>
        <SectionHeading id="free-heading" invert eyebrow="Học miễn phí" title="Video, audio, podcast & bài đọc mỗi tuần" description="Nội dung ngắn, có transcript và từ vựng – học mọi lúc, không cần đăng ký." action={{ label: "Vào thư viện", href: "/library" }} />
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {picks.map((item) => (
            <li key={item.id}>
              <Link to={`/library?type=${item.type}`} className="group block h-full overflow-hidden rounded-[22px] bg-white/10 ring-2 ring-white/15 transition-all duration-300 hover:-translate-y-2 hover:-rotate-1 hover:bg-white/15 hover:ring-sky/60">
                <LibraryCover item={item} className="aspect-[16/10]" />
                <div className="p-5">
                  <p className="text-xs font-extrabold text-sun">{item.series ?? libraryTypeLabels[item.type]} · {item.level}{item.duration && ` · ${item.duration}`}</p>
                  <h3 className="mt-1.5 font-extrabold text-white group-hover:text-sky">{item.title}</h3>
                  <p className="mt-1.5 line-clamp-2 text-sm text-slate-300">{item.description}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
