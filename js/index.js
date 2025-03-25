// Initialize Plyr video players
const players = Array.from(document.querySelectorAll('video')).map(player => new Plyr(player, {
    controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
    ratio: '16:9'
}));

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Video Modal Functionality
const modal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const closeModal = document.querySelector('.close-modal');
const playIcons = document.querySelectorAll('.play-icon');

playIcons.forEach(icon => {
    icon.addEventListener('click', function() {
        const videoSrc = this.closest('.media-card').querySelector('video source').src;
        modalVideo.innerHTML = `<source src="${videoSrc}" type="video/mp4">`;
        modal.style.display = 'flex';
        modalVideo.play();
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

// Filter Functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const mediaCards = document.querySelectorAll('.media-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Update active button
        filterBtns.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        const filter = this.dataset.filter;
        
        // Filter cards
        mediaCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Scroll down arrow functionality
document.querySelector('.scroll-down').addEventListener('click', () => {
    document.querySelector('#gallery').scrollIntoView({
        behavior: 'smooth'
    });
});