 // Mobile menu toggle
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        // Create floating blood drops
        function createBloodDrops() {
            const container = document.querySelector('body');
            const bloodDrops = 15;
            
            for (let i = 0; i < bloodDrops; i++) {
                const drop = document.createElement('div');
                drop.classList.add('blood-drop');
                
                // Random position
                const posX = Math.random() * 100;
                const posY = Math.random() * 100;
                const size = Math.random() * 20 + 5;
                const duration = Math.random() * 4 + 2;
                
                drop.style.position = 'fixed';
                drop.style.left = `${posX}%`;
                drop.style.top = `${posY}%`;
                drop.style.width = `${size}px`;
                drop.style.height = `${size}px`;
                drop.style.backgroundColor = 'rgba(138, 3, 3, 0.3)';
                drop.style.borderRadius = '50%';
                drop.style.zIndex = '-1';
                drop.style.animation = `pulse ${duration}s infinite ease-in-out`;
                
                container.appendChild(drop);
            }
        }
        
        // Initialize blood drops
        createBloodDrops();