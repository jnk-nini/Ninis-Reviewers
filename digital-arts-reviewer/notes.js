/* Study notes. Wording follows the lesson slides (Digital Arts and Technology PDF/PPT and Reading Images PPT).
   <b class="k"> marks a key term: these become tap-to-reveal blanks in Recall mode. */
window.LESSONS = {
  1: { name: "Digital Arts and Technology", short: "Lesson 1" },
  2: { name: "Reading Images, Symbolism, Meaning & Context, Visual Communication", short: "Lesson 2" }
};

window.TOPICS = [
  { id: "intro",    lesson: 1, icon: "🖥️", name: "Intro to Digital Arts & Technology" },
  { id: "photo",    lesson: 1, icon: "📷", name: "Digital Photography & File Formats" },
  { id: "thirds",   lesson: 1, icon: "▦",  name: "Rule of Thirds" },
  { id: "light",    lesson: 1, icon: "💡", name: "Lighting & Lighting Techniques" },
  { id: "hours",    lesson: 1, icon: "🌅", name: "Golden Hour & Blue Hour" },
  { id: "hardsoft", lesson: 1, icon: "🔦", name: "Hard Light vs Soft Light" },
  { id: "mood",     lesson: 1, icon: "🎭", name: "Lighting & Mood, Tips, Activity" },
  { id: "visarts",  lesson: 2, icon: "👁️", name: "Intro to Reading Visual Arts" },
  { id: "viscom",   lesson: 2, icon: "📣", name: "Visual Communication & Colors" },
  { id: "typo",     lesson: 2, icon: "🔤", name: "Typography, Layout & Composition" },
  { id: "levels",   lesson: 2, icon: "🪜", name: "Reading Images: 4 Levels" },
  { id: "elements", lesson: 2, icon: "🎨", name: "Elements Used in Reading Images" },
  { id: "symbol",   lesson: 2, icon: "🕊️", name: "Symbolism" },
  { id: "context",  lesson: 2, icon: "🌏", name: "Meaning and Context" }
];

