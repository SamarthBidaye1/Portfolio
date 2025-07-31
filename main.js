// Portfolio JavaScript Functionality

// Smooth scrolling to sections
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Download resume functionality
// const resumeUrl = '/Samarth_Dipak_Bidaye.pdf'; 
//     const link = document.createElement('a');
//     link.href = resumeUrl;
//     link.download = 'Samarth_Dipak_Bidaye.pdf';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);

// Intersection Observer for animations
function setupAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-slide-in');
    animatedElements.forEach(el => {
        // Set initial state
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        observer.observe(el);
    });
}

// Navbar background change on scroll (if you want to add a navbar later)
function handleScroll() {
    const scrolled = window.scrollY > 50;
    // This can be used if you add a fixed navbar later
    // const navbar = document.querySelector('.navbar');
    // if (navbar) {
    //     navbar.classList.toggle('scrolled', scrolled);
    // }
}

// Badge hover effects
function setupBadgeEffects() {
    const badges = document.querySelectorAll('.badge');
    badges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Card hover effects
function setupCardEffects() {
    const cards = document.querySelectorAll('.skill-card, .experience-card, .project-card, .contact-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Project button interactions
function setupProjectButtons() {
    const projectButtons = document.querySelectorAll('.project-actions .btn');
    projectButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Prevent default for demo purposes
            e.preventDefault();
            
            // You can add specific project URLs here
            const projectCard = this.closest('.project-card');
            const projectTitle = projectCard.querySelector('.project-title').textContent;
            
            if (this.textContent.includes('View Code')) {
                // Replace with actual GitHub URLs for each project
                alert(`View code for: ${projectTitle}\nThis would open the GitHub repository.`);
                // window.open('github-url-for-this-project', '_blank');
            } else if (this.textContent.includes('Live Demo')) {
                // Replace with actual demo URLs for each project
                alert(`Live demo for: ${projectTitle}\nThis would open the live demo.`);
                // window.open('demo-url-for-this-project', '_blank');
            }
        });
    });
}

// Contact form or mailto interactions
function setupContactInteractions() {
    const contactItems = document.querySelectorAll('.contact-item[href^="mailto:"], .contact-item[href^="tel:"]');
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            // Optional: Add analytics or confirmation
            const type = this.href.startsWith('mailto:') ? 'email' : 'phone';
            console.log(`Contact attempted via ${type}`);
        });
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Setup animations
    setupAnimations();
    
    // Setup interactive effects
    setupBadgeEffects();
    setupCardEffects();
    setupProjectButtons();
    setupContactInteractions();
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
    // Initialize Lucide icons (called from HTML after library loads)
    // lucide.createIcons();
    
    console.log('Portfolio initialized successfully!');
});

// Add some utility functions for potential future features

// Copy email to clipboard
function copyEmail() {
    navigator.clipboard.writeText('samarthbidaye14@gmail.com').then(() => {
        // You could show a toast notification here
        console.log('Email copied to clipboard');
    });
}

// Social media sharing (if needed)
function sharePortfolio() {
    if (navigator.share) {
        navigator.share({
            title: 'Samarth Bidaye - Full Stack Developer',
            text: 'Check out my portfolio!',
            url: window.location.href,
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        copyEmail();
    }
}

// Dark mode toggle (for future enhancement)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Load dark mode preference
function loadDarkModePreference() {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
        document.body.classList.add('dark-mode');
    }
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Add keyboard shortcuts if needed
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 'Home':
                e.preventDefault();
                scrollToTop();
                break;
            // Add more shortcuts as needed
        }
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll handler
window.addEventListener('scroll', throttle(handleScroll, 16)); // ~60fps