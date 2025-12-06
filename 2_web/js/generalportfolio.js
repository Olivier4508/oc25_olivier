// ---------------------------
// LANGUAGE TOGGLE (UNCHANGED)
// ---------------------------
const enLink = document.getElementById('lang-en');
const frLink = document.getElementById('lang-fr');
let currentLang = 'en';

function setLang(lang) {
  if (lang === currentLang) return;
  currentLang = lang;

  if (lang === 'en') {
    enLink.classList.add('active');
    frLink.classList.remove('active');
  } else {
    frLink.classList.add('active');
    enLink.classList.remove('active');
  }

  document.querySelectorAll('[data-en]').forEach(el => {
    el.textContent = (lang === 'en') ? el.dataset.en : el.dataset.fr;
  });
}

if (enLink) enLink.addEventListener('click', () => setLang('en'));
if (frLink) frLink.addEventListener('click', () => setLang('fr'));


// ---------------------------
// CANVAS SCROLLING ANIMATION
// ---------------------------

(function () {
  const canvas = document.getElementById("scrollCanvas");
  if (!canvas) return; // no canvas on this page

  const ctx = canvas.getContext("2d");
  const DPR = window.devicePixelRatio || 1; // gets the DPR, if none default to 1

  // --- EDIT IMAGE PATHS HERE ---
  const themes = {
    "astro": 8,        // astro1.jpg → astro8.jpg
    "avions": 43,      // avions1.jpg → avions43.jpg
    "misc": 12,
    "montagnes": 24,
    "voyages": 29,
    "nature": 16
  };

  const imagePaths = []; // array of all image paths

  // loop over each theme
  for (const [theme, count] of Object.entries(themes)) {
    for (let i = 1; i <= count; i++) {
      imagePaths.push("images/" + theme + "/" + theme + i + ".jpg");
    }
  }

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const swap = arr[i];
      arr[i] = arr[j];
      arr[j] = swap;
    }
    return arr;
  }

  shuffleArray(imagePaths);

  const images = [];        // Image objects
  let loadedCount = 0;      // how many images finished loading (or errored)
  let scaledWidths = [];    // computed widths for each image when drawn at canvas height (CSS px)
  let fullWidth = 0;        // total width of one image strip (CSS px)
  let cssW = 0, cssH = 0;   // canvas size in CSS pixels

  // animation state
  let scrollX = 0;          // current left offset (CSS px)
  let paused = false;       // hover pause
  let speed = 0.8;          // pixels per frame (positive → scroll left)
  const MIN_SPEED = 0.1;

  // preload images and start when done
  imagePaths.forEach((src, idx) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      loadedCount++;
      if (loadedCount === imagePaths.length) {
        // all loaded successfully
        setupAndStart();  // line 205
      }
    };
    img.onerror = () => {
      console.warn("Canvas image failed to load:", src);
      loadedCount++;
      if (loadedCount === imagePaths.length) {
        // proceed even if some failed
        setupAndStart();
      }
    };
    images.push(img);
  });

  // Resize helper: set canvas internal pixel buffer to match CSS size * DPR
  function resizeCanvas() {
    // CSS pixel size
    const newCssW = Math.max(1, canvas.clientWidth); // min 1 px
    const newCssH = Math.max(1, canvas.clientHeight);

    cssW = newCssW;
    cssH = newCssH;

    // set internal pixel size for sharpness on HiDPI displays
    canvas.width = Math.max(1, Math.round(cssW * DPR)); // sets max pixel width to cssW * DPR
    canvas.height = Math.max(1, Math.round(cssH * DPR));

    // map drawing coordinates so we can work in CSS pixels
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);  // Sets the canvas transform so that next drawing coordinates are like CSS pixels.
    // setTransform(DPR, 0, 0, DPR, 0, 0) scales the drawing by DPR so one unit in canvas drawing space equals one CSS pixel, preventing the need to multiply coordinates by DPR manually.

    // recompute scaled widths for each loaded image (width when height = cssH)
    scaledWidths = images.map(img => {
      if (!img || !img.width || !img.height) return 0; // || means or
      return img.width * (cssH / img.height);
    });

    // compute complete strip width (sum of scaled widths)
    fullWidth = scaledWidths.reduce((acc, w) => acc + w, 0);

    // safety fallback
    if (fullWidth === 0) fullWidth = cssW * Math.max(1, images.length * 0.5); // if width = 0 (eg no images loaded), set fallback width

    // if scrollX is too negative relative to new fullWidth, wrap it
    if (-scrollX >= fullWidth) scrollX = scrollX % fullWidth; // If scrollX has drifted far enough that we've scrolled past one full strip (after a resize),
    //  wrap it with modulus to keep it within one strip's length.
  }

  // Draw one image scaled to the canvas height, at x (CSS px)
  // returns the actual width drawn (CSS px)
  function drawImageScaledToHeight(img, x) {
    if (!img || !img.width || !img.height) return 0;

    const drawH = cssH;
    const scale = drawH / img.height;
    const drawW = img.width * scale;

    // vertical offset (center vertically if needed)
    const offsetY = 0; // drawH === cssH, so normally 0

    ctx.drawImage(img, x, offsetY, drawW, drawH); // Draws the image at (x, offsetY) with dimensions (drawW, drawH)
    return drawW; // returns the actual width drawn (to advance x for the next image)
  }

  // Main animation loop
  function startAnimation() {
    if (images.length === 0) return;

    let rafId = null;
    function loop() {
      // clear the visible CSS pixel area
      ctx.clearRect(0, 0, cssW, cssH);

      // start drawing at scrollX
      let x = scrollX;

      // draw each image in sequence
      for (let i = 0; i < images.length; i++) {
        const wDraw = drawImageScaledToHeight(images[i], x);
        x += wDraw;
      }

      // draw a duplicate sequence right after for seamless loop
      for (let i = 0; i < images.length; i++) {
        const wDraw = drawImageScaledToHeight(images[i], x);
        x += wDraw;
      }

      // advance scroll (unless paused)
      if (!paused) {
        scrollX -= speed;
      }

      // wrap when we scrolled past one full strip
      if (-scrollX >= fullWidth) scrollX += fullWidth;

      rafId = requestAnimationFrame(loop);
    }

    // start loop
    if (!rafId) rafId = requestAnimationFrame(loop);
  }

  // Called once when images are loaded
  function setupAndStart() {
    // initial sizing
    resizeCanvas();
    // start animation loop
    startAnimation();
  }

  // handle window resize (debounced)
  let resizeTimer = null; // avoids excessive recomputation during continuous resizing
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resizeCanvas();
    }, 80);
  });

  // Pause on hover
  canvas.addEventListener("click", () => {
    paused = !paused;
  });

  // Ensure initial canvas sizing even if images already cached/loaded earlier.
  // If images finished loading before this script ran, we still want to start.
  // If all images already loaded when script ran, trigger setup now.
  if (loadedCount === imagePaths.length && images.length > 0) {
    setupAndStart();
  }
})();
