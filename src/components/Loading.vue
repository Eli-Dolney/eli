<template>
  <div class="loading-screen">
    <div class="loader-card">
      <div class="scrambling-loader">
        <span class="welcome-text" data-value="Welcome">Welcome</span>
      </div>
      <div class="progress-wrap" aria-label="Loading progress">
        <div class="progress-bar" :style="{ width: progress + '%' }"></div>
      </div>
      <div class="hint">Initializing experience...</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  emits: ['loadingComplete'],
  mounted() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const welcomeText = this.$el.querySelector('.welcome-text');
    let iteration = 0;
    let interval;

    interval = setInterval(() => {
      welcomeText.innerText = welcomeText.innerText
        .split('')
        .map((letter, index) => {
          if (index < iteration) {
            return welcomeText.dataset.value[index];
          }
          return letters[Math.floor(Math.random() * 26)];
        })
        .join('');

      if (iteration >= welcomeText.dataset.value.length) {
        clearInterval(interval);
        this.animateProgress();
      }

      iteration += 1 / 2;
    }, 100);
  },
  data() {
    return {
      progress: 10
    };
  },
  methods: {
    animateProgress() {
      const step = () => {
        if (this.progress < 100) {
          this.progress = Math.min(100, this.progress + Math.random() * 8 + 3);
          requestAnimationFrame(step);
        } else {
          setTimeout(() => this.$emit('loadingComplete'), 350);
        }
      };
      requestAnimationFrame(step);
    }
  }
};
</script>

<style scoped>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 1);
  background-image: url('../assets/images/retro.jpg'); /* Add your background image */
  background-size: cover; /* Ensure the image covers the entire background */
  background-position: center; /* Center the background image */
  background-repeat: no-repeat; /* Do not repeat the background image */
  z-index: 9999;
}

.loading-screen::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); /* Add a semi-transparent overlay */
  z-index: 1;
}

.loader-card {
  position: relative;
  z-index: 2;
  width: min(680px, 90vw);
  border-radius: 20px;
  padding: 2.2rem 2rem 1.6rem;
  background: rgba(20,20,24,0.55);
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow: 0 20px 60px rgba(0,0,0,0.45);
  backdrop-filter: blur(10px);
}

.scrambling-loader {
  font-family: 'Source Code Pro', monospace;
  font-size: clamp(2.4rem, 6vw, 4.6rem);
  font-weight: 600;
  text-transform: uppercase;
  color: white;
  text-align: center;
  width: 100%;
}

.progress-wrap {
  margin-top: 1rem;
  height: 10px;
  width: 100%;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 999px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #4D208C, #71D9B3);
  width: 0%;
  transition: width 160ms ease;
}

.hint {
  text-align: center;
  color: #bcd3e3;
  margin-top: 0.8rem;
  font-size: 0.95rem;
}
</style>
