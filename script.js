/* ===========================
   The Bruumers — JavaScript
   =========================== */

document.addEventListener('DOMContentLoaded', () => {

    // ===========================
    // Navbar Scroll Effect
    // ===========================
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ===========================
    // Mobile Menu Toggle
    // ===========================
    const navToggle = document.getElementById('nav-toggle');
    const navMenuWrapper = document.getElementById('nav-menu-wrapper');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        if (navMenuWrapper) navMenuWrapper.classList.toggle('open');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            if (navMenuWrapper) navMenuWrapper.classList.remove('open');
        });
    });

    // ===========================
    // Scroll Animations
    // ===========================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger counter animation for stats
                const counters = entry.target.querySelectorAll('.stat-number[data-target]');
                counters.forEach(counter => animateCounter(counter));
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // ===========================
    // Counter Animation
    // ===========================
    function animateCounter(counter) {
        if (counter.dataset.animated) return;
        counter.dataset.animated = 'true';
        
        const target = parseInt(counter.dataset.target);
        const duration = 2000;
        const start = performance.now();
        
        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);
            
            counter.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    }

    // ===========================
    // Interactive Map - Leaflet
    // ===========================
    const mapEl = document.getElementById('map');
    if (mapEl) {
        initMap();
    }

    function initMap() {
        // Create map centered on the route
        const map = L.map('map', {
            center: [40, 19],
            zoom: 6,
            zoomControl: true,
            scrollWheelZoom: false
        });

        // Dark map tiles
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(map);

        // Enable scroll zoom on click
        map.on('click', () => {
            map.scrollWheelZoom.enable();
        });

        // Custom marker icon
        const goldIcon = L.divIcon({
            className: 'custom-marker',
            html: `<div style="
                width: 16px;
                height: 16px;
                background: #c9a84c;
                border: 3px solid #0a0a0a;
                border-radius: 50%;
                box-shadow: 0 0 12px rgba(201, 168, 76, 0.6);
            "></div>`,
            iconSize: [16, 16],
            iconAnchor: [8, 8],
            popupAnchor: [0, -12]
        });

        const startIcon = L.divIcon({
            className: 'custom-marker-start',
            html: `<div style="
                width: 22px;
                height: 22px;
                background: #c9a84c;
                border: 3px solid #0a0a0a;
                border-radius: 50%;
                box-shadow: 0 0 20px rgba(201, 168, 76, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
            "><div style="width: 6px; height: 6px; background: #0a0a0a; border-radius: 50%;"></div></div>`,
            iconSize: [22, 22],
            iconAnchor: [11, 11],
            popupAnchor: [0, -14]
        });

        // ===========================
        // Trip Data: Balcani 2024
        // ===========================
        const balcaniStops = [
            {
                name: 'Palermo',
                coords: [38.1157, 13.3615],
                desc: 'Punto di partenza — la nostra base. Da qui parte l\'avventura!',
                isStart: true
            },
            {
                name: 'Bari',
                coords: [41.1171, 16.8719],
                desc: 'Tappa in Puglia. Imbarco per l\'Albania dal porto di Bari.'
            },
            {
                name: 'Durazzo',
                coords: [41.3233, 19.4517],
                desc: 'Arrivo in Albania! Porto di sbarco e prima tappa balcanica.'
            },
            {
                name: 'Scutari',
                coords: [42.0693, 19.5126],
                desc: 'L\'antica capitale albanese, tra il lago e le montagne.'
            },
            {
                name: 'Igalo, Montenegro',
                coords: [42.4574, 18.5147],
                desc: 'Le Bocche di Cattaro, uno dei fiordi più belli d\'Europa.'
            },
            {
                name: 'Spalato, Croazia',
                coords: [43.5081, 16.4402],
                desc: 'Il Palazzo di Diocleziano, patrimonio UNESCO sul mare.'
            },
            {
                name: 'Mostar, Bosnia',
                coords: [43.3438, 17.8078],
                desc: 'Lo Stari Most, il ponte iconico simbolo della Bosnia.'
            },
            {
                name: 'Sarajevo, Bosnia ed Erzegovina',
                coords: [43.8563, 18.4131],
                desc: 'La Gerusalemme d\'Europa. Storia, cultura e ćevapi.'
            },
            {
                name: 'Bobotov Kuk, Montenegro',
                coords: [43.1244, 19.0283],
                desc: 'La vetta del Durmitor. Strade di montagna mozzafiato.'
            },
            {
                name: 'Durazzo (Ritorno)',
                coords: [41.3233, 19.4517],
                desc: 'Ritorno al porto di Durazzo per il traghetto verso casa.'
            }
        ];

        // ===========================
        // Trip Data: Grecia 2025
        // ===========================
        const greciaStops = [
            {
                name: 'Palermo',
                coords: [38.1157, 13.3615],
                desc: 'Punto di partenza — la nostra base. Da qui parte l\'avventura!',
                isStart: true
            },
            {
                name: 'Messina',
                coords: [38.1938, 15.5540],
                desc: 'Attraversamento dello Stretto. La Sicilia ci saluta!'
            },
            {
                name: 'Cosenza',
                coords: [39.3088, 16.2495],
                desc: 'Attraverso la Calabria, tra montagne e strade panoramiche.'
            },
            {
                name: 'Taranto',
                coords: [40.4644, 17.2470],
                desc: 'La costa ionica della Puglia, sosta per il pesce fresco.'
            },
            {
                name: 'Valona / Imbarco',
                coords: [40.4606, 19.4914],
                desc: 'Imbarco per la Grecia. Si attraversa l\'Adriatico!'
            },
            {
                name: 'Saranda',
                coords: [39.8756, 20.0053],
                desc: 'Prima tappa in Grecia. Spiagge cristalline e cibo meraviglioso.'
            },
            {
                name: 'Giannina',
                coords: [39.6650, 20.8537],
                desc: 'L\'Epiro greco, terra di lago e montagne.'
            },
            {
                name: 'Meteora',
                coords: [39.7217, 21.6307],
                desc: 'I monasteri sospesi nel cielo. Vista mozzafiato!'
            },
            {
                name: 'Delfi',
                coords: [38.4824, 22.5010],
                desc: 'L\'oracolo di Delfi, cuore della Grecia antica.'
            },
            {
                name: 'Atene',
                coords: [37.9838, 23.7275],
                desc: 'La capitale greca. Acropoli, souvlaki e vita notturna.'
            },
            {
                name: 'Mylokopi',
                coords: [37.9672, 22.8764],
                desc: 'Costa del Peloponneso, acque turchesi e relax.'
            },
            {
                name: 'Olimpia',
                coords: [37.6386, 21.6294],
                desc: 'La culla delle Olimpiadi. Storia e cultura greca.'
            },
            {
                name: 'Patrasso',
                coords: [38.2466, 21.7346],
                desc: 'Terza città della Grecia, ponte verso l\'occidente.'
            },
            {
                name: 'Leucade',
                coords: [38.8334, 20.7069],
                desc: 'Isola ionica. Porto Katsiki, una delle spiagge più belle del mondo.'
            }
        ];

        // Store trip data
        const trips = {
            balcani: balcaniStops,
            grecia: greciaStops
        };

        // Layers for current trip
        let currentMarkers = [];
        let currentPolylines = [];

        function showTrip(tripName) {
            // Clear existing markers and lines
            currentMarkers.forEach(m => map.removeLayer(m));
            currentPolylines.forEach(p => map.removeLayer(p));
            currentMarkers = [];
            currentPolylines = [];

            const stops = trips[tripName];
            if (!stops) return;

            // Add markers
            stops.forEach(stop => {
                const marker = L.marker(stop.coords, {
                    icon: stop.isStart ? startIcon : goldIcon
                }).addTo(map);

                marker.bindPopup(`
                    <div class="popup-title">${stop.name}</div>
                    <div class="popup-desc">${stop.desc}</div>
                `);

                currentMarkers.push(marker);
            });

            // Draw route polyline
            const routeCoords = stops.map(s => s.coords);

            // Glow effect line underneath
            const glowLine = L.polyline(routeCoords, {
                color: '#c9a84c',
                weight: 6,
                opacity: 0.2,
                smoothFactor: 1
            }).addTo(map);
            currentPolylines.push(glowLine);

            // Main route line
            const mainLine = L.polyline(routeCoords, {
                color: '#c9a84c',
                weight: 3,
                opacity: 0.8,
                smoothFactor: 1,
                dashArray: '8, 12',
                lineCap: 'round'
            }).addTo(map);
            currentPolylines.push(mainLine);

            // Fit map to route bounds
            const bounds = L.latLngBounds(routeCoords);
            map.fitBounds(bounds, { padding: [40, 40] });
        }

        // Show initial trip (Balcani 2024)
        showTrip('balcani');

        // Trip selector buttons
        document.querySelectorAll('.trip-select-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.trip-select-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                showTrip(btn.dataset.trip);
            });
        });
    }

    // ===========================
    // Sticker Reveal Animation
    // ===========================
    const stickerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stickers = entry.target.querySelectorAll('.country-sticker');
                stickers.forEach((sticker, i) => {
                    setTimeout(() => {
                        sticker.classList.add('revealed');
                    }, i * 150);
                });
                stickerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const stickersGrid = document.querySelector('.stickers-grid');
    if (stickersGrid) {
        stickerObserver.observe(stickersGrid);
    }

    // ===========================
    // Smooth Scroll for Anchor Links
    // ===========================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                
                if (targetId === '#hero') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    return;
                }

                // Scroll to the content itself to ignore the empty section padding
                const contentWrapper = target.querySelector('.container') || target;
                const elementPosition = contentWrapper.getBoundingClientRect().top;
                
                // 80px navbar height + 20px visual margin
                const offsetPosition = elementPosition + window.scrollY - 100;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===========================
    // Parallax Effect on Hero
    // ===========================
    const heroImg = document.querySelector('.hero-bg-img');
    if (heroImg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                heroImg.style.transform = `scale(1.05) translateY(${scrolled * 0.15}px)`;
            }
        }, { passive: true });
    }
});
