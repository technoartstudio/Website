document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation (keep your existing code)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => navLinks.classList.toggle('active'));
    }

    // Store gallery items
    const originalGalleryItems = Array.from(document.querySelectorAll('.gallery-item'));
    let lgInstance = null;

    // VIDEO FIX: Convert WhatsApp videos first
    function ensureVideoCompatibility() {
        document.querySelectorAll('.gallery-media video source[type="video/mp4"]').forEach(source => {
            if (source.src.includes('WhatsApp')) {
                console.warn('WhatsApp video detected - recommend converting:', source.src);
                // In a production environment, you would replace this with a converted video
                // source.src = source.src.replace('WhatsApp Video', 'converted-video');
            }
        });
    }

    // Initialize lightGallery with VIDEO FIXES
    function initLightGallery() {
        if (lgInstance) lgInstance.destroy(true);
        
        ensureVideoCompatibility(); // Check video formats before init
        
        lgInstance = lightGallery(document.getElementById('galleryGrid'), {
            selector: '.gallery-media',
            download: false,
            videojs: true,
            videoMaxWidth: '100%',
            autoplayFirstVideo: false,
            closable: false,
            closeOnTap: false,
            escKey: true,
            addClass: 'lg-no-backdrop-close',
            plugins: [lgVideo],
            videojsOptions: {
                techOrder: ['html5'],
                html5: {
                    nativeControlsForTouch: true,
                    nativeAudioTracks: false,
                    nativeVideoTracks: false
                }
            },
            onAfterOpen: () => {
                const video = document.querySelector('.lg-video-cont video');
                if (video) {
                    video.load(); // Force reload
                    video.play().catch(e => {
                        video.controls = true; // Show controls if autoplay fails
                    });
                }
            }
        });

        // VIDEO FIX: Handle errors
        document.addEventListener('lgVideoError', (e) => {
            console.error('Video error:', e.detail.error);
            const fallback = document.createElement('div');
            fallback.className = 'video-fallback';
            fallback.innerHTML = `
                <p>Video failed to load</p>
                <a href="${e.detail.element.href}" target="_blank" class="fallback-link">
                    Open video directly
                </a>
            `;
            document.querySelector('.lg-video-cont').appendChild(fallback);
        });
    }

    // Initial setup
    initLightGallery();

    // Filter Functionality with VIDEO FIX
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            originalGalleryItems.forEach(item => {
                item.style.display = (filter === 'all' || item.dataset.category === filter) 
                    ? 'block' : 'none';
            });
            
            setTimeout(initLightGallery, 100); // VIDEO FIX: Delay reinit
        });
    });

    // Search Functionality with VIDEO FIX
    const searchInput = document.getElementById('searchInput');
    searchInput?.addEventListener('input', function() {
        const term = this.value.toLowerCase();
        const filter = document.querySelector('.filter-btn.active')?.dataset.filter;
        
        originalGalleryItems.forEach(item => {
            const matchesSearch = item.dataset.title.toLowerCase().includes(term) || 
                               item.dataset.student.toLowerCase().includes(term);
            const matchesFilter = !filter || filter === 'all' || 
                               item.dataset.category === filter;
            item.style.display = (matchesSearch && matchesFilter) ? 'block' : 'none';
        });
        
        setTimeout(initLightGallery, 100); // VIDEO FIX: Delay reinit
    });

    // VIDEO FIX: Add critical CSS dynamically
    const videoFixCSS = `
        .lg-video-cont video {
            width: 100% !important;
            height: auto !important;
        }
        .video-fallback {
            color: white;
            text-align: center;
            padding: 20px;
        }
        .fallback-link {
            color: #4fc3f7;
            text-decoration: underline;
        }
        .lg-no-backdrop-close .lg-backdrop {
            pointer-events: none !important;
        }
    `;
    document.head.insertAdjacentHTML('beforeend', `<style>${videoFixCSS}</style>`);
});