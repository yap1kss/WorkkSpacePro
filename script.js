// Initialize AOS (Animate On Scroll) library
AOS.init({
    duration: 800,
    easing: 'ease-in-out-sine',
    delay: 100,
    once: true,
    mirror: false
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    const scrolled = window.pageYOffset;
    
    if (scrolled > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.innerText.replace(/\D/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                if (counter.innerText.includes('+')) {
                    counter.innerText = Math.ceil(current) + '+';
                } else if (counter.innerText.includes('%')) {
                    counter.innerText = Math.ceil(current) + '%';
                } else {
                    counter.innerText = Math.ceil(current);
                }
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = counter.innerText; // Keep original format
            }
        };
        
        updateCounter();
    });
}

// Intersection Observer for counter animation
const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(statsSection);
}

// Floating animation for cards
function addFloatingAnimation() {
    const cards = document.querySelectorAll('.job-card, .benefit-card, .review-card');
    
    cards.forEach((card, index) => {
        const delay = index * 100;
        card.style.animationDelay = `${delay}ms`;
        
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Text typing animation
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Gradient text animation
function animateGradientText() {
    const gradientTexts = document.querySelectorAll('.highlight');
    
    gradientTexts.forEach(text => {
        text.addEventListener('mouseenter', () => {
            text.style.backgroundSize = '200% 200%';
            text.style.animation = 'gradientShift 2s ease infinite';
        });
        
        text.addEventListener('mouseleave', () => {
            text.style.animation = 'none';
        });
    });
}

// Add CSS animation for gradient shift
const style = document.createElement('style');
style.textContent = `
    @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    .floating {
        animation: float 3s ease-in-out infinite;
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
    }
    
    .pulse {
        animation: pulse 2s ease-in-out infinite;
    }
    
    @keyframes slideInFromLeft {
        0% {
            transform: translateX(-100%);
            opacity: 0;
        }
        100% {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideInFromRight {
        0% {
            transform: translateX(100%);
            opacity: 0;
        }
        100% {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeInScale {
        0% {
            transform: scale(0.8);
            opacity: 0;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Intersection Observer for scroll animations
function observeElements() {
    const elements = document.querySelectorAll('.job-card, .benefit-card, .review-card, .about-text, .about-image');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(element);
    });
}

// Particle effect for hero section
function createParticles() {
    const hero = document.querySelector('.hero');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            pointer-events: none;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${3 + Math.random() * 3}s ease-in-out infinite;
            animation-delay: ${Math.random() * 3}s;
        `;
        hero.appendChild(particle);
    }
}

// Magnetic effect for cards (disabled for job-cards)
function addMagneticEffect() {
    const cards = document.querySelectorAll('.benefit-card'); // Only benefit cards, not job cards
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// Loading animation
function showLoadingAnimation() {
    const elements = document.querySelectorAll('section > .container > *');
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(135deg, #2563eb, #f59e0b);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Smooth reveal animation for text
function revealText() {
    const textElements = document.querySelectorAll('h1, h2, h3, p');
    
    textElements.forEach(element => {
        const text = element.innerText;
        element.innerHTML = text.split('').map(char => 
            `<span style="opacity: 0; display: inline-block;">${char === ' ' ? '&nbsp;' : char}</span>`
        ).join('');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const spans = entry.target.querySelectorAll('span');
                    spans.forEach((span, index) => {
                        setTimeout(() => {
                            span.style.transition = 'opacity 0.1s ease';
                            span.style.opacity = '1';
                        }, index * 20);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(element);
    });
}

// Image lazy loading with fade effect (excluding review images)
function lazyLoadImages() {
    const images = document.querySelectorAll('img:not(.reviewer img)');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Skip if image is already loaded and visible
                if (img.complete && img.naturalHeight !== 0) {
                    img.style.opacity = '1';
                    imageObserver.unobserve(img);
                    return;
                }
                
                img.style.transition = 'opacity 0.5s ease';
                img.style.opacity = '0';
                
                img.onload = () => {
                    img.style.opacity = '1';
                };
                
                // Set opacity to 1 immediately if image is already cached
                if (img.complete) {
                    img.style.opacity = '1';
                }
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        // Don't apply lazy loading to review images
        if (!img.closest('.reviewer')) {
            imageObserver.observe(img);
        }
    });
}

// Initialize all animations and effects
document.addEventListener('DOMContentLoaded', () => {
    // Basic animations
    addFloatingAnimation();
    animateGradientText();
    observeElements();
    createParticles();
    addMagneticEffect();
    createScrollProgress();
    lazyLoadImages();
    
    // Delay some animations for better performance
    setTimeout(() => {
        showLoadingAnimation();
    }, 500);
    
    // Add floating animation to specific elements
    const floatingElements = document.querySelectorAll('.floating-card, .scroll-indicator');
    floatingElements.forEach(element => {
        element.classList.add('floating');
    });
});

// Performance optimization
let ticking = false;

function updateAnimations() {
    // Update scroll-based animations here
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateAnimations);
        ticking = true;
    }
});

// Mobile touch interactions
if ('ontouchstart' in window) {
    document.querySelectorAll('.job-card, .benefit-card, .review-card').forEach(card => {
        card.addEventListener('touchstart', () => {
            card.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('touchend', () => {
            card.style.transform = 'scale(1)';
        });
    });
}

// Easter egg: Konami code
const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.keyCode === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            // Activate special animation
            document.body.style.animation = 'rainbow 2s infinite';
            const style = document.createElement('style');
            style.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
            
            setTimeout(() => {
                document.body.style.animation = 'none';
                style.remove();
            }, 5000);
            
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

// Cleanup function for performance
window.addEventListener('beforeunload', () => {
    // Clean up any remaining animations or observers
    document.querySelectorAll('.particle').forEach(particle => particle.remove());
});
