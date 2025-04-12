<template>
  <div class="loading-screen">
    <div class="scrambling-loader">
      <span class="welcome-text" data-value="Welcome">Welcome</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  emits: ['loadingComplete'], // Define the emitted event
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
          this.$emit('loadingComplete'); // Match the event name in App.vue
        }, 400);
      }

      iteration += 1 / 2;
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

.scrambling-loader {
  font-family: 'Source Code Pro', monospace;
  font-size: calc(3rem + 3vw); /* Adjust the font size based on the screen size */
  font-weight: 400;
  text-transform: uppercase;
  color: white;
  text-align: center; /* Center the text */
  width: 100%; /* Set the width to 100% of the screen */
  z-index: 2; /* Ensure the text is above the overlay */
  position: relative; /* Set position to relative to stack above the overlay */
}
</style>
