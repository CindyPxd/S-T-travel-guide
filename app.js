/* ============================================================
   Medtronic Science and Technology Conference 2026 - JS
   Interactive filtering, star generator, converter, map tabs
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Generate Starfield Background in Hero
  (function generateStars() {
    const starContainer = document.getElementById('hero-stars');
    if (!starContainer) return;

    const starCount = 80;
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      
      const size = Math.random() * 2 + 1; // 1px to 3px
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const delay = Math.random() * 4;
      const duration = Math.random() * 3 + 2;

      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${posX}%`;
      star.style.top = `${posY}%`;
      star.style.setProperty('--delay', `${delay}s`);
      star.style.setProperty('--duration', `${duration}s`);

      starContainer.appendChild(star);
    }
  })();

  // 2. Timeline Category Filtering
  (function initFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const timelineItems = document.querySelectorAll('.tl-item');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Toggle Active Class
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        timelineItems.forEach(item => {
          const cards = item.querySelectorAll('.card');
          let visibleCardCount = 0;

          cards.forEach(card => {
            const cardCat = card.getAttribute('data-category') || '';
            if (filterValue === 'all' || cardCat.includes(filterValue)) {
              card.style.display = '';
              visibleCardCount++;
            } else {
              card.style.display = 'none';
            }
          });

          if (visibleCardCount > 0) {
            item.classList.remove('hidden');
            item.style.display = '';
          } else {
            item.classList.add('hidden');
            item.style.display = 'none';
          }
        });
      });
    });
  })();

  // 3. Smooth Navbar Link Highlight
  const navLinks = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(sec => {
      const sectionTop = sec.offsetTop;
      if (pageYOffset >= sectionTop - 150) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // 4. Currency Converter Logic
  (function initConverter() {
    const usdInput = document.getElementById('usd-input');
    const cnyInput = document.getElementById('cny-input');
    const rateInput = document.getElementById('rate-input');
    const presetBtns = document.querySelectorAll('.qp-btn');

    if (!usdInput || !cnyInput || !rateInput) return;

    function getRate() {
      return parseFloat(rateInput.value) || 7.15;
    }

    function convertUsdToCny() {
      const usd = parseFloat(usdInput.value);
      if (isNaN(usd)) {
        cnyInput.value = '';
        return;
      }
      cnyInput.value = (usd * getRate()).toFixed(2);
    }

    function convertCnyToUsd() {
      const cny = parseFloat(cnyInput.value);
      if (isNaN(cny)) {
        usdInput.value = '';
        return;
      }
      usdInput.value = (cny / getRate()).toFixed(2);
    }

    usdInput.addEventListener('input', convertUsdToCny);
    cnyInput.addEventListener('input', convertCnyToUsd);
    rateInput.addEventListener('input', convertUsdToCny);

    presetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.getAttribute('data-usd');
        usdInput.value = val;
        convertUsdToCny();
      });
    });
  })();

  // 5. Map Source Switcher
  (function initMapTabs() {
    const mapTabBtns = document.querySelectorAll('.map-tab-btn');
    const iframeOsm = document.getElementById('iframe-osm');
    const iframeGmap = document.getElementById('iframe-gmap');

    if (!mapTabBtns.length || !iframeOsm || !iframeGmap) return;

    mapTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        mapTabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const source = btn.getAttribute('data-map');
        if (source === 'gmap') {
          iframeOsm.style.display = 'none';
          iframeGmap.style.display = 'block';
        } else {
          iframeOsm.style.display = 'block';
          iframeGmap.style.display = 'none';
        }
      });
    });
  })();

});
