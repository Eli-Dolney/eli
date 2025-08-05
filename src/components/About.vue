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

      <!-- Tech Toolkit Card -->
      <div class="about-card skills-card fade-up">
        <div class="card-content full-width">
          <div class="card-icon">
            <i class="fas fa-toolbox"></i>
          </div>
          <h2>Tech Toolkit</h2>

          <div class="skills-container">
            <!-- Networking Experience -->
            <div class="skill-category">
              <div class="category-header">
                <i class="fas fa-network-wired"></i>
                <h3>Networking</h3>
              </div>
              <div class="skill-items">
                <div class="skill-item">
                  <div class="skill-header">
                    <i class="fas fa-shield-alt"></i>
                    <span class="skill-name">TCP/IP & Subnetting</span>
                    <div class="skill-level">
                      <div class="progress-bar">
                        <div class="progress" style="width: 85%"></div>
                      </div>
                      <span class="level-text">Advanced</span>
                    </div>
                  </div>
                  <p class="skill-description">Configured VLANs & subnets in Cisco Packet Tracer labs</p>
                  <div class="project-links">
                    <a href="#" class="project-link" @click.prevent="showProject('packet-tracer')">
                      <i class="fas fa-external-link-alt"></i>
                      View Lab Projects
                    </a>
                  </div>
                </div>

                <div class="skill-item">
                  <div class="skill-header">
                    <i class="fas fa-user-shield"></i>
                    <span class="skill-name">Network Security</span>
                    <div class="skill-level">
                      <div class="progress-bar">
                        <div class="progress" style="width: 75%"></div>
                      </div>
                      <span class="level-text">Intermediate</span>
                    </div>
                  </div>
                  <p class="skill-description">Hands-on with Wireshark, Nmap, and basic firewall setup (Security+ prep)</p>
                  <div class="project-links">
                    <a href="#" class="project-link" @click.prevent="showProject('security-tools')">
                      <i class="fas fa-external-link-alt"></i>
                      Security Analysis
                    </a>
                  </div>
                </div>

                <div class="skill-item">
                  <div class="skill-header">
                    <i class="fas fa-router"></i>
                    <span class="skill-name">Router Configuration</span>
                    <div class="skill-level">
                      <div class="progress-bar">
                        <div class="progress" style="width: 80%"></div>
                      </div>
                      <span class="level-text">Advanced</span>
                    </div>
                  </div>
                  <p class="skill-description">CLI-based DHCP, NAT, and ACL config on simulated Cisco routers</p>
                  <div class="project-links">
                    <a href="#" class="project-link" @click.prevent="showProject('router-config')">
                      <i class="fas fa-external-link-alt"></i>
                      Config Examples
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Programming Experience -->
            <div class="skill-category">
              <div class="category-header">
                <i class="fas fa-code"></i>
                <h3>Programming</h3>
              </div>
              <div class="skill-items">
                <div class="skill-item">
                  <div class="skill-header">
                    <i class="fab fa-vuejs"></i>
                    <span class="skill-name">Vue.js</span>
                    <div class="skill-level">
                      <div class="progress-bar">
                        <div class="progress" style="width: 90%"></div>
                      </div>
                      <span class="level-text">Expert</span>
                    </div>
                  </div>
                  <p class="skill-description">Core framework for EisleyFit, LearningTheWires, and component-driven web apps</p>
                  <div class="project-links">
                    <a href="#" class="project-link" @click.prevent="showProject('eisley-fit')">
                      <i class="fas fa-external-link-alt"></i>
                      EisleyFit
                    </a>
                    <a href="#" class="project-link" @click.prevent="showProject('learning-wires')">
                      <i class="fas fa-external-link-alt"></i>
                      LearningTheWires
                    </a>
                  </div>
                </div>

                <div class="skill-item">
                  <div class="skill-header">
                    <i class="fab fa-js-square"></i>
                    <span class="skill-name">TypeScript</span>
                    <div class="skill-level">
                      <div class="progress-bar">
                        <div class="progress" style="width: 85%"></div>
                      </div>
                      <span class="level-text">Advanced</span>
                    </div>
                  </div>
                  <p class="skill-description">60% of my codebase; powering complex UIs and Meta Horizon scripting</p>
                  <div class="project-links">
                    <a href="#" class="project-link" @click.prevent="showProject('meta-horizon')">
                      <i class="fas fa-external-link-alt"></i>
                      Meta Horizon Scripts
                    </a>
                  </div>
                </div>

                <div class="skill-item">
                  <div class="skill-header">
                    <i class="fab fa-html5"></i>
                    <span class="skill-name">HTML/CSS</span>
                    <div class="skill-level">
                      <div class="progress-bar">
                        <div class="progress" style="width: 95%"></div>
                      </div>
                      <span class="level-text">Expert</span>
                    </div>
                  </div>
                  <p class="skill-description">Responsive layouts, UI styling, and animations across all front-end projects</p>
                  <div class="project-links">
                    <a href="#" class="project-link" @click.prevent="showProject('portfolio')">
                      <i class="fas fa-external-link-alt"></i>
                      This Portfolio
                    </a>
                  </div>
                </div>

                <div class="skill-item">
                  <div class="skill-header">
                    <i class="fab fa-python"></i>
                    <span class="skill-name">Python</span>
                    <div class="skill-level">
                      <div class="progress-bar">
                        <div class="progress" style="width: 70%"></div>
                      </div>
                      <span class="level-text">Intermediate</span>
                    </div>
                  </div>
                  <p class="skill-description">CLI tools, automation scripts, and GUI apps (e.g. YouTube downloader)</p>
                  <div class="project-links">
                    <a href="#" class="project-link" @click.prevent="showProject('youtube-downloader')">
                      <i class="fas fa-external-link-alt"></i>
                      YouTube Downloader
                    </a>
                  </div>
                </div>

                <div class="skill-item">
                  <div class="skill-header">
                    <i class="fas fa-gamepad"></i>
                    <span class="skill-name">C++</span>
                    <div class="skill-level">
                      <div class="progress-bar">
                        <div class="progress" style="width: 65%"></div>
                      </div>
                      <span class="level-text">Intermediate</span>
                    </div>
                  </div>
                  <p class="skill-description">Revamping an open-source Minecraft clone with modern graphics + logic</p>
                  <div class="project-links">
                    <a href="#" class="project-link" @click.prevent="showProject('minecraft-clone')">
                      <i class="fas fa-external-link-alt"></i>
                      Minecraft Clone
                    </a>
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
  methods: {
    showProject(projectId) {
      // You can implement project modal or navigation here
      console.log(`Showing project: ${projectId}`);
      // Example: this.$router.push(`/projects/${projectId}`);
      // Or show a modal with project details
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
  gap: 3rem;
  margin-top: 2rem;
  width: 100%;
}

@media (min-width: 768px) {
  .skills-container {
    flex-direction: row;
    flex-wrap: wrap;
  }
  
  .skill-category {
    flex: 1;
    min-width: 350px;
  }
}

/* Category header styling */
.category-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid rgba(85, 150, 255, 0.2);
}

