import { featuredCourses } from "@/data/courses";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CourseCard } from "@/features/courses/CourseCard";

export function FeaturedCoursesSection() {
  return (
    <section aria-labelledby="featured-heading" className="section-y bg-sun-wash">
      <Container>
        <SectionHeading id="featured-heading" eyebrow="Khóa học nổi bật" title="Được học viên lựa chọn nhiều nhất" action={{ label: "Xem tất cả khóa học", href: "/courses" }} />
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredCourses.slice(0, 8).map((c) => (
            <li key={c.slug} className="flex">
              <CourseCard course={c} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
