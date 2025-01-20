<template>
  <section id="about">
    <!-- Broad Overview Section -->
    <div class="about-section fade-up">
      <div class="section-image">
        <!-- Replace with actual image -->
        <img :src="overviewImg" alt="Eli Overview" />
      </div>
      <div class="section-content">
        <h2>Overview</h2>
        <p>
          Hi, I'm Eli – a 23-year-old student currently pursuing Network and Technology Security. 
          Balancing work as a Personal Care Assistant and fatherhood, I've gained invaluable lessons 
          in time management, empathy, and perseverance. My passion for technology drives me to 
          continuously learn and grow so I can better serve those around me and achieve my goals.
        </p>
      </div>
    </div>

    <!-- Current Focus Section -->
    <div class="about-section fade-up reverse-layout">
      <div class="section-content">
        <h2>What I’m Learning & Working On</h2>
        <p>
          I’m currently preparing for the CCNA certification, which deepens my understanding of 
          networking and security fundamentals. Coding has become another strong interest of mine— 
          much like stacking LEGO bricks, I love the creativity and challenge. Projects I've built 
          range from simple websites to more complex applications, and I'm always exploring new 
          technologies to expand my skillset.
        </p>
      </div>
      <div class="section-image">
        <!-- Replace with actual image -->
        <img :src="focusImg" alt="Learning & Projects" />
      </div>
    </div>

    <!-- Personal Interests or “Beyond Tech” Section -->
    <div class="about-section fade-up">
      <div class="section-image">
        <!-- Replace with actual image -->
        <img :src="personalImg" alt="Personal Interests" />
      </div>
      <div class="section-content">
        <h2>Beyond Tech</h2>
        <p>
          Outside of networking and coding, I’m a proud dad who loves spending time with my daughter. 
          Whether we’re exploring the outdoors or tackling new adventures together, fatherhood 
          continues to inspire me to be a better person. I’m excited about the future, grateful for 
          the opportunities that lie ahead, and determined to make a positive impact wherever I can.
        </p>
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
}
</script>



<style scoped>
/* 1) #about: same as before, shifting right on larger screens */
#about {
  background-color: #0d0d0d;
  padding: 4rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin-left: 0;
  width: 100%;
}

@media (min-width: 768px) {
  #about {
    margin-left: 100px; 
    width: calc(100% - 100px);
  }
}

/* 2) .about-section: fill the full width, no fixed max-width */
.about-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0;
  border-radius: 8px;
  background-color: #1a1e26;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

/* Reverse layout for second section on larger screens */
.reverse-layout {
  flex-direction: column-reverse;
}

@media (min-width: 768px) {
  .about-section {
    flex-direction: row;
  }
  .reverse-layout {
    flex-direction: row-reverse;
  }
}

/* 3) Shared styling for the columns */
.section-image,
.section-content {
  flex: 1;
  padding: 2rem;
}

/* 4) Keep the images from getting too huge by using max-width */
.section-image {
  display: flex;               /* So we can center the image inside */
  justify-content: center;
  align-items: center;
}

.section-image img {
  width: 100%;                 /* Fill the container’s width up to max-width */
  max-width: 600px;            /* Limit how big it can get on large screens */
  height: auto;                /* Maintain aspect ratio */
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
}
.section-image img:hover {
  transform: scale(1.03);
}

/* 5) Content/Text styling */
.section-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: aliceblue;
}
.section-content h2 {
  margin-bottom: 1rem;
  font-size: 2rem;
  color: #db2ef2;
}
.section-content p {
  line-height: 1.6;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

/* 6) Fade-Up Animation, unchanged */
.fade-up {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeUp 0.8s ease forwards;
}
@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

