class CursorEffect {
    constructor() {
        this.cursorGlow = document.getElementById('cursor-glow');
        this.init();
    }
    
    init() {
        // Track mouse movement
        document.addEventListener('mousemove', (event) => {
            this.cursorGlow.style.left = event.clientX + 'px';
            this.cursorGlow.style.top = event.clientY + 'px';
            this.cursorGlow.style.opacity = '1';
        });
        
        // Hide cursor when mouse leaves window
        document.addEventListener('mouseleave', () => {
            this.cursorGlow.style.opacity = '0';
        });
        
        // Handle link hover effects
        const links = document.querySelectorAll('.desktop-link');
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                this.cursorGlow.style.background = 'radial-gradient(circle, rgba(255, 120, 160, 0.3) 0%, rgba(255, 160, 120, 0.1) 40%, rgba(255, 160, 120, 0) 70%)';
            });
            
            link.addEventListener('mouseleave', () => {
                this.cursorGlow.style.background = 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 60%)';
            });
        });
    }
}

// Initialize cursor effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    new CursorEffect();
});