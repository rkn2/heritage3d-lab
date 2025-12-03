// ===== ROTATING TEXT ANIMATION =====
const rotatingTexts = [
    "Resilient",
    "Intelligent",
    "Sustainable",
    "Data-Driven",
    "Protected",
    "Preserved",
    "Transformed"
];

let currentTextIndex = 0;
const rotatingElement = document.getElementById('rotatingText');

function rotateText() {
    if (rotatingElement) {
        rotatingElement.style.animation = 'none';
        setTimeout(() => {
            currentTextIndex = (currentTextIndex + 1) % rotatingTexts.length;
            rotatingElement.textContent = rotatingTexts[currentTextIndex];
            rotatingElement.style.animation = 'fadeIn 0.5s ease';
        }, 50);
    }
}

// Initialize first text
if (rotatingElement) {
    rotatingElement.textContent = rotatingTexts[0];
    setInterval(rotateText, 3000);
}

// ===== PARTICLE ANIMATION =====
const canvas = document.getElementById('particleCanvas');
const ctx = canvas ? canvas.getContext('2d') : null;

if (canvas && ctx) {
    let particles = [];
    let animationFrameId;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.reset();
            this.y = Math.random() * canvas.height;
            this.fadeDelay = Math.random() * 600;
            this.fadeStart = Date.now() + this.fadeDelay;
            this.fadingIn = true;
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.z = Math.random() * 1500;
            this.vx = (Math.random() - 0.5) * 0.3;
            this.vy = (Math.random() - 0.5) * 0.3;
            this.size = Math.random() * 2 + 1;
            this.opacity = 0;
            this.targetOpacity = Math.random() * 0.5 + 0.3;
            this.color = this.getColor();
        }

        getColor() {
            const colors = [
                'rgba(96, 165, 250, ', // blue
                'rgba(103, 232, 249, ', // teal
                'rgba(156, 163, 175, ', // gray
                'rgba(209, 213, 219, '  // light gray
            ];
            return colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Fade in effect
            if (this.fadingIn) {
                const now = Date.now();
                if (now > this.fadeStart) {
                    this.opacity += 0.01;
                    if (this.opacity >= this.targetOpacity) {
                        this.opacity = this.targetOpacity;
                        this.fadingIn = false;
                    }
                }
            }

            // Wrap around edges
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color + this.opacity + ')';
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 8000), 150);
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(96, 165, 250, ${0.15 * (1 - distance / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        connectParticles();
        animationFrameId = requestAnimationFrame(animate);
    }

    resizeCanvas();
    initParticles();
    animate();

    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });
}

// ===== NAVIGATION =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== ORCID PUBLICATIONS =====
async function fetchORCIDPublications() {
    const orcidId = '0000-0002-8939-5998';
    const publicationsList = document.getElementById('publicationsList');
    
    if (!publicationsList) return;

    try {
        // Fetch works from ORCID API
        const response = await fetch(`https://pub.orcid.org/v3.0/${orcidId}/works`, {
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch publications');
        }

        const data = await response.json();
        
        if (!data.group || data.group.length === 0) {
            publicationsList.innerHTML = '<p class="loading">No publications found.</p>';
            return;
        }

        // Process and display publications
        const publications = data.group.map(group => {
            const work = group['work-summary'][0];
            return {
                title: work.title?.title?.value || 'Untitled',
                year: work['publication-date']?.year?.value || 'N/A',
                journal: work['journal-title']?.value || '',
                type: work.type || '',
                putCode: work['put-code']
            };
        });

        // Sort by year (most recent first)
        publications.sort((a, b) => {
            const yearA = parseInt(a.year) || 0;
            const yearB = parseInt(b.year) || 0;
            return yearB - yearA;
        });

        // Display publications
        publicationsList.innerHTML = publications.map(pub => `
            <div class="publication-item">
                <h3 class="publication-title">${pub.title}</h3>
                ${pub.journal ? `<p class="publication-journal">${pub.journal}</p>` : ''}
                <p class="publication-year">${pub.year}</p>
            </div>
        `).join('');

    } catch (error) {
        console.error('Error fetching ORCID publications:', error);
        publicationsList.innerHTML = `
            <div class="publication-item">
                <p>Unable to load publications automatically. Please visit 
                <a href="https://orcid.org/0000-0002-8939-5998" target="_blank" style="color: var(--accent-teal);">
                    ORCID profile
                </a> to view publications.</p>
            </div>
        `;
    }
}

// Fetch publications when page loads
if (document.getElementById('publicationsList')) {
    fetchORCIDPublications();
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
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

// Observe all cards for animation on scroll
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.diff-card, .research-card, .person-card, .publication-item, .teaching-card'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ===== PERFORMANCE OPTIMIZATION =====
// Reduce particle animation on mobile for better performance
if (window.innerWidth < 768 && canvas) {
    const particleCount = particles.length;
    particles = particles.slice(0, Math.floor(particleCount / 2));
}

// Pause particle animation when tab is not visible
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
    } else {
        if (canvas && ctx) {
            animate();
        }
    }
});
