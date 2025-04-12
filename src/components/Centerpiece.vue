<template>
  <div class="centerpiece-container">
    <div class="centerpiece-screen">
      <!-- Background Image -->
      <div class="screen-image"></div>
      <!-- Animated Overlay Stripes -->
      <div class="screen-overlay"></div>
      <!-- Main Content -->
      <div class="screen-content">
        <div class="name-wrapper">
          <h1 class="name" data-value="Eli Dolney">Eli Dolney</h1>
        </div>
        <div class="typing-container">
          <p class="typing-text"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Centerpiece",
  data() {
    return {
      skills: ["Web Developer", "Problem Solver"],
      currentSkill: 0,
    };
  },
  mounted() {
    // Name scramble effect
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const nameEl = document.querySelector(".name");
    
    nameEl.addEventListener("mouseenter", () => {
      let iteration = 0;
      let interval = setInterval(() => {
        nameEl.innerText = nameEl.innerText
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return nameEl.dataset.value[index];
            }
            if (char === " ") return " ";
            return letters[Math.floor(Math.random() * 26)];
          })
          .join("");

        if (iteration >= nameEl.dataset.value.length) {
          clearInterval(interval);
        }
        iteration += 0.5;
      }, 70);
    });
    
    // Typing effect
    this.startTypingAnimation();
  },
  methods: {
    startTypingAnimation() {
      const typingText = document.querySelector(".typing-text");
      const skills = this.skills;
      let skillIndex = 0;
      let charIndex = 0;
      let isDeleting = false;
      let typingSpeed = 100;
      
      function typeWriter() {
        const currentSkill = skills[skillIndex];
        
        if (isDeleting) {
          typingText.textContent = currentSkill.substring(0, charIndex - 1);
          charIndex--;
          typingSpeed = 50;
        } else {
          typingText.textContent = currentSkill.substring(0, charIndex + 1);
          charIndex++;
          typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentSkill.length) {
          // Pause at end
          isDeleting = true;
          typingSpeed = 1500;
        } else if (isDeleting && charIndex === 0) {
          // Move to next skill
          isDeleting = false;
          skillIndex = (skillIndex + 1) % skills.length;
          typingSpeed = 500;
        }
        
        setTimeout(typeWriter, typingSpeed);
      }
      
      typeWriter();
    }
  }
};
</script>

<style scoped>
/* Centerpiece container */
.centerpiece-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: auto;
  flex-grow: 1;
  padding: 2rem 0;
  box-sizing: border-box;
}

/* The card-like "screen" shape */
.centerpiece-screen {
  position: relative;
  width: clamp(280px, 30vw, 400px);
  aspect-ratio: 10 / 16;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 1rem;
  background-color: rgba(0, 0, 0, 0.15);
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.centerpiece-screen:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

/* Optional decorative bars - more subtle and professional */
.centerpiece-screen::before,
.centerpiece-screen::after {
  content: "";
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 4;
}

.centerpiece-screen::before {
  top: 0;
  width: 15%;
  height: 3px;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
}

.centerpiece-screen::after {
  bottom: 0;
  width: 25%;
  height: 3px;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}

/* Animated striped overlay - more subtle for professionalism */
.screen-overlay {
  position: absolute;
  z-index: 2;
  inset: 0;
  background: 
    linear-gradient(
      rgba(255, 255, 255, 0.05),
      rgba(255, 255, 255, 0.05) 3px,
      transparent 3px,
      transparent 9px
    );
  background-size: 100% 9px;
  animation: pan-overlay 30s infinite linear;
  opacity: 0.7;
}

@keyframes pan-overlay {
  from { background-position: 0 0; }
  to   { background-position: 0 -100%; }
}

/* Background image - smoother animation */
.screen-image {
  position: absolute;
  z-index: 1;
  inset: 0;
  background-image: url("../assets/images/evj.jpg");
  background-size: cover;
  background-position: center;
  filter: brightness(0.8) contrast(1.1);
  animation: pan-image 25s ease-in-out infinite;
  transition: filter 0.3s ease;
}

.centerpiece-screen:hover .screen-image {
  filter: brightness(0.85) contrast(1.2);
}

@keyframes pan-image {
  0% {
    background-position: 40% 0%;
    background-size: 150%;
  }
  25% {
    background-position: 40% 40%;
    background-size: 140%;
  }
  50% {
    background-position: 60% 60%;
    background-size: 160%;
  }
  75% {
    background-position: 50% 40%;
    background-size: 150%;
  }
  100% {
    background-position: 40% 0%;
    background-size: 150%;
  }
}

/* Content + name */
.screen-content {
  position: relative;
  z-index: 3;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Name styling - professional with H1 for SEO */
.name-wrapper {
  margin-top: 2rem;
  text-align: center;
}

.name {
  font-family: "Montserrat", sans-serif;
  font-size: 2rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #fff;
  letter-spacing: 0.15rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
  margin: 0;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, rgba(52, 152, 219, 0.7), rgba(155, 89, 182, 0.7));
  border-radius: 4px;
  backdrop-filter: blur(5px);
}

/* Typing effect container */
.typing-container {
  position: absolute;
  bottom: 2.5rem;
  left: 0;
  width: 100%;
  text-align: center;
  padding: 0 1rem;
}

.typing-text {
  font-family: "Source Code Pro", monospace;
  font-size: 1.25rem;
  color: #fff;
  margin: 0;
  min-height: 1.5em;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
  position: relative;
}

.typing-text::after {
  content: "|";
  position: relative;
  margin-left: 3px;
  opacity: 1;
  animation: blink 0.7s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

/* Responsive refinements */
@media (max-width: 768px) {
  .centerpiece-screen {
    width: clamp(260px, 70vw, 350px);
  }
  
  .name {
    font-size: 1.75rem;
  }
  
  .typing-text {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .centerpiece-screen {
    width: 85%;
    max-width: 300px;
  }
  
  .name {
    font-size: 1.5rem;
    padding: 0.4rem 0.8rem;
  }
  
  .typing-container {
    bottom: 2rem;
  }
  
  .typing-text {
    font-size: 1rem;
  }
}
</style>