<template>
  <header>
    <div class="header-overlay">
      <div class="header-content">
        
        <!-- 
          1) “Top Controls”: Button + Social Icons appear FIRST,
             anchored near the top of the hero 
        -->
        <div class="top-controls">
          <button @click="open = true" class="open-modal-button">
            About This Site
          </button>

          <div class="icon-wrapper">
            <a 
              class="social-link" 
              href="https://bit.ly/Linkedin-Eli" 
              target="_blank" 
              aria-label="LinkedIn"
            >
              <font-awesome-icon :icon="['fab', 'linkedin']" class="large-icon" />
            </a>
            <a 
              class="social-link" 
              href="https://bit.ly/Github-Eli" 
              target="_blank" 
              aria-label="GitHub"
            >
              <font-awesome-icon :icon="['fab', 'github-square']" class="large-icon" />
            </a>
          </div>
        </div>

        <!-- 2) Your Centerpiece below the top controls -->
        <Centerpiece />
      </div>
    </div>

    <!-- Modal -->
    <Teleport to="body">
      <div v-if="open" class="modal">
        <p>
          This website is a work in progress. Some sections and styles 
          may still be under development!
        </p>
        <button @click="open = false" class="close-modal-button">Close</button>
      </div>
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
  min-height: 100vh; /* full viewport height for a hero effect */
  display: flex;
  flex-direction: column;
  /* Remove justify-content: center so content stacks from the top down */
  /* justify-content: center; <-- Remove/Comment out */
  align-items: center;
  overflow: hidden;
}

/* Background overlay w/ image + gradient */
.header-overlay {
  position: absolute;
  inset: 0;
  background: 
    linear-gradient(
      rgba(82, 92, 101, 0.7),
      rgba(90, 81, 81, 0.7),
      rgba(0, 0, 0, 0.7)
    ),
    url("../assets/images/IMG_0455.jpg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  filter: brightness(0.9);
  z-index: 1;
}

/* Wrapper for all foreground content */
.header-content {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 1rem;
  box-sizing: border-box;

  /* Stack items vertically, 
     but let them start from the top. 
     Adjust gap to control spacing between top controls and Centerpiece. */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;  /* space between .top-controls and <Centerpiece /> */
}

/* ---------------------------------
   TOP CONTROLS: Button + Icons
----------------------------------- */
.top-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  /* Lower the top margin if you want them closer to the very top: */
  margin-top: 1rem; 
}

/* Modal Trigger Button */
.open-modal-button {
  background-color: #d95032;
  color: #dceaf2;
  border: none;
  border-radius: 5px;
  padding: 0.75rem 1.5rem;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.2s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
}
.open-modal-button:hover {
  background-color: #bfced9;
  color: #000;
  transform: scale(1.03);
}
.open-modal-button:focus {
  outline: 2px solid #ffffff;
  outline-offset: 3px;
}

/* Social Icons */
.icon-wrapper {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}
.social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #dceaf2;
  transition: transform 0.2s ease, color 0.2s ease;
}
.social-link:hover {
  color: #fffa;
  transform: scale(1.1);
}
.social-link:focus {
  outline: 2px solid #ffffff;
  outline-offset: 3px;
}
.large-icon {
  font-size: 2.5rem;
}

/* ---------------------------------
   MODAL
----------------------------------- */
.modal {
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 400px;
  background-color: #5c6a73;
  border-radius: 10px;
  padding: 2rem;
  font-size: 1rem;
  color: #dceaf2;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 999;
}
.close-modal-button {
  margin-top: 1rem;
  background-color: #bfced9;
  color: #000;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.2s;
}
.close-modal-button:hover {
  background-color: #4a5364;
  color: #fff;
  transform: scale(1.03);
}
.close-modal-button:focus {
  outline: 2px solid #ffffff;
  outline-offset: 3px;
}

/* ---------------------------------
   RESPONSIVE BREAKPOINTS
----------------------------------- */
@media (max-width: 768px) {
  .open-modal-button {
    font-size: 1rem;
    padding: 0.5rem 1rem;
  }
  .large-icon {
    font-size: 2rem;
  }
  .modal {
    top: 30%;
  }
}
</style>

