// === MAIN PORTFOLIO JAVASCRIPT ===

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initSmoothScrolling();
    loadProjects();
    initScrollEffects();
});

// === NAVIGATION FUNCTIONALITY ===
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Toggle aria-expanded for accessibility
        const isExpanded = navMenu.classList.contains('active');
        navToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Keyboard navigation for mobile toggle
    navToggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            navToggle.click();
        }
    });
}

// === SMOOTH SCROLLING ===
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// === PROJECT LOADING FUNCTIONALITY ===
async function loadProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    
    try {
        // Try to load from projects.json file
        const response = await fetch('projects.json');
        let projects;
        
        if (response.ok) {
            projects = await response.json();
        } else {
            // Fallback to sample data if projects.json doesn't exist
            projects = getSampleProjects();
        }
        
        renderProjects(projects, projectsGrid);
        
    } catch (error) {
        console.log('Loading sample projects data...');
        // Use sample data if fetch fails
        const projects = getSampleProjects();
        renderProjects(projects, projectsGrid);
    }
}

// === SAMPLE PROJECTS DATA ===
function getSampleProjects() {
    return [
        {
            id: 1,
            title: "E-Commerce Dashboard",
            description: "A responsive admin dashboard for managing products, orders, and customer data with real-time analytics and beautiful data visualizations.",
            thumbnail: "images/project1.jpg",
            stack: ["HTML", "CSS", "JavaScript", "Chart.js"],
            liveDemo: "https://yourusername.github.io/ecommerce-dashboard",
            github: "https://github.com/yourusername/ecommerce-dashboard"
        },
        {
            id: 2,
            title: "Weather App",
            description: "A clean and intuitive weather application featuring location-based forecasts, interactive maps, and beautiful weather animations.",
            thumbnail: "images/project2.jpg",
            stack: ["HTML", "CSS", "JavaScript", "API"],
            liveDemo: "https://yourusername.github.io/weather-app",
            github: "https://github.com/yourusername/weather-app"
        },
        {
            id: 3,
            title: "Task Management Tool",
            description: "A productivity-focused task manager with drag-and-drop functionality, project organization, and collaborative features.",
            thumbnail: "images/project3.jpg",
            stack: ["HTML", "CSS", "JavaScript", "Local Storage"],
            liveDemo: "https://yourusername.github.io/task-manager",
            github: "https://github.com/yourusername/task-manager"
        },
        {
            id: 4,
            title: "Recipe Finder",
            description: "A culinary companion that helps users discover recipes based on ingredients, dietary preferences, and cooking time.",
            thumbnail: "images/project4.jpg",
            stack: ["HTML", "CSS", "JavaScript", "Recipe API"],
            liveDemo: "https://yourusername.github.io/recipe-finder",
            github: "https://github.com/yourusername/recipe-finder"
        }
    ];
}

// === RENDER PROJECTS ===
function renderProjects(projects, container) {
    container.innerHTML = '';
    
    projects.forEach(project => {
        const projectCard = createProjectCard(project);
        container.appendChild(projectCard);
    });
    
    // Add animation to project cards
    animateProjectCards();
}

// === CREATE PROJECT CARD ===
function createProjectCard(project) {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.setAttribute('role', 'article');
    card.setAttribute('aria-labelledby', `project-title-${project.id}`);
    
    const stackTags = project.stack.map(tech => 
        `<span class="stack-tag">${tech}</span>`
    ).join('');
    
    card.innerHTML = `
        <img 
            src="${project.thumbnail}" 
            alt="Screenshot of ${project.title} project"
            class="project-thumbnail"
            onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
        >
        <div class="project-thumbnail-placeholder" style="display: none; height: 200px; background: linear-gradient(135deg, var(--primary-light), var(--accent-light)); align-items: center; justify-content: center; color: var(--text-light); font-size: var(--font-size-lg);">
            Project Preview
        </div>
        <div class="project-content">
            <h3 id="project-title-${project.id}" class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-stack" role="list" aria-label="Technologies used">
                ${stackTags}
            </div>
            <div class="project-links">
                <a 
                    href="${project.liveDemo}" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    class="project-link primary"
                    aria-label="View live demo of ${project.title}"
                >
                    Live Demo
                </a>
                <a 
                    href="${project.github}" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    class="project-link secondary"
                    aria-label="View ${project.title} source code on GitHub"
                >
                    GitHub
                </a>
            </div>
        </div>
    `;
    
    return card;
}

// === SCROLL EFFECTS ===
function initScrollEffects() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    // Header background opacity on scroll
    function updateHeaderOnScroll() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        lastScrollY = currentScrollY;
    }
    
    // Throttle scroll events for better performance
    let ticking = false;
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateHeaderOnScroll();
                updateActiveNavLink();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', onScroll);
    
    // Set initial header state
    updateHeaderOnScroll();
}

// === ACTIVE NAVIGATION LINK ===
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const headerHeight = document.querySelector('.header').offsetHeight;
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 50;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// === PROJECT CARD ANIMATIONS ===
function animateProjectCards() {
    const cards = document.querySelectorAll('.project-card');
    
    // Intersection Observer for fade-in animation
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
    
    cards.forEach((card, index) => {
        // Initial state for animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        observer.observe(card);
    });
}

// === UTILITY FUNCTIONS ===

// Debounce function for performance optimization
function debounce(func, wait) {
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

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.focus();
        }
    }
});

// === ERROR HANDLING ===
window.addEventListener('error', function(e) {
    console.error('Portfolio Error:', e.error);
    // Handle any runtime errors gracefully
});

// === PERFORMANCE OPTIMIZATION ===
// Preload critical images
function preloadImages() {
    const criticalImages = [
        'images/placeholder.jpg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize image preloading
preloadImages();

// === ACCESSIBILITY ENHANCEMENTS ===
// Skip to main content link
function addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#hero';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1001;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

addSkipLink();

// Announce page changes for screen readers
function announcePageChange(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.style.cssText = `
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    `;
    
    document.body.appendChild(announcement);
    announcement.textContent = message;
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    console.log('Dark mode preference detected');
}

console.log('Portfolio initialized successfully! 🎨');