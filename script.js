// ===== HERO IMAGE SLIDESHOW =====
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');

function nextSlide() {
    if (slides.length === 0) return;

    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

// Change slide every 6 seconds
if (slides.length > 1) {
    setInterval(nextSlide, 6000);
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
            const externalIds = work['external-ids']?.['external-id'] || [];
            const doi = externalIds.find(id => id['external-id-type'] === 'doi');

            return {
                title: work.title?.title?.value || 'Untitled',
                year: work['publication-date']?.year?.value || 'N/A',
                journal: work['journal-title']?.value || '',
                type: work.type || 'other',
                putCode: work['put-code'],
                doi: doi ? doi['external-id-value'] : null
            };
        });

        // Sort by year (most recent first)
        publications.sort((a, b) => {
            const yearA = parseInt(a.year) || 0;
            const yearB = parseInt(b.year) || 0;
            return yearB - yearA;
        });

        // Show only the 12 most recent publications
        const recentPublications = publications.slice(0, 12);

        // Helper function to get type badge and icon
        function getTypeBadge(type) {
            const types = {
                'journal-article': { label: 'Journal Article', color: '#3b82f6' },
                'conference-paper': { label: 'Conference', color: '#8b5cf6' },
                'book-chapter': { label: 'Book Chapter', color: '#10b981' },
                'book': { label: 'Book', color: '#f59e0b' },
                'report': { label: 'Report', color: '#ef4444' },
                'preprint': { label: 'Preprint', color: '#06b6d4' },
                'other': { label: 'Publication', color: '#6b7280' }
            };
            return types[type] || types['other'];
        }

        // Display publications with enhanced visual design
        publicationsList.innerHTML = recentPublications.map(pub => {
            const badge = getTypeBadge(pub.type);
            const doiLink = pub.doi ? `https://doi.org/${pub.doi}` : null;

            return `
            <div class="publication-item" data-type="${pub.type}">
                <div class="publication-header">
                    <span class="publication-type-badge" style="background-color: ${badge.color}20; color: ${badge.color}; border-color: ${badge.color}40;">
                        <span class="badge-dot" style="background-color: ${badge.color};"></span>
                        ${badge.label}
                    </span>
                    <span class="publication-year-badge">${pub.year}</span>
                </div>
                <h3 class="publication-title">${pub.title}</h3>
                ${pub.journal ? `<p class="publication-journal"><span class="journal-icon"></span>${pub.journal}</p>` : ''}
                ${doiLink ? `
                    <div class="publication-links">
                        <a href="${doiLink}" target="_blank" class="publication-link">
                            View Publication →
                        </a>
                    </div>
                ` : ''}
            </div>
        `}).join('') + `
            <div class="publication-view-all">
                <a href="https://orcid.org/0000-0002-8939-5998" target="_blank" class="btn btn-secondary" style="margin-right: 1rem;">
                    View ORCID Profile
                </a>
                <a href="https://scholar.google.com/citations?user=cjMP6pwAAAAJ&hl=en" target="_blank" class="btn btn-primary">
                    View All on Google Scholar
                </a>
            </div>
        `;

    } catch (error) {
        console.error('Error fetching ORCID publications:', error);
        publicationsList.innerHTML = `
            <div class="publication-item">
                <p>Unable to load publications automatically. Please visit 
                <a href="https://orcid.org/0000-0002-8939-5998" target="_blank" style="color: var(--accent-teal);">
                    ORCID profile
                </a> or 
                <a href="https://scholar.google.com/citations?user=cjMP6pwAAAAJ&hl=en" target="_blank" style="color: var(--accent-teal);">
                    Google Scholar
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
