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

// Filter Functionality
const specBtns = document.querySelectorAll('.spec-btn');
const studentCards = document.querySelectorAll('.student-card');

specBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Update active button
        specBtns.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        const spec = this.dataset.spec;
        
        // Filter cards
        studentCards.forEach(card => {
            if (spec === 'all' || card.dataset.spec.includes(spec)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});