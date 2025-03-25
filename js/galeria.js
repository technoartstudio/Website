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

// Initialize lightGallery
lightGallery(document.getElementById('galleryGrid'), {
    selector: '.gallery-media',
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
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Update active button
        filterBtns.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        const filter = this.dataset.filter;
        
        // Filter items
        galleryItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Search Functionality
const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    
    galleryItems.forEach(item => {
        const title = item.dataset.title.toLowerCase();
        const student = item.dataset.student.toLowerCase();
        
        if (title.includes(searchTerm) || student.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
});