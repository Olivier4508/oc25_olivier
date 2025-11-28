const galleries = {
    télésièges: [
      { src: 'images/montagnes/montagnes11.jpg', caption: 'Télésiège sous les étoiles' },
      { src: 'images/montagnes/montagnes5.jpg', caption: 'Télésièges aux Portes du Soleil' },
      { src: 'images/montagnes/montagnes4.jpg', caption: 'Télésièges aux Portes du Soleil' },
      { src: 'images/montagnes/montagnes7.jpg', caption: '' },
    ],
    forets: [
      { src: 'images/montagnes/montagnes1.jpg', caption: 'Belle lumière sur ces arbres aux Crosets' },
      { src: 'images/montagnes/montagnes6.jpg', caption: '' },
      { src: 'images/montagnes/montagnes3.jpg', caption: '' },
    ],
    montagnes: [
      { src: 'images/montagnes/montagnes2.jpg', caption: 'La Lune à Arolla' },
      { src: 'images/montagnes/montagnes10.jpg', caption: 'Nuit aux Arcs' },
      { src: 'images/montagnes/montagnes8.jpg', caption: 'Le Mont-Blanc' },
      { src: 'images/montagnes/montagnes14.jpg', caption: '' },
      { src: 'images/montagnes/montagnes15.jpg', caption: 'Lac Bleu à Arolla' },
      { src: 'images/montagnes/montagnes16.jpg', caption: '' },
      { src: 'images/montagnes/montagnes17.jpg', caption: 'La Cabane des Vignettes perchée sur son sommet' },
      { src: 'images/montagnes/montagnes20.jpg', caption: '' },
      { src: 'images/montagnes/montagnes21.jpg', caption: '' },
    ],
    glaciers: [
      { src: 'images/montagnes/montagnes23.jpg', caption: '' },
      { src: 'images/montagnes/montagnes22.jpg', caption: '' },
      { src: 'images/montagnes/montagnes18.jpg', caption: '' },
      { src: 'images/montagnes/montagnes19.jpg', caption: '' },
    ],
    téléfériques: [
      { src: 'images/montagnes/montagnes12.jpg', caption: 'Télécabines en fin de journée' },
      { src: 'images/montagnes/montagnes9.jpg', caption: "Téléférique de l'Aiguille Rouge" },
      { src: 'images/montagnes/montagnes13.jpg', caption: 'Double' },
    ]
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