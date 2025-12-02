const galleries = {
    china: [
      { src: 'images/voyages/voyages5.jpg', caption: 'Oriental Pearl Tower in Shanghai' },
      { src: 'images/voyages/voyages4.jpg', caption: 'Shanghai Tower' },
      { src: 'images/voyages/voyages9.jpg', caption: 'Jin Mao Tower' },
      { src: 'images/voyages/voyages8.jpg', caption: 'Shimao International Plaza' },
      { src: 'images/voyages/voyages2.jpg', caption: '' },
      { src: 'images/voyages/voyages3.jpg', caption: 'Golden Buddha' },
      { src: 'images/voyages/voyages6.jpg', caption: 'The Great Wall' },
      { src: 'images/hero.jpg', caption: 'The Bund' },
      { src: 'images/voyages/voyages7.jpg', caption: '' },
      { src: 'images/voyages/voyages10.jpg', caption: 'Nanpu Bridge' },
    ],
    sttropez: [
      { src: 'images/voyages/voyages1.jpg', caption: 'Le Port de St-Tropez' },
      { src: 'images/voyages/voyages14.jpg', caption: 'Warm ambiance on this small fishing boat' },
      { src: 'images/voyages/voyages15.jpg', caption: 'Christmas lighting' },
      { src: 'images/voyages/voyages13.jpg', caption: '' },
      { src: 'images/voyages/voyages12.jpg', caption: '' },
      { src: 'images/voyages/voyages11.jpg', caption: 'One of the many yachts' },
    ],
    sanfrancisco: [
      { src: 'images/voyages/voyages18.jpg', caption: 'Golden Gate Bridge' },
      { src: 'images/voyages/voyages23.jpg', caption: 'Sutro Tower' },
      { src: 'images/voyages/voyages16.jpg', caption: 'Bottom of the Palace of Fine Arts' },
      { src: 'images/voyages/voyages17.jpg', caption: '' },
      { src: 'images/voyages/voyages19.jpg', caption: '' },
      { src: 'images/voyages/voyages20.jpg', caption: '' },
      { src: 'images/voyages/voyages21.jpg', caption: 'Salesforce building in the back' },
      { src: 'images/voyages/voyages22.jpg', caption: '' },
    ],
    northernspain: [
      { src: 'images/voyages/voyages28.jpg', caption: "Jeff Koon's 'Puppy', guarding the Guggenheim Museum in Bilbao" },
      { src: 'images/voyages/voyages24.jpg', caption: 'Bilbao buildings' },
      { src: 'images/voyages/voyages25.jpg', caption: 'Puente de la Salve' },
      { src: 'images/voyages/voyages26.jpg', caption: 'Sunset hitting a church in Vigo' },
      { src: 'images/voyages/voyages27.jpg', caption: 'Zubizuri Bridge' },
      { src: 'images/voyages/voyages29.jpg', caption: 'Warm atmosphere in Vigo' },
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