<template>
  <section id="about">
    <div class="section-wrapper">
      <h2>About Me</h2>
      <div class="about-container">
        <div class="about-text">
          <p>
            Cool things are all around us, from breathtaking natural wonders to
            cutting-edge technology. Exploring new and cool things can be a fun
            and rewarding experience that broadens our horizons. Some of the
            coolest things in the world can be found in unexpected places, so
            it's always worth keeping an open mind. Whether it's trying new
            foods, traveling to exotic locations, or discovering new hobbies,
            there's no shortage of cool things to explore in life.
          </p>
          <p>
            Cool! things are all around us, from breathtaking natural wonders to
            cutting-edge technology. Exploring new and cool things can be a fun
            and rewarding experience that broadens our horizons. Some of the
            coolest things in the world can be found in unexpected places, so
            it's always worth keeping an open mind. 
          </p>
          <p>
            Cool things are all around us, from breathtaking natural wonders to
            cutting-edge technology. Exploring new and cool things can be a fun
            and rewarding experience that broadens our horizons. Some of the
            coolest things in the world can be found in unexpected places, so
            it's always worth keeping an open mind. 
          </p>
        </div>
        <div class="about-image">
          <img
            :src="imageSrc"
            alt="Eli and Everly"
            class="profile-image"
            data-aos="fade-up"
            data-aos-offset="0"
            data-aos-duration="1000"
            data-aos-easing="ease-out-quad"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import imageSrcImport from '../assets/images/about.jpg';

export default {
  name: "About",
  data() {
    return {
      imageSrc: imageSrcImport,
    };
  },
};
</script>

<style scoped>
:root {
  --text-color: aliceblue;
  --background-dark: #1A1E26;
  --background-light: #D6D9C1;
  --accent-color: #DB2EF2;
  --base-spacing: 40px;
  --font-size-base: 1rem;
  --font-size-title: 2.5rem;
}

#about {
  background-color: #949BA6; 
  margin: 20px auto;
  padding: 20px;
}

.section-wrapper {
  max-width: 1200px;
  width: 100%;
  padding: var(--base-spacing);
  margin: 20px auto;
  box-sizing: border-box;
  box-shadow: inset 0 0 10px #AED8F2;
}

.about-container {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: var(--base-spacing);
  justify-content: center;
  align-items: start;
  background-color: var(--background-light);
  box-shadow: inset 0 0 10px #9959D9;
  margin: 20px auto;
  padding: 20px;
  width: 90%;
}

h2 {
  font-size: var(--font-size-title);
  color: var(--text-color);
  margin-bottom: var(--base-spacing);
  text-align: center;
}

.about-text {
  color: var(--text-color);
  text-align: left;
}

.about-image {
  justify-self: center;
  overflow: hidden;
  border-radius: 10px;
}

.about-image img {
  width: auto;
  max-width: 100%;
  max-height: 500px;
  border-radius: 10px;
  transition: transform 0.3s ease-in-out;
}

.about-image img:hover {
  transform: scale(1.03);
}

p {
  font-size: clamp(0.9rem, 1vw, 1.1rem); /* Responsive font size */
  line-height: 1.6;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.about-container {
  animation: fadeInUp 1.8s ease-out forwards;
}

@media (max-width: 1024px) {
  .about-container {
    grid-template-columns: 1fr;
    width: 80%; /* Adjust width for medium devices */
    margin: 0 auto; /* Center the container */
  }

  .about-text, .about-image {
    width: 100%;
  }

  .about-image img {
    max-height: 400px; /* Adjust image height for medium devices */
  }
}

@media (max-width: 768px) {
  .about-container {
    grid-template-columns: 1fr; /* Stack on smaller screens */
    width: 90%; /* Adjust width for small devices */
    margin: 0 auto; /* Center the container */
    padding: 10px; /* Adjust padding for small devices */
  }

  .about-text {
    order: 2; /* Ensure text comes after the image */
  }

  .about-image {
    order: 1; /* Image first */
    max-width: 100%; /* Use full width on mobile */
    margin: 0 auto; /* Center image */
  }

  h2 {
    font-size: 2rem; /* Adjust title font size for mobile */
  }

  .about-text p {
    font-size: 0.9rem; /* Adjust text font size for mobile */
  }

  .about-image img {
    max-height: 300px; /* Adjust image height for small devices */
  }
}
</style>
