<template>
    <div class="loading-screen" v-show="isLoading">
      <div class="scrambling-loader">
        <span class="welcome-text" data-value="Welcome">Welcome</span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Loading',
    props: {
      isLoading: {
        type: Boolean,
        required: true,
      },
    },
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
          setTimeout(() => {
            this.$emit('loading-complete');  // Emit an event instead of mutating the prop
          }, 2000);
        }
  
        iteration += 1 / 3;
      }, 100);
    },
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
  z-index: 9999;
}

.scrambling-loader {
  font-family: 'Source Code Pro', monospace;
  font-size: calc(3rem + 3vw); /* Adjust the font size based on the screen size */
  font-weight: 400;
  text-transform: uppercase;
  color: white;
  text-align: center; /* Center the text */
  width: 100%; /* Set the width to 100% of the screen */
}
  </style>
  