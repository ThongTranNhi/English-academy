# Lumi and motion

Lumi is an original English Academy website mascot: an indigo axolotl with cyan gills, ivory headphones and a study notebook. Its floating launcher opens learning navigation suggestions; it is not a live support chat or an AI chat service.

- Asset: `public/images/academy-lumi.webp`, alpha transparency, approximately 38 KB.
- Created using built-in imagegen, without CLI/API fallback.
- Event-triggered reactions: wave (1.8 seconds), curious tilt (1.1 seconds), encouraging nod (1.7 seconds), celebratory jump (1.8 seconds) and stars (2.8 seconds). Hover triggers are throttled; responses settle after 2.8 seconds. Pause and hide controls remain available.
- Page entry motion runs for 420 ms on pathname changes. Query and hash changes retain child state and do not replay it.
- CEFR panel changes animate for 280 ms. All added motion respects `prefers-reduced-motion`.
- The panel can close with Escape, returning focus to the launcher. It does not open automatically.
- The homepage challenge gives correct/incorrect feedback and permits retry/replay. A one-time viewport greeting uses IntersectionObserver. Successful shared quizzes and newly learned flashcards also trigger the floating mascot. Incomplete quiz scores receive encouragement.
- Added celebration pose: `public/images/academy-lumi-celebrate.webp`, genuine alpha transparency, approximately 32 KB. Two image poses combined with CSS transformations provide the animation; this is not a skeletal character rig.

Celebration edit prompt (built-in imagegen, referencing the original Lumi asset):

> Edit this original website mascot Lumi into one celebratory full-body pose. Preserve precisely the same indigo axolotl identity, cyan gills, ivory headphones, amber eyes, soft 3D materials and character proportions. Change only pose and expression: both arms raised joyfully, eyes happily curved closed, broad cheerful smile, feet poised in a little celebratory jump, ivory notebook tucked safely under one arm. Full character visible, centered with generous transparent margins. Genuine transparent background, no scene, no ground, no text, no logos, no external confetti or stars (these will be animated in the website). This is a second animation state for the same character, not a redesign.

Final generation prompt:

> Use case: stylized-concept. Asset type: original English Academy website mascot, transparent cutout. Design a distinctive friendly small round axolotl learning companion named Lumi, premium soft 3D clay illustration, young-adult education brand rather than children's toy. Full body front three-quarter view, rounded indigo body, three short cyan external gill fronds each side, warm expressive amber eyes, small cheerful mouth, wearing minimal ivory headphones and holding a small closed ivory study notebook with an amber bookmark. One hand raised in a welcoming wave. Clear silhouette readable at 80px, no ground plane, no background, no drop shadow outside character, no text, no letters, no logo, no watermark, centered with generous transparent margin. Match indigo cyan warm ivory palette of English Academy. Genuine alpha transparent background.
