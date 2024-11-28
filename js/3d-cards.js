class ProjectCard3D {
    constructor(element) {
        this.element = element;
        this.rotation = { x: 0, y: 0 };
        this.animating = false;
        this.init();
    }

    init() {
        this.element.style.transform = 'perspective(1000px)';
        this.element.style.transition = 'transform 0.3s ease';
        this.addEventListeners();
        this.initScrollAnimation();
    }

    addEventListeners() {
        this.element.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.element.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
        this.element.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
        this.element.addEventListener('click', this.handleClick.bind(this));
    }

    handleMouseMove(e) {
        if (this.animating) return;

        const rect = this.element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const rotateY = ((mouseX - centerX) / (rect.width / 2)) * 10;
        const rotateX = ((centerY - mouseY) / (rect.height / 2)) * 10;

        this.element.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale3d(1.05, 1.05, 1.05)
        `;
    }

    handleMouseLeave() {
        this.animating = true;
        this.element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        setTimeout(() => this.animating = false, 300);
    }

    handleMouseEnter() {
        this.element.style.transition = 'transform 0.3s ease';
    }

    handleClick() {
        this.animating = true;
        this.element.style.transform = 'perspective(1000px) rotateY(180deg) scale3d(1.1, 1.1, 1.1)';
        setTimeout(() => {
            this.element.style.transform = 'perspective(1000px) rotateY(0) scale3d(1, 1, 1)';
            this.animating = false;
        }, 600);
    }

    initScrollAnimation() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.element.style.transform = 'perspective(1000px) rotateX(0) scale3d(1, 1, 1)';
                    this.element.style.opacity = '1';
                } else {
                    this.element.style.transform = 'perspective(1000px) rotateX(20deg) scale3d(0.9, 0.9, 0.9)';
                    this.element.style.opacity = '0';
                }
            });
        }, {
            threshold: 0.2
        });

        observer.observe(this.element);
    }
}

// Initialize 3D cards when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => new ProjectCard3D(card));
});
