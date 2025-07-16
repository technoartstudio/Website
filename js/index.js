document.addEventListener('DOMContentLoaded', function() {
    // Initialize Plyr video players
    const players = Array.from(document.querySelectorAll('video')).map(player => new Plyr(player, {
        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
        ratio: '16:9'
    }));

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Video Modal Functionality
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const closeModal = document.querySelector('.close-modal');
    const playIcons = document.querySelectorAll('.play-icon');

    if (modal && modalVideo && closeModal) {
        playIcons.forEach(icon => {
            icon.addEventListener('click', function() {
                const videoSource = this.closest('.media-card').querySelector('video source');
                if (videoSource) {
                    modalVideo.innerHTML = `<source src="${videoSource.src}" type="video/mp4">`;
                    modal.style.display = 'flex';
                    modalVideo.load();
                    modalVideo.play();
                }
            });
        });

        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
            modalVideo.pause();
        });

        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                modalVideo.pause();
            }
        });
    }

    // FIXED AND IMPROVED FILTER FUNCTIONALITY
    const filterBtns = document.querySelectorAll('.filter-btn');
    const mediaCards = document.querySelectorAll('.media-card');

    if (filterBtns.length && mediaCards.length) {
        // Initialize filter on page load
        const initialFilter = document.querySelector('.filter-btn.active');
        if (initialFilter) {
            filterMedia(initialFilter.dataset.filter);
        }

        // Add click handlers
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Update active button
                filterBtns.forEach(btn => {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-selected', 'false');
                });
                this.classList.add('active');
                this.setAttribute('aria-selected', 'true');
                
                // Filter media
                filterMedia(this.dataset.filter);
            });
        });

        function filterMedia(filterValue) {
            mediaCards.forEach(card => {
                // First fade out all cards
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                card.style.transition = 'all 0.3s ease';
                
                setTimeout(() => {
                    // Then show/hide appropriate cards
                    const shouldShow = filterValue === 'all' || card.dataset.category === filterValue;
                    card.style.display = shouldShow ? 'block' : 'none';
                    
                    // Finally fade in visible cards
                    setTimeout(() => {
                        if (shouldShow) {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }
                    }, 50);
                }, 200);
            });
        }
    }

    // Scroll down arrow functionality
    const scrollDown = document.querySelector('.scroll-down');
    if (scrollDown) {
        scrollDown.addEventListener('click', () => {
            const gallery = document.querySelector('#gallery');
            if (gallery) {
                gallery.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }
});