<template>
  <section id="contact">
    <div class="section-wrapper" ref="sectionWrapper">
      <h2>Contact Me</h2>
      <p>Feel free to reach out to me through any of the following platforms!</p>
      <div class="projects-container">
        <!-- Contact items with hover effects -->
        <div v-for="(contact, index) in contacts" :key="index" class="project-item">
          <div class="project-description">
            <h3>{{ contact.name }}</h3>
            <a :href="contact.link" target="_blank" class="view-project-button">
              <font-awesome-icon :icon="contact.icon" size="3x" />
            </a>
          </div>
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

#contact {
  background-color: #0D0D0D;
  padding: 20px;
  margin: 20px auto;
}

.section-wrapper {
  max-width: 1200px;
  width: 90%;
  padding: var(--base-spacing);
  margin: 20px auto;
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

h2 {
  font-size: 4rem;
  color: var(--text-color);
  margin-bottom: var(--base-spacing);
  text-align: center;
}

p {
  text-align: center;
  font-size: 1.5rem;
  color: var(--text-color);
}

.projects-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  padding: 20px;
}

.project-item {
  flex: 1 1 300px;
  max-width: 300px;
  background-color: var(--background-dark);
  padding: 2rem;
  border-radius: 0.25rem;
  background-color: #0D0D0D; /* Updated gradient colors */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  text-align: center;
  transform: translateY(0);
}

.project-item:hover {
  transform: translateY(-5px);
  background-color: #71D9B3; /* Reverse gradient on hover */
}

.project-description h3 {
  color: var(--text-color);
  margin-bottom: 1rem;
}

.project-description a {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background-color: #4C5359; /* Initial background color */
  color: #fff; /* White text color */
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 5px;
  transition: transform 0.3s, background 0.3s;
}

.project-description a:hover {
  transform: scale(1.05);
  background-color: #4D208C;; /* Gradient background on hover */
}

@media (max-width: 768px) {
  .projects-container {
    flex-direction: column;
  }

  .project-item {
    width: 100%;
    max-width: 90%;
    padding: 1rem; /* Adjust padding for smaller screens */
  }
}

@media (max-width: 992px) and (min-width: 769px) {
  .project-item {
    width: calc(50% - 1rem);
  }
}

@media (max-width: 480px) {
  .project-item {
    flex: 1 1 200px;
    max-width: 200px;
    padding: 1rem; /* Adjust padding for smaller screens */
  }

  .project-description h3 {
    font-size: 1rem; /* Adjust font size for smaller screens */
  }

  .project-description a {
    font-size: 2rem; /* Adjust icon size for smaller screens */
  }
}
</style>
