// Project Data
const projects = [
    {
        title: 'MicroSmart',
        description: 'AI-powered microscopic entity analysis platform for medical laboratories.',
        image: 'graphics/microsmart-preview.jpg',
        category: 'healthcare',
        technologies: ['Python', 'TensorFlow', 'OpenCV'],
        link: '#'
    },
    {
        title: 'Newsfella',
        description: 'Automated news curation and email delivery system with AI-driven content selection.',
        image: 'graphics/newsfella-preview.jpg',
        category: 'ai',
        technologies: ['Node.js', 'MongoDB', 'NLP'],
        link: '#'
    },
    {
        title: 'Medimate',
        description: 'Healthcare management platform integrating patient records and laboratory results.',
        image: 'graphics/medimate-preview.jpg',
        category: 'healthcare',
        technologies: ['React', 'Node.js', 'PostgreSQL'],
        link: '#'
    }
];

// Initialize the portfolio
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    populateProjects();
    initializeFilters();
    initializeContactForm();
});

// Smooth Scrolling Navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navToggle = document.querySelector('.nav-toggle');
    const navContainer = document.querySelector('.nav-links');

    // Smooth scroll
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: targetSection,
                    offsetY: 70
                },
                ease: 'power2.inOut'
            });

            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navContainer.style.display = 'none';
            }
        });
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navContainer.style.display = 
            navContainer.style.display === 'flex' ? 'none' : 'flex';
    });

    // Update active link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Populate Projects
function populateProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = `project-card ${project.category}`;
        
        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
                <div class="project-overlay">
                    <div class="project-links">
                        <a href="${project.link}" class="project-link">
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                        <a href="#" class="project-details">
                            <i class="fas fa-info-circle"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => 
                        `<span class="tech-tag">${tech}</span>`
                    ).join('')}
                </div>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });
}

// Initialize Project Filters
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all' || card.classList.contains(filter)) {
                    gsap.to(card, {
                        scale: 1,
                        opacity: 1,
                        duration: 0.3
                    });
                } else {
                    gsap.to(card, {
                        scale: 0.8,
                        opacity: 0,
                        duration: 0.3
                    });
                }
            });
        });
    });
}

// Contact Form Handling
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = form.querySelector('.submit-btn');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Show success message
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
            form.reset();

            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
            }, 3000);
        }, 2000);
    });
}

// Handle scroll animations
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop - window.innerHeight / 2;
        if (scrolled >= sectionTop) {
            section.classList.add('in-view');
        }
    });
});