window.NOTES = {

intro: {
  must: [
    "Digital art = artistic works <b>created, modified, presented, or distributed</b> using digital technologies and computer systems.",
    "Traditional art uses physical media: canvas, paint, charcoal, clay.",
    "Digital art utilizes 6 tools: Computers, Cameras, Graphic Tablets, Smartphones, Artificial Intelligence, Specialized Software.",
    "7 examples: Digital Photography, Graphic Design, Digital Painting, Animation, 3D Modeling, Video Art, AI-Generated Art.",
    "Technology changed how artists: Create, Edit, Share, Collaborate globally, Reach larger audiences.",
    "Apps: Adobe Photoshop, Adobe Illustrator, Canva, Figma, Blender, Midjourney, DALL-E, Microsoft Designer."
  ],
  html: `
<h4>Lesson objectives</h4>
<p>At the end of this lesson, students should be able to:</p>
<ul>
<li>Explain the relationship between art and technology.</li>
<li>Discuss the evolution of digital arts.</li>
<li>Analyze various forms of digital artistic expression.</li>
<li>Apply principles of visual arts using modern digital tools.</li>
<li>Evaluate the impact of computer technologies and artificial intelligence on artistic creation.</li>
<li>Create digital artworks using industry-standard software and emerging technologies.</li>
</ul>

<h4>I. Introduction to Digital Arts and Technology</h4>
<p class="def"><b class="k">Digital art</b> refers to artistic works that are <b class="k">created, modified, presented, or distributed</b> using digital technologies and computer systems.</p>
<p>Unlike <b class="k">traditional art</b> that uses <b class="k">physical media</b> such as canvas, paint, charcoal, and clay, digital art utilizes:</p>
<div class="cols">
<ul>
<li>Computers</li><li>Cameras</li><li><b class="k">Graphic Tablets</b></li>
<li>Smartphones</li><li><b class="k">Artificial Intelligence</b></li><li>Specialized Software</li>
</ul>
</div>
<p>Examples of digital art include:</p>
<ul>
<li>Digital Photography</li><li>Graphic Design</li><li>Digital Painting</li><li>Animation</li>
<li><b class="k">3D Modeling</b></li><li>Video Art</li><li><b class="k">AI-Generated Art</b></li>
</ul>

<h4>Technology and Artistic Expression</h4>
<p>Technology has changed how artists:</p>
<ul>
<li>Create artworks</li><li>Edit visual content</li><li>Share artistic creations</li>
<li>Collaborate <b class="k">globally</b></li><li>Reach larger <b class="k">audiences</b></li>
</ul>
<p>Today, artists may work entirely in <b class="k">digital environments</b> using applications such as:</p>
<ul>
<li>Adobe Photoshop</li><li>Adobe Illustrator</li><li>Canva</li><li>Figma</li>
<li>Blender</li><li>Midjourney</li><li>DALL-E</li><li>Microsoft Designer</li>
</ul>
<div class="tip"><b>Memory trick:</b> The 4 verbs in the definition are <b>C-M-P-D</b>: "<i>Create, Modify, Present, Distribute</i>". Think "<b>C</b>an <b>M</b>y <b>P</b>icture <b>D</b>ance?"</div>
<div class="tip"><b>Memory trick (what technology changed):</b> <b>C-E-S-C-R</b>: Create, Edit, Share, Collaborate, Reach. "<b>C</b>ats <b>E</b>at <b>S</b>ushi, <b>C</b>ats <b>R</b>elax."</div>
<div class="trap"><b>Exam trap:</b> Charcoal, clay, canvas and paint are <b>traditional</b> (physical) media, never digital art tools. Graphic tablets and smartphones <b>are</b> digital art tools.</div>
`},

photo: {
  must: [
    "Digital photography = capturing images using <b>digital sensors</b> rather than traditional photographic film; stored electronically, editable with software.",
    "Traditional photography uses: Film, Darkrooms, Chemical processing.",
    "Digital photography uses: Digital cameras, Smartphones, Image editing software.",
    "Camera Sensor: captures light and converts it into digital information. Examples: CMOS Sensor, CCD Sensor.",
    "Resolution = number of pixels in an image. 1920 × 1080 = 2,073,600 pixels. Higher = more detail, better print quality.",
    "JPEG (Joint Photographic Experts Group) = LOSSY, small files, photos/websites/social media/email attachments.",
    "PNG (Portable Network Graphics) = LOSSLESS, transparency, patent-free replacement for GIF; graphics, logos, screenshots, web design."
  ],
  html: `
<h4>Digital Photography</h4>
<p class="def"><b class="k">Digital photography</b> is the process of capturing images using <b class="k">digital sensors</b> rather than traditional photographic film. These images are stored <b class="k">electronically</b> and can be edited using software.</p>

<h4>Evolution of Photography</h4>
<table class="tbl"><thead><tr><th>Traditional Photography uses</th><th>Digital Photography uses</th></tr></thead>
<tbody>
<tr><td>Film</td><td>Digital cameras</td></tr>
<tr><td>Darkrooms</td><td>Smartphones</td></tr>
<tr><td>Chemical processing</td><td>Image editing software</td></tr>
</tbody></table>

<h4>Components of Digital Photography</h4>
<p><b class="k">Camera Sensor</b>: captures <b class="k">light</b> and converts it into digital information.</p>
<p>Examples: <b class="k">CMOS Sensor</b> and <b class="k">CCD Sensor</b>.</p>
<p><b class="k">Resolution</b>: the number of <b class="k">pixels</b> in an image.</p>
<p class="ex">Example: 1920 × 1080 = <b class="k">2,073,600</b> pixels</p>
<p>Higher resolutions generally provide:</p>
<ul><li>More detail</li><li>Better print quality</li></ul>

<h4>File Formats</h4>
<div class="vs">
<div class="vs-a">
<h5>JPEG <small>(Joint Photographic Experts Group)</small></h5>
<ul>
<li>Small file size, commonly used online, compressed quality.</li>
<li>Uses <b class="k">lossy compression</b>, which reduces file size by removing some image data.</li>
<li>Produces much smaller files compared to uncompressed formats.</li>
<li>Ideal for: digital photos, websites, social media images, email attachments.</li>
</ul>
</div>
<div class="vs-b">
<h5>PNG <small>(Portable Network Graphics)</small></h5>
<ul>
<li>An image file format developed as an improved, <b class="k">patent-free</b> replacement for the older <b class="k">GIF</b> format.</li>
<li>High quality. Supports transparency.</li>
<li>Uses <b class="k">lossless compression</b>, meaning no image quality is lost when the file is saved.</li>
<li>Maintains sharp details and crisp text.</li>
<li>Supports <b class="k">transparent backgrounds</b>.</li>
<li>Ideal for graphics, logos, screenshots, and web design.</li>
</ul>
</div>
</div>
<div class="tip"><b>Memory trick:</b> <b>JPEG = "J</b>ust <b>P</b>ixels <b>E</b>scaping <b>G</b>one" → it <b>loses</b> data (lossy). <b>PNG = "P</b>erfect, <b>N</b>o loss, <b>G</b>lass background" → lossless + transparent.</div>
<div class="tip"><b>Memory trick:</b> Traditional = <b>F-D-C</b> (Film, Darkrooms, Chemicals). Digital = <b>C-S-S</b> (Cameras, Smartphones, Software).</div>
<div class="trap"><b>Exam traps:</b> CMOS and CCD are <b>camera sensors</b>, not file formats. PNG replaced <b>GIF</b> (not JPEG). Resolution is about <b>pixels</b>, not file size.</div>
`},

thirds: {
  must: [
    "Rule of Thirds = Principle of Good Photography #1: divides an image into <b>nine</b> sections; subjects placed near intersection points.",
    "Made with two horizontal lines and two vertical lines (nine equal sections).",
    "The four intersection points = power points or points of interest.",
    "Why: balance, visual appeal, guide the viewer's eye naturally, add interest and movement, avoid dull centered compositions.",
    "Landscape: don't put horizon in the middle. Sky = top third + land = bottom two-thirds (or the reverse).",
    "Portrait: eyes near the top horizontal line. Wildlife: bird looking right → place on the LEFT third (looking space).",
    "Street: put a person, vehicle, or object on an intersection point → dynamic and engaging.",
    "Quick tips: turn on grid, subjects on intersections, horizons on top/bottom third, leave space where subject looks/moves, rule = guide, not a limitation."
  ],
  html: `
<h4>Principles of Good Photography: 1. Rule of Thirds</h4>
<p class="def"><b class="k">Rule of Thirds</b> divides an image into <b class="k">nine</b> sections. Subjects should be placed near <b class="k">intersection points</b>.</p>
<p>The Rule of Thirds is one of the most important principles of photographic <b class="k">composition</b>. It helps photographers create balanced, interesting, and visually appealing images.</p>
<p>Imagine dividing a photograph into <b>nine equal sections</b> using <b class="k">two horizontal lines</b> and <b class="k">two vertical lines</b>.</p>
<figure class="no-tts thirds-fig" aria-label="Rule of thirds grid with four power points">
<svg viewBox="0 0 300 200" role="img"><rect x="1" y="1" width="298" height="198" rx="8" class="g-bg"/>
<line x1="100" y1="0" x2="100" y2="200" class="g-l"/><line x1="200" y1="0" x2="200" y2="200" class="g-l"/>
<line x1="0" y1="66.7" x2="300" y2="66.7" class="g-l"/><line x1="0" y1="133.3" x2="300" y2="133.3" class="g-l"/>
<circle cx="100" cy="66.7" r="9" class="g-p"/><circle cx="200" cy="66.7" r="9" class="g-p"/>
<circle cx="100" cy="133.3" r="9" class="g-p"/><circle cx="200" cy="133.3" r="9" class="g-p"/>
<text x="150" y="104" class="g-t">9 equal sections</text></svg>
<figcaption>2 horizontal + 2 vertical lines = 9 sections and <b>4 power points</b> (yellow).</figcaption>
</figure>
<p>The <b>four points where the lines intersect</b> are called <b class="k">power points</b> or <b class="k">points of interest</b>. Instead of placing the subject in the exact center of the frame, photographers place important elements along these lines or at these intersection points.</p>

<h4>Why Use the Rule of Thirds?</h4>
<ul>
<li>Create balance in a photograph</li>
<li>Make images more visually appealing</li>
<li>Guide the viewer's eye naturally</li>
<li>Add interest and movement</li>
<li>Avoid dull, centered compositions</li>
</ul>

<h4>Example 1: Landscape Photography</h4>
<p><b>Less effective composition:</b> horizon placed in the <b class="k">middle</b>. The image may look static or uninteresting.</p>
<p><b>Better composition:</b> Top third = Sky, bottom two thirds = Land; <i>or</i> top two thirds = Sky, bottom third = Land. This emphasizes either the sky or the landscape.</p>

<h4>Example 2: Portrait Photography</h4>
<p>When photographing a person: place the subject's <b>eyes</b> near the <b class="k">top horizontal line</b>.</p>
<ul>
<li><b class="k">The Eye Line Rule</b>: the human eye naturally gravitates toward the upper-third line of a photograph. In close-up or tight shots, placing the subject's eyes along the top horizontal line makes the portrait instantly more engaging.</li>
<li><b>The Intersections (Power Points):</b> for a dynamic, off-center look, align the <b class="k">dominant eye</b> (the one closest to the camera) directly on one of the top intersection points.</li>
<li><b>Body Alignment:</b> in wider portrait or profile shots, align the subject's spine or body along either the left or right vertical third lines. This leaves open <b class="k">negative space</b> in the direction they are looking, creating a natural sense of breathing room and narrative balance.</li>
</ul>

<h4>Example 3: Wildlife Photography</h4>
<p>If a bird is looking to the right: place the bird on the <b class="k">left third</b> of the image. This leaves "<b class="k">looking space</b>" for the viewer's eyes to follow.</p>
<ul>
<li><b>The "Looking Room" Rule (Negative Space):</b> when an animal is looking toward the left or right, place the animal along the <i>opposite</i> vertical third line. Placing the cheetah on the far left gridline leaves the remaining two-thirds of the image open for the cat to "look into". This builds anticipation and context.</li>
<li><b>Locking Onto the Eyes:</b> for tight closeups or profile shots, the intersection points are reserved for the animal's eyes. In the crane and lion examples, the eye sits on an upper intersection crosshair, immediately drawing attention to the animal's expression.</li>
<li><b>Capturing Dynamic Action:</b> for birds in flight or running predators, placing the animal on a third line rather than the center gives them visual space to "move into." In the eagle example, the bird's body sits along a vertical third, making the flight path feel energetic and alive.</li>
</ul>

<h4>Example 4: Street Photography</h4>
<p>Place a person, vehicle, or object at one of the intersection points. This creates a <b>dynamic and engaging</b> composition.</p>
<ul>
<li><b>Isolating the Lone Pedestrian:</b> placing a single walking subject along the left or right vertical third gridlines creates a sense of <b class="k">journey and narrative</b>. Leaving the remaining two-thirds open (pink umbrella and orange wall examples) builds dramatic negative space.</li>
<li><b>Working with Geometry and Architecture:</b> aligning architectural elements (the edge of a building, a shadow line, or a wall pattern) along a third line lets you lock a human subject right onto an intersection point for maximum impact.</li>
<li><b>Leading Action into the Frame:</b> if a person is walking or cycling, placing them on a third line provides "<b class="k">lead room</b>" or breathing space in front of them, which prevents the action from feeling cut off by the edge of the photograph.</li>
</ul>

<h4>Advantages of the Rule of Thirds</h4>
<ul>
<li>Creates balanced images</li><li>Enhances visual appeal</li><li>Directs viewer attention</li>
<li>Easy to apply</li><li>Works for most photography genres</li>
</ul>
<h4>Applications in Digital Photography</h4>
<p>Commonly used in: Portrait, Landscape, Travel, Wildlife, and Mobile Photography; Social Media Content Creation; Digital Marketing.</p>
<p>Most smartphone cameras (Samsung, iPhone, Google Pixel, etc.) allow users to enable a <b class="k">grid overlay</b> that displays the Rule of Thirds lines while taking photos.</p>
<h4>Quick Tips</h4>
<ol>
<li>Turn on the camera grid.</li>
<li>Place subjects on grid intersections.</li>
<li>Align horizons with the top or bottom third.</li>
<li>Leave space in the direction a subject is looking or moving.</li>
<li>Use the rule as a <b class="k">guide</b>, not a limitation.</li>
</ol>
<div class="tip"><b>Memory trick:</b> "<b>2 + 2 = 9 and 4</b>": 2 horizontal + 2 vertical lines make <b>9</b> sections and <b>4</b> power points.</div>
<div class="tip"><b>Memory trick (direction):</b> Subject faces RIGHT → put it on the LEFT. Always leave room <b>in front of the eyes / in front of the motion</b>.</div>
<div class="trap"><b>Exam trap:</b> "Rule of <i>thirds</i>" does <b>not</b> mean 3 sections. It means <b>nine</b> sections (thirds both ways). The horizon in the middle is the <b>less effective</b> composition.</div>
`},

light: {
  must: [
    "Principle of Good Photography #2: Lighting = the use and control of light when taking a photograph.",
    "Light determines how a subject appears: brightness, color, mood, texture, shape, and detail.",
    "Photography literally means \"drawing with light\". Without light, a camera cannot capture an image.",
    "Good lighting: highlight the subject, create depth and dimension, reveal textures and details, set the mood, improve image quality, direct the viewer's attention.",
    "Bright lighting → cheerful and energetic. Dim lighting → dramatic, mysterious, or emotional.",
    "Natural light (sun: sunrise, daylight, sunset): free, realistic colors, outdoor. Artificial light (flash, LED, studio lights, street lamps): control, indoors/night, consistent.",
    "Front = in front (Light → Subject → Camera), reduced shadows, ID photos. Side = from the side (90°), texture, depth, dramatic shadows.",
    "Back = behind the subject (Camera → Subject → Light), silhouettes. Top = from above, shadows below facial features, midday sunlight."
  ],
  html: `
<h4>Principles of Good Photography: 2. Lighting</h4>
<p class="def"><b class="k">Lighting</b> refers to the use and control of light when taking a photograph. It is one of the most important principles of photography because light determines how a subject appears in terms of <b>brightness, color, mood, texture, shape, and detail</b>.</p>
<p>Photography literally means "<b class="k">drawing with light</b>." Without light, a camera cannot capture an image.</p>
<h4>Why is Lighting Important?</h4>
<p>Good lighting helps photographers:</p>
<ul>
<li>Highlight the subject</li><li>Create depth and dimension</li><li>Reveal textures and details</li>
<li>Set the mood of the photograph</li><li>Improve image quality</li><li>Direct the viewer's attention</li>
</ul>
<p>For example: <b>Bright</b> lighting often creates a <b class="k">cheerful and energetic</b> mood. <b>Dim</b> lighting can create a <b class="k">dramatic, mysterious, or emotional</b> atmosphere.</p>

<h4>Natural Light vs Artificial Light</h4>
<div class="vs">
<div class="vs-a">
<h5>☀️ Natural Light</h5>
<p><b class="k">Natural light</b> comes from the <b class="k">sun</b>. Examples: sunrise, daylight, sunset.</p>
<p><b>Advantages:</b></p>
<ul><li>Free and readily available</li><li>Produces realistic colors</li><li>Suitable for outdoor photography</li></ul>
<p><b>Examples:</b> Landscape photography, Nature photography, Travel photography.</p>
</div>
<div class="vs-b">
<h5>💡 Artificial Light</h5>
<p><b class="k">Artificial light</b> is produced by <b class="k">man-made sources</b>. Examples: flash, LED light, studio lights, street lamps.</p>
<p><b>Advantages:</b></p>
<ul><li>Better control over brightness</li><li>Can be used indoors or at night</li><li>Consistent lighting conditions</li></ul>
<p><b>Examples:</b> Studio portraits, Product photography, Event photography.</p>
</div>
</div>

<h4>Common Lighting Techniques</h4>
<div class="tech">
<h5>1. Front Lighting</h5>
<p>The light is positioned <b class="k">in front of</b> the object. Bright and clear images, reduced shadows, good for <b class="k">identification photos</b>.</p>
<p class="flow">Light → Subject → Camera</p>
<p>Front lighting occurs when the light source is directly in front of the subject, positioned from the photographer's point of view. It illuminates the entire face or scene evenly, minimizing shadows and texture.</p>
<ul>
<li><b>Flat Presentation:</b> because the light strikes head-on, shadows fall directly behind the subject out of view. This minimizes skin blemishes, lines, and wrinkles, making it highly popular for <b>beauty and commercial photography</b>.</li>
<li><b>High Symmetry:</b> it emphasizes facial structures symmetrically rather than using shadow depths to carve out features.</li>
<li><b class="k">Catchlights</b>: front lighting consistently creates bright, attractive reflections (catchlights) directly in the center of the subject's pupils, adding life to the eyes.</li>
</ul>
</div>
<div class="tech">
<h5>2. Side Lighting</h5>
<p>The light source comes from the <b class="k">side</b>. Enhances texture, creates depth, produces dramatic shadows. Example: portrait photography, fine art photography.</p>
<p class="flow">Light ↓ Subject → Camera</p>
<p>Side lighting (often called <b class="k">split lighting</b> or "<b class="k">hatchet lighting</b>") occurs when the light source is placed at a <b class="k">90-degree</b> angle directly to the side of the subject. This cleanly bisects the face down the bridge of the nose, casting one exact half in bright highlight while leaving the other half in deep shadow.</p>
<ul>
<li><b>High Drama and Mystery:</b> by blacking out large portions of the facial features, it creates a moody, brooding, or cinematic "<b class="k">film noir</b>" aesthetic.</li>
<li><b>Accentuates Texture:</b> unlike flat front lighting, the hard, grazing angle of a side light heavily exaggerates skin texture, bone structure, and fine details.</li>
<li><b class="k">Slimming Effect</b>: because half of the face disappears into darkness, it is frequently used to make wider faces look narrower.</li>
</ul>
</div>
<div class="tech">
<h5>3. Backlighting</h5>
<p>The light source is <b class="k">behind</b> the subject. Produces <b class="k">silhouettes</b>, creates dramatic effects, highlights outlines. Example: a person standing in front of a sunset.</p>
<p class="flow">Camera → Subject → Light</p>
<p>Backlighting occurs when the primary light source is placed directly behind the subject, facing toward the camera. This places the front of the subject in shadow while casting a brilliant glow around their edges.</p>
<ul>
<li><b>The Silhouette Effect:</b> if you expose your camera settings for the bright background, your subject will transform into a crisp, dark shape. Perfect for emphasizing dramatic body outlines, poses, or architectural shapes against a sunset sky.</li>
<li><b class="k">Rim Lighting</b> (The <b class="k">Halo Effect</b>): if you use a reflector or a subtle fill flash to light the subject's face, backlighting creates a beautiful "rim light" or halo of light that traces their hair and shoulders. This separates the subject cleanly from a dark backdrop.</li>
<li><b class="k">Lens Flare</b> &amp; Glow: allowing the light to bleed directly into the lens elements creates a soft, hazy look with warm circles of light (lens flare). It adds a romantic, ethereal, or nostalgic mood to portraits.</li>
</ul>
</div>
<div class="tech">
<h5>4. Top Lighting</h5>
<p>The light comes from <b class="k">above</b>. Creates shadows below facial features. Common during <b class="k">midday</b> sunlight.</p>
<p>Top lighting occurs when the primary light source is placed directly above the subject, shining straight down. This angle replicates the harsh overhead sun at noon or a single streetlamp at night.</p>
<ul>
<li><b>The "<span class="k">Raccoon Eyes</span>" Effect:</b> because the light strikes from straight above, the brow bone casts deep, dark shadows directly into the eye sockets. This completely obscures the subject's eyes, creating an anonymous, skeletal, or sinister appearance.</li>
<li><b>Heavy Structural Shadows:</b> long shadows are cast straight downward beneath the nose, lips, and chin. It heavily accentuates the cheekbones, collarbones, and shoulder alignment.</li>
<li><b>High-Drama or Thriller Aesthetic:</b> due to its aggressive and unflattering nature on facial features, top lighting is <b>rarely used in traditional beauty portraiture</b>. Instead, it is highly favored in cinematic thrillers, horror films, or athletic portraiture to convey mystery, fatigue, intensity, or danger.</li>
</ul>
</div>
<div class="tip"><b>Memory trick (order):</b> <b>F-S-B-T</b> = Front, Side, Back, Top. "<b>F</b>ind <b>S</b>ome <b>B</b>right <b>T</b>orches." Match by keyword: Front = <b>ID photo</b>, Side = <b>90° / split</b>, Back = <b>silhouette / sunset</b>, Top = <b>midday / raccoon eyes</b>.</div>
<div class="tip"><b>Memory trick (diagrams):</b> Front: the <b>Light</b> stands with the camera (Light → Subject → Camera). Back: the <b>Light</b> is at the far end (Camera → Subject → Light).</div>
<div class="trap"><b>Exam traps:</b> Natural light = <b>sun</b> only; flash, LED, studio lights and street lamps are <b>artificial</b>. Rim light / halo and lens flare belong to <b>backlighting</b>. Raccoon eyes belong to <b>top lighting</b>. Split/hatchet lighting = <b>side lighting</b>.</div>
`},

hours: {
  must: [
    "Golden hour (magic hour) = brief period shortly after sunrise or right before sunset when the sun sits very low in the sky.",
    "Light travels through a thicker layer of atmosphere → shorter blue wavelengths scattered away → soft, warm, diffused light (yellows, oranges, deep reds).",
    "Why photographers love golden hour: Flattering Softness, Long Dimensional Shadows, Perfect Dynamic Effects (rim lighting, lens flares, silhouettes).",
    "Blue hour = twilight window roughly 20 to 40 minutes right after sunset (or just before sunrise); sun is 4 to 6 degrees below the horizon.",
    "Blue hour palette = cool blues, indigos, and violet hues.",
    "Why blue hour is spectacular: Warm-Cold Color Contrast, Perfect for Long Exposures, Deeply Atmospheric Mood (calm, cinematic, quiet, slightly mysterious)."
  ],
  html: `
<h4>Golden Hour</h4>
<p class="def"><b class="k">Golden hour</b> (sometimes called the <b class="k">magic hour</b>) is the brief period shortly <b>after sunrise</b> or right <b>before sunset</b> when the sun sits very low in the sky.</p>
<p>Because the sunlight must travel through a thicker layer of the Earth's <b class="k">atmosphere</b>, shorter <b class="k">blue wavelengths</b> of light are scattered away. This leaves behind a palette of <b class="k">soft, warm, diffused light</b> dominated by brilliant yellows, oranges, and deep reds.</p>
<h5>Why Photographers Love Golden Hour</h5>
<ul>
<li><b>Flattering Softness:</b> unlike the harsh midday sun that beams straight down and creates ugly, deep shadows under the eyes and nose, golden hour light strikes at a low angle. It naturally diffuses, blending away skin imperfections and preventing <b class="k">overexposure</b>.</li>
<li><b>Long, Dimensional Shadows:</b> the low angle of the sun stretches out shadows across landscapes, city streets, and fields. These long shadows give flat surfaces a massive sense of scale, texture, and <b>three-dimensional depth</b>.</li>
<li><b>Perfect Dynamic Effects:</b> the ultimate time to experiment with lighting angles. Placing the sun behind your subject yields an ethereal halo of <b>rim lighting</b> or beautiful <b>lens flares</b>. Facing the camera into the sun while exposing for the background results in crisp, high-contrast <b>silhouettes</b>.</li>
</ul>

<h4>Blue Hour</h4>
<p class="def"><b class="k">Blue hour</b> is the magical <b class="k">twilight</b> window occurring roughly <b class="k">20 to 40 minutes</b> right <b>after sunset</b> (or just before sunrise) when the sun dips between <b class="k">4 and 6 degrees below the horizon</b>. With the sun gone, the sky shifts into a deep, saturated palette of <b class="k">cool blues, indigos, and violet hues</b>.</p>
<h5>Why Blue Hour is Spectacular</h5>
<ul>
<li><b>The <span class="k">Warm-Cold Color Contrast</span>:</b> blue hour truly shines when paired with artificial lighting. The warm, fiery orange and yellow glow from streetlamps, skyscrapers, and headlights creates a striking, high-contrast color dynamic against the deep blue sky.</li>
<li><b>Perfect for <span class="k">Long Exposures</span>:</b> because ambient light drops significantly, your camera is forced into longer <b>shutter speeds</b>. This makes it the ultimate time to turn passing traffic into vibrant, streaking <b>light trails</b> or to smooth out choppy ocean waves into a glassy, ethereal mist.</li>
<li><b>Deeply Atmospheric Mood:</b> unlike the energetic warmth of the golden hour, blue hour feels <b>calm, cinematic, quiet, and slightly mysterious</b>.</li>
</ul>
<table class="tbl"><thead><tr><th></th><th>Golden Hour</th><th>Blue Hour</th></tr></thead><tbody>
<tr><td>When</td><td>Shortly after sunrise / right before sunset</td><td>20 to 40 min after sunset (or just before sunrise)</td></tr>
<tr><td>Sun position</td><td>Very low in the sky</td><td>4 to 6 degrees below the horizon</td></tr>
<tr><td>Colors</td><td>Yellows, oranges, deep reds (warm)</td><td>Blues, indigos, violet hues (cool)</td></tr>
<tr><td>Mood</td><td>Energetic warmth</td><td>Calm, cinematic, quiet, slightly mysterious</td></tr>
</tbody></table>
<div class="tip"><b>Memory trick:</b> <b>Golden</b> = sun still <b>up</b> (low) = <b>warm</b>. <b>Blue</b> = sun already <b>down</b> (4–6° below) = <b>cool</b>. Blue hour numbers: "<b>20–40 minutes, 4–6 degrees</b>". Both pairs go up by 2: 2-4 → 20-40, 4-6.</div>
<div class="trap"><b>Exam trap:</b> The sun is <b>below</b> the horizon during blue hour (not above). Golden hour's other name is <b>magic hour</b>.</div>
`},

hardsoft: {
  must: [
    "Hard light = light source physically SMALL relative to the subject → stark, razor-sharp shadow edges, intense high-contrast highlights.",
    "Hard light traits: Razor-Sharp Edge Transitions (narrow penumbra), Aggressive Texture Enhancement, Gobo and Shadow Patterns, High-Contrast Narrative (great in black and white).",
    "Soft light = light source physically LARGE relative to the subject → smooth, gradual transitions from highlights to shadows (\"wraps\" around the subject).",
    "Soft light traits: Wide \"Gray Zone\", Highly Flattering, Muted Subtle Colors.",
    "Catchlight: hard = tiny pinpoint dot; soft = large distinct white shape.",
    "Mood: hard = aggressive, gritty, cinematic; soft = welcoming, gentle, commercial."
  ],
  html: `
<h4>Hard Light</h4>
<p class="def"><b class="k">Hard light</b> is created when the light source is physically <b class="k">small</b> relative to the subject. It produces <b>stark, razor-sharp shadow edges and intense, high-contrast highlights</b> with almost no transition zone between the bright and dark areas.</p>
<h5>Visual &amp; Emotional Characteristics</h5>
<ul>
<li><b>Razor-Sharp Edge Transitions:</b> in a hard light photo, you can easily trace the exact border where a shadow begins and ends. The transition zone (or <b class="k">penumbra</b>) is incredibly narrow.</li>
<li><b>Aggressive Texture Enhancement:</b> hard light acts like a <b>magnifying glass</b> for surface details. It exaggerates skin texture, clothing fabric, or architectural gritty details, making it a favorite for <b>edgy fashion editorials</b> but demanding high precision from the photographer.</li>
<li><b><span class="k">Gobo</span> and Shadow Patterns:</b> because the light rays travel in a straight, unmodified line, putting objects in front of the light source casts a perfect silhouette pattern onto the subject (such as the <b>window blind effect</b> or <b>tropical leaf shadows</b>).</li>
<li><b>High-Contrast Narrative:</b> hard light feels raw, serious, edgy, and modern. It is highly effective when converted to <b>black and white</b> because it strips away distracting colors and leans entirely on geometric light structures.</li>
</ul>

<h4>Soft Light</h4>
<p class="def"><b class="k">Soft light</b> occurs when the light source is physically <b class="k">large</b> relative to the subject. Instead of stark lines, it creates <b>smooth, gradual transitions from highlights to shadows</b>, naturally "<b class="k">wrapping</b>" around the subject to minimize textures and wrinkles.</p>
<h5>Key Characteristics of Soft Light</h5>
<ul>
<li><b>The Wide "<span class="k">Gray Zone</span>":</b> soft light has a broad gradient zone between the brightest highlight and the darkest shadow. Shadows under the nose, chin, or cheekbones look like gentle fades rather than sharp, dark shapes.</li>
<li><b>Highly Flattering:</b> because the light wraps evenly into dips and textures, it naturally hides skin blemishes, pimples, and wrinkles. It makes subjects look welcoming, comfortable, and approachable.</li>
<li><b>Muted, Subtle Colors:</b> soft light reduces overall contrast. This causes colors to appear beautifully blended, painterly, and subtle rather than aggressively vibrant or saturated.</li>
</ul>

<h4>Direct Comparison Overview</h4>
<table class="tbl"><thead><tr><th>Feature</th><th>Hard Light Side</th><th>Soft Light Side</th></tr></thead><tbody>
<tr><td>Shadow Edge</td><td>Razor-sharp, distinct line</td><td>Blurry, gradual gradient fade</td></tr>
<tr><td>Skin Texture</td><td>Exaggerated wrinkles and pores</td><td>Hidden blemishes and smooth skin</td></tr>
<tr><td>Contrast Level</td><td>Intensely high (deep blacks, hot whites)</td><td>Low to medium (even, uniform tones)</td></tr>
<tr><td>Catchlight (Eye)</td><td>A tiny, pinpoint dot of light</td><td>A large, distinct white shape</td></tr>
<tr><td>Overall Mood</td><td>Aggressive, gritty, cinematic</td><td>Welcoming, gentle, commercial</td></tr>
</tbody></table>

<h4>Key Details to Notice</h4>
<ul>
<li><b>The Highlight-to-Shadow Transition (<span class="k">Roll-off</span>):</b> on the hard light side, the shadow under the nose and chin cuts off abruptly like a stamped ink line. On the soft light side, that exact same shadow behaves like a smooth, hazy gray gradient wrapping around the jaw.</li>
<li><b>The Catchlight in the Eyes:</b> a small, bare hard-light source reflects as a microscopic pinpoint sparkle. A massive <b>softbox or umbrella</b> reflects as a giant, soft white window shape filling out the eye.</li>
<li><b>Surface Imperfections:</b> hard light shoots straight past contours, casting tiny micro-shadows inside every pore or wrinkle, making textures highly visible. Soft light bounces from multiple angles simultaneously, stepping "inside" those tiny micro-textures to fill them with light.</li>
</ul>
<div class="tip"><b>Memory trick:</b> "<b>Small source = Sharp shadows. Large source = Lenient light.</b>" A tiny flashlight is hard; a huge window or softbox is soft.</div>
<div class="tip"><b>Memory trick (catchlights):</b> Hard = <b>dot</b> (tiny pinpoint). Soft = <b>window</b> (large white shape).</div>
<div class="trap"><b>Exam trap:</b> The size that matters is the light source's size <b>relative to the subject</b>, not how bright it is. Penumbra = the transition zone; it is <b>narrow</b> in hard light.</div>
`},

mood: {
  must: [
    "Lighting & Mood: Bright → happy, energetic; Soft → calm, natural; Dim → serious, emotional; Backlighting → dramatic, artistic; Colored → creative, modern.",
    "Lighting is important in: Portrait, Product, Food, Wildlife, Smartphone Photography; Social Media Content Creation; Advertising and Marketing.",
    "Tips: 1) Use natural light when possible (morning, late afternoon); 2) Avoid harsh midday sun; 3) Position your subject carefully; 4) Use reflectors; 5) Adjust camera settings.",
    "Control exposure using: ISO, Aperture, Shutter Speed.",
    "Poor lighting: subject faces away from light, face dark, details lost. Good lighting: faces soft sunlight, features clear, colors vibrant, looks professional.",
    "Activity 1 (Smartphone Cinema Challenge): Phase 1 \"Gritty Noir\" = hard light + side lighting + off-center rule of thirds. Phase 2 \"Commercial Glow\" = soft light + front lighting + centered eye-line."
  ],
  html: `
<h4>Lighting and Mood</h4>
<table class="tbl"><thead><tr><th>Lighting Style</th><th>Mood Created</th></tr></thead><tbody>
<tr><td>Bright Light</td><td>Happy, energetic</td></tr>
<tr><td>Soft Light</td><td>Calm, natural</td></tr>
<tr><td>Dim Light</td><td>Serious, emotional</td></tr>
<tr><td>Backlighting</td><td>Dramatic, artistic</td></tr>
<tr><td>Colored Lighting</td><td>Creative, modern</td></tr>
</tbody></table>

<h4>Applications in Digital Photography</h4>
<p>Lighting is important in:</p>
<ul>
<li>Portrait Photography</li><li>Product Photography</li><li>Food Photography</li><li>Wildlife Photography</li>
<li>Smartphone Photography</li><li>Social Media Content Creation</li><li>Advertising and Marketing</li>
</ul>

<h4>Tips for Better Lighting</h4>
<ol>
<li><b>Use Natural Light When Possible:</b> morning and late afternoon sunlight often produce excellent results.</li>
<li><b>Avoid Harsh Midday Sun:</b> strong overhead sunlight can create unwanted shadows.</li>
<li><b>Position Your Subject Carefully:</b> move the subject relative to the light source to achieve the desired effect.</li>
<li><b>Use <span class="k">Reflectors</span>:</b> reflect light onto the subject to reduce harsh shadows.</li>
<li><b>Adjust Camera Settings:</b> control <b class="k">exposure</b> using <b class="k">ISO</b>, <b class="k">Aperture</b>, and <b class="k">Shutter Speed</b>.</li>
</ol>

<h4>Example Analysis</h4>
<p>Imagine taking a photo of a student outdoors:</p>
<div class="vs">
<div class="vs-a"><h5>❌ Poor Lighting</h5><ul><li>Subject faces away from light</li><li>Face appears dark</li><li>Details are lost</li></ul></div>
<div class="vs-b"><h5>✅ Good Lighting</h5><ul><li>Subject faces soft sunlight</li><li>Facial features are clear</li><li>Colors appear vibrant</li><li>Image looks professional</li></ul></div>
</div>

<h4>Activity 1. The Smartphone Cinema Challenge</h4>
<div class="tech">
<h5>Phase 1: The "Gritty Noir" Portrait (10 Minutes)</h5>
<p>Goal: an intense, dramatic shot using <b class="k">Hard Light</b> and an <b>Off-Center Rule of Thirds</b> composition.</p>
<ul>
<li><b>The Light:</b> turn on a second phone's flashlight. Hold it close to the model's face at a <b>90-degree angle (Side Lighting)</b> without any diffusion. Do not use overhead room lights.</li>
<li><b>The Framing:</b> turn on the Gridlines in the camera app settings. Position the model's body along the left vertical line, with their lit eye resting exactly on the <b>top-left intersection point</b>.</li>
<li><b>The Shot:</b> ensure the shadow line down the nose is razor-sharp. Take the photo.</li>
</ul>
</div>
<div class="tech">
<h5>Phase 2: The "Commercial Glow" Portrait (10 Minutes)</h5>
<p>Goal: a soft, welcoming, and beautifully balanced portrait using <b class="k">Soft Light</b> and a <b>Centered Eye-Line</b> composition.</p>
<ul>
<li><b>The Light:</b> move to a large window (<b>Natural Soft Light</b>) or place a piece of white tissue paper/napkin over the phone flashlight to <b>diffuse</b> it. Position the light directly in front of the model's face (<b>Front Lighting</b>).</li>
<li><b>The Framing:</b> center the model horizontally in the middle column, but align their eyes perfectly along the <b>top horizontal gridline</b>.</li>
<li><b>The Shot:</b> ensure there are no harsh shadows under the nose or chin, and look for large, soft catchlights in their pupils. Take the photo.</li>
</ul>
</div>
<div class="tip"><b>Memory trick (mood table):</b> "<b>B</b>right is <b>B</b>ouncy (happy, energetic), <b>S</b>oft is <b>S</b>erene (calm, natural), <b>D</b>im is <b>D</b>eep (serious, emotional), <b>Back</b> is <b>Bold art</b> (dramatic, artistic), <b>Color</b> is <b>Cool & creative</b> (creative, modern)."</div>
<div class="tip"><b>Memory trick (exposure):</b> <b>I-A-S</b> = <b>I</b>SO, <b>A</b>perture, <b>S</b>hutter speed. "<b>I A</b>lways <b>S</b>hoot."</div>
<div class="trap"><b>Exam trap:</b> Soft light → <b>calm, natural</b>; Dim light → <b>serious, emotional</b>. Don't swap them. Noir = hard + side; Glow = soft + front.</div>
`},

visarts: {
  must: [
    "Reading Visual Arts = the process of observing, analyzing, interpreting, and understanding visual images and artworks.",
    "Just as we read words in a book, we can \"read\" images to understand messages, emotions, ideas, and values.",
    "Visual Arts communicate through: Lines, Shapes, Colors, Texture, Space, Composition, Symbols, Visual elements.",
    "Why study: Virtual (visual) literacy helps us understand media messages, appreciate artistic expression, recognize persuasive techniques, develop critical thinking skills, interpret cultural and social meanings.",
    "Everyday examples: Social media posts, Advertisements, Website designs, Logos, Movies, Paintings, Photography, Infographics."
  ],
  html: `
<h4>Lesson objectives</h4>
<p>At the end of this lesson, students should be able to:</p>
<ol>
<li>Explain the concept of visual communication.</li>
<li>Analyze and interpret images critically.</li>
<li>Identify symbols and symbolic meanings in artworks and media.</li>
<li>Understand how context influences the meaning of visual images.</li>
<li>Apply visual analysis techniques to artworks, advertisements, websites, films, and social media content.</li>
<li>Evaluate the effectiveness of visual communication in various forms of media.</li>
</ol>

<h4>I. Introduction to Reading Visual Arts</h4>
<p class="def"><b class="k">Reading Visual Arts</b> is the process of <b>observing, analyzing, interpreting, and understanding</b> visual images and artworks.</p>
<p>Just as we read words in a book, we can "read" images to understand the <b>messages, emotions, ideas, and values</b> they communicate.</p>
<p>Visual Arts communicate through:</p>
<ul>
<li>Lines</li><li>Shapes</li><li>Colors</li><li>Texture</li>
<li>Space</li><li>Composition</li><li>Symbols</li><li>Visual elements</li>
</ul>

<h4>Why Study Visual Arts?</h4>
<p><b class="k">Virtual literacy</b> (visual literacy) helps us:</p>
<ul>
<li>Understand media messages</li>
<li>Appreciate artistic expression</li>
<li>Recognize <b class="k">persuasive techniques</b></li>
<li>Develop <b class="k">critical thinking</b> skills</li>
<li>Interpret cultural and social meanings</li>
</ul>
<h4>Everyday Examples of Visual Arts</h4>
<ul>
<li>Social Media posts</li><li>Advertisements</li><li>Website designs</li><li>Logos</li>
<li>Movies</li><li>Paintings</li><li>Photography</li><li>Infographics</li>
</ul>
<div class="tip"><b>Memory trick:</b> Reading Visual Arts = <b>O-A-I-U</b>: <b>O</b>bserve, <b>A</b>nalyze, <b>I</b>nterpret, <b>U</b>nderstand. "<b>O</b>h, <b>A</b>rt <b>I</b>s <b>U</b>s."</div>
<div class="tip"><b>Memory trick (communicate through):</b> "<b>L</b>ittle <b>S</b>tars <b>C</b>an <b>T</b>winkle; <b>S</b>pace <b>C</b>reates <b>S</b>hining <b>V</b>isions" = Lines, Shapes, Colors, Texture, Space, Composition, Symbols, Visual elements.</div>
<div class="trap"><b>Note on wording:</b> the slide writes "<b>Virtual literacy</b>". It refers to visual literacy, the skill of reading images. If asked, answer with the slide's term.</div>
`},

viscom: {
  must: [
    "Visual communication = the use of visual elements to convey information, ideas, emotions, or messages; transmitting messages through images and visual representations rather than words alone.",
    "4 Components: 1) Images, 2) Colors, 3) Typography, 4) Layout and Composition.",
    "Images = photographs, illustrations, paintings, and digital graphics. Colors communicate emotions and meanings.",
    "Red: passion, love, energy, power, danger/urgency. Blue: trust, calm, peace, security, stability. Green: nature, growth, health, harmony, wealth/money.",
    "Yellow: happiness, optimism, cheerfulness, caution/alerts. Orange: enthusiasm, warmth, youthfulness, creativity. Purple: royalty, luxury, mystery, spirituality.",
    "Pink: love, romance, compassion, playfulness. Black: power, elegance, sophistication, mystery. White: purity, simplicity, cleanliness, minimalism. Brown: stability, security, earthy/natural. Gray: neutrality, balance, formality, calm compromise.",
    "Examples: Traffic Signs (stop sign = \"Stop your vehicle.\"), Social Media Emojis (communicate emotion instantly), Website Design (environmental org: green, nature photos, leaf icons → values sustainability)."
  ],
  html: `
<h4>II. Visual Communication</h4>
<p class="def"><b class="k">Visual communication</b> is the use of visual elements to convey <b>information, ideas, emotions, or messages</b>. It is the practice of transmitting messages through images and visual representations rather than <b class="k">words alone</b>.</p>

<h4>Components of Visual Communication</h4>
<ol>
<li><b class="k">Images</b>: photographs, illustrations, paintings, and digital graphics.</li>
<li><b class="k">Colors</b>: colors communicate emotions and meanings.</li>
<li><b class="k">Typography</b>: the style and appearance of text.</li>
<li><b class="k">Layout and Composition</b>: the arrangement of elements in a visual design.</li>
</ol>

<h4>2. Colors: color meanings</h4>
<p>Colors convey distinct psychological, emotional, and cultural meanings:</p>
<table class="tbl colors"><thead><tr><th>Color</th><th>Meaning</th></tr></thead><tbody>
<tr><td><i class="sw" style="background:#d62828"></i>Red</td><td>Passion, love, energy, power, and danger or urgency</td></tr>
<tr><td><i class="sw" style="background:#1d4ed8"></i>Blue</td><td>Trust, calm, peace, security, and stability</td></tr>
<tr><td><i class="sw" style="background:#2e8b57"></i>Green</td><td>Nature, growth, health, harmony, and wealth or money</td></tr>
<tr><td><i class="sw" style="background:#f4d35e"></i>Yellow</td><td>Happiness, optimism, cheerfulness, and caution or alerts</td></tr>
<tr><td><i class="sw" style="background:#f08c00"></i>Orange</td><td>Enthusiasm, warmth, youthfulness, and creativity</td></tr>
<tr><td><i class="sw" style="background:#7b2cbf"></i>Purple</td><td>Royalty, luxury, mystery, and spirituality</td></tr>
<tr><td><i class="sw" style="background:#f78fb3"></i>Pink</td><td>Love, romance, compassion, and playfulness</td></tr>
<tr><td><i class="sw" style="background:#111"></i>Black</td><td>Power, elegance, sophistication, and mystery</td></tr>
<tr><td><i class="sw" style="background:#fff"></i>White</td><td>Purity, simplicity, cleanliness, and minimalism</td></tr>
<tr><td><i class="sw" style="background:#8b5a2b"></i>Brown</td><td>Stability, security, and an earthy or natural feel</td></tr>
<tr><td><i class="sw" style="background:#8d99ae"></i>Gray</td><td>Neutrality, balance, formality, and calm compromise</td></tr>
</tbody></table>

<h4>Examples of Visual Communication</h4>
<div class="tech">
<h5>Example 1: Traffic Signs</h5>
<p>A <b>stop sign</b> communicates a message without using a complete sentence. Visual message: "Stop your vehicle."</p>
</div>
<div class="tech">
<h5>Example 2: Social Media Emojis</h5>
<p>😊 = Happiness, ❤️ = Love, 👍 = Approval, 🔥 = Excitement. Visual symbols communicate emotion <b>instantly</b>.</p>
</div>
<div class="tech">
<h5>Example 3: Website Design</h5>
<p>An environmental organization's website often contains green colors, nature photographs, and leaf icons. Message: the organization values <b>sustainability and environmental protection</b>.</p>
</div>
<div class="tip"><b>Memory trick (4 components):</b> <b>I-C-T-L</b>: "<b>I C</b>an <b>T</b>ell <b>L</b>ooks" = Images, Colors, Typography, Layout &amp; Composition.</div>
<div class="tip"><b>Memory trick (colors that share meanings):</b> <b>Mystery</b> = Purple and Black. <b>Love</b> = Red and Pink. <b>Power</b> = Red and Black. <b>Stability/Security</b> = Blue and Brown. <b>Calm</b> = Blue (and Gray's "calm compromise").</div>
<div class="trap"><b>Exam trap:</b> Yellow means happiness but <b>also caution or alerts</b>. Green includes <b>wealth or money</b>. White = purity (in this lesson's color list).</div>
`},

typo: {
  must: [
    "Typography = the style and appearance of text. A luxury brand may use elegant serif fonts to communicate sophistication.",
    "Serif (Times New Roman, Garamond): tradition, authority, reliability, academic/legal formality.",
    "Sans-Serif (Helvetica, Arial, Inter): modernity, cleanliness, neutrality, progress, directness.",
    "Slab Serif (Rockwell, Courier): boldness, strength, industrial weight, confidence. Script/Handwritten (Pacifico, Brush Script): elegance, romance, creativity, personal touch, informality. Display/Decorative (Impact, Stencil): loud personality, drama, thematic identity, immediate impact.",
    "Weight & Scale, Tracking & Kerning, Case make typography convey more meaning.",
    "Layout and Composition = arrangement of elements in a visual design (campaign poster puts candidate at the center to emphasize importance).",
    "Core principles: Hierarchy, Proximity, Contrast, White Space (Negative Space), Alignment, Balance (symmetrical vs asymmetrical).",
    "Layouts: Calm/Trustworthy (banks, wellness, museums), Urgent/Action-Driven (sales, breaking news, promos), Storytelling/Narrative (magazines, long-form articles, posters)."
  ],
  html: `
<h4>3. Typography</h4>
<p class="def"><b class="k">Typography</b> is the style and appearance of text. A <b>luxury brand</b> may use elegant <b class="k">serif</b> fonts to communicate <b>sophistication</b>.</p>
<h5>Typeface Categories and Their Meanings</h5>
<table class="tbl"><thead><tr><th>Category (e.g.)</th><th>Meaning</th><th>Best used for</th></tr></thead><tbody>
<tr><td><b class="k">Serif</b> (Times New Roman, Garamond)</td><td>Tradition, authority, reliability, and academic or legal formality</td><td>News publications, historical books, luxury heritage brands, financial institutions</td></tr>
<tr><td><b class="k">Sans-Serif</b> (Helvetica, Arial, Inter)</td><td>Modernity, cleanliness, neutrality, progress, and directness</td><td>Technology companies, user interfaces, corporate websites, minimalist design</td></tr>
<tr><td><b class="k">Slab Serif</b> (Rockwell, Courier)</td><td>Boldness, strength, industrial weight, and confidence</td><td>Posters, automotive brands, sports branding, strong headlines</td></tr>
<tr><td><b class="k">Script / Handwritten</b> (Pacifico, Brush Script)</td><td>Elegance, romance, creativity, personal touch, or informality</td><td>Wedding invitations, upscale restaurants, greeting cards, artisanal brands</td></tr>
<tr><td><b class="k">Display / Decorative</b> (Impact, Stencil)</td><td>Loud personality, drama, thematic identity, and immediate impact</td><td>Movie titles, event posters, short-burst headlines (avoid for long body text)</td></tr>
</tbody></table>
<h5>How to Make Typography Convey More Meaning</h5>
<ul>
<li><b class="k">Weight and Scale</b>: thick, heavy-set (bold) weights feel loud, powerful, or urgent; thin, light-set weights feel fragile, delicate, or high-end.</li>
<li><b class="k">Tracking and Kerning</b>: spreading letters far apart (<i>wide tracking</i>) creates a sense of luxury, emptiness, or spaciousness; squeezing letters tightly together (<i>tight tracking</i>) can create tension, urgency, or density.</li>
<li><b class="k">Case</b>: ALL CAPS projects shouting, authority, or monumental scale, while lowercase can feel approachable, quiet, or modern.</li>
</ul>

<h4>4. Layout and Composition</h4>
<p class="def"><b class="k">Layout and Composition</b>: the arrangement of elements in a visual design. A <b>political campaign poster</b> places the candidate at the <b>center</b> to emphasize importance.</p>
<h5>Core Principles That Convey Meaning</h5>
<ul>
<li><b class="k">Hierarchy</b>: tells the viewer where to look first, second, and last. Making an element larger, bolder, or brighter commands immediate attention and signals importance.</li>
<li><b class="k">Proximity</b>: groups related elements closer together to show a connection. Separating unrelated elements signals that they belong to a different idea or category.</li>
<li><b class="k">Contrast</b>: uses opposites (dark versus light, massive versus tiny, sharp versus soft) to create tension, highlight a focal point, or express conflict/urgency.</li>
<li><b class="k">White Space</b> (<b class="k">Negative Space</b>): uses open or empty areas around and between elements. Generous white space conveys calm, luxury, and clarity; tight or crowded space conveys chaos, urgency, or overwhelm.</li>
<li><b class="k">Alignment</b>: anchors elements to an invisible grid or line to create order and stability. Breaking away from strict alignment creates disruption, energy, or unease.</li>
<li><b class="k">Balance</b>: distributes visual weight. <b>Symmetrical balance</b> communicates stability, formality, and tradition; <b>asymmetrical balance</b> communicates dynamism, modernity, and movement.</li>
</ul>
<h5>Examples of Meaning Through Layout</h5>
<table class="tbl"><thead><tr><th>Layout</th><th>Composition</th><th>Meaning</th></tr></thead><tbody>
<tr><td><b>The Calm / Trustworthy Layout</b></td><td>Symmetrical alignment, generous white space, consistent typography, and open breathing room</td><td>Reliability, safety, high-end polish (often used by banks, wellness brands, or museums)</td></tr>
<tr><td><b>The Urgent / Action-Driven Layout</b></td><td>High-contrast colors (like red or yellow), large focal scale, asymmetric placement, and a tight path leading straight to a button or core statement</td><td>Energy, immediate importance, call to action (often used in sales, breaking news, or event promos)</td></tr>
<tr><td><b>The Storytelling / Narrative Layout</b></td><td>Asymmetric or rule-of-thirds placement with a clear visual flow (e.g., top-left to bottom-right trajectory) that forces the eye to track a sequence of events or details</td><td>Progression, journey, or discovery (often used in editorial magazines, long-form web articles, or posters)</td></tr>
</tbody></table>
<div class="tip"><b>Memory trick (typefaces):</b> <b>Serif</b> = <b>S</b>erious &amp; traditional (newspapers, banks). <b>Sans</b> = <b>S</b>leek &amp; modern (tech, apps). <b>Slab</b> = <b>S</b>trong &amp; bold (sports, cars). <b>Script</b> = <b>S</b>weet &amp; romantic (weddings). <b>Display</b> = <b>D</b>rama (movie titles).</div>
<div class="tip"><b>Memory trick (layout principles):</b> "<b>H</b>appy <b>P</b>andas <b>C</b>an <b>W</b>ear <b>A</b>ll <b>B</b>lack" = Hierarchy, Proximity, Contrast, White space, Alignment, Balance.</div>
<div class="trap"><b>Exam traps:</b> <b>Symmetrical</b> balance = stability, formality, tradition; <b>asymmetrical</b> = dynamism, modernity, movement. <b>Wide</b> tracking = luxury/spaciousness; <b>tight</b> tracking = tension/urgency. Courier is a <b>slab serif</b> example in the slides.</div>
`},

levels: {
  must: [
    "Reading an image = observing and interpreting visual information.",
    "A viewer asks: 1) What do I see? 2) What is happening? 3) What emotions are present? 4) What message is being communicated?",
    "4 Levels: 1) Description: describe what is visible; 2) Analysis: examine artistic elements; 3) Interpretation: determine meaning; 4) Judgment: evaluate effectiveness.",
    "Description = objective observations (Subject Matter, Setting, Objects and Details, Text/Signs).",
    "Analysis = how is it made? (Composition, Lighting and Color, Lines and Shapes, Perspective and Angle).",
    "Interpretation = what does it mean? (Narrative, Mood and Emotion, Symbolism, Context).",
    "Judgment = how effective is it? (Communication, Artistic Value, Impact, Comparison).",
    "Migrant Mother: photograph by Dorothea Lange, 1936, Nipomo, California, Resettlement Administration; Great Depression."
  ],
  html: `
<h4>III. Reading Images</h4>
<p class="def"><b>What does it mean to read an image?</b> Reading an image involves <b class="k">observing and interpreting</b> visual information.</p>
<p>A viewer asks:</p>
<ol>
<li>What do I see?</li><li>What is happening?</li><li>What emotions are present?</li><li>What message is being communicated?</li>
</ol>

<h4>4 Levels of Reading Images</h4>
<ol class="levels">
<li><b class="k">Description</b>: describe what is visible</li>
<li><b class="k">Analysis</b>: examine artistic elements</li>
<li><b class="k">Interpretation</b>: determine meaning</li>
<li><b class="k">Judgment</b>: evaluate effectiveness</li>
</ol>

<div class="tech">
<h5>Level 1: Description (What is visible?)</h5>
<p>At this first level, you focus entirely on <b class="k">objective observations</b>. Imagine describing the image to someone who cannot see it. Avoid making assumptions or guessing the meaning.</p>
<ul>
<li><b>Subject Matter:</b> who or what is the main focus? (e.g., a person, an object, a landscape, abstract shapes).</li>
<li><b>Setting:</b> where is the scene taking place? Note any identifiable locations, weather, or time periods.</li>
<li><b>Objects and Details:</b> list the specific items, clothing, props, or background elements present.</li>
<li><b>Text/Signs:</b> identify any words, logos, or symbols written directly on the image.</li>
</ul>
<p class="ex">Example photograph: a woman is holding a plant while standing beside a polluted river. Questions: Who is in the image? What objects are shown? What actions are occurring? Observation: Woman, Plant, Dirty river.</p>
</div>
<div class="tech">
<h5>Level 2: Analysis (How is it made?)</h5>
<p>This level moves from <i>what</i> is in the image to <i>how</i> the creator constructed it. You examine the formal artistic choices and design elements used to guide your eyes.</p>
<ul>
<li><b>Composition:</b> how are the elements arranged? Look for focal points, rule of thirds, symmetry, or framing.</li>
<li><b>Lighting and Color:</b> is the lighting harsh, soft, natural, or dramatic? Is the color palette warm, cool, vibrant, monochromatic, or high-contrast?</li>
<li><b>Lines and Shapes:</b> are the lines sharp and geometric, or soft and organic? Do they lead your eye toward a specific spot?</li>
<li><b>Perspective and Angle:</b> is the image shot from a high angle (looking down), low angle (looking up), eye-level, or extreme close-up?</li>
</ul>
<p>Consider: colors, composition, lighting, perspective.</p>
<p class="ex">Example: the plant is bright green while the environment is gray. Interpretation: the artist purposely emphasizes hope within environmental destruction.</p>
</div>
<div class="tech">
<h5>Level 3: Interpretation (What does it mean?)</h5>
<p>Here, you combine your observations from Levels 1 and 2 to figure out the deeper message, mood, or story behind the image.</p>
<ul>
<li><b>Narrative:</b> what is happening in this story? What happened right before or right after this moment?</li>
<li><b>Mood and Emotion:</b> what feelings does the image evoke? (e.g., isolation, joy, tension, nostalgia).</li>
<li><b>Symbolism:</b> do any objects or colors stand for larger concepts? (e.g., a vulture symbolizing death; a red dress symbolizing power or danger).</li>
<li><b>Context:</b> how does the historical, cultural, or social background of when it was made influence its meaning?</li>
</ul>
<p class="ex">Question: "What does the image mean?" Interpretation: the image promotes environmental conservation.</p>
</div>
<div class="tech">
<h5>Level 4: Judgment (How effective is it?)</h5>
<p>The final level is your <b class="k">critical evaluation</b>. Instead of just saying "I like it" or "I don't like it," you judge how successfully the image communicates its intended message.</p>
<ul>
<li><b>Communication:</b> did the creator successfully convey their message, story, or emotion to the viewer?</li>
<li><b>Artistic Value:</b> are the technical and artistic choices (from Level 2) high-quality and well-executed?</li>
<li><b>Impact:</b> does the image leave a lasting impression, provoke thought, or inspire action?</li>
<li><b>Comparison:</b> how does this image compare to similar works in its genre or style?</li>
</ul>
<p class="ex">Question: "Does the image successfully communicate its message?" Possible answer: Yes, because the contrast between green and gray effectively highlights the importance of protecting nature.</p>
</div>

<h4>Worked Example: "Migrant Mother"</h4>
<p><b class="k">Migrant Mother</b> is a photograph taken in <b class="k">1936</b> in <b>Nipomo, California</b>, by American photographer <b class="k">Dorothea Lange</b> during her time with the <b>Resettlement Administration</b>.</p>
<ol>
<li><b>Description:</b> a middle-aged woman sits in the center of the frame, looking slightly off-camera with a worried expression, hand raised to her chin. Two young children lean against her shoulders, faces hidden; an infant sits wrapped in a blanket in her lap. They appear to be inside a makeshift, open-air tent made of canvas or burlap. Clothing looks worn, soiled, and tattered; the mother's face shows deep lines.</li>
<li><b>Analysis:</b> tight, vertical <b>close-up framing</b>; the mother is the central focal point, framed symmetrically by her two children, creating a pyramid-like structure. It is a <b>black-and-white</b> photograph; lighting is natural but directional, highlighting texture. Shot at <b>eye-level</b>, creating an immediate, equal connection between subject and viewer.</li>
<li><b>Interpretation:</b> a story of extreme hardship, poverty, and survival; deep anxiety and exhaustion, yet a resilient posture. The children hiding their faces become universal symbols of suffering childhood; the mother represents a universal figure of maternal protection. Context: taken during the <b class="k">Great Depression</b> in California; migrant agricultural workers lost everything due to economic collapse and the <b>Dust Bowl</b>.</li>
<li><b>Judgment:</b> highly effective. By cropping out the clutter of the migrant camp and focusing on the family's emotional reality, Lange created a masterpiece of <b>documentary photography</b>. Impact: it humanized the tragedy of the Great Depression, prompting the government to send emergency food aid to the camp. A timeless icon of human resilience and suffering.</li>
</ol>
<p><b>Activity:</b> Given the image (a marble sculpture of a mother holding her dead son, Michelangelo's Pietà), describe, analyze, interpret and judge.</p>
<div class="tip"><b>Memory trick:</b> <b>D-A-I-J</b>: "<b>D</b>o <b>A</b>rtists <b>I</b>gnore <b>J</b>udges?" = Description → Analysis → Interpretation → Judgment. The questions climb: <b>What</b> is visible? → <b>How</b> is it made? → <b>What</b> does it mean? → <b>How effective</b> is it?</div>
<div class="trap"><b>Exam traps:</b> Description = <b>objective</b> only (no guessing meaning). Symbolism and Context are part of <b>Interpretation</b> (Level 3). Composition, lighting, lines, perspective are <b>Analysis</b> (Level 2). Judgment is not "I like it"; it evaluates <b>effectiveness</b>.</div>
`},

elements: {
  must: [
    "Elements Used in Reading Images: 1) Color, 2) Perspective, 3) Lighting, 4) Composition.",
    "Color creates emotional effects. Movie poster: Bright → happiness, fun; Dark → suspense, mystery.",
    "Perspective = the angle from which viewers see the subject.",
    "High-Angle View = looking down on an object → weakness, vulnerability (homeless person photographed from above may appear powerless).",
    "Low-Angle View = looking up at a subject → strength, authority (superhero posters).",
    "Lighting affects mood: Bright → happiness, safety; Dark → fear, mystery.",
    "Composition = the arrangement of visual elements. The subject positioned in the center typically becomes the focal point."
  ],
  html: `
<h4>Elements Used in Reading Images</h4>
<div class="tech">
<h5>1. Color</h5>
<p><b class="k">Color</b> creates <b>emotional effects</b>.</p>
<p class="ex">Example, movie poster: <b>Bright</b> → happiness, fun. <b>Dark</b> → suspense, mystery.</p>
</div>
<div class="tech">
<h5>2. Perspective</h5>
<p><b class="k">Perspective</b>: the angle from which viewers see the subject.</p>
<ul>
<li><b class="k">High-Angle View</b>: looking <b>down</b> on an object → <b>weakness, vulnerability</b>. Example: a homeless person photographed from above may appear powerless.</li>
<li><b class="k">Low-Angle View</b>: looking <b>up</b> at a subject → <b>strength, authority</b>. Example: superhero posters often use low-angle perspectives.</li>
</ul>
</div>
<div class="tech">
<h5>3. Lighting</h5>
<p><b class="k">Lighting</b> affects <b>mood</b>. <b>Bright</b> → happiness, safety. <b>Dark</b> → fear, mystery.</p>
</div>
<div class="tech">
<h5>4. Composition</h5>
<p><b class="k">Composition</b> is the arrangement of visual elements.</p>
<p class="ex">Example: the subject positioned in the <b>center</b> typically becomes the <b class="k">focal point</b>.</p>
</div>
<table class="tbl"><thead><tr><th>Element</th><th>Bright / Up</th><th>Dark / Down</th></tr></thead><tbody>
<tr><td>Color (movie poster)</td><td>Bright: happiness, fun</td><td>Dark: suspense, mystery</td></tr>
<tr><td>Lighting</td><td>Bright: happiness, safety</td><td>Dark: fear, mystery</td></tr>
<tr><td>Perspective</td><td>Low angle (looking up): strength, authority</td><td>High angle (looking down): weakness, vulnerability</td></tr>
</tbody></table>
<div class="tip"><b>Memory trick:</b> <b>C-P-L-C</b>: "<b>C</b>ool <b>P</b>eople <b>L</b>ove <b>C</b>ameras" = Color, Perspective, Lighting, Composition.</div>
<div class="tip"><b>Memory trick (angles):</b> The camera looks <b>DOWN</b> on you → you look <b>small</b> (weak). The camera looks <b>UP</b> at you → you look <b>tall</b> (strong, like a superhero).</div>
<div class="trap"><b>Exam trap:</b> Don't mix them up: <b>Color</b> bright = happiness, <b>fun</b>; <b>Lighting</b> bright = happiness, <b>safety</b>. Color dark = <b>suspense</b>, mystery; Lighting dark = <b>fear</b>, mystery.</div>
`},

symbol: {
  must: [
    "Symbolism = use of objects, colors, signs, people, or images to represent deeper meanings. A symbol stands for or suggests something beyond its literal meaning.",
    "Why artists use symbolism: 1) Express complex idea, 2) Communicate emotions, 3) Represent cultural beliefs, 4) Add deeper meaning.",
    "Complex idea: river/flowing water (passage of time, journey of life), maze (search for truth, self-discovery, navigating choices), broken clock (lost opportunity, artificial human-measured time).",
    "Emotions: wilting rose (grief, heartbreak, fading love), storm (turmoil, anger, anxiety, impending conflict), fire (passion and desire, destructive rage, chaos).",
    "Cultural beliefs: Lotus (purity, spiritual awakening, rebirth), Sampaguita (purity, simplicity, humility, honor), Yin-yang (dualism, balance, harmony of opposing forces).",
    "Deeper meaning: mirror (self-reflection, truth vs. illusion, dual identities), green light (unattainable dreams, hope, desire for the past), cage/birdcage (confinement, societal expectations, trapped spirit).",
    "Common symbols: Heart = love, Dove = peace, Rose = beauty or love, Skull = death or danger, Tree = growth and life, Light bulb = idea, Clock = time, Broken chain = freedom, Road = journey through life.",
    "Sunflowers (Van Gogh): life, joy, energy, nature. Guernica (Picasso): war, suffering, human tragedy. Ad: eagle = freedom, mountains = challenge, sunrise = new beginning."
  ],
  html: `
<h4>IV. Symbolism</h4>
<p class="def"><b class="k">Symbolism</b> is the use of objects, colors, signs, people, or images to represent <b>deeper meanings</b>. A <b class="k">symbol</b> is something that stands for or suggests something <b>beyond its literal meaning</b>.</p>
<h5>Why do artists use symbolism?</h5>
<ol>
<li>Express complex idea</li><li>Communicate emotions</li><li>Represent cultural beliefs</li><li>Add deeper meaning</li>
</ol>
<h5>Examples</h5>
<table class="tbl"><thead><tr><th>Purpose</th><th>Symbol</th><th>Meaning</th></tr></thead><tbody>
<tr><td rowspan="3">1. Express complex idea</td><td>A river or flowing water</td><td>Passage of time, journey of life</td></tr>
<tr><td>A maze</td><td>Complex human search for truth, self-discovery, navigating choices</td></tr>
<tr><td>A broken clock</td><td>Lost opportunity, artificial nature of human-measured time</td></tr>
<tr><td rowspan="3">2. Communicate emotions</td><td>A wilting rose</td><td>Grief, heartbreak, fading love</td></tr>
<tr><td>A storm</td><td>Turmoil, anger, anxiety, or impending conflict</td></tr>
<tr><td>A fire</td><td>Intense passion and desire, destructive rage, chaos</td></tr>
<tr><td rowspan="3">3. Represent cultural beliefs</td><td>The Lotus Flower</td><td>Purity, spiritual awakening, and rebirth</td></tr>
<tr><td>The Sampaguita</td><td>Purity, simplicity, humility, and honor</td></tr>
<tr><td>The Yin-yang</td><td>Dualism, balance, and the harmony of opposing forces</td></tr>
<tr><td rowspan="3">4. Add deeper meaning</td><td>A mirror</td><td>Self-reflection, truth vs. illusion, or dual identities</td></tr>
<tr><td>The green light</td><td>Unattainable dreams, hope, and the desire for the past</td></tr>
<tr><td>A cage or birdcage</td><td>Confinement, societal expectations, or trapped spirit</td></tr>
</tbody></table>

<h5>Common Symbols and Meanings</h5>
<table class="tbl"><thead><tr><th>Symbol</th><th>Meaning</th></tr></thead><tbody>
<tr><td>Heart</td><td>Love</td></tr><tr><td>Dove</td><td>Peace</td></tr><tr><td>Rose</td><td>Beauty or love</td></tr>
<tr><td>Skull</td><td>Death or danger</td></tr><tr><td>Tree</td><td>Growth and life</td></tr><tr><td>Light bulb</td><td>Idea</td></tr>
<tr><td>Clock</td><td>Time</td></tr><tr><td>Broken chain</td><td>Freedom</td></tr><tr><td>Road</td><td>Journey through life</td></tr>
</tbody></table>

<h5>Symbolism in Art: literal vs symbolic meaning</h5>
<table class="tbl"><thead><tr><th>Example</th><th>Literal meaning</th><th>Symbolic meaning</th></tr></thead><tbody>
<tr><td>1. Tree</td><td>A plant</td><td>Growth, life, development</td></tr>
<tr><td>2. Water</td><td>Liquid</td><td>Purity, change, rebirth</td></tr>
<tr><td>3. Butterfly</td><td>An insect</td><td>Transformation, hope, personal growth</td></tr>
</tbody></table>

<h5>Symbolism in Famous Artworks</h5>
<ul>
<li><b>Vincent van Gogh's "<span class="k">Sunflowers</span>"</b>: the flowers symbolize life, joy, energy, and nature.</li>
<li><b>Pablo Picasso's "<span class="k">Guernica</span>"</b>: symbols include broken forms, crying figures, and animals. These symbolize war, suffering, and human tragedy.</li>
</ul>
<h5>Symbolism in Advertising</h5>
<p>A sports advertisement shows an eagle, mountains, and a sunrise. Symbolic meanings: <b>Eagle: Freedom</b>; <b>Mountains: Challenge</b>; <b>Sunrise: New beginning</b>. Message: the product helps consumers reach their goals.</p>
<h5>Symbolism in Technology</h5>
<p>Examples of universal icons: 🏠 Home, 🔍 Search, 🛒 Shopping, ⚙️ Settings, 📧 Email.</p>
<div class="tip"><b>Memory trick (why symbolism):</b> <b>E-C-R-A</b>: "<b>E</b>very <b>C</b>reative <b>R</b>eveals <b>A</b>rt" = Express complex idea, Communicate emotions, Represent cultural beliefs, Add deeper meaning.</div>
<div class="tip"><b>Memory trick (sets of three):</b> Complex idea = <b>R-M-C</b> (River, Maze, Clock). Emotions = <b>R-S-F</b> (Rose wilting, Storm, Fire). Culture = <b>L-S-Y</b> (Lotus, Sampaguita, Yin-yang). Deeper = <b>M-G-C</b> (Mirror, Green light, Cage).</div>
<div class="trap"><b>Exam traps:</b> Lotus AND Sampaguita both mean <b>purity</b>; Lotus adds spiritual awakening and rebirth, Sampaguita adds simplicity, humility, honor. A <b>wilting</b> rose = grief; a plain rose = beauty or love. A <b>broken</b> clock = lost opportunity; a plain clock = time. A <b>broken chain</b> = freedom. Water (symbolism in art) = purity, change, rebirth.</div>
`},

context: {
  must: [
    "Meaning = the interpretation given to an image. Different viewers may understand the same image differently.",
    "Context = the situation, environment, culture, history, and purpose surrounding an image. Context influences interpretation.",
    "Types of context: 1) Cultural, 2) Historical, 3) Social, 4) Geographic.",
    "Cultural: white = weddings, purity (Western) vs mourning, funeral ceremonies (some Asian contexts). Same color, different meaning.",
    "Historical: face mask before COVID-19 = medical use; during COVID-19 = public health protection, pandemic awareness.",
    "Social: raised fist = protest, resistance, empowerment, solidarity. Geographic: umbrella = protection from rain (rainy country) or from sunlight (sunny country).",
    "Summary: Context (Background) + Symbolism (Visual/Textual clues) = Deeper Meaning.",
    "Context: understanding When and Where. Symbolism: decoding the Hidden Language. Meaning: synthesizing the Big Picture."
  ],
  html: `
<h4>V. Meaning and Context</h4>
<p class="def"><b>What is Meaning?</b> <b class="k">Meaning</b> refers to the <b>interpretation</b> given to an image. Different viewers may understand the same image differently.</p>
<p class="def"><b>What is Context?</b> <b class="k">Context</b> is the <b>situation, environment, culture, history, and purpose</b> surrounding an image. Context influences interpretation.</p>

<h4>Types of Context</h4>
<div class="tech">
<h5>1. <span class="k">Cultural Context</span></h5>
<p>Culture affects how people understand symbols.</p>
<p class="ex">Example, white color. Western context: weddings, purity. Some Asian contexts: mourning, funeral ceremonies. Same color. Different meaning.</p>
</div>
<div class="tech">
<h5>2. <span class="k">Historical Context</span></h5>
<p>Time period influences meaning.</p>
<p class="ex">Example, face mask. Before COVID-19: medical use. During COVID-19: public health protection, pandemic awareness.</p>
</div>
<div class="tech">
<h5>3. <span class="k">Social Context</span></h5>
<p>Social issues affect interpretation.</p>
<p class="ex">Example, raised fist symbol. Possible meanings: protest, resistance, empowerment, solidarity. Meaning depends on the social situation.</p>
</div>
<div class="tech">
<h5>4. <span class="k">Geographic Context</span></h5>
<p>Location influences meaning.</p>
<p class="ex">Example, an umbrella may symbolize: in a rainy country, protection from rain; in a sunny country, protection from sunlight.</p>
</div>

<h4>Summary</h4>
<p class="formula">Context (Background) + Symbolism (Visual/Textual clues) = <b class="k">Deeper Meaning</b></p>
<p>We study symbolism, context, and meaning (whether in art, literature, history, or daily communication) because human culture relies on layers of <b>implicit information</b>. Without these tools, we only see the <b>surface level</b> of what is being expressed.</p>
<ul>
<li><b>Context: Understanding <span class="k">When and Where</span></b> (prevents misinterpretation, reveals motivation).</li>
<li><b>Symbolism: Decoding the <span class="k">Hidden Language</span></b> (bypasses literal limitations, creates universal connections, encourages active engagement).</li>
<li><b>Meaning: Synthesizing the <span class="k">Big Picture</span></b> (connects the past to the present, develops critical thinking, builds empathy).</li>
</ul>
<h4>Activity (Considered as a Quiz)</h4>
<p>Given the following objects, select at least 4 and provide your own symbolic meaning and its context: a candle, an empty chair, a red rose, a prison cell, a key, a computer, a worn notebook, a ring, a jacket, a phone, a picture frame, a Christmas tree, an eagle, or any of your choice.</p>
<p class="ex">How to answer: name the object → give its symbolic meaning → state the context that gives it that meaning. Example: "A key symbolizes opportunity or freedom (social context: a graduate receiving the key to a new career)."</p>
<div class="tip"><b>Memory trick (types):</b> <b>C-H-S-G</b>: "<b>C</b>ats <b>H</b>ate <b>S</b>illy <b>G</b>ames" = Cultural, Historical, Social, Geographic. Match the example: <b>W</b>hite color = <b>W</b>orld cultures (Cultural); <b>Mask</b> = <b>COVID time</b> (Historical); <b>Fist</b> = <b>protest</b> (Social); <b>Umbrella</b> = <b>weather/place</b> (Geographic).</div>
<div class="tip"><b>Memory trick (summary):</b> Context = <b>When &amp; Where</b>; Symbolism = <b>Hidden Language</b>; Meaning = <b>Big Picture</b>. "<b>W</b>e <b>H</b>ear <b>B</b>ig" (When/Where, Hidden, Big).</div>
<div class="trap"><b>Exam trap:</b> Meaning is the <b>interpretation</b>; context is the <b>surrounding situation</b>. Context + Symbolism = <b>Deeper Meaning</b>. Note: on the slide this summary appears under the heading "IV. Symbolism".</div>
`}
};

