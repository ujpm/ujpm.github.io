class ParticleNetwork {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.className = 'particle-network';
        document.body.appendChild(this.canvas);

        this.particles = [];
        this.particleCount = 100;
        this.mousePosition = { x: 0, y: 0 };
        this.connectionDistance = 100;

        this.initCanvas();
        this.createParticles();
        this.animate();
        this.addEventListeners();
    }

    initCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.opacity = '0.7';
    }

    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1
            });
        }
    }

    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach((particle, i) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = 'var(--accent-primary)';
            this.ctx.fill();

            // Connect particles
            for (let j = i + 1; j < this.particles.length; j++) {
                const particle2 = this.particles[j];
                const dx = particle.x - particle2.x;
                const dy = particle.y - particle2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.connectionDistance) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(particle2.x, particle2.y);
                    this.ctx.strokeStyle = `rgba(var(--accent-rgb), ${1 - distance / this.connectionDistance})`;
                    this.ctx.stroke();
                }
            }

            // Connect to mouse
            const dx = particle.x - this.mousePosition.x;
            const dy = particle.y - this.mousePosition.y;
            const mouseDistance = Math.sqrt(dx * dx + dy * dy);

            if (mouseDistance < this.connectionDistance * 1.5) {
                this.ctx.beginPath();
                this.ctx.moveTo(particle.x, particle.y);
                this.ctx.lineTo(this.mousePosition.x, this.mousePosition.y);
                this.ctx.strokeStyle = `rgba(var(--accent-rgb), ${1 - mouseDistance / (this.connectionDistance * 1.5)})`;
                this.ctx.stroke();

                // Add slight attraction to mouse
                particle.vx += dx * 0.0001;
                particle.vy += dy * 0.0001;
            }
        });
    }

    animate = () => {
        this.drawParticles();
        requestAnimationFrame(this.animate);
    }

    addEventListeners() {
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        });

        window.addEventListener('mousemove', (e) => {
            this.mousePosition.x = e.clientX;
            this.mousePosition.y = e.clientY;
        });

        // For touch devices
        window.addEventListener('touchmove', (e) => {
            this.mousePosition.x = e.touches[0].clientX;
            this.mousePosition.y = e.touches[0].clientY;
        });
    }
}

// Initialize particle network when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ParticleNetwork();
});
