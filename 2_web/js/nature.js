const galleries = {
    desert: [
      { src: 'images/nature/nature3.jpg', caption: 'Sunlight peeking through' },
      { src: 'images/nature/nature4.jpg', caption: 'Closeup in Antelope Canyon' },
      { src: 'images/nature/nature5.jpg', caption: 'Sunset lit rock over Horseshoe Bend' },
      { src: 'images/nature/nature6.jpg', caption: 'Monument Valley' },
    ],
    ocean: [
      { src: 'images/nature/nature1.jpg', caption: 'The Atlantic encountering the north of Spain' },
      { src: 'images/nature/nature14.jpg', caption: 'The rugged coast near Bilbao' },
      { src: 'images/nature/nature2.jpg', caption: 'Mediterranean Sea in Greece' },
      { src: 'images/nature/nature15.jpg', caption: 'Lac Leman' },
    ],
    sunset_sunrise: [
      { src: 'images/nature/nature7.jpg', caption: 'Sunrise over the ocean' },
      { src: 'images/nature/nature8.jpg', caption: 'Through the waves' },
      { src: 'images/nature/nature9.jpg', caption: 'Graduation ahh colors' },
    ],
    waterfalls: [
      { src: 'images/nature/nature10.jpg', caption: 'A lush waterfall in Oregon, USA' },
    ],
    clouds: [
      { src: 'images/nature/nature13.jpg', caption: 'Amazing textures and colors in the sunset over Lausanne' },
      { src: 'images/nature/nature11.jpg', caption: 'A wispy rain cloud bathed in the soft glow of the sun' },
      { src: 'images/nature/nature12.jpg', caption: 'Thought this cloud at sunrise looked like the shape of a fish or a dragon' },
    ],
  };
  
var lightbox = document.getElementById('lightbox');
var lightboxContent = document.querySelector('.lightbox-content');
var lightboxImg = document.getElementById('lightbox-img');
var lightboxCaption = document.getElementById('lightbox-caption');
var closeBtn = document.querySelector('.close');
var prevBtn = document.querySelector('.prev');
var nextBtn = document.querySelector('.next');
  
let currentGallery = [];
let currentIndex = 0;
  
// Open gallery
document.querySelectorAll('.photo').forEach(photo => {
    photo.addEventListener('click', () => {
      const galleryName = photo.getAttribute('data-gallery');
      currentGallery = galleries[galleryName];
      currentIndex = 0;
      showImage();
      lightbox.style.display = 'flex';
    });
});
  
// Show image with fade
function showImage() {
    const item = currentGallery[currentIndex];
    lightboxImg.style.opacity = 0;
    setTimeout(() => {
      lightboxImg.src = item.src;
      lightboxCaption.textContent = item.caption || '';
      lightboxImg.style.opacity = 1;
    }, 150); // fade transition
}
  
// Navigation to the right
nextBtn.onclick = () => {
    currentIndex = (currentIndex + 1) % currentGallery.length;
    showImage();
};

// Navigation to the left
prevBtn.onclick = () => {
    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    showImage();
};
  
// Close on X
closeBtn.onclick = () => {
    lightbox.style.display = 'none';
};
  
// Close when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (!lightboxContent.contains(e.target)) { // if the target (click) isn't contained in lightboxContent
      lightbox.style.display = 'none'; // lightbox is hidden again
    }
});


// Navigating the gallery with arrow keys
document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') { // only when lightbox is open
      if (e.key === 'ArrowRight') { // if the 'ArrowRight' key is hit
        currentIndex = (currentIndex + 1) % currentGallery.length; // moves one image to the right
        showImage();
      } else if (e.key === 'ArrowLeft') {
        currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
        showImage();
      } else if (e.key === 'Escape') {
        lightbox.style.display = 'none';
      }
    }
});


// changing between languages
const enLink = document.getElementById('lang-en');
const frLink = document.getElementById('lang-fr');
let currentLang = 'en';

function setLang(lang) {
  if (lang === currentLang) return; // do nothing if language already selected

  currentLang = lang;  // updates language

  if (lang === 'en') { // adds active class to EN (bold black text), FR loses it
    enLink.classList.add('active');
    frLink.classList.remove('active');
  } else { // if FR selected, EN loses it
    frLink.classList.add('active');
    enLink.classList.remove('active');
  }

  // update all text elements
  document.querySelectorAll('[data-en]').forEach(el => { // querySelectorAll grabs all elements with data-en attribute, forEach loops through each element
    el.textContent = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-fr'); // el.textContent sets the visible text of the element
    // if lang === 'en', use text from the 'data-en' attribute, otherwise use 'data-fr'
  });
}

// listen for clicks on the EN/FR buttons
enLink.addEventListener('click', () => setLang('en'));
frLink.addEventListener('click', () => setLang('fr'));