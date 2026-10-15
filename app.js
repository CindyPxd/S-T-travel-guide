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

  // 5. Interactive Multi-Point Routes & Map Module
  (function initInteractiveRoutesMap() {
    const LOCATIONS = {
      'A': {
        id: 'A',
        name: 'MSP 国际机场 (Terminal 1)',
        nameEn: 'Minneapolis-St. Paul Int Airport (MSP)',
        address: '4300 Glumack Dr, St Paul, MN 55111',
        lat: 44.8848,
        lng: -93.2223,
        type: 'flight',
        icon: '✈️',
        color: '#2563eb',
        role: '抵离航站楼 · 租车取还中心 (Car Rental Center)',
        dates: 'Oct 24 (抵达), Oct 31 (返程)',
        navGoogle: 'https://www.google.com/maps/dir/?api=1&destination=4300+Glumack+Dr,+St+Paul,+MN+55111',
        navApple: 'https://maps.apple.com/?daddr=4300+Glumack+Dr,+St+Paul,+MN+55111'
      },
      'B': {
        id: 'B',
        name: 'Hilton Garden Inn Shoreview (住宿酒店)',
        nameEn: 'Hilton Garden Inn Minneapolis St. Paul-Shoreview',
        address: '1050 Gramsie Rd, Shoreview, MN 55126',
        lat: 45.0685,
        lng: -93.1362,
        type: 'hotel',
        icon: '🏨',
        color: '#0891b2',
        role: '全程住宿核心大本营 · 往返各园区中枢',
        dates: 'Oct 24 – Oct 31 (7 晚连续住宿)',
        navGoogle: 'https://www.google.com/maps/dir/?api=1&destination=1050+Gramsie+Rd,+Shoreview,+MN+55126',
        navApple: 'https://maps.apple.com/?daddr=1050+Gramsie+Rd,+Shoreview,+MN+55126'
      },
      'C': {
        id: 'C',
        name: 'Medtronic Mounds View 园区 (S&T 会场)',
        nameEn: 'Medtronic Mounds View Campus (S&T Conference)',
        address: '8200 Coral Sea St NE, Mounds View, MN 55112',
        lat: 45.1181,
        lng: -93.2032,
        type: 'conf',
        icon: '🏛️',
        color: '#d97706',
        role: 'S&T 大会分会场 · 口头汇报 (Room MVS 1D) / 产品展 (Table #63) · 海报领取点 (Digital Print Services window, 1st floor past security from parking garage)',
        dates: 'Oct 28 下午 1:45 (口头演讲), Oct 29 上午 8:30 (产品展 & 取海报)',
        navGoogle: 'https://www.google.com/maps/dir/?api=1&destination=8200+Coral+Sea+St+NE,+Mounds+View,+MN+55112',
        navApple: 'https://maps.apple.com/?daddr=8200+Coral+Sea+St+NE,+Mounds+View,+MN+55112'
      },
      'D': {
        id: 'D',
        name: 'Medtronic 运营总部 (OHQ)',
        nameEn: 'Medtronic Operational Headquarters Auditorium',
        address: '710 Medtronic Pkwy NE, Minneapolis, MN 55432',
        lat: 45.0698,
        lng: -93.2516,
        type: 'conf',
        icon: '🏢',
        color: '#db2777',
        role: 'S&T 大会海报展示会场 (Operational Headquarters Auditorium)',
        dates: 'Oct 29 下午 15:30–17:45 (海报讲解展示)',
        navGoogle: 'https://www.google.com/maps/dir/?api=1&destination=710+Medtronic+Pkwy+NE,+Minneapolis,+MN+55432',
        navApple: 'https://maps.apple.com/?daddr=710+Medtronic+Pkwy+NE,+Minneapolis,+MN+55432'
      },
      'E': {
        id: 'E',
        name: 'Medtronic PRL 生理研究实验室 (Coon Rapids)',
        nameEn: 'Medtronic Physiological Research Laboratories (PRL)',
        address: '11520 Yellow Pine St NW, Minneapolis (Coon Rapids), MN 55448',
        lat: 45.1834,
        lng: -93.3411,
        type: 'prl',
        icon: '🩻',
        color: '#059669',
        role: '美敦力 PRL 临床前研究基地 (含 CCL 导管室) · 荧光设备校准 / 急性动物实验',
        dates: 'Oct 26 (AM 校准), Oct 28 (AM 二次校准), Oct 30 (全天急性动物实验)',
        navGoogle: 'https://www.google.com/maps/dir/?api=1&destination=11520+Yellow+Pine+St+NW,+Coon+Rapids,+MN+55448',
        navApple: 'https://maps.apple.com/?daddr=11520+Yellow+Pine+St+NW,+Coon+Rapids,+MN+55448'
      }
    };

    const ROUTES_DEF = {
      'all': {
        title: '🌐 全部行程核心地点 (5 处精准标点)',
        desc: '已在地图上精准标出全部 5 个地址（机场、酒店、Mounds View 大会会场、Fridley 总部、Coon Rapids PRL 实验室）。点击卡片可单独聚焦。',
        points: ['A', 'B', 'C', 'D', 'E']
      },
      'oct24': {
        title: '🛫 Oct 24: 机场 ➔ 希尔顿酒店路线',
        desc: '约 23 miles · 驾车约 30–35 分钟。从 MSP Terminal 1 租车中心出发，沿 I-494 E 接 I-35E N 直达 Shoreview 酒店入住。',
        points: ['A', 'B']
      },
      'oct26': {
        title: '🩻 Oct 26: 酒店 ⇄ Coon Rapids PRL 实验室 (设备校准)',
        desc: '单程约 14 miles · 约 18 分钟。从 Shoreview 酒店沿 I-694 W 转 US-10 W 直达 11520 Yellow Pine St NW 进行设备校准与 CTA 数据核对。',
        points: ['B', 'E']
      },
      'oct28': {
        title: '🎤 Oct 28: 酒店 ➔ PRL 校准 ➔ Mounds View 大会演讲 ➔ 酒店',
        desc: '全天约 28 miles。上午在 Coon Rapids PRL 进行设备二次校准；中午沿 US-10 E 前往 Mounds View (8200 Coral Sea St NE) 准备 13:45–14:00 口头报告；傍晚返回酒店。',
        points: ['B', 'E', 'C']
      },
      'oct29': {
        title: '🏛 Oct 29: 酒店 ➔ Mounds View 产品展 ➔ 总部 OHQ 海报 ➔ 酒店',
        desc: '上午 8:30–11:30 Mounds View Cafeteria 产品展；下午 14:00 转场至 710 Medtronic Pkwy 总部 OHQ 海报展；傍晚返回酒店。',
        points: ['B', 'C', 'D']
      },
      'oct30': {
        title: '🫀 Oct 30: 酒店 ⇄ Coon Rapids PRL 实验室 (全天正式动物实验)',
        desc: '单程约 14 miles · 约 18 分钟。全天在 11520 Yellow Pine St NW 美敦力 PRL CCL 导管室开展 FusionNav 急性羊模型介入验证。',
        points: ['B', 'E']
      },
      'oct31': {
        title: '✈️ Oct 31: 酒店 ➔ MSP 机场返程送机',
        desc: '约 23 miles · 约 30–35 分钟。早上退房后沿 I-35E S 转 MN-5 W 直达 Terminal 1 租车归还区办理还车并乘机返沪。',
        points: ['B', 'A']
      }
    };

    const elGmap = document.getElementById('embed-gmap-routes');
    const elOsm = document.getElementById('embed-osm-routes');
    const btnShowGmap = document.getElementById('btn-show-gmap-embed');
    const btnShowOsm = document.getElementById('btn-show-osm-embed');
    const statusText = document.getElementById('map-status-text');

    const GMAP_URLS = {
      'all': 'https://maps.google.com/maps?q=Hilton+Garden+Inn+Minneapolis+St.+Paul-Shoreview&t=&z=11&ie=UTF8&iwloc=&output=embed',
      'oct24': 'https://maps.google.com/maps?saddr=4300+Glumack+Dr,+St+Paul,+MN+55111&daddr=1050+Gramsie+Rd,+Shoreview,+MN+55126&output=embed',
      'oct26': 'https://maps.google.com/maps?saddr=1050+Gramsie+Rd,+Shoreview,+MN+55126&daddr=11520+Yellow+Pine+St+NW,+Coon+Rapids,+MN+55448&output=embed',
      'oct28': 'https://maps.google.com/maps?saddr=11520+Yellow+Pine+St+NW,+Coon+Rapids,+MN+55448&daddr=8200+Coral+Sea+St+NE,+Mounds+View,+MN+55112&output=embed',
      'oct29': 'https://maps.google.com/maps?saddr=8200+Coral+Sea+St+NE,+Mounds+View,+MN+55112&daddr=710+Medtronic+Pkwy+NE,+Minneapolis,+MN+55432&output=embed',
      'oct30': 'https://maps.google.com/maps?saddr=1050+Gramsie+Rd,+Shoreview,+MN+55126&daddr=11520+Yellow+Pine+St+NW,+Coon+Rapids,+MN+55448&output=embed',
      'oct31': 'https://maps.google.com/maps?saddr=1050+Gramsie+Rd,+Shoreview,+MN+55126&daddr=4300+Glumack+Dr,+St+Paul,+MN+55111&output=embed'
    };

    const OSM_URLS = {
      'all': 'https://www.openstreetmap.org/export/embed.html?bbox=-93.40%2C44.85%2C-93.10%2C45.22&layer=mapnik&marker=45.0685%2C-93.1362',
      'oct24': 'https://www.openstreetmap.org/export/embed.html?bbox=-93.28%2C44.86%2C-93.10%2C45.09&layer=mapnik&marker=44.8848%2C-93.2223',
      'oct26': 'https://www.openstreetmap.org/export/embed.html?bbox=-93.38%2C45.05%2C-93.12%2C45.21&layer=mapnik&marker=45.1834%2C-93.3411',
      'oct28': 'https://www.openstreetmap.org/export/embed.html?bbox=-93.35%2C45.08%2C-93.18%2C45.20&layer=mapnik&marker=45.1181%2C-93.2032',
      'oct29': 'https://www.openstreetmap.org/export/embed.html?bbox=-93.28%2C45.05%2C-93.12%2C45.13&layer=mapnik&marker=45.0698%2C-93.2516',
      'oct30': 'https://www.openstreetmap.org/export/embed.html?bbox=-93.38%2C45.05%2C-93.12%2C45.21&layer=mapnik&marker=45.1834%2C-93.3411',
      'oct31': 'https://www.openstreetmap.org/export/embed.html?bbox=-93.28%2C44.86%2C-93.10%2C45.09&layer=mapnik&marker=44.8848%2C-93.2223'
    };

    function highlightLocationCard(id) {
      document.querySelectorAll('.loc-card').forEach(card => {
        if (card.getAttribute('data-loc') === id) {
          card.classList.add('loc-active');
          card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          card.classList.remove('loc-active');
        }
      });
    }

    function switchRoute(routeKey) {
      const route = ROUTES_DEF[routeKey];
      if (!route) return;

      // Update overlay banner
      const mroTitle = document.getElementById('mro-title');
      const mroDesc = document.getElementById('mro-desc');
      if (mroTitle) mroTitle.textContent = route.title;
      if (mroDesc) mroDesc.textContent = route.desc;

      // Update iframe sources
      if (elGmap && GMAP_URLS[routeKey]) {
        elGmap.src = GMAP_URLS[routeKey];
      }
      if (elOsm && OSM_URLS[routeKey]) {
        elOsm.src = OSM_URLS[routeKey];
      }
      if (statusText) {
        statusText.textContent = `当前展示：${route.title}`;
      }
    }

    function focusLocation(locId) {
      const loc = LOCATIONS[locId];
      if (!loc) return;

      highlightLocationCard(locId);

      // Update overlay banner
      const mroTitle = document.getElementById('mro-title');
      const mroDesc = document.getElementById('mro-desc');
      if (mroTitle) mroTitle.textContent = `📍 [${loc.id}] ${loc.name}`;
      if (mroDesc) mroDesc.textContent = `地址：${loc.address} · ${loc.role}`;

      // Update map embed to target address
      if (elGmap) {
        elGmap.src = `https://maps.google.com/maps?q=${encodeURIComponent(loc.address)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
      }
      if (elOsm) {
        const delta = 0.04;
        elOsm.src = `https://www.openstreetmap.org/export/embed.html?bbox=${(loc.lng - delta).toFixed(4)}%2C${(loc.lat - delta).toFixed(4)}%2C${(loc.lng + delta).toFixed(4)}%2C${(loc.lat + delta).toFixed(4)}&layer=mapnik&marker=${loc.lat}%2C${loc.lng}`;
      }
      if (statusText) {
        statusText.textContent = `已定位：${loc.name}`;
      }
    }

    // 1. Route Selector Buttons
    const routeBtns = document.querySelectorAll('.route-filter-btn');
    routeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        routeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const routeKey = btn.getAttribute('data-route');
        switchRoute(routeKey);
      });
    });

    // 2. Location Cards & Focus Buttons Click
    document.querySelectorAll('.loc-card, .btn-loc-focus').forEach(el => {
      el.addEventListener('click', (e) => {
        // Prevent triggering if clicked directly on an external navigation link
        if (e.target.tagName.toLowerCase() === 'a') return;
        const locId = el.getAttribute('data-loc');
        if (locId) {
          focusLocation(locId);
        }
      });
    });

    // 3. Schedule "📍 地图查看标点" Button Handler
    document.querySelectorAll('.cr-btn-locate').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const locId = btn.getAttribute('data-locate');
        const mapSection = document.getElementById('map-routes');
        if (mapSection) {
          mapSection.scrollIntoView({ behavior: 'smooth' });
        }
        if (locId) {
          setTimeout(() => {
            focusLocation(locId);
          }, 350);
        }
      });
    });

    // 4. Source Switch Buttons (Google Maps vs OpenStreetMap Embeds)
    if (btnShowGmap && elGmap) {
      btnShowGmap.addEventListener('click', () => {
        if (btnShowGmap) btnShowGmap.classList.add('active');
        if (btnShowOsm) btnShowOsm.classList.remove('active');
        elGmap.style.display = 'block';
        if (elOsm) elOsm.style.display = 'none';
        if (statusText) statusText.textContent = 'Google Maps 实景路线视图';
      });
    }

    if (btnShowOsm && elOsm) {
      btnShowOsm.addEventListener('click', () => {
        if (btnShowOsm) btnShowOsm.classList.add('active');
        if (btnShowGmap) btnShowGmap.classList.remove('active');
        elOsm.style.display = 'block';
        if (elGmap) elGmap.style.display = 'none';
        if (statusText) statusText.textContent = 'OpenStreetMap 全球通用镜像视图';
      });
    }

    // Secondary map tabs under Utilities section
    const mapTabBtns = document.querySelectorAll('.tool-card .map-tab-btn');
    const iframeOsm = document.getElementById('iframe-osm');
    const iframeGmap = document.getElementById('iframe-gmap');

    if (mapTabBtns.length && iframeOsm && iframeGmap) {
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
    }

  })();


  // 6. Interactive Checklist State Manager (localStorage)
  (function initChecklist() {
    const checkBoxes = document.querySelectorAll('.chk-box');
    if (!checkBoxes.length) return;

    checkBoxes.forEach(box => {
      const id = box.getAttribute('data-id');
      if (id) {
        const savedState = localStorage.getItem(`med_chk_${id}`);
        if (savedState === 'true') {
          box.checked = true;
        }

        box.addEventListener('change', () => {
          localStorage.setItem(`med_chk_${id}`, box.checked);
        });
      }
    });
  })();

  // 7. Mobile Hamburger Menu Toggle
  (function initMobileNav() {
    const hamburger = document.getElementById('nav-hamburger');
    const navLinks  = document.getElementById('nav-links');
    const nav       = document.getElementById('main-nav');
    if (!hamburger || !navLinks) return;

    function openMenu() {
      hamburger.classList.add('is-open');
      navLinks.classList.add('is-open');
      hamburger.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
      hamburger.classList.remove('is-open');
      navLinks.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
    }

    function toggleMenu() {
      hamburger.classList.contains('is-open') ? closeMenu() : openMenu();
    }

    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Close when a nav link is clicked
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target)) closeMenu();
    });

    // Close on scroll (optional, keeps UI clean)
    window.addEventListener('scroll', closeMenu, { passive: true });
  })();

});

