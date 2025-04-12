<template>
  <header>
    <div class="header-overlay">
      <div class="header-content">
        <!-- Your logo only in the top left -->
        <div class="logo-container">
          <span class="logo">ED</span>
        </div>
        
        <!-- Top right corner social links only -->
        <div class="social-links">
          <a 
            class="social-link" 
            href="https://bit.ly/Linkedin-Eli" 
            target="_blank" 
            aria-label="LinkedIn"
          >
            <font-awesome-icon :icon="['fab', 'linkedin']" />
          </a>
          <a 
            class="social-link" 
            href="https://bit.ly/Github-Eli" 
            target="_blank" 
            aria-label="GitHub"
          >
            <font-awesome-icon :icon="['fab', 'github']" />
          </a>
          <button @click="open = true" class="about-button" aria-label="About">
            <font-awesome-icon :icon="['fas', 'info-circle']" />
          </button>
        </div>

        <!-- Centerpiece in the main area -->
        <Centerpiece />
        
        <!-- Title and CTA below centerpiece -->
        <div class="header-cta">
          <h2 class="profession">Want to Collab?</h2>
          <a href="/projects" class="cta-button">View My Work</a>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="open" class="modal-backdrop" @click.self="open = false">
          <div class="modal">
            <div class="modal-header">
              <h3>About This Site</h3>
              <button @click="open = false" class="close-modal-button" aria-label="Close">
                <font-awesome-icon :icon="['fas', 'times']" />
              </button>
            </div>
            <div class="modal-content">
              <p>
                Welcome to my portfolio site! I'm a passionate developer focused on creating intuitive and engaging web experiences.
              </p>
              <p>
                This website is built with Vue.js and showcases my projects and skills. Some sections may still be under development as I continuously improve and add more content.
              </p>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>

<script>
import Centerpiece from "./Centerpiece.vue";

export default {
  name: "Header",
  components: {
    Centerpiece,
  },
  data() {
    return {
      open: false,
    };
  },
};
</script>

<style scoped>
/* ---------------------------------
   HEADER CONTAINER
----------------------------------- */
header {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}

/* Background overlay w/ image + gradient */
.header-overlay {
  position: absolute;
  inset: 0;
  background: 
    linear-gradient(
      rgba(20, 30, 40, 0.8),
      rgba(40, 30, 50, 0.8),
      rgba(10, 10, 20, 0.9)
    ),
    url("../assets/images/IMG_0455.jpg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  z-index: 1;
}

/* Wrapper for all foreground content */
.header-content {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  padding: 1.5rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

/* ---------------------------------
   LOGO AND SOCIAL LINKS
----------------------------------- */
.logo-container {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
}

.logo {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 1.75rem;
  color: #fff;
  background: linear-gradient(135deg, #3498db, #9b59b6);
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  letter-spacing: 0.05rem;
}

.social-links {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  display: flex;
  gap: 1rem;
}

.social-link, .about-button {
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.25rem;
  transition: all 0.2s ease;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  cursor: pointer;
}

.social-link:hover, .about-button:hover {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.social-link:focus, .about-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3);
}

/* Header CTA (Call to Action) */
.header-cta {
  margin-top: auto;
  margin-bottom: 3rem;
  text-align: center;
}

.profession {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.75rem;
  font-weight: 400;
  color: white;
  margin-bottom: 1.5rem;
  letter-spacing: 0.05rem;
}

.cta-button {
  display: inline-block;
  background: linear-gradient(135deg, #3498db, #9b59b6);
  color: white;
  font-size: 1.1rem;
  font-weight: 500;
  padding: 0.75rem 2rem;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.cta-button:active {
  transform: translateY(-1px);
}

/* ---------------------------------
   MODAL
----------------------------------- */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal {
  width: 90%;
  max-width: 500px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.modal-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.close-modal-button {
  background: transparent;
  border: none;
  font-size: 1.25rem;
  color: #6c757d;
  cursor: pointer;
  transition: color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.close-modal-button:hover {
  color: #343a40;
  background-color: rgba(0, 0, 0, 0.05);
}

.modal-content {
  padding: 1.5rem;
  color: #495057;
  font-size: 1rem;
  line-height: 1.6;
}

.modal-content p:not(:last-child) {
  margin-bottom: 1rem;
}

/* Modal transition animations */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* ---------------------------------
   RESPONSIVE BREAKPOINTS
----------------------------------- */
@media (max-width: 768px) {
  .logo {
    font-size: 1.5rem;
    padding: 0.4rem 0.6rem;
  }
  
  .profession {
    font-size: 1.5rem;
  }
  
  .cta-button {
    font-size: 1rem;
    padding: 0.6rem 1.5rem;
  }
}

@media (max-width: 480px) {
  .logo-container {
    top: 1rem;
    left: 1rem;
  }
  
  .social-links {
    top: 1rem;
    right: 1rem;
  }
  
  .social-link, .about-button {
    width: 32px;
    height: 32px;
    font-size: 1.1rem;
  }
}
</style>