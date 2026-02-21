class CursorEffect {
    constructor() {
        this.cursorGlow = document.getElementById('cursor-glow');
        this.mouseX = 0;
        this.mouseY = 0;
        this.isOverInteractive = false;
        this.hasMousePosition = false;
        this.init();
    }

    init() {
        // Position via left/top + translate(-50%,-50%) so it always shrinks from centre
        this.cursorGlow.style.position = 'fixed';
        this.cursorGlow.style.transform = 'translate(-50%, -50%)';
        this.cursorGlow.style.borderRadius = '50%';
        this.cursorGlow.style.opacity = '0';
        this.cursorGlow.style.transition = 'none';
        this.cursorGlow.style.pointerEvents = 'none';

        document.addEventListener('mousemove', (event) => {
            this.mouseX = event.clientX;
            this.mouseY = event.clientY;

            this.cursorGlow.style.left = this.mouseX + 'px';
            this.cursorGlow.style.top = this.mouseY + 'px';

            if (!this.hasMousePosition) {
                this.hasMousePosition = true;
                requestAnimationFrame(() => {
                    this.cursorGlow.style.transition = 'width 0.7s ease, height 0.7s ease, filter 0.7s ease, opacity 0.4s ease';
                    this.cursorGlow.style.opacity = '1';
                });
            }
        });

        document.addEventListener('mouseleave', () => {
            this.cursorGlow.style.opacity = '0';
        });

        document.addEventListener('mouseenter', () => {
            if (this.hasMousePosition) this.cursorGlow.style.opacity = '1';
        });

        // Start in large glow state
        this.applyGlowStyle();

        // Interactive zones: shrink glow to a dot
        const interactiveSelectors = [
            '.winamp-player',
            '.signup-form',
            '.bottom-nav a',
        ];

        interactiveSelectors.forEach(sel => {
            document.querySelectorAll(sel).forEach(el => {
                el.addEventListener('mouseenter', () => {
                    if (this.isOverInteractive) return;
                    this.isOverInteractive = true;
                    this.showDot();
                });

                el.addEventListener('mouseleave', (e) => {
                    const related = e.relatedTarget;
                    const stillInteractive = related && (
                        related.closest('.winamp-player') ||
                        related.closest('.signup-form') ||
                        related.closest('.bottom-nav')
                    );
                    if (stillInteractive) return;
                    this.isOverInteractive = false;
                    this.showGlow();
                });
            });
        });
    }

    applyGlowStyle() {
        this.cursorGlow.style.width = '200px';
        this.cursorGlow.style.height = '200px';
        this.cursorGlow.style.background = 'radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 60%)';
        this.cursorGlow.style.filter = 'blur(8px)';
    }

    showGlow() {
        this.cursorGlow.style.transition = 'width 0.7s ease, height 0.7s ease, filter 0.7s ease, opacity 0.4s ease';
        this.applyGlowStyle();
    }

    showDot() {
        this.cursorGlow.style.transition = 'width 0.7s ease, height 0.7s ease, filter 0.7s ease, opacity 0.4s ease';
        this.cursorGlow.style.width = '14px';
        this.cursorGlow.style.height = '14px';
        this.cursorGlow.style.background = 'radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 100%)';
        this.cursorGlow.style.filter = 'blur(3px)';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new CursorEffect();
});
