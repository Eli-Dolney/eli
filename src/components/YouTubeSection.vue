<template>
  <section class="youtube-section">
    <div class="section-container">
      <!-- Section Header -->
      <div class="section-header">
        <h2>Learning The Wires</h2>
        <p class="section-subtitle">My YouTube Journey in Game Development & Tech</p>
      </div>

      <!-- Main Content Grid -->
      <div class="content-grid">
        <!-- YouTube Channel Card -->
        <div class="youtube-card">
          <div class="card-header">
            <div class="youtube-icon">
              <i class="fab fa-youtube"></i>
            </div>
            <div class="channel-info">
              <h3>@LearningTheWires</h3>
              <p>Creating, learning, and sharing in tech</p>
            </div>
          </div>

          <div class="card-content">
            <p class="channel-description">
              Hi there! Welcome to Learning the Wires – a space where I share my journey, projects, and passions. 
              Think of this channel as a video-format resume, showcasing my work in Unreal Engine, coding, 3D printing, 
              and the topics that inspire me. From hands-on projects to thought-provoking discussions, I’m here to explore, 
              learn, and share what I love with all of you.
              <br /><br />
              Whether you’re into creative problem-solving, tech tinkering, or just looking for a spark of inspiration, 
              I’d love for you to join me on this adventure. Let’s learn, build, and connect—one wire at a time!
            </p>

            <div class="featured-content">
              <h4>What you'll find:</h4>
              <ul class="content-list">
                <li><i class="fas fa-bolt"></i> Strudel live-coding shorts</li>
                <li><i class="fas fa-cubes"></i> Unreal Engine tutorials</li>
                <li><i class="fas fa-code"></i> Programming and tooling</li>
                <li><i class="fas fa-print"></i> 3D printing builds</li>
              </ul>
            </div>

            <div class="cta-buttons">
              <a 
                href="https://www.youtube.com/@LearningTheWires" 
                target="_blank" 
                class="youtube-btn primary"
              >
                <i class="fab fa-youtube"></i>
                Subscribe to Channel
              </a>
              <a 
                href="https://www.youtube.com/@LearningTheWires" 
                target="_blank" 
                class="youtube-btn secondary"
              >
                <i class="fas fa-play"></i>
                Watch Latest Video
              </a>
            </div>
          </div>
        </div>

        <!-- Featured Videos Card -->
        <div class="journey-card featured-card">
          <div class="card-header">
            <div class="journey-icon">
              <i class="fas fa-play"></i>
            </div>
            <div class="journey-info">
              <h3>Featured Videos</h3>
              <p>Curated highlights from the channel</p>
            </div>
          </div>

          <div class="card-content">
            <div class="video-group">
              <h4 class="group-title">Strudel Live Coding Shorts</h4>
              <div class="video-carousel">
                <button class="carousel-btn left" @click="scrollTrack('shortsTrack', -1)" aria-label="Scroll left">
                  <i class="fas fa-chevron-left"></i>
                </button>
                <div class="carousel-track" ref="shortsTrack">
                  <a 
                    v-for="video in shorts" 
                    :key="video.id" 
                    class="mini-video-card" 
                    :href="video.url" 
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img class="mini-thumb" :src="getThumb(video.id)" :alt="video.title" />
                    <span class="badge short">Short</span>
                    <div class="mini-overlay"></div>
                    <div class="mini-info">
                      <h5>{{ video.title }}</h5>
                    </div>
                  </a>
                </div>
                <button class="carousel-btn right" @click="scrollTrack('shortsTrack', 1)" aria-label="Scroll right">
                  <i class="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>

            <div class="video-group">
              <h4 class="group-title">Popular Unreal Engine Tutorials</h4>
              <div class="video-carousel">
                <button class="carousel-btn left" @click="scrollTrack('tutorialsTrack', -1)" aria-label="Scroll left">
                  <i class="fas fa-chevron-left"></i>
                </button>
                <div class="carousel-track" ref="tutorialsTrack">
                  <a 
                    v-for="video in tutorials" 
                    :key="video.id" 
                    class="mini-video-card" 
                    :href="video.url" 
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img class="mini-thumb" :src="getThumb(video.id)" :alt="video.title" />
                    <span class="badge tutorial">Tutorial</span>
                    <div class="mini-overlay"></div>
                    <div class="mini-info">
                      <h5>{{ video.title }}</h5>
                    </div>
                  </a>
                </div>
                <button class="carousel-btn right" @click="scrollTrack('tutorialsTrack', 1)" aria-label="Scroll right">
                  <i class="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Latest Video Preview -->
      <div class="video-preview">
        <div class="preview-header">
          <h3>Latest from the Channel</h3>
          <a 
            href="https://www.youtube.com/@LearningTheWires" 
            target="_blank" 
            class="view-all-btn"
          >
            View All Videos
            <i class="fas fa-arrow-right"></i>
          </a>
        </div>
        
        <div class="video-grid">
          <a 
            v-for="video in allVideos" 
            :key="video.id" 
            class="video-card" 
            :href="video.url" 
            target="_blank"
            rel="noopener noreferrer"
          >
            <div class="video-thumbnail">
              <img :src="getThumb(video.id)" :alt="video.title" class="thumb-img" />
              <div class="play-overlay">
                <i class="fas fa-play"></i>
              </div>
            </div>
            <div class="video-info">
              <h4>{{ video.title }}</h4>
              <p>{{ video.subtitle }}</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'YouTubeSection',
  data() {
    return {
      shorts: [
        { id: 'GiAGvvrKEBQ', url: 'https://youtube.com/shorts/GiAGvvrKEBQ', title: 'Strudel Live Coding #1' },
        { id: 'brey2y16XO8', url: 'https://youtube.com/shorts/brey2y16XO8', title: 'Strudel Live Coding #2' },
        { id: 'JVr-RsZOXV8', url: 'https://youtube.com/shorts/JVr-RsZOXV8', title: 'Strudel Live Coding #3' }
      ],
      tutorials: [
        { id: 'uPBHHolkP0c', url: 'https://youtu.be/uPBHHolkP0c', title: 'Unreal Engine Tutorial #1', subtitle: 'Popular tutorial' },
        { id: 'GVKKDot8SpM', url: 'https://youtu.be/GVKKDot8SpM', title: 'Unreal Engine Tutorial #2', subtitle: 'Popular tutorial' },
        { id: 'FqkS6Ke0ouE', url: 'https://youtu.be/FqkS6Ke0ouE', title: 'Unreal Engine Tutorial #3', subtitle: 'Popular tutorial' },
        { id: 'jj0B74qkooM', url: 'https://youtu.be/jj0B74qkooM', title: 'Unreal Engine Tutorial #4', subtitle: 'Popular tutorial' },
        { id: 'f_nuCzeWFYY', url: 'https://youtu.be/f_nuCzeWFYY', title: 'Unreal Engine Tutorial #5', subtitle: 'Popular tutorial' }
      ]
    };
  },
  computed: {
    allVideos() {
      // Show tutorials first, then shorts
      return [...this.tutorials, ...this.shorts];
    }
  },
  methods: {
    getThumb(id) {
      return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
    },
    scrollTrack(refName, direction) {
      const track = this.$refs[refName];
      if (!track) return;
      const card = track.querySelector('.mini-video-card');
      const delta = card ? (card.getBoundingClientRect().width + 16) : 240;
      track.scrollBy({ left: direction * delta, behavior: 'smooth' });
    }
  }
}
</script>

