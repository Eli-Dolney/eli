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
              <p>Game Development & Tech Tutorials</p>
            </div>
          </div>
          
          <div class="card-content">
            <p class="channel-description">
              Join me on my journey as I learn game development, explore new technologies, 
              and share insights from my studies in Network & Technology Security.
            </p>
            
            <div class="featured-content">
              <h4>Featured Content:</h4>
              <ul class="content-list">
                <li><i class="fas fa-gamepad"></i> Game Development Tutorials</li>
                <li><i class="fas fa-code"></i> Programming Challenges</li>
                <li><i class="fas fa-network-wired"></i> Networking Concepts</li>
                <li><i class="fas fa-shield-alt"></i> Security Fundamentals</li>
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

        <!-- Game Development Journey Card -->
        <div class="journey-card">
          <div class="card-header">
            <div class="journey-icon">
              <i class="fas fa-rocket"></i>
            </div>
            <div class="journey-info">
              <h3>Game Dev Journey</h3>
              <p>From Concept to Creation</p>
            </div>
          </div>
          
          <div class="card-content">
            <div class="journey-timeline">
              <div class="timeline-item">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                  <h4>Learning Fundamentals</h4>
                  <p>Mastering C++, game engines, and development workflows</p>
                </div>
              </div>
              
              <div class="timeline-item">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                  <h4>Building Projects</h4>
                  <p>Creating games from scratch and documenting the process</p>
                </div>
              </div>
              
              <div class="timeline-item">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                  <h4>Sharing Knowledge</h4>
                  <p>Teaching others through tutorials and live coding sessions</p>
                </div>
              </div>
              
              <div class="timeline-item">
                <div class="timeline-marker active"></div>
                <div class="timeline-content">
                  <h4>Community Building</h4>
                  <p>Growing a community of fellow developers and learners</p>
                </div>
              </div>
            </div>
            
            <div class="journey-stats">
              <div class="stat-item">
                <span class="stat-number">100+</span>
                <span class="stat-label">Hours of Content</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">50+</span>
                <span class="stat-label">Tutorials</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">1000+</span>
                <span class="stat-label">Community Members</span>
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
          <div class="video-card">
            <div class="video-thumbnail">
              <div class="play-overlay">
                <i class="fas fa-play"></i>
              </div>
            </div>
            <div class="video-info">
              <h4>Game Development Tutorial #1</h4>
              <p>Getting started with C++ and game engines</p>
              <span class="video-duration">15:30</span>
            </div>
          </div>
          
          <div class="video-card">
            <div class="video-thumbnail">
              <div class="play-overlay">
                <i class="fas fa-play"></i>
              </div>
            </div>
            <div class="video-info">
              <h4>Networking for Games</h4>
              <p>Understanding multiplayer game architecture</p>
              <span class="video-duration">22:15</span>
            </div>
          </div>
          
          <div class="video-card">
            <div class="video-thumbnail">
              <div class="play-overlay">
                <i class="fas fa-play"></i>
              </div>
            </div>
            <div class="video-info">
              <h4>Security in Game Development</h4>
              <p>Protecting your games from common vulnerabilities</p>
              <span class="video-duration">18:45</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'YouTubeSection'
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