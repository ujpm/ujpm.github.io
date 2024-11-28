// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Theme Switching
const themeToggle = document.querySelector('.theme-toggle');
const htmlElement = document.documentElement;

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', savedTheme);

// Custom Cursor
const cursor = {
    dot: document.querySelector('.cursor-dot'),
    outline: document.querySelector('.cursor-outline'),
    init: function() {
        document.addEventListener('mousemove', (e) => {
            gsap.to(this.dot, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1
            });
            gsap.to(this.outline, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.5
            });
        });
    }
};
cursor.init();

// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    gsap.to(loadingScreen, {
        opacity: 0,
        duration: 1,
        onComplete: () => {
            loadingScreen.style.display = 'none';
            initAnimations();
        }
    });
});

// 3D Background with Three.js
function initThreeBackground() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.querySelector('.hero').appendChild(renderer.domElement);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 5;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.005,
        color: '#4fd1c5'
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 3;

    // Animation
    function animate() {
        requestAnimationFrame(animate);
        particlesMesh.rotation.y += 0.001;
        renderer.render(scene, camera);
    }
    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Skills Sphere
function initSkillsSphere() {
    const skills = [
        'JavaScript', 'Python', 'React', 'Node.js', 'Three.js',
        'AI', 'Machine Learning', 'Healthcare', 'Biomedical',
        'Data Analysis', 'Web Development', 'Research'
    ];

    const tagCloud = TagCloud('.skills-3d', skills, {
        radius: 200,
        maxSpeed: 'fast',
        initSpeed: 'fast',
        direction: 135,
        keep: true
    });
}

// Scroll Animations
function initScrollAnimations() {
    // Fade in sections
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'top 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Animate project cards
    gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.from(card, {
            opacity: 0,
            y: 100,
            rotation: 5,
            duration: 0.8,
            delay: i * 0.2,
            scrollTrigger: {
                trigger: card,
                start: 'top 85%'
            }
        });
    });

    // Parallax background
    gsap.to('.section-background', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
            trigger: '.section-background',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });
}

// Text Animations
function initTextAnimations() {
    // Glitch Text Effect
    const glitchText = document.querySelector('.glitch-text');
    let originalText = glitchText.textContent;
    let iterations = 0;

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    function glitchEffect() {
        if(iterations >= 3) return;
        
        const interval = setInterval(() => {
            glitchText.textContent = originalText
                .split('')
                .map((letter, index) => {
                    if(index < iterations) return originalText[index];
                    return letters[Math.floor(Math.random() * 26)];
                })
                .join('');
            
            if(iterations >= 3) {
                clearInterval(interval);
                glitchText.textContent = originalText;
                iterations = 0;
                setTimeout(glitchEffect, 3000);
            }
        }, 30);
        
        iterations++;
    }

    glitchEffect();

    // Typewriter Effect
    const typewriter = document.querySelector('.typewriter');
    new Typewriter(typewriter, {
        strings: ['Biomedical Laboratory Scientist', 'AI Enthusiast', 'Innovator'],
        autoStart: true,
        loop: true,
        delay: 75
    });
}

// Initialize all animations
function initAnimations() {
    initThreeBackground();
    initSkillsSphere();
    initScrollAnimations();
    initTextAnimations();
}

// About section image scroll
const imageScroll = document.querySelector('.about-images-scroll');
const scrollDots = document.querySelectorAll('.scroll-dot');
const imageItems = document.querySelectorAll('.image-item');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentImageIndex = 0;

function updateScrollDots() {
    scrollDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentImageIndex);
    });
}

function scrollToImage(index) {
    const imageItem = imageItems[index];
    imageItem.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
    });
    currentImageIndex = index;
    updateScrollDots();
}

// Navigation button handlers
function goToNextImage() {
    currentImageIndex = (currentImageIndex + 1) % imageItems.length;
    scrollToImage(currentImageIndex);
}

function goToPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + imageItems.length) % imageItems.length;
    scrollToImage(currentImageIndex);
}

// Initialize click handlers
prevBtn.addEventListener('click', goToPrevImage);
nextBtn.addEventListener('click', goToNextImage);

scrollDots.forEach((dot, index) => {
    dot.addEventListener('click', () => scrollToImage(index));
});

// Update scroll dots on manual scroll
imageScroll.addEventListener('scroll', () => {
    const scrollPosition = imageScroll.scrollLeft;
    const itemWidth = imageItems[0].offsetWidth + 32; // Including gap
    currentImageIndex = Math.round(scrollPosition / itemWidth);
    updateScrollDots();
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        goToPrevImage();
    } else if (e.key === 'ArrowRight') {
        goToNextImage();
    }
});

// Skills animation
const skillsSection = document.querySelector('.skills');
const progressBars = document.querySelectorAll('.progress-bar');
let animated = false;

function animateSkills() {
    if (animated) return;
    
    const triggerBottom = window.innerHeight * 0.8;
    const skillsTop = skillsSection.getBoundingClientRect().top;

    if (skillsTop < triggerBottom) {
        progressBars.forEach(bar => {
            bar.style.transform = `scaleX(${bar.style.width.slice(0, -1) / 100})`;
        });
        animated = true;
    }
}

window.addEventListener('scroll', animateSkills);

// Skill items hover effect
const skillItems = document.querySelectorAll('.skill-item');

skillItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const icon = item.querySelector('i');
        icon.style.transform = 'scale(1.2) rotate(360deg)';
        icon.style.transition = 'transform 0.5s ease';
    });

    item.addEventListener('mouseleave', () => {
        const icon = item.querySelector('i');
        icon.style.transform = 'scale(1) rotate(0)';
    });
});

// Three.js Background Animation
let scene, camera, renderer, particles;

function initThreeJS() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#heroCanvas'),
        alpha: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    
    const posArray = new Float32Array(particlesCount * 3);
    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 5;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.005,
        color: '#64ffda'
    });
    
    particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    camera.position.z = 3;
}

function animate() {
    requestAnimationFrame(animate);
    
    if (particles) {
        particles.rotation.y += 0.001;
        particles.rotation.x += 0.0005;
    }
    
    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Scroll Animations
function initScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate sections on scroll
    gsap.utils.toArray('section').forEach(section => {
        gsap.fromTo(section, {
            opacity: 0,
            y: 50
        }, {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "top 20%",
                scrub: 1
            }
        });
    });
}

// Glitch Text Effect
function initGlitchEffect() {
    const glitchText = document.querySelector('.glitch-text');
    
    setInterval(() => {
        glitchText.style.textShadow = `
            ${Math.random() * 10}px ${Math.random() * 10}px ${Math.random() * 10}px rgba(0,255,255,0.3),
            ${Math.random() * -10}px ${Math.random() * 10}px ${Math.random() * 10}px rgba(255,0,255,0.3),
            ${Math.random() * -10}px ${Math.random() * -10}px ${Math.random() * 10}px rgba(255,255,0,0.3)
        `;
    }, 50);
}

// Typewriter Effect
function initTypewriter() {
    const text = document.querySelector('.typewriter');
    const originalText = text.textContent;
    text.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            text.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    typeWriter();
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    // Remove loading screen
    setTimeout(() => {
        document.querySelector('.loading-screen').style.display = 'none';
    }, 1500);
    
    initThreeJS();
    animate();
    initScrollAnimations();
    initGlitchEffect();
    initTypewriter();
});