<style scoped>
.youtube-section {
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%);
  padding: 6rem 0;
  position: relative;
  overflow: hidden;
}

.youtube-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(219, 46, 242, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(85, 150, 255, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.section-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
}

/* Section Header */
.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-header h2 {
  font-size: 3rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #db2ef2, #5596ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-subtitle {
  font-size: 1.2rem;
  color: #b0b0b0;
  margin: 0;
}

/* Content Grid */
.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 4rem;
}

/* YouTube Card */
.youtube-card, .journey-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.youtube-card:hover, .journey-card:hover {
  transform: translateY(-5px);
  border-color: rgba(219, 46, 242, 0.3);
  box-shadow: 0 20px 40px rgba(219, 46, 242, 0.1);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.youtube-icon, .journey-icon {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  color: white;
}

.youtube-icon {
  background: linear-gradient(135deg, #ff0000, #cc0000);
}

.journey-icon {
  background: linear-gradient(135deg, #db2ef2, #5596ff);
}

.channel-info h3, .journey-info h3 {
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.channel-info p, .journey-info p {
  color: #b0b0b0;
  margin: 0;
  font-size: 0.9rem;
}

.card-content {
  color: #e0e0e0;
}

/* Featured videos groups */
.featured-card { 
  overflow: hidden; /* keep inner carousel within rounded card */
}
.featured-card .video-group {
  margin-bottom: 1.5rem;
}

.group-title {
  color: white;
  margin: 0 0 0.8rem 0;
  font-size: 1.05rem;
}

/* Carousel */
.video-carousel {
  position: relative;
}

.carousel-track {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: clamp(240px, 30vw, 360px);
  gap: 1rem;
  overflow-x: auto;
  padding: 0.25rem 2.25rem 0.75rem; /* room for arrows so last item is fully visible */
  scroll-snap-type: x mandatory;
  scroll-padding-inline: 2.25rem; /* ensure first/last snap fully in view */
}

.carousel-track::-webkit-scrollbar {
  height: 6px;
}
.carousel-track::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 36px;
  width: 36px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(0, 0, 0, 0.25);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  transition: all 0.2s ease;
  backdrop-filter: blur(6px);
}

.carousel-btn:hover { 
  transform: translateY(-50%) scale(1.05);
  border-color: rgba(219, 46, 242, 0.35);
}

.carousel-btn.left { left: 0.5rem; }
.carousel-btn.right { right: 0.5rem; }

.mini-video-card {
  position: relative;
  display: block;
  border-radius: 14px;
  overflow: hidden;
  scroll-snap-align: start;
  text-decoration: none;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.03);
  box-shadow: 0 8px 24px rgba(0,0,0,0.25);
}

.mini-thumb {
  width: 100%;
  height: 120px;
  object-fit: cover;
  display: block;
}

.mini-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0.0) 60%);
}

