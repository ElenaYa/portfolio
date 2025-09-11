document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initSmoothScrolling();
    loadProjects();
    initScrollEffects();
});

function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        const isExpanded = navMenu.classList.contains('active');
        navToggle.setAttribute('aria-expanded', isExpanded);
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });

    navToggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            navToggle.click();
        }
    });
}

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

async function loadProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    
    try {
        const response = await fetch('projects.json');
        let projects;
        
        if (response.ok) {
            projects = await response.json();
        } else {
            projects = getSampleProjects();
        }
        
        renderProjects(projects, projectsGrid);
        
    } catch (error) {
        console.log('Loading sample projects data...');
        const projects = getSampleProjects();
        renderProjects(projects, projectsGrid);
    }
}

function getSampleProjects() {
    return [
        {
            id: 1,
            title: "Information service about rinos in Argentina",
            description: "A responsive admin dashboard for managing products, orders, and customer data with real-time analytics and beautiful data visualizations.",
            thumbnail: "images/project1.webp",
            stack: ["HTML", "CSS", "JavaScript", "Bootstrap"],
            liveDemo: "https://elenaya.github.io/cosmocores"
        },
        {
            id: 2,
            title: "Weather App",
            description: "A clean and intuitive weather application featuring location-based forecasts, interactive maps, and beautiful weather animations.",
            thumbnail: "images/placeholder.jpg",
            stack: ["HTML", "CSS", "JavaScript", "API"],
            liveDemo: "https://yourusername.github.io/weather-app"
        },
        {
            id: 3,
            title: "Task Management Tool",
            description: "A productivity-focused task manager with drag-and-drop functionality, project organization, and collaborative features.",
            thumbnail: "images/placeholder.jpg",
            stack: ["HTML", "CSS", "JavaScript", "Local Storage"],
            liveDemo: "https://yourusername.github.io/task-manager"
        },
        {
            id: 4,
            title: "Recipe Finder",
            description: "A culinary companion that helps users discover recipes based on ingredients, dietary preferences, and cooking time.",
            thumbnail: "images/placeholder.jpg",
            stack: ["HTML", "CSS", "JavaScript", "Recipe API"],
            liveDemo: "https://yourusername.github.io/recipe-finder"
        }
    ];
}

function renderProjects(projects, container) {
    container.innerHTML = '';
    
    projects.forEach(project => {
        const projectCard = createProjectCard(project);
        container.appendChild(projectCard);
    });
    
    initProjectObserver();
}

function createProjectCard(project) {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.setAttribute('role', 'article');
    card.setAttribute('aria-labelledby', `project-title-${project.id}`);
    
    const stackTags = project.stack.map(tech => 
        `<span class="stack-tag">${tech}</span>`
    ).join('');
    
    card.innerHTML = `
        <div class="project-preview" data-url="${project.liveDemo}">
            <iframe 
                class="project-iframe" 
                loading="lazy"
                sandbox="allow-same-origin allow-scripts allow-forms"
                referrerpolicy="no-referrer"
                title="Live preview of ${project.title}"
                aria-label="Interactive preview of ${project.title} project"
            ></iframe>
            <div class="project-fallback" style="background-image: url('${project.thumbnail}')">
                <div class="fallback-overlay">
                    <div class="fallback-text">🔗 Open Live Demo</div>
                </div>
            </div>
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
            </div>
        </div>
    `;
    
    return card;
}

function initProjectObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const preview = entry.target;
                const iframe = preview.querySelector('.project-iframe');
                const fallback = preview.querySelector('.project-fallback');
                const url = preview.getAttribute('data-url');
                
                if (url && !iframe.src) {
                    loadIframeWithFallback(iframe, fallback, url);
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    document.querySelectorAll('.project-preview').forEach(preview => {
        observer.observe(preview);
    });
}

function loadIframeWithFallback(iframe, fallback, url) {
    const timeoutDuration = 5000;
    let hasLoaded = false;
    
    const timeout = setTimeout(() => {
        if (!hasLoaded) {
            showFallback(iframe, fallback);
        }
    }, timeoutDuration);
    
    iframe.addEventListener('load', () => {
        hasLoaded = true;
        clearTimeout(timeout);
        iframe.style.display = 'block';
        fallback.classList.remove('active');
    });
    
    iframe.addEventListener('error', () => {
        hasLoaded = true;
        clearTimeout(timeout);
        showFallback(iframe, fallback);
    });
    
    iframe.src = url;
}

function showFallback(iframe, fallback) {
    iframe.style.display = 'none';
    fallback.classList.add('active');
}

function initScrollEffects() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
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
    updateHeaderOnScroll();
}

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

document.addEventListener('keydown', function(e) {
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

window.addEventListener('error', function(e) {
    console.error('Portfolio Error:', e.error);
});

function preloadImages() {
    const criticalImages = [
        'images/placeholder.jpg',
        'images/backgrounds/hero-bg.jpg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

preloadImages();

function addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
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