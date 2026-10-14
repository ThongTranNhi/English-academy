import { Link } from "react-router";
import { libraryItems, libraryTypeLabels } from "@/data/library";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CoverArt } from "@/components/shared/CoverArt";
import { libraryIcon } from "@/features/lessons/libraryIcon";

export function FreeLearningSection() {
  const picks = (["video", "audio", "podcast", "transcript"] as const).map((type) => libraryItems.find((i) => i.type === type && i.free)!);

  return (
    <section aria-labelledby="free-heading" className="section-y bg-navy">
      <Container>
        <SectionHeading id="free-heading" invert eyebrow="Học miễn phí" title="Video, audio, podcast & bài đọc mỗi tuần" description="Nội dung ngắn, có transcript và từ vựng – học mọi lúc, không cần đăng ký." action={{ label: "Vào thư viện", href: "/library" }} />
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {picks.map((item) => (
            <li key={item.id}>
              <Link to={`/library?type=${item.type}`} className="group block overflow-hidden rounded-[14px] bg-white/5 ring-1 ring-white/10 transition-all hover:-translate-y-1 hover:bg-white/10">
                <CoverArt tone={item.tone} icon={libraryIcon[item.type]} label={libraryTypeLabels[item.type]} className="aspect-[16/10]" />
                <div className="p-5">
                  <p className="text-xs font-semibold text-accent">{item.series ?? libraryTypeLabels[item.type]} · {item.level}{item.duration && ` · ${item.duration}`}</p>
                  <h3 className="mt-1.5 font-semibold text-white group-hover:text-accent">{item.title}</h3>
                  <p className="mt-1.5 line-clamp-2 text-sm text-slate-400">{item.description}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