.mini-info {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.6rem 0.75rem;
}

.mini-info h5 {
  margin: 0;
  color: #fff;
  font-size: 0.95rem;
  line-height: 1.2;
}

.badge {
  position: absolute;
  top: 8px;
  left: 8px;
  font-size: 0.7rem;
  padding: 0.2rem 0.45rem;
  border-radius: 999px;
  color: #fff;
  background: rgba(0, 0, 0, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.15);
}
.badge.short { background: linear-gradient(135deg, #8a2be2, #4d208c); }
.badge.tutorial { background: linear-gradient(135deg, #db2ef2, #5596ff); }

.channel-description {
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.featured-content h4 {
  color: white;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.content-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.content-list li {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 0.8rem;
  color: #b0b0b0;
}

.content-list i {
  color: #db2ef2;
  width: 16px;
}

/* CTA Buttons */
.cta-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.youtube-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.youtube-btn.primary {
  background: linear-gradient(135deg, #ff0000, #cc0000);
  color: white;
}

.youtube-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 0, 0, 0.3);
}

.youtube-btn.secondary {
  background: transparent;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.youtube-btn.secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

/* Journey Timeline */
.journey-timeline {
  margin-bottom: 2rem;
}

.timeline-item {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  position: relative;
}

.timeline-marker {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  margin-top: 0.5rem;
  flex-shrink: 0;
}

.timeline-marker.active {
  background: linear-gradient(135deg, #db2ef2, #5596ff);
  box-shadow: 0 0 10px rgba(219, 46, 242, 0.5);
}

.timeline-content h4 {
  color: white;
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
}

.timeline-content p {
  color: #b0b0b0;
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
}

/* Journey Stats */
.journey-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 2rem;
}

.stat-item {
  text-align: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
}

.stat-number {
  display: block;
  font-size: 1.8rem;
  font-weight: 700;
  color: #db2ef2;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.8rem;
  color: #b0b0b0;
}

/* Video Preview */
.video-preview {
  margin-top: 4rem;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.preview-header h3 {
  color: white;
  font-size: 2rem;
  margin: 0;
}

.view-all-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #db2ef2;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.view-all-btn:hover {
  color: #5596ff;
  transform: translateX(5px);
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.video-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.video-card:hover {
  transform: translateY(-5px);
  border-color: rgba(219, 46, 242, 0.3);
  box-shadow: 0 15px 35px rgba(219, 46, 242, 0.1);
}

.video-thumbnail {
  position: relative;
  height: 180px;
  background: linear-gradient(135deg, #2a2a2a, #1a1a1a);
  display: flex;
  align-items: center;
  justify-content: center;
}

.thumb-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.9;
}

.play-overlay {
  width: 60px;
  height: 60px;
  background: rgba(255, 0, 0, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  transition: all 0.3s ease;
}

.video-card:hover .play-overlay {
  transform: scale(1.1);
  background: #ff0000;
}

.video-info {
  padding: 1.5rem;
}

.video-info h4 {
  color: white;
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
}

.video-info p {
  color: #b0b0b0;
  margin: 0 0 1rem 0;
  font-size: 0.9rem;
  line-height: 1.5;
}

.video-duration {
  display: inline-block;
  background: rgba(255, 255, 255, 0.1);
  color: #b0b0b0;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .section-header h2 {
    font-size: 2.5rem;
  }
  
  .video-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

@media (max-width: 768px) {
  .youtube-section {
    padding: 4rem 0;
  }
  
  .section-container {
    padding: 0 1rem;
  }
  
  .section-header h2 {
    font-size: 2rem;
  }
  
  .section-subtitle {
    font-size: 1rem;
  }
  
  .cta-buttons {
    flex-direction: column;
  }
  
  .youtube-btn {
    justify-content: center;
  }
  
  .journey-stats {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }
  
  .preview-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .preview-header h3 {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .section-header h2 {
    font-size: 1.8rem;
  }
  
  .youtube-card, .journey-card {
    padding: 1.5rem;
  }
  
  .card-header {
    flex-direction: column;
    text-align: center;
    gap: 0.8rem;
  }
  
  .youtube-icon, .journey-icon {
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
  }
  
  .video-grid {
    grid-template-columns: 1fr;
  }
}
</style> 