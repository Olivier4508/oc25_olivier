const galleries = {
    desert: [
      { src: 'images/nature/nature3.JPG', caption: 'Sunlight peeking through' },
      { src: 'images/nature/nature4.JPG', caption: 'Closeup in Antelope Canyon' },
      { src: 'images/nature/nature5.JPG', caption: 'Sunset lit rock' },
      { src: 'images/nature/nature6.JPG', caption: 'Monument Valley' },
    ],
    ocean: [
      { src: 'images/nature/nature1.jpg', caption: 'The Atlantic encountering the north of Spain' },
      { src: 'images/nature/nature2.jpg', caption: 'Mediterranean Sea in Greece' },
    ],
    sunset_sunrise: [
      { src: 'images/nature/nature7.jpg', caption: 'Sunrise over the ocean' },
      { src: 'images/nature/nature8.jpg', caption: 'Through the waves' },
      { src: 'images/nature/nature9.jpg', caption: 'Graduation ahh colors' },
    ],
    waterfalls: [
      { src: 'images/nature/nature10.jpg', caption: '' },
    ],
    clouds: [
      { src: 'images/nature/nature13.jpg', caption: '' },
      { src: 'images/nature/nature11.jpg', caption: '' },
      { src: 'images/nature/nature12.jpg', caption: '' },
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