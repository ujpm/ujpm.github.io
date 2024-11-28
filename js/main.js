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
    heroSectionAnimations();
});

// Hero Section Animations
function heroSectionAnimations() {
    const heroContent = document.querySelector('.hero-content');
    const actionCards = document.querySelectorAll('.action-card');

    // Animate hero content on load
    gsap.from(heroContent.children, {
        duration: 1,
        y: 30,
        opacity: 0,
        stagger: 0.2,
        ease: "power2.out"
    });

    // Initialize hover effect for action cards
    actionCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                duration: 0.3,
                scale: 1.05,
                boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                ease: "power2.out"
            });

            // Animate icon
            const icon = card.querySelector('i');
            gsap.to(icon, {
                duration: 0.3,
                scale: 1.2,
                rotate: 360,
                ease: "back.out(1.7)"
            });

            // Show link with animation
            const link = card.querySelector('.action-link');
            gsap.to(link, {
                duration: 0.3,
                opacity: 1,
                y: 0,
                ease: "power2.out"
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                duration: 0.3,
                scale: 1,
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                ease: "power2.out"
            });

            // Reset icon
            const icon = card.querySelector('i');
            gsap.to(icon, {
                duration: 0.3,
                scale: 1,
                rotate: 0,
                ease: "power2.out"
            });

            // Hide link
            const link = card.querySelector('.action-link');
            gsap.to(link, {
                duration: 0.3,
                opacity: 0,
                y: 20,
                ease: "power2.in"
            });
        });
    });

    // Add parallax effect to cards on mouse move
    const hero = document.querySelector('.hero');
    hero.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = hero.getBoundingClientRect();
        const x = (clientX - left) / width - 0.5;
        const y = (clientY - top) / height - 0.5;

        actionCards.forEach(card => {
            const speed = card.getAttribute('data-speed') || 20;
            gsap.to(card, {
                duration: 0.6,
                x: x * speed,
                y: y * speed,
                rotateX: -y * 10,
                rotateY: x * 10,
                ease: "power2.out"
            });
        });
    });

    // Reset cards position when mouse leaves hero section
    hero.addEventListener('mouseleave', () => {
        actionCards.forEach(card => {
            gsap.to(card, {
                duration: 0.6,
                x: 0,
                y: 0,
                rotateX: 0,
                rotateY: 0,
                ease: "power2.out"
            });
        });
    });
}

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

    // Mobile Navigation Toggle
    const navLinksContainer = document.querySelector('.nav-links');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navLinksContainer.contains(e.target)) {
            navLinksContainer.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('active');
            navToggle.classList.remove('active');
        });
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

// Action Cards Mobile Navigation
const actionCards = document.querySelector('.action-cards');
const prevButton = document.querySelector('.prev-card');
const nextButton = document.querySelector('.next-card');

if (actionCards && prevButton && nextButton) {
    let autoScrollInterval;
    const cardWidth = actionCards.querySelector('.action-card').offsetWidth;
    let currentIndex = 0;
    const totalCards = actionCards.children.length;

    // Function to scroll to a specific card
    const scrollToCard = (index) => {
        currentIndex = index;
        actionCards.scrollTo({
            left: index * cardWidth,
            behavior: 'smooth'
        });
    };

    // Auto scroll function
    const startAutoScroll = () => {
        autoScrollInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalCards;
            scrollToCard(currentIndex);
        }, 3000); // Change card every 3 seconds
    };

    // Stop auto scroll on user interaction
    const stopAutoScroll = () => {
        clearInterval(autoScrollInterval);
    };

    // Navigation button click handlers
    prevButton.addEventListener('click', () => {
        stopAutoScroll();
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        scrollToCard(currentIndex);
        setTimeout(startAutoScroll, 5000);
    });

    nextButton.addEventListener('click', () => {
        stopAutoScroll();
        currentIndex = (currentIndex + 1) % totalCards;
        scrollToCard(currentIndex);
        setTimeout(startAutoScroll, 5000);
    });

    // Touch events
    let touchStartX = 0;
    actionCards.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        stopAutoScroll();
    });

    actionCards.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > 50) { // Minimum swipe distance
            if (diff > 0) {
                currentIndex = Math.min(currentIndex + 1, totalCards - 1);
            } else {
                currentIndex = Math.max(currentIndex - 1, 0);
            }
            scrollToCard(currentIndex);
        }
        setTimeout(startAutoScroll, 5000);
    });

    // Start auto-scroll initially
    startAutoScroll();
}

// Skills Section Mobile Navigation
const skillsContainer = document.querySelector('.skills-container');
const prevSkillButton = document.querySelector('.prev-skill');
const nextSkillButton = document.querySelector('.next-skill');
const progressDots = document.querySelectorAll('.progress-dot');

if (skillsContainer && prevSkillButton && nextSkillButton) {
    let skillsAutoScrollInterval;
    const skillColumnWidth = skillsContainer.querySelector('.skills-column').offsetWidth;
    let currentSkillIndex = 0;
    const totalSkillColumns = skillsContainer.children.length;

    // Function to update progress dots
    const updateProgressDots = (index) => {
        progressDots.forEach(dot => dot.classList.remove('active'));
        progressDots[index].classList.add('active');
    };

    // Function to scroll to a specific skill column
    const scrollToSkill = (index) => {
        currentSkillIndex = index;
        skillsContainer.scrollTo({
            left: index * skillColumnWidth,
            behavior: 'smooth'
        });
        updateProgressDots(index);
    };

    // Auto scroll function for skills
    const startSkillsAutoScroll = () => {
        skillsAutoScrollInterval = setInterval(() => {
            currentSkillIndex = (currentSkillIndex + 1) % totalSkillColumns;
            scrollToSkill(currentSkillIndex);
        }, 4000); // Change skill category every 4 seconds
    };

    // Stop auto scroll on user interaction
    const stopSkillsAutoScroll = () => {
        clearInterval(skillsAutoScrollInterval);
    };

    // Navigation button click handlers
    prevSkillButton.addEventListener('click', () => {
        stopSkillsAutoScroll();
        currentSkillIndex = (currentSkillIndex - 1 + totalSkillColumns) % totalSkillColumns;
        scrollToSkill(currentSkillIndex);
        setTimeout(startSkillsAutoScroll, 5000);
    });

    nextSkillButton.addEventListener('click', () => {
        stopSkillsAutoScroll();
        currentSkillIndex = (currentSkillIndex + 1) % totalSkillColumns;
        scrollToSkill(currentSkillIndex);
        setTimeout(startSkillsAutoScroll, 5000);
    });

    // Progress dots click handlers
    progressDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopSkillsAutoScroll();
            scrollToSkill(index);
            setTimeout(startSkillsAutoScroll, 5000);
        });
    });

    // Touch events for skills
    let skillsTouchStartX = 0;
    skillsContainer.addEventListener('touchstart', (e) => {
        skillsTouchStartX = e.touches[0].clientX;
        stopSkillsAutoScroll();
    });

    skillsContainer.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = skillsTouchStartX - touchEndX;

        if (Math.abs(diff) > 50) { // Minimum swipe distance
            if (diff > 0) {
                currentSkillIndex = Math.min(currentSkillIndex + 1, totalSkillColumns - 1);
            } else {
                currentSkillIndex = Math.max(currentSkillIndex - 1, 0);
            }
            scrollToSkill(currentSkillIndex);
        }
        setTimeout(startSkillsAutoScroll, 5000);
    });

    // Start auto-scroll initially
    startSkillsAutoScroll();
}