.category-header i {
  font-size: 1.8rem;
  color: #5596ff;
  background: linear-gradient(135deg, rgba(85, 150, 255, 0.1), rgba(219, 46, 242, 0.1));
  padding: 0.8rem;
  border-radius: 12px;
  transition: transform 0.3s ease;
}

.category-header:hover i {
  transform: scale(1.1);
}

.category-header h3 {
  color: #5596ff;
  font-size: 1.5rem;
  margin: 0;
}

/* Skill items container */
.skill-items {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Individual skill item */
.skill-item {
  background: rgba(26, 30, 38, 0.8);
  border: 1px solid rgba(85, 150, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.skill-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(85, 150, 255, 0.1), transparent);
  transition: left 0.5s ease;
}

.skill-item:hover::before {
  left: 100%;
}

.skill-item:hover {
  transform: translateY(-2px);
  border-color: rgba(85, 150, 255, 0.3);
  box-shadow: 0 8px 25px rgba(85, 150, 255, 0.15);
}

/* Skill header */
.skill-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.skill-header i {
  font-size: 1.4rem;
  color: #db2ef2;
  width: 30px;
  text-align: center;
}

.skill-name {
  font-weight: 600;
  color: #ffffff;
  font-size: 1.1rem;
  flex: 1;
  min-width: 120px;
}

/* Skill level indicator */
.skill-level {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  min-width: 150px;
}

.progress-bar {
  height: 6px;
  background-color: rgba(45, 55, 72, 0.5);
  border-radius: 3px;
  overflow: hidden;
  flex: 1;
  min-width: 80px;
}

.progress {
  height: 100%;
  background: linear-gradient(90deg, #db2ef2, #5596ff);
  border-radius: 3px;
  transition: width 1s ease;
  position: relative;
}

.progress::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.level-text {
  font-size: 0.8rem;
  color: #5596ff;
  font-weight: 500;
  white-space: nowrap;
}

/* Skill description */
.skill-description {
  color: #b0b0b0;
  line-height: 1.6;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

/* Project links */
.project-links {
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
}

.project-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, rgba(85, 150, 255, 0.1), rgba(219, 46, 242, 0.1));
  border: 1px solid rgba(85, 150, 255, 0.2);
  border-radius: 8px;
  color: #5596ff;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.project-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(85, 150, 255, 0.2), transparent);
  transition: left 0.3s ease;
}

.project-link:hover::before {
  left: 100%;
}

.project-link:hover {
  background: linear-gradient(135deg, rgba(85, 150, 255, 0.2), rgba(219, 46, 242, 0.2));
  border-color: rgba(85, 150, 255, 0.4);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(85, 150, 255, 0.2);
}

.project-link i {
  font-size: 0.8rem;
  transition: transform 0.3s ease;
}

.project-link:hover i {
  transform: translateX(2px);
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