/* Glossary / flashcard terms: term, definition, extra accepted spellings */
window.FACTS = [
  // intro
  ["intro","Digital art","Artistic works that are created, modified, presented, or distributed using digital technologies and computer systems."],
  ["intro","Traditional art","Art that uses physical media such as canvas, paint, charcoal, and clay."],
  ["intro","Physical media","Canvas, paint, charcoal, and clay: the materials used by traditional art."],
  ["intro","Graphic tablets","A digital art tool listed with computers, cameras, smartphones, AI, and specialized software.",["graphic tablet","graphics tablet","drawing tablet"]],
  ["intro","AI-Generated Art","An example of digital art produced with artificial intelligence.",["ai generated art","ai art"]],
  ["intro","3D Modeling","An example of digital art that builds three-dimensional models.",["3d modelling","three dimensional modeling"]],
  ["intro","Digital environments","Where today's artists may work entirely, using applications like Adobe Photoshop, Canva, Figma, Blender.",["digital environment"]],
  // photo
  ["photo","Digital photography","The process of capturing images using digital sensors rather than traditional photographic film; images are stored electronically and can be edited using software."],
  ["photo","Traditional photography","Photography that uses film, darkrooms, and chemical processing."],
  ["photo","Camera sensor","Component that captures light and converts it into digital information (e.g., CMOS, CCD).",["sensor"]],
  ["photo","CMOS and CCD","The two examples of camera sensors.",["cmos","ccd","cmos sensor","ccd sensor"]],
  ["photo","Resolution","The number of pixels in an image (e.g., 1920 × 1080 = 2,073,600 pixels)."],
  ["photo","JPEG","Joint Photographic Experts Group: small file size, lossy compression; ideal for digital photos, websites, social media images, email attachments.",["jpg","joint photographic experts group"]],
  ["photo","PNG","Portable Network Graphics: patent-free replacement for GIF; lossless compression; supports transparent backgrounds; ideal for graphics, logos, screenshots, web design.",["portable network graphics"]],
  ["photo","Lossy compression","Compression that reduces file size by removing some image data (used by JPEG).",["lossy"]],
  ["photo","Lossless compression","Compression where no image quality is lost when the file is saved (used by PNG).",["lossless"]],
  ["photo","GIF","The older image format that PNG was developed to replace."],
  // thirds
  ["thirds","Rule of Thirds","Principle of good photography that divides an image into nine sections; subjects should be placed near intersection points.",["rule of third"]],
  ["thirds","Power points","The four points where the rule-of-thirds lines intersect; also called points of interest.",["points of interest","power point"]],
  ["thirds","Eye Line Rule","The human eye naturally gravitates toward the upper-third line; place the subject's eyes along the top horizontal line.",["eyeline rule","eye-line rule"]],
  ["thirds","Dominant eye","The eye closest to the camera; align it on a top intersection point for a dynamic, off-center look."],
  ["thirds","Looking room","Rule: place an animal along the opposite vertical third line from where it looks, leaving negative space to \"look into\".",["looking space","looking room rule"]],
  ["thirds","Lead room","Breathing space in front of a walking or cycling subject so the action doesn't feel cut off by the frame's edge.",["lead space"]],
  ["thirds","Negative space","Open, empty space left in the direction a subject is looking or moving (also called white space in layout).",["white space"]],
  ["thirds","Grid overlay","Smartphone camera feature that displays the Rule of Thirds lines while taking photos.",["grid","gridlines","camera grid"]],
  // light
  ["light","Lighting","The use and control of light when taking a photograph; determines brightness, color, mood, texture, shape, and detail."],
  ["light","Photography (meaning)","Literally means \"drawing with light.\"",["drawing with light"]],
  ["light","Natural light","Light that comes from the sun (sunrise, daylight, sunset); free, realistic colors, good outdoors."],
  ["light","Artificial light","Light produced by man-made sources (flash, LED, studio lights, street lamps); better control, indoors or night, consistent."],
  ["light","Front lighting","Light positioned in front of the subject (Light → Subject → Camera); reduced shadows, good for identification photos.",["front light"]],
  ["light","Side lighting","Light from the side at a 90-degree angle; enhances texture, depth, dramatic shadows; also called split or hatchet lighting.",["side light","split lighting","hatchet lighting"]],
  ["light","Backlighting","Light source behind the subject (Camera → Subject → Light); produces silhouettes and highlights outlines.",["back lighting","backlight"]],
  ["light","Top lighting","Light from above; creates shadows below facial features; common during midday sunlight.",["top light"]],
  ["light","Catchlights","Bright reflections of light in the subject's pupils that add life to the eyes.",["catchlight"]],
  ["light","Silhouette","A crisp, dark shape of the subject produced when exposing for a bright background (backlighting).",["silhouettes"]],
  ["light","Rim lighting","The \"halo effect\" in backlighting: a glow that traces the subject's hair and shoulders.",["rim light","halo effect"]],
  ["light","Raccoon eyes","Top-lighting effect where the brow bone casts deep shadows into the eye sockets.",["raccoon eyes effect"]],
  ["light","Lens flare","Warm circles of light when light bleeds into the lens; adds a romantic, ethereal, or nostalgic mood.",["lens flares"]],
  ["light","Film noir","Moody, brooding, cinematic aesthetic created by side lighting.",["noir"]],
  // hours
  ["hours","Golden hour","Brief period shortly after sunrise or right before sunset when the sun is very low; soft, warm, diffused light.",["magic hour"]],
  ["hours","Magic hour","Another name for golden hour.",["golden hour"]],
  ["hours","Blue hour","Twilight window roughly 20 to 40 minutes after sunset (or just before sunrise), sun 4 to 6 degrees below the horizon; cool blues, indigos, violets."],
  ["hours","Warm-Cold Color Contrast","Blue hour effect: warm artificial lights (streetlamps, headlights) against the deep blue sky.",["warm cold color contrast"]],
  ["hours","Long exposures","Blue hour makes cameras use longer shutter speeds, turning traffic into light trails and water into mist.",["long exposure"]],
  // hardsoft
  ["hardsoft","Hard light","Light from a source physically small relative to the subject; razor-sharp shadow edges, high contrast."],
  ["hardsoft","Soft light","Light from a source physically large relative to the subject; smooth, gradual transitions that \"wrap\" the subject."],
  ["hardsoft","Penumbra","The transition zone between light and shadow; incredibly narrow in hard light.",["transition zone"]],
  ["hardsoft","Gobo","Object placed in front of a hard light source to cast a shadow pattern (window blinds, tropical leaves).",["gobo and shadow patterns","gobos"]],
  ["hardsoft","Roll-off","The highlight-to-shadow transition: abrupt with hard light, a smooth gray gradient with soft light.",["roll off","rolloff"]],
  ["hardsoft","Gray Zone","Soft light's broad gradient zone between the brightest highlight and the darkest shadow.",["grey zone","wide gray zone"]],
  // mood
  ["mood","Reflectors","Used to reflect light onto the subject to reduce harsh shadows.",["reflector"]],
  ["mood","ISO, Aperture, Shutter Speed","The camera settings used to control exposure.",["exposure settings"]],
  ["mood","Colored lighting","Lighting style that creates a creative, modern mood.",["colored light"]],
  // visarts
  ["visarts","Reading Visual Arts","The process of observing, analyzing, interpreting, and understanding visual images and artworks.",["reading visual art"]],
  ["visarts","Virtual literacy","(Visual literacy) Helps us understand media messages, appreciate artistic expression, recognize persuasive techniques, develop critical thinking, interpret cultural and social meanings.",["visual literacy"]],
  // viscom
  ["viscom","Visual communication","The use of visual elements to convey information, ideas, emotions, or messages; transmitting messages through images rather than words alone."],
  ["viscom","Images (component)","Photographs, illustrations, paintings, and digital graphics.",["images"]],
  ["viscom","Colors (component)","Component of visual communication that communicates emotions and meanings.",["colors","color"]],
  // typo
  ["typo","Typography","The style and appearance of text."],
  ["typo","Serif","Typeface (Times New Roman, Garamond) meaning tradition, authority, reliability, academic or legal formality.",["serif font","serif fonts"]],
  ["typo","Sans-Serif","Typeface (Helvetica, Arial, Inter) meaning modernity, cleanliness, neutrality, progress, directness.",["sans serif"]],
  ["typo","Slab Serif","Typeface (Rockwell, Courier) meaning boldness, strength, industrial weight, confidence.",["slab-serif"]],
  ["typo","Script / Handwritten","Typeface (Pacifico, Brush Script) meaning elegance, romance, creativity, personal touch, informality.",["script","handwritten"]],
  ["typo","Display / Decorative","Typeface (Impact, Stencil) meaning loud personality, drama, thematic identity, immediate impact.",["display","decorative"]],
  ["typo","Tracking and Kerning","Letter spacing: wide = luxury/spaciousness; tight = tension/urgency/density.",["tracking","kerning"]],
  ["typo","Layout and Composition","The arrangement of elements in a visual design.",["layout","composition"]],
  ["typo","Hierarchy","Layout principle that tells the viewer where to look first, second, and last."],
  ["typo","Proximity","Layout principle that groups related elements closer together to show a connection."],
  ["typo","Contrast","Layout principle using opposites (dark vs light, massive vs tiny) to create tension or a focal point."],
  ["typo","White Space","Open or empty areas around and between elements (Negative Space); generous = calm, luxury, clarity.",["negative space","whitespace"]],
  ["typo","Alignment","Layout principle that anchors elements to an invisible grid or line to create order and stability."],
  ["typo","Balance","Layout principle that distributes visual weight; symmetrical = stability, asymmetrical = dynamism.",["visual balance"]],
  // levels
  ["levels","Reading an image","Observing and interpreting visual information."],
  ["levels","Description","Level 1 of reading images: describe what is visible (objective observations)."],
  ["levels","Analysis","Level 2 of reading images: examine artistic elements (how is it made?)."],
  ["levels","Interpretation","Level 3 of reading images: determine meaning (what does it mean?)."],
  ["levels","Judgment","Level 4 of reading images: evaluate effectiveness (how effective is it?).",["judgement"]],
  ["levels","Migrant Mother","1936 photograph by Dorothea Lange in Nipomo, California, during the Great Depression."],
  ["levels","Dorothea Lange","American photographer of \"Migrant Mother\" (Resettlement Administration)."],
  // elements
  ["elements","Perspective","The angle from which viewers see the subject."],
  ["elements","High-Angle View","Looking down on an object; shows weakness, vulnerability.",["high angle","high angle view"]],
  ["elements","Low-Angle View","Looking up at a subject; shows strength, authority (superhero posters).",["low angle","low angle view"]],
  ["elements","Focal point","What the subject positioned in the center typically becomes.",["focal"]],
  // symbol
  ["symbol","Symbolism","The use of objects, colors, signs, people, or images to represent deeper meanings."],
  ["symbol","Symbol","Something that stands for or suggests something beyond its literal meaning."],
  ["symbol","Lotus Flower","Cultural symbol of purity, spiritual awakening, and rebirth.",["lotus"]],
  ["symbol","Sampaguita","Cultural symbol of purity, simplicity, humility, and honor."],
  ["symbol","Yin-yang","Cultural symbol of dualism, balance, and the harmony of opposing forces.",["yin yang"]],
  ["symbol","Green light","Symbol of unattainable dreams, hope, and the desire for the past."],
  ["symbol","Broken chain","Common symbol meaning freedom."],
  ["symbol","Guernica","Picasso artwork whose broken forms, crying figures, and animals symbolize war, suffering, human tragedy."],
  ["symbol","Sunflowers","Van Gogh artwork whose flowers symbolize life, joy, energy, and nature."],
  // context
  ["context","Meaning","The interpretation given to an image; different viewers may understand the same image differently."],
  ["context","Context","The situation, environment, culture, history, and purpose surrounding an image; it influences interpretation."],
  ["context","Cultural context","Culture affects how people understand symbols (white: weddings vs mourning).",["cultural"]],
  ["context","Historical context","Time period influences meaning (face mask before vs during COVID-19).",["historical"]],
  ["context","Social context","Social issues affect interpretation (raised fist: protest, resistance, empowerment, solidarity).",["social"]],
  ["context","Geographic context","Location influences meaning (umbrella: protection from rain vs sunlight).",["geographic","geographical context"]],
  ["context","Deeper Meaning","Context (Background) + Symbolism (Visual/Textual clues) = ?"]
];
