<template>
  <section id="projects">
    <div class="section-wrapper">
      <h2>My Projects</h2>
      <p>Check out some of the things I have been working on since I started coding!</p>
      
      <!-- Python Scripts Section -->
      <div>
        <h3>Python Scripts</h3>
        <div class="projects-container">
          <div v-for="(project, index) in projects.filter(p => p.category === 'Python Scripts')" :key="index" class="project-item">
            <div class="project-description">
              <h3>{{ project.title }}</h3>
              <p>{{ project.description }}</p>
              <a :href="project.link" target="_blank" class="view-project-button">View Project</a>
            </div>
            <div class="project-image">
              <img @click="openModal(project)" :src="project.imageSrc" alt="Project image" />
            </div>
          </div>
        </div>
      </div>

      <!-- Projects Section -->
      <div>
        <h3>Projects</h3>
        <div class="projects-container">
          <div v-for="(project, index) in projects.filter(p => p.category === 'Projects')" :key="index" class="project-item">
            <div class="project-description">
              <h3>{{ project.title }}</h3>
              <p>{{ project.description }}</p>
              <a :href="project.link" target="_blank" class="view-project-button">View Project</a>
            </div>
            <div class="project-image">
              <img @click="openModal(project)" :src="project.imageSrc" alt="Project image" />
            </div>
          </div>
        </div>
      </div>

      <!-- Websites Section -->
      <div>
        <h3>Websites</h3>
        <div class="projects-container">
          <div v-for="(project, index) in projects.filter(p => p.category === 'Websites')" :key="index" class="project-item">
            <div class="project-description">
              <h3>{{ project.title }}</h3>
              <p>{{ project.description }}</p>
              <a :href="project.link" target="_blank" class="view-project-button">View Project</a>
            </div>
            <div class="project-image">
              <img @click="openModal(project)" :src="project.imageSrc" alt="Project image" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal component -->
    <div v-if="openProjectModal" class="modal">
      <div class="modal-content">
        <h3>{{ selectedProject.title }}</h3>
        <p>{{ selectedProject.description }}</p>
        <a :href="selectedProject.link" target="_blank" class="view-project-button">View Project</a>
        <button @click="closeModal">Close</button>
      </div>
    </div>
  </section>
</template>

<script>
import svelteImage from '../assets/images/svelte.jpg';
import note from '../assets/images/notes.jpg';
import stock from '../assets/images/stock.jpg';
import expense from '../assets/images/expense.jpg';

export default {
  name: "Projects",
  data() {
    return {
      openProjectModal: false,
      selectedProject: null,
      projects: [
        {
          title: 'Svelte Link Tree Clone (In Progress)',
          description: 'My first look into Svelte with fireship.io. Languages/Tools: Svelte, TypeScript, Firebase',
          link: 'https://github.com/Eli-Dolney/Svelte',
          imageSrc: svelteImage,
          category: 'Projects'
        },
        {
          title: 'Note + mindmap',
          description: 'This is a detailed description of the job tracking application...',
          link: 'https://github.com/Eli-Dolney/notes',
          imageSrc: note,
          category: 'Python Scripts'
        },
        {
          title: 'Stock Price Predictor',
          description: 'A project to predict stock prices using Python and scikit-learn...',
          link: 'https://github.com/Eli-Dolney/stock/tree/main',
          imageSrc: stock,
          category: 'Python Scripts'
        },
        {
          title: 'Expense Tracker',
          description: 'An expense tracking application built with Python and Tkinter...',
          link: 'https://github.com/Eli-Dolney/expense-tracker',
          imageSrc: expense,
          category: 'Python Scripts'
        },
      ]
    };
  },
  methods: {
    openModal(project) {
      this.selectedProject = project;
      this.openProjectModal = true;
    },
    closeModal() {
      this.openProjectModal = false;
    }
  }
};
</script>

<style scoped>
.section-wrapper {
  max-width: 1200px;
  margin: auto;
  padding: 2rem;
  color: #4D208C;
  box-shadow: inset 0 0 10px #AED8F2;
  background-color: #0D0D0D;
  box-sizing: border-box;
}

h2 {
  color: #806FBF;
  font-size: 4rem;
  text-align: center;
}

h3 {
  color: #806FBF;
  margin-top: 2rem; 
  font-size: 3rem;
  text-align: center;
}

p {
  font-size: 2rem;
  text-align: center;
}

.projects-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  box-shadow: inset 0 0 10px #AED8F2;
}

.project-item {
  flex: 1 1 300px;
  max-width: 45%;
  background-color: #0D0D0D;
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  box-sizing: border-box;
}

.project-description h3, .project-description a {
  color: #806FBF;
  text-decoration: none;
  font-weight: bold;
}

.view-project-button {
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

.view-project-button:hover {
  transform: scale(1.05);
  background-color:#71D9B3; /* Gradient background on hover */
}

.project-item:hover {
  transform: translateY(-5px);
}

.project-image img {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #252934;
  padding: 2rem;
  border-radius: 8px;
  z-index: 1000;
  max-width: 600px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  color: #EAEAEA;
}

.modal button {
  padding: 0.5rem 1rem;
  background-color: #DB2EF2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .projects-container {
    flex-direction: column;
  }

  .project-item {
    width: 100%;
    max-width: 100%;
    padding: 1rem;
  }
}

@media (max-width: 992px) and (min-width: 769px) {
  .project-item {
    width: calc(50% - 1rem);
  }
}

@media (max-width: 480px) {
  .project-item {
    flex: 1 1 100%;
    max-width: 100%;
    padding: 1rem;
  }

  h2 {
    font-size: 2.5rem;
  }

  h3 {
    font-size: 1.5rem;
  }

  p {
    font-size: 1.5rem;
  }

  .section-wrapper {
    padding: 1rem;
  }
}
</style>
