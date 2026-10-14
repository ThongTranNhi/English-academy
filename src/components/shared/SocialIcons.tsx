/** Icon mạng xã hội dạng SVG nội tuyến (lucide-react v1 không còn icon thương hiệu). */
const icons = {
  Facebook: "M14 8h3V4h-3c-2.8 0-5 2.2-5 5v2H7v4h2v7h4v-7h3l1-4h-4V9c0-.6.4-1 1-1z",
  YouTube:
    "M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12a31 31 0 0 0 .4 3.8 3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .4-3.8 31 31 0 0 0-.4-3.8zM10 15.2V8.8l5.2 3.2z",
  TikTok:
    "M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.1v12.4a2.6 2.6 0 1 1-1.8-2.5V9.7a5.8 5.8 0 1 0 4.9 5.7V9.1a7.4 7.4 0 0 0 4.3 1.4V7.4a4.3 4.3 0 0 1-3.2-1.6z",
  Instagram:
    "M12 7.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6zm0 7.9a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2zM17 5.8a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2zM16.5 2h-9A5.5 5.5 0 0 0 2 7.5v9A5.5 5.5 0 0 0 7.5 22h9a5.5 5.5 0 0 0 5.5-5.5v-9A5.5 5.5 0 0 0 16.5 2zm3.8 14.5a3.8 3.8 0 0 1-3.8 3.8h-9a3.8 3.8 0 0 1-3.8-3.8v-9a3.8 3.8 0 0 1 3.8-3.8h9a3.8 3.8 0 0 1 3.8 3.8z",
} as const;

export function SocialIcons() {
  return (
    <ul className="flex gap-2">
      {(Object.keys(icons) as (keyof typeof icons)[]).map((name) => (
        <li key={name}>
          <a
            href="#"
            aria-label={name}
            className="flex size-9 items-center justify-center rounded-full bg-white/10 text-slate-300 transition-colors hover:bg-primary hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
              <path d={icons[name]} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
