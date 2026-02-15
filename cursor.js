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
        
        // Handle player hover effects
        const player = document.querySelector('.winamp-player');
        player.addEventListener('mouseenter', () => {
            this.cursorGlow.style.background = 'radial-gradient(circle, rgba(255, 198, 207, 0.3) 0%, rgba(255, 179, 193, 0.1) 40%, rgba(255, 179, 193, 0) 70%)';
        });
        
        player.addEventListener('mouseleave', () => {
            this.cursorGlow.style.background = 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 60%)';
        });
    }
}

// Initialize cursor effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    new CursorEffect();
});