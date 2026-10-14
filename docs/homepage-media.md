# Homepage media

## Video

`public/videos/academy-intro.mp4` is an original silent promotional motion montage composed from Academy illustrations and Vietnamese typography. It is not AI-generated live footage or a lesson recording.

- H.264, 1280 × 720, 24 fps, 18 seconds; approximately 1.3 MB.
- Three scenes: choose your goal; learn with short lessons; practise with flashcards, quizzes and four skills.
- Native browser controls, no autoplay, no preload; Vietnamese captions in `public/videos/academy-intro.vi.vtt` and a text summary beside the player.
- Poster: `public/images/academy-video-poster.jpg`.
- Full video decode checked locally; playback checked in the browser.

## Illustrations

Built-in imagegen was used, without the API/CLI fallback. Illustrations are conceptual scenes, not portraits of actual Academy teachers or students.

- `public/images/academy-learning-hero.webp`: optimized version of the existing generated hero; approximately 150 KB. Original PNG preserved.
- `public/images/academy-study-desk.webp`: new study-desk illustration; approximately 123 KB, used in the final call to action and in the video.

Prompt for the new illustration:

> Use case: stylized-concept. Asset type: English Academy website editorial illustration and promotional video scene, landscape 3:2. A premium soft 3D editorial illustration of a welcoming English study desk with open notebook, stacked books, indigo headphones and laptop displaying only abstract colored learning cards, small plant and cyan speech bubble motif. No people. Soft ivory background, indigo and cyan accents with warm amber details, daylight, beautiful tactile matte textures, clean balanced composition with breathing room, match a warm high-quality 3D young adult learning illustration. No text, letters, logos or watermark.

## Layout

The homepage adds a three-link starting point strip and a video section with three learning steps. Categories and skills use subtle dotted backgrounds; the video section uses soft radial color fields. Desktop section spacing is reduced from 96px to 72px. The CTA now pairs its original content with the study-desk illustration. Existing routes and learning features are preserved.
