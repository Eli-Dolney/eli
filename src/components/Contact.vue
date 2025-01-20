<template>
  <section id="contact">
  <div class="contact-section-wrapper" ref="sectionWrapper">
    <h2>Get in Touch</h2>
    <p>Feel free to reach out via any of the platforms below!</p>

    <div class="contact-grid">
      <div 
        v-for="(contact, index) in contacts" 
        :key="index" 
        class="contact-card"
      >
        <h3>{{ contact.name }}</h3>
        <a 
          :href="contact.link" 
          target="_blank" 
          class="contact-link"
        >
          <font-awesome-icon :icon="contact.icon" size="3x" />
        </a>
      </div>
    </div>
  </div>
</section>

</template>


<script>
export default {
  name: "Contact",
  data() {
    return {
      contacts: [
        { name: 'Email', link: 'mailto:elid3dev@gmail.com', icon: ['fas', 'envelope'] },
        { name: 'GitHub', link: 'https://bit.ly/Github-Eli', icon: ['fab', 'github-square'] },
        { name: 'LinkedIn', link: 'https://bit.ly/Linkedin-Eli', icon: ['fab', 'linkedin'] },
        { name: 'Instagram', link: 'https://bit.ly/Insta-Eli', icon: ['fab', 'instagram-square'] },
      ]
    };
  },
  mounted() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        } else {
          entry.target.classList.remove('in-view');
        }
      });
    },
    { threshold: 0.1 }
  );
  observer.observe(this.$refs.sectionWrapper); // Now .contact-section-wrapper
},

};
</script>


<style scoped>
/* 1) #contact: fill full width, but on screens >=768px, 
     shift right to accommodate the fixed 100px sidebar */
#contact {
  background-color: #0D0D0D;
  min-height: 100vh; /* Ensure full screen height */
  width: 100%;
  margin-left: 0;
  padding: 2rem;
  box-sizing: border-box;
}

/* On wider screens, shift to the right */
@media (min-width: 768px) {
  #contact {
    margin-left: 100px;
    width: calc(100% - 100px);
  }
}

/* 2) Renamed the wrapper class for clarity */
.contact-section-wrapper {
  width: 90%;
  margin: 0 auto;
  box-sizing: border-box;
  box-shadow: inset 0 0 10px #AED8F2;

  /* Intersection Observer fade-in */
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
.contact-section-wrapper.in-view {
  opacity: 1;
  transform: translateY(0);
}

/* Headings and paragraph styles */
h2 {
  font-size: 3rem;
  color: aliceblue;
  text-align: center;
  margin-bottom: 1rem;
}
p {
  text-align: center;
  font-size: 1.4rem;
  color: aliceblue;
  margin-bottom: 2rem;
}

/* 3) The contact grid for your contact icons/links */
.contact-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  padding-bottom: 2rem;
}

/* 4) Individual contact cards with a fade-up animation */
.contact-card {
  flex: 1 1 200px;
  max-width: 220px;
  background-color: #1A1E26;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  text-align: center;
  cursor: pointer;
  /* Fade-up start state */
  opacity: 0;
  transform: translateY(20px);
  animation: fadeUp 0.8s ease forwards;
  /* We’ll define fadeUp below. 
     If you want each card to appear in sequence, 
     you can do an inline style with a delay. 
     e.g. style="animation-delay: 0.2s" on the second item, etc. */
  transition: transform 0.3s ease;
}
.contact-card:hover {
  transform: translateY(-5px);
  background-color: #71D9B3;
}

/* Title inside each contact card */
.contact-card h3 {
  color: aliceblue;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
}

/* The clickable icon/button */
.contact-link {
  display: inline-block;
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #4C5359;
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 5px;
  transition: transform 0.3s, background 0.3s;
}
.contact-link:hover {
  transform: scale(1.05);
  background-color: #4D208C;
}

/* 5) FadeUp animation for cards */
@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .contact-grid {
    flex-direction: column;
    align-items: center;
  }
  .contact-card {
    width: 100%;
    max-width: 300px;
  }
  h2 {
    font-size: 2rem;
  }
  p {
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .contact-card {
    max-width: 100%;
  }
  h2 {
    font-size: 1.8rem;
  }
  p {
    font-size: 1rem;
  }
}
</style>
