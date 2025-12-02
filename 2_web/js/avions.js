const galleries = {
    governmental: [
      { src: 'images/avions/avions23.jpg', caption: 'Face to face with the UAE Presidential Jet' },
      { src: 'images/avions/avions24.jpg', caption: 'AF2 with Kamala Harris arriving in ZRH in 2024 for Burgenstock' },
    ],
    gradients: [
      { src: 'images/avions/avions17.jpg', caption: 'Fluffy UA767 banking in ZRH' },
      { src: 'images/avions/avions19.jpg', caption: 'Korean 777 roaring out of SFO' },
    ],
    snow: [
        { src: 'images/avions/avions8.jpg', caption: 'Air Canada A330 with a snowy Jura' },
        { src: 'images/avions/avions5.jpg', caption: 'Swiss A330 arriving in front of a snowy Jura' },
        { src: 'images/avions/avions26.jpg', caption: 'UA767 departing' },
        { src: 'images/avions/avions27.jpg', caption: 'AC330 Star Alliance roaring out of GVA' },
        { src: 'images/avions/avions7.jpg', caption: 'KLM with the same snowy Jura backdrop' },
        { src: 'images/avions/avions21.jpg', caption: 'Heli in its natural habitat' },
        { src: 'images/avions/avions22.jpg', caption: 'Crazy downwash' },
    ],
    nightshots: [
      { src: 'images/avions/avions11.jpg', caption: 'Swiss A220 pushback' },
      { src: 'images/avions/avions12.jpg', caption: 'Iberia taxiing in' },
      { src: 'images/avions/avions13.jpg', caption: 'Vueling A320 starting her journey back to BCN' },
    ],
    military: [
      { src: 'images/avions/avions10.jpg', caption: 'USAF F15 on static display at the 2025 Paris Airshow' },
      { src: 'images/avions/avions18.jpg', caption: 'Swiss Air Force general arriving in his Eurocopter for the Bex Airshow' },
    ],
    swiss350: [
      { src: 'images/avions/avions29.jpg', caption: 'The first Swiss A350-900, named Lausanne' },
      { src: 'images/avions/avions28.jpg', caption: 'Close-up of this beauty' },
      { src: 'images/avions/avions30.jpg', caption: '' },
    ],
    goldenhour: [
      { src: 'images/avions/avions1.jpg', caption: 'Etihad 787 gliding into GVA with some gorgeous sunrise lighting' },
      { src: 'images/avions/avions6.jpg', caption: 'On the tarmac at sunset in ZRH with this Ethiopian A350' }
    ],
    vertical: [
      { src: 'images/avions/avions4.jpg', caption: 'Face to face with this Air Baltic A220 in ZRH' },
      { src: 'images/avions/avions9.jpg', caption: 'Swiss A220' },
      { src: 'images/avions/avions20.jpg', caption: 'UA 787 with the SAF livery landing with the San Francisco skyline' },
      { src: 'images/avions/avions3.jpg', caption: 'Underbelly of an Edelweiss A340' },
      { src: 'images/avions/avions37.jpg', caption: 'Some arrivals in Heraklion' },
      { src: 'images/avions/avions38.jpg', caption: '' },
      { src: 'images/avions/avions39.jpg', caption: '' },
      { src: 'images/avions/avions40.jpg', caption: '' },
      { src: 'images/avions/avions41.jpg', caption: '' },
      { src: 'images/avions/avions42.jpg', caption: '' },
    ],
    window: [
      { src: 'images/avions/avions36.jpg', caption: 'Nice sunrise colors framing this A220 winglet' },
      { src: 'images/avions/avions32.jpg', caption: "Air France's beautiful A220 wing" },
      { src: 'images/avions/avions31.jpg', caption: '' },
      { src: 'images/avions/avions33.jpg', caption: 'Auroras on flight EI60' },
      { src: 'images/avions/avions34.jpg', caption: 'EI60' },
      { src: 'images/avions/avions35.jpg', caption: 'Getting close to space on a Swiss 777-300ER SFO-ZRH' },
    ],
    condensation: [
      { src: 'images/avions/avions25.jpg', caption: 'Bit of fluff on the 🐐 United livery' },
      { src: 'images/avions/avions16.jpg', caption: 'Nice condensation on this Aegean A321neo' },
      { src: 'images/avions/avions15.jpg', caption: 'The first Aer Lingus A321XLR, registered EI-XLR' },
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