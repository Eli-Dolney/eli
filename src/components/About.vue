<template>
  <section id="about">
    <!-- Section Title -->
    <div class="section-header fade-up">
      <h1>About <span class="accent">Me</span></h1>
      <div class="underline"></div>
    </div>

    <!-- About Cards Container -->
    <div class="about-cards-container">
      <!-- Overview Card -->
      <div class="about-card fade-up">
        <div class="card-content">
          <div class="card-icon">
            <i class="fas fa-user"></i>
          </div>
          <h2>Overview</h2>
          <p>
            Hi, I'm Eli – a 23-year-old student currently pursuing Network and Technology Security. 
            Balancing work as a Personal Care Assistant and fatherhood, I've gained invaluable lessons 
            in time management, empathy, and perseverance. My passion for technology drives me to 
            continuously learn and grow so I can better serve those around me and achieve my goals.
          </p>
        </div>
        <div class="card-image">
          <img :src="overviewImg" alt="Eli Overview" />
          <div class="image-overlay"></div>
        </div>
      </div>

      <!-- Learning & Working Card -->
      <div class="about-card fade-up">
        <div class="card-image">
          <img :src="focusImg" alt="Learning & Projects" />
          <div class="image-overlay"></div>
        </div>
        <div class="card-content">
          <div class="card-icon">
            <i class="fas fa-code"></i>
          </div>
          <h2>What I'm Learning & Working On</h2>
          <p>
            I'm currently preparing for the CCNA certification, which deepens my understanding of 
            networking and security fundamentals. Coding has become another strong interest of mine— 
            much like stacking LEGO bricks, I love the creativity and challenge. Projects I've built 
            range from simple websites to more complex applications, and I'm always exploring new 
            technologies to expand my skillset.
          </p>
        </div>
      </div>

      <!-- Beyond Tech Card -->
      <div class="about-card fade-up">
        <div class="card-content">
          <div class="card-icon">
            <i class="fas fa-heart"></i>
          </div>
          <h2>Beyond Tech</h2>
          <p>
            Outside of networking and coding, I'm a proud dad who loves spending time with my daughter. 
            Whether we're exploring the outdoors or tackling new adventures together, fatherhood 
            continues to inspire me to be a better person. I'm excited about the future, grateful for 
            the opportunities that lie ahead, and determined to make a positive impact wherever I can.
          </p>
        </div>
        <div class="card-image">
          <img :src="personalImg" alt="Personal Interests" />
          <div class="image-overlay"></div>
        </div>
      </div>

      <!-- Skills Card -->
      <div class="about-card skills-card fade-up">
        <div class="card-content full-width">
          <div class="card-icon">
            <i class="fas fa-laptop-code"></i>
          </div>
          <h2>Technical Skills</h2>
          
          <div class="skills-container">
            <div class="skill-category">
              <h3>Networking</h3>
              <div class="skill-items">
                <div class="skill-item">
                  <span>TCP/IP</span>
                  <div class="progress-bar">
                    <div class="progress" style="width: 85%"></div>
                  </div>
                </div>
                <div class="skill-item">
                  <span>Network Security</span>
                  <div class="progress-bar">
                    <div class="progress" style="width: 80%"></div>
                  </div>
                </div>
                <div class="skill-item">
                  <span>Router Configuration</span>
                  <div class="progress-bar">
                    <div class="progress" style="width: 75%"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="skill-category">
              <h3>Programming</h3>
              <div class="skill-items">
                <div class="skill-item">
                  <span>HTML/CSS</span>
                  <div class="progress-bar">
                    <div class="progress" style="width: 90%"></div>
                  </div>
                </div>
                <div class="skill-item">
                  <span>JavaScript</span>
                  <div class="progress-bar">
                    <div class="progress" style="width: 70%"></div>
                  </div>
                </div>
                <div class="skill-item">
                  <span>Vue.js</span>
                  <div class="progress-bar">
                    <div class="progress" style="width: 65%"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import aboutImg from '../assets/images/about.jpg'
import evjImg from '../assets/images/evj.jpg'
import retroImg from '../assets/images/retro.jpg'

export default {
  name: 'About',
  data() {
    return {
      overviewImg: aboutImg,
      focusImg: evjImg,
      personalImg: retroImg,
    }
  },
  mounted() {
    // Add intersection observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.fade-up').forEach(el => {
      observer.observe(el);
    });
  }
}
</script>

<style scoped>
/* Main section styling */
#about {
  background-color: #0d0d0d;
  padding: 4rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
}

@media (min-width: 768px) {
  #about {
    
    width: 100%;
  }
}

/* Section header styling */
.section-header {
  text-align: center;
  margin-bottom: 3rem;
  width: 100%;
}

.section-header h1 {
  font-size: 2.5rem;
  color: #ffffff;
  margin-bottom: 0.5rem;
}

.section-header .accent {
  color: #db2ef2;
}

.section-header .underline {
  height: 4px;
  width: 80px;
  background: linear-gradient(90deg, #db2ef2, #5596ff);
  margin: 0 auto;
  border-radius: 2px;
}

/* Cards container */
.about-cards-container {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 100%;
  max-width: 1200px;
}

/* Card styling */
.about-card {
  display: flex;
  flex-direction: column;
  background-color: #1a1e26;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.about-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
}

/* Switch to row layout on larger screens */
@media (min-width: 768px) {
  .about-card {
    flex-direction: row;
    height: 400px;
  }
  
  /* Make every other card have reversed layout */
  .about-card:nth-child(even) {
    flex-direction: row-reverse;
  }
}

/* Card content */
.card-content {
  padding: 2.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}

.card-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #db2ef2, #5596ff);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: white;
  font-size: 1.5rem;
}

.card-content h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #db2ef2;
  position: relative;
}

.card-content p {
  line-height: 1.8;
  color: #e6e6e6;
  font-size: 1.1rem;
}

/* Card image */
.card-image {
  position: relative;
  flex: 1;
  min-height: 300px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.about-card:hover .card-image img {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(219, 46, 242, 0.3), rgba(85, 150, 255, 0.3));
}

/* Skills card specific styling */
.skills-card {
  flex-direction: column !important;
  height: auto !important;
}

.full-width {
  width: 100%;
}

.skills-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 1.5rem;
  width: 100%;
}

@media (min-width: 768px) {
  .skills-container {
    flex-direction: row;
    flex-wrap: wrap;
  }
  
  .skill-category {
    flex: 1;
    min-width: 300px;
  }
}

.skill-category h3 {
  color: #5596ff;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.skill-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.skill-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.skill-item span {
  color: #e6e6e6;
}

.progress-bar {
  height: 8px;
  background-color: #2d3748;
  border-radius: 4px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: linear-gradient(90deg, #db2ef2, #5596ff);
  border-radius: 4px;
}

/* Animation */
.fade-up {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.fade-up.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Apply delay to cards for staggered animation */
.about-card:nth-child(1) {
  transition-delay: 0.1s;
}
.about-card:nth-child(2) {
  transition-delay: 0.3s;
}
.about-card:nth-child(3) {
  transition-delay: 0.5s;
}
.about-card:nth-child(4) {
  transition-delay: 0.7s;
}
</style>