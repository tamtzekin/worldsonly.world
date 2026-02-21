class WinampPlayer {
    constructor() {
        this.audio = document.getElementById('audio-player');
        this.display = document.getElementById('track-display');
        this.volumeSlider = document.getElementById('volume-slider');
        this.volumeFill = document.getElementById('volume-fill');
        this.player = document.querySelector('.winamp-player');
        this.titleBar = document.querySelector('.winamp-title');
        
        this.playlist = [];
        this.currentTrack = 0;
        this.isPlaying = false;
        this.volume = 0.7;
        
        // Dragging state
        this.isDragging = false;
        this.dragOffset = { x: 0, y: 0 };
        
        this.init();
    }
    
    init() {
        this.setupControls();
        this.setupVolume();
        this.setupDragging();
        this.updateDisplay();
        
        // Set initial volume
        this.audio.volume = this.volume;
        this.updateVolumeDisplay();
    }
    
    setupControls() {
        document.getElementById('play-btn').addEventListener('click', () => this.play());
        document.getElementById('pause-btn').addEventListener('click', () => this.pause());
        document.getElementById('stop-btn').addEventListener('click', () => this.stop());
        document.getElementById('prev-btn').addEventListener('click', () => this.previousTrack());
        document.getElementById('next-btn').addEventListener('click', () => this.nextTrack());
        
        this.audio.addEventListener('timeupdate', () => this.updateDisplay());
        this.audio.addEventListener('ended', () => this.nextTrack());
    }
    
    setupVolume() {
        this.volumeSlider.addEventListener('click', (e) => {
            const rect = this.volumeSlider.getBoundingClientRect();
            const x = e.clientX - rect.left;
            this.volume = x / rect.width;
            this.volume = Math.max(0, Math.min(1, this.volume));
            this.audio.volume = this.volume;
            this.updateVolumeDisplay();
        });
    }
    
    setupDragging() {
        this.titleBar.addEventListener('mousedown', (e) => {
            this.isDragging = true;
            const rect = this.player.getBoundingClientRect();
            this.dragOffset.x = e.clientX - rect.left;
            this.dragOffset.y = e.clientY - rect.top;
            
            document.addEventListener('mousemove', this.handleDrag);
            document.addEventListener('mouseup', this.handleDragEnd);
            e.preventDefault();
        });
    }
    
    handleDrag = (e) => {
        if (!this.isDragging) return;
        
        const newX = e.clientX - this.dragOffset.x;
        const newY = e.clientY - this.dragOffset.y;
        
        this.player.style.position = 'fixed';
        this.player.style.left = newX + 'px';
        this.player.style.top = newY + 'px';
        this.player.style.transform = 'none';
    }
    
    handleDragEnd = () => {
        if (!this.isDragging) return;
        
        this.isDragging = false;
        document.removeEventListener('mousemove', this.handleDrag);
        document.removeEventListener('mouseup', this.handleDragEnd);
    }
    
    updateVolumeDisplay() {
        this.volumeFill.style.width = (this.volume * 100) + '%';
    }
    
    updateDisplay() {
        if (this.playlist.length === 0) {
            this.display.textContent = 'WORLDS ONLY - NO TRACKS LOADED ***';
            return;
        }
        
        const track = this.playlist[this.currentTrack];
        const currentTime = this.formatTime(this.audio.currentTime);
        const duration = this.audio.duration ? this.formatTime(this.audio.duration) : '--:--';
        
        const status = this.isPlaying ? '▶' : this.audio.paused ? '⏸' : '⏹';
        this.display.textContent = `${track.title} — ${status} ${currentTime}/${duration}`;
    }
    
    formatTime(seconds) {
        if (isNaN(seconds)) return '--:--';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    
    loadPlaylist(tracks) {
        this.playlist = tracks;
        this.currentTrack = 0;
        this.loadCurrentTrack();
    }
    
    loadCurrentTrack() {
        if (this.playlist.length === 0) return;
        
        const track = this.playlist[this.currentTrack];
        this.audio.src = track.url;
        this.updateDisplay();
    }
    
    play() {
        if (this.playlist.length === 0) return;
        
        this.audio.play();
        this.isPlaying = true;
        this.updateDisplay();
    }
    
    pause() {
        this.audio.pause();
        this.isPlaying = false;
        this.updateDisplay();
    }
    
    stop() {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.isPlaying = false;
        this.updateDisplay();
    }
    
    nextTrack() {
        if (this.playlist.length === 0) return;
        
        this.currentTrack = (this.currentTrack + 1) % this.playlist.length;
        this.loadCurrentTrack();
        if (this.isPlaying) {
            this.play();
        }
    }
    
    previousTrack() {
        if (this.playlist.length === 0) return;
        
        this.currentTrack = (this.currentTrack - 1 + this.playlist.length) % this.playlist.length;
        this.loadCurrentTrack();
        if (this.isPlaying) {
            this.play();
        }
    }
}

// Initialize player when page loads
document.addEventListener('DOMContentLoaded', () => {
    const player = new WinampPlayer();
    
    // Load the full album playlist
    const playlist = [
        { title: '𝔠𝔞𝔰𝔱', url: 'trax/01 Cast.mp3' },
        { title: '𝔰𝔱𝔦𝔩𝔩 𝔞 𝔩𝔦𝔤𝔥𝔱', url: 'trax/02 Still a light.mp3' },
        { title: '𝔱𝔥𝔯𝔦𝔠𝔢', url: 'trax/03 Thrice.mp3' },
        { title: '𝔟𝔞𝔲𝔥𝔞𝔲𝔰', url: 'trax/04 Bauhaus.mp3' },
        { title: '𝔲𝔫𝔣𝔬𝔯𝔤𝔢𝔱𝔱𝔞𝔟𝔩𝔢', url: 'trax/05 Unforgettable.mp3' },
        { title: '𝔱𝔥𝔦𝔰 𝔠𝔬𝔲𝔩𝔡 𝔟𝔢', url: 'trax/06 This could be.mp3' },
        { title: '𝔰𝔱𝔯𝔞𝔫𝔤𝔢𝔯 𝔦𝔫𝔰𝔭𝔢𝔠𝔱𝔦𝔬𝔫', url: 'trax/07 Stranger inspection.mp3' },
        { title: '𝔩𝔬𝔰𝔱 𝔞𝔫𝔡 𝔰𝔞𝔳𝔢𝔡', url: 'trax/08 Lost and saved.mp3' },
        { title: '𝔟𝔲𝔪𝔟𝔞𝔤', url: 'trax/09 Bumbag.mp3' },
        { title: '𝔴𝔬𝔲𝔩𝔡 𝔶𝔬𝔲 𝔩𝔢𝔞𝔳𝔢 𝔶𝔬𝔲𝔯𝔰𝔢𝔩𝔣', url: 'trax/10 Would you leave yourself.mp3' }
    ];
    
    player.loadPlaylist(playlist);
    
    // Make player globally accessible for file loading
    window.winampPlayer = player;
});