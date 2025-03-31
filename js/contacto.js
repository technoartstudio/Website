// Toggle mobile navigation menu
document.querySelector('.hamburger').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Form validation and submission
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Validate form fields
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !subject || !message) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Perform form submission (e.g., send data to a server)
    alert('Mensagem enviada com sucesso!');

    // Reset form fields
    document.getElementById('contactForm').reset();
});