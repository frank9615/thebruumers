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
    const navMenu = document.getElementById('nav-menu');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('open');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('open');
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
            center: [38.5, 22],
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

        // Trip route waypoints (Palermo → Greece trip)
        const tripStops = [
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

        // Add markers
        tripStops.forEach(stop => {
            const marker = L.marker(stop.coords, {
                icon: stop.isStart ? startIcon : goldIcon
            }).addTo(map);

            marker.bindPopup(`
                <div class="popup-title">${stop.name}</div>
                <div class="popup-desc">${stop.desc}</div>
            `);
        });

        // Draw route polyline
        const routeCoords = tripStops.map(s => s.coords);
        
        // Add a glow effect line underneath
        L.polyline(routeCoords, {
            color: '#c9a84c',
            weight: 6,
            opacity: 0.2,
            smoothFactor: 1
        }).addTo(map);

        // Main route line
        L.polyline(routeCoords, {
            color: '#c9a84c',
            weight: 3,
            opacity: 0.8,
            smoothFactor: 1,
            dashArray: '8, 12',
            lineCap: 'round'
        }).addTo(map);

        // Fit map to route bounds
        const bounds = L.latLngBounds(routeCoords);
        map.fitBounds(bounds, { padding: [40, 40] });
    }

    // ===========================
    // Smooth Scroll for Anchor Links
    // ===========================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
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
