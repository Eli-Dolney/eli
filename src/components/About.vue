<template>
  <section id="about">
    <div class="section-wrapper" ref="sectionWrapper">
      <h2>About Me</h2>
      <div class="about-container">
        <div class="about-text">
          <p>
            Hi, I'm Eli, a 23-year-old student currently studying Network and Technology Security. My love for technology started at a young age, and it's been an exciting journey ever since. In my sophomore year of high school, I built my first PC, which sparked my love for building and creating with technology. Since then, I've spend a lot in the tech world, constantly exploring new advancements and expanding my skills.
          </p>
          <p>
            I'm currently working towards obtaining my CCNA certification, a crucial step in my career path that will build on my knowledge and practice in networking. This certification is a great milestone and will help create a solid foundation working with computers, routers and many different network topologies. 
          </p>
          <p>
            Alongside my studies, I work as a Personal Care Assistant (PCA). This role allows me to make a positive impact on people's lives, providing care and support to those in need. Balancing my work and studies has taught me valuable lessons in time management, empathy, and resilience.
          </p>
          <p>
            Being a dad is another significant part of my life. Fatherhood has been an incredible journey, filled with challenges and rewards. It has taught me patience, responsibility, and the importance of being a positive role model. My daughter inspires me every day to be the best version of myself.
          </p>
          <p>
            In addition to my studies and work, I've developed a strong interest in coding. Coding really reminds me of playing with legos, Learning to code has opened up a new world of possibilities for me. I love creating cool projects that combine my technical skills with my creativity. Whether it's building websites, developing applications, or exploring new technologies, coding allows me to bring my ideas to life.
          </p>
          <p>
            Overall, I'm passionate about technology, committed to my personal and professional growth, and dedicated to making a difference in the lives of others. I'm excited about the future and the opportunities it holds, and I'm continuously striving to learn, grow, and achieve my goals.
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
  mounted() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          } else {
            entry.target.classList.remove("in-view");
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(this.$refs.sectionWrapper);
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

html {
  scroll-behavior: smooth;
}

#about {
  background-color: #0D0D0D; 
  margin: 0; /* Remove margin to take full space */
  padding: 0; /* Remove padding to take full space */
  min-height: 100vh; /* Ensure it takes up the full viewport height */
  display: flex; /* Use flexbox to center content */
  align-items: center; /* Vertically center content */
}

.section-wrapper {
  max-width: 1200px;
  width: 100%;
  padding: var(--base-spacing);
  margin: 0 auto;
  box-sizing: border-box;
  box-shadow: inset 0 0 10px #AED8F2;
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.section-wrapper.in-view {
  opacity: 1;
  transform: translateY(0);
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
  animation: fadeInUp 1.8s ease-out forwards;
}

h2 {
  font-size: 4rem;
  color: var(--text-color);
  margin-bottom: var(--base-spacing);
  text-align: center;
}

.about-text {
  color: var(--text-color);
  text-align: left;
  background-color: #806FBF;
  font-size: 1.5rem;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  opacity: 0;
  animation: fadeIn 2s forwards;
  animation-delay: 0.5s;
}

.about-image {
  justify-self: center;
  overflow: hidden;
  border-radius: 10px;
  perspective: 1000px;
}

.about-image img {
  width: auto;
  max-width: 100%;
  max-height: 500px;
  border-radius: 10px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  transform: translateZ(-50px) scale(1.1);
}

.about-image img:hover {
  transform: translateZ(0) scale(1.05) rotate(2deg);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
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

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
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
