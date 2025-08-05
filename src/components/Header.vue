<template>
  <header class="hero-section">
    <!-- Background with overlay -->
    <div class="hero-background">
      <div class="background-overlay"></div>
    </div>

    <!-- Main content container -->
    <div class="hero-container">

      <!-- Main hero content -->
      <div class="hero-content">
        <div class="hero-text">
          <h2 class="hero-subtitle">Network & Technology Security Student</h2>
          <p class="hero-description">
            Dedicated to building secure, scalable applications and exploring cutting-edge technologies. 
            Currently pursuing Network & Technology Security while developing full-stack solutions 
            and contributing to open-source projects.
          </p>
          <div class="hero-cta">
            <a href="/projects" class="cta-primary">View My Work</a>
            <a href="/about" class="cta-secondary">Learn More</a>
          </div>
        </div>
        
                  <div class="hero-visual">
            <div class="profile-card">
              <div class="card-image">
                <img src="../assets/images/IMG_0455.jpg" alt="Eli Dolney" />
                <div class="image-overlay"></div>
              </div>
            </div>
          </div>
      </div>

      <!-- Scroll indicator -->
      <div class="scroll-indicator">
        <div class="scroll-arrow"></div>
        <span>Scroll to explore</span>
      </div>
    </div>

    <!-- About Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showAbout" class="modal-backdrop" @click.self="showAbout = false">
          <div class="modal">
            <div class="modal-header">
              <h3>About This Site</h3>
              <button @click="showAbout = false" class="close-btn" aria-label="Close">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <div class="modal-content">
              <p>
                Welcome to my portfolio! I'm a 23-year-old student pursuing Network and Technology Security, 
                passionate about creating secure and innovative web solutions.
              </p>
              <p>
                This site showcases my projects, skills, and journey in tech. Built with Vue.js and modern web technologies.
              </p>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      showAbout: false,
    };
  },
};
</script>

<style scoped>
/* =================================
   HERO SECTION STYLES
================================= */

.hero-section {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #0a0a0a;
}

/* Background styling */
.hero-background {
  position: absolute;
  inset: 0;
  background: 
    linear-gradient(
      135deg,
      rgba(13, 13, 13, 0.95),
      rgba(26, 30, 38, 0.9)
    ),
    url("../assets/images/IMG_0455.jpg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  z-index: 1;
}

.background-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    45deg,
    rgba(219, 46, 242, 0.1),
    rgba(85, 150, 255, 0.1)
  );
  z-index: 2;
}

/* Main container */
.hero-container {
  position: relative;
  z-index: 3;
  max-width: 1200px;
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}



/* Main hero content */
.hero-content {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  margin: 2rem 0;
}

.hero-text {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.hero-subtitle {
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin: 0;
  line-height: 1.2;
}

.hero-description {
  font-size: 1.2rem;
  color: #b0b0b0;
  line-height: 1.6;
  margin: 0;
  max-width: 500px;
}

.hero-cta {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.cta-primary, .cta-secondary {
  padding: 1rem 2rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.cta-primary {
  background: linear-gradient(135deg, #db2ef2, #5596ff);
  color: white;
  box-shadow: 0 8px 25px rgba(219, 46, 242, 0.3);
}

.cta-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 35px rgba(219, 46, 242, 0.4);
}

.cta-secondary {
  background: transparent;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

.cta-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

/* Hero visual */
.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-card {
  position: relative;
  width: 350px;
  height: 450px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
}

.profile-card:hover {
  transform: translateY(-10px);
}

.card-image {
  position: relative;
  width: 100%;
  height: 100%;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    45deg,
    rgba(219, 46, 242, 0.2),
    rgba(85, 150, 255, 0.2)
  );
}



/* Scroll indicator */
.scroll-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  margin-top: 2rem;
}

.scroll-arrow {
  width: 2px;
  height: 30px;
  background: linear-gradient(to bottom, #db2ef2, transparent);
  animation: scroll-bounce 2s infinite;
}

@keyframes scroll-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(10px); }
}

/* Modal styles */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal {
  background: #1a1e26;
  border-radius: 16px;
  max-width: 500px;
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-header h3 {
  color: white;
  margin: 0;
  font-size: 1.3rem;
  font-weight: 600;
}

.close-btn {
  background: transparent;
  border: none;
  color: #b0b0b0;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.modal-content {
  padding: 1.5rem;
  color: #b0b0b0;
  line-height: 1.6;
}

.modal-content p {
  margin-bottom: 1rem;
}

.modal-content p:last-child {
  margin-bottom: 0;
}

/* Modal transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Responsive design */
@media (max-width: 1024px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }
  
  .hero-subtitle {
    font-size: 2rem;
  }
  
  .profile-card {
    width: 300px;
    height: 380px;
  }
}

@media (max-width: 768px) {
  .hero-container {
    padding: 1rem;
  }
  
  .hero-subtitle {
    font-size: 1.8rem;
  }
  
  .hero-description {
    font-size: 1.1rem;
  }
  
  .hero-cta {
    flex-direction: column;
    align-items: center;
  }
  
  .cta-primary, .cta-secondary {
    width: 100%;
    max-width: 250px;
    justify-content: center;
  }
  
  .profile-card {
    width: 280px;
    height: 350px;
  }
}

@media (max-width: 480px) {
  .hero-subtitle {
    font-size: 1.5rem;
  }
  
  .hero-description {
    font-size: 1rem;
  }
  
  .profile-card {
    width: 250px;
    height: 320px;
  }
}
</style>