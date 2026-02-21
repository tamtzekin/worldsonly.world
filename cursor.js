class CursorEffect {
    constructor() {
        this.cursorGlow = document.getElementById('cursor-glow');
        this.mouseX = 0;
        this.mouseY = 0;
        this.currentSize = 200; // Track current size for centering
        this.init();
    }
    
    init() {
        // Track mouse movement but keep glow hidden by default
        document.addEventListener('mousemove', (event) => {
            // Store mouse position for centering
            this.mouseX = event.clientX;
            this.mouseY = event.clientY;
            this.updateCursorPosition();
        });
        
        // Hide cursor when mouse leaves window
        document.addEventListener('mouseleave', () => {
            this.cursorGlow.style.opacity = '0';
        });
        
        // Handle player hover effects
        const player = document.querySelector('.winamp-player');
        player.addEventListener('mouseenter', () => {
            this.cursorGlow.style.opacity = '1';
            this.currentSize = 200;
            this.cursorGlow.style.width = '200px';
            this.cursorGlow.style.height = '200px';
            this.cursorGlow.style.filter = 'blur(8px)';
            this.cursorGlow.style.background = 'radial-gradient(circle, rgba(255, 198, 207, 0.3) 0%, rgba(255, 179, 193, 0.1) 40%, rgba(255, 179, 193, 0) 70%)';
            this.updateCursorPosition();
        });
        
        player.addEventListener('mouseleave', () => {
            this.cursorGlow.style.opacity = '0';
        });
        
        // Handle navigation link hover effects
        const navLinks = document.querySelectorAll('.bottom-nav a');
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                // Get the link's position
                const rect = link.getBoundingClientRect();
                const linkCenterX = rect.left + rect.width / 2;
                const linkCenterY = rect.top + rect.height / 2;
                
                this.cursorGlow.style.opacity = '1';
                this.currentSize = 40;
                this.cursorGlow.style.width = '40px';
                this.cursorGlow.style.height = '40px';
                this.cursorGlow.style.filter = 'blur(2px)';
                this.cursorGlow.style.background = 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.3) 30%, rgba(255, 255, 255, 0) 60%)';
                
                // Position on the link center instead of mouse
                const offsetX = linkCenterX - (this.currentSize / 2);
                const offsetY = linkCenterY - (this.currentSize / 2);
                this.cursorGlow.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            });
            
            link.addEventListener('mouseleave', () => {
                // Keep visible while growing back to original size
                this.cursorGlow.style.opacity = '1';
                this.currentSize = 200;
                this.cursorGlow.style.width = '200px';
                this.cursorGlow.style.height = '200px';
                this.cursorGlow.style.filter = 'blur(8px)';
                this.cursorGlow.style.background = 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 60%)';
                this.updateCursorPosition(); // Back to mouse position
                
                // Then fade out smoothly
                setTimeout(() => {
                    this.cursorGlow.style.opacity = '0';
                }, 300); // Longer delay to show the full growth animation
            });
        });
    }
    
    updateCursorPosition() {
        // Center the cursor based on current size
        const offsetX = this.mouseX - (this.currentSize / 2);
        const offsetY = this.mouseY - (this.currentSize / 2);
        this.cursorGlow.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    }
}

// Initialize cursor effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    new CursorEffect();
});