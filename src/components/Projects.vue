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
/* 
  1) #projects: make it fill the screen (minus sidebar).
  Note: Uses the same logic you already have to shift right on larger screens. 
*/
#projects {
  background-color: #0D0D0D;
  color: #EAEAEA;
  width: 100%;
  min-height: 100vh; 
  padding: 2rem;
  box-sizing: border-box;
  margin-left: 0;
}

@media (min-width: 768px) {
  #projects {
    margin-left: 100px;
    width: calc(100% - 100px);
  }
}

/* 2) Outer wrapper that holds all content (headings, categories, etc.) */
.section-wrapper {
  width: 100%;
  padding: 2rem;
  background-color: #0D0D0D;
  box-shadow: inset 0 0 10px #AED8F2; 
  box-sizing: border-box;
}

/* Main title and intro paragraph */
h2 {
  color: #806FBF;
  font-size: 3.5rem;
  text-align: center;
  margin-bottom: 1rem;
}
p {
  font-size: 1.6rem;
  text-align: center;
  color: #AAA;
  margin-bottom: 3rem;
}

/* 3) Each category section (Python Scripts, Projects, Websites, etc.) */
.category-section {
  margin-bottom: 3rem;          /* Space between sections */
  border: 2px solid #806FBF;    /* Purple border for definition */
  padding: 2rem;
  border-radius: 8px;
  background-color: #161B22;    /* Slightly different shade for contrast */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  /* Optional subtle hover effect */
  transition: transform 0.3s ease;
}
.category-section:hover {
  transform: scale(1.01);
}

/* Category headings (e.g., "Python Scripts", "Projects", "Websites") */
.category-section h3 {
  color: #806FBF;
  font-size: 2.4rem;
  text-align: center;
  margin-top: 0; /* remove default heading margin in this context */
  margin-bottom: 2rem;
}

/* 4) The container for your project items within each category */
.projects-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  /* Remove or customize if you don’t want an extra inset shadow: */
  box-shadow: inset 0 0 10px #AED8F2; 
  padding: 1rem;  /* some padding so the items aren’t flush to the edges */
  border-radius: 6px; /* minor rounding */
  background-color: #0D0D0D; /* match or differ from .category-section */
}

/* 5) Individual project items */
.project-item {
  flex: 1 1 300px;
  max-width: 45%;
  background-color: #0D0D0D;
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  /* fadeUp animation start state */
  opacity: 0;
  transform: translateY(20px);
  animation: fadeUp 0.8s ease forwards;
  transition: transform 0.3s ease;
}

/* Lift on hover */
.project-item:hover {
  transform: translateY(-5px);
}

/* Project headings and links */
.project-description h3, 
.project-description a {
  color: #806FBF;
  text-decoration: none;
  font-weight: bold;
}

/* View Project button styles */
.view-project-button {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background-color: #4C5359;
  color: #fff;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 5px;
  transition: transform 0.3s, background 0.3s;
}
.view-project-button:hover {
  transform: scale(1.05);
  background-color: #71D9B3;
}

/* Project image */
.project-image img {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* 6) Modal styling (unchanged) */
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

/* 7) Responsive */
@media (max-width: 768px) {
  .projects-container {
    flex-direction: column;
    padding: 0.5rem;
  }
  .project-item {
    width: 100%;
    max-width: 100%;
    padding: 1rem;
  }
  h2 {
    font-size: 3rem;
  }
  h3 {
    font-size: 2rem;
  }
  p {
    font-size: 1.3rem;
  }
  .section-wrapper {
    padding: 1rem;
  }
}

@media (max-width: 992px) and (min-width: 769px) {
  .project-item {
    width: calc(50% - 1rem);
  }
}

/* FadeUp animation keyframes */
@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>


