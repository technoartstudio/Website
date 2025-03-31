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

// Initialize lightGallery for video playback
lightGallery(document.getElementById('projectsGrid'), {
    selector: '.project-media',
    download: false,
    videojs: true,
    youtubePlayerParams: {
        modestbranding: 1,
        showinfo: 0,
        rel: 0
    },
    vimeoPlayerParams: {
        byline: 0,
        portrait: 0,
        color: '00F5FF'
    }
});

// Filter Functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Update active button
        filterBtns.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        const filter = this.dataset.filter;
        
        // Filter cards
        projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.filter.includes(filter)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Search Functionality
const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    
    projectCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const desc = card.querySelector('.project-desc').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || desc.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});