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

function loadProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    const projects = getSampleProjects();
    renderProjects(projects, projectsGrid);
}

function getSampleProjects() {
    return [
        {
            id: 1,
            title: "Rinocerontes Argentina",
            description: "Information service about rinos in Argentina",
            thumbnail: "images/project1.webp",
            stack: ["HTML", "CSS", "JavaScript", "Bootstrap"],
            liveDemo: "https://elenaya.github.io/cosmocores"
        },
        {
            id: 2,
            title: "Ziravox VR Kulübüne Hoş Geldiniz",
            description: "A clean and intuitive VR club website.",
            thumbnail: "images/project2.webp",
            stack: ["HTML", "CSS", "JavaScript", "Bootstrap"],
            liveDemo: "https://elenaya.github.io/ziravox"
        },
        {
            id: 3,
            title: "Pixelbird Club",
            description: "Website of the game development school and service platform by Ukrainian developers.",
            thumbnail: "images/project3.webp",
            stack: ["HTML", "CSS", "JavaScript", "Bootstrap"],
            liveDemo: "https://elenaya.github.io/pixelbird.club"
        },
        {
            id: 4,
            title: "Turkish Gaming Platform",
            description: "A gaming platform website for Turkey providing game reviews, community features, and esports coverage.",
            thumbnail: "images/project4.webp",
            stack: ["HTML", "CSS", "JavaScript"],
            liveDemo: "https://elenaya.github.io/savilix"
        },
        {
            id: 5,
            title: "Solar Energy Mexico",
            description: "A website about solar energy solutions and renewable power initiatives in Mexico.",
            thumbnail: "images/project5.webp",
            stack: ["HTML", "CSS", "JavaScript"],
            liveDemo: "https://elenaya.github.io/fuerzassolar"
        },
        {
            id: 6,
            title: "Verde Solucion",
            description: "A website about solar energy solutions and renewable power initiatives in Mexico.",
            thumbnail: "images/project6.webp",
            stack: ["HTML", "CSS", "JavaScript"],
            liveDemo: "https://elenaya.github.io/verdesolucion"
        },
        {
            id: 7,
            title: "GameON Academy",
            description: "A website for an esports academy offering professional gaming training and competitive skills development.",
            thumbnail: "images/project7.webp",
            stack: ["HTML", "CSS", "JavaScript"],
            liveDemo: "https://elenaya.github.io/dexorim"
        },
        {
            id: 8,
            title: "Zentrolix",
            description: "A website about cloud gaming services, offering information about game streaming platforms and cloud-based gaming solutions.",
            thumbnail: "images/project8.webp",
            stack: ["HTML", "CSS", "JavaScript", "Bootstrap"],
            liveDemo: "https://elenaya.github.io/zentrolix"
        },
        {
            id: 9,
            title: "UltrixHil Studio",
            description: "A website about mobile game development, showcasing game design principles, development tools, and best practices for creating engaging mobile games.",
            thumbnail: "images/project9.webp",
            stack: ["HTML", "CSS", "JavaScript", "Bootstrap"],
            liveDemo: "https://elenaya.github.io/ultrixhil"
        },
        {
            id: 10,
            title: "Rise Loomz ",
            description: "A website about customer service consulting experts, providing professional guidance and solutions for improving customer experience and service quality.",
            thumbnail: "images/project10.webp",
            stack: ["php", "CSS", "JavaScript"],
            liveDemo: "https://rise-loomz-com.vercel.app"
        },
        {
            id: 11,
            title: " Neuroflux Business Akademie",
            description: "A website specializing in entrepreneur training and business startup guidance, offering comprehensive support for business development and management.",
            thumbnail: "images/project11.webp",
            stack: ["HTML", "CSS", "JavaScript", "Bootstrap"],
            liveDemo: "https://elenaya.github.io/neurofluxmedia/"
        },
        {
            id: 12,
            title: "Turkish Cloud Gaming Platform",
            description: "A website for a cloud gaming platform in Turkey, providing cloud-based gaming services, virtual game streaming.",
            thumbnail: "images/project12.webp",
            stack: ["HTML", "CSS", "JavaScript", "Bootstrap"],
            liveDemo: "https://elenaya.github.io/quantalflix"
        },
        {
            id: 13,
            title: "SkilfulGamer",
            description: "A Ukrainian resource for gamers who want to make the right choice of gaming platform, providing comprehensive guidance and comparisons.",
            thumbnail: "images/project13.webp",
            stack: ["HTML", "CSS", "JavaScript", "Bootstrap"],
            liveDemo: "https://elenaya.github.io/skillfulgamer/"
        },
        {
            id: 14,
            title: "Zoravixo",
            description: "A modern platform for order automation and advanced analytics for online businesses.",
            thumbnail: "images/project14.webp",
            stack: ["HTML", "CSS", "JavaScript", "PHP"],
            liveDemo: "https://zoravixo-com.vercel.app/"
        },
        {
            id: 15,
            title: "Actavora",
            description: "A technology provider offering a browser-based platform.",
            thumbnail: "images/project15.webp",
            stack: ["HTML", "CSS", "JavaScript", "Bootstrap"],
            liveDemo: "https://elenaya.github.io/actavora/"
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
        'images/hero-bg.jpg',
        'images/about-bg.jpg',
        'images/projects-bg.jpg',
        'images/contact-bg.jpg'
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
}

