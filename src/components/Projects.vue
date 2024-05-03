<template>
    <section id="projects">
      <div class="section-wrapper">
        <h2>My Projects</h2>
        <p>Check out my portfolio website</p>
        <div class="projects-container" v-for="(project, index) in projects" :key="index">
          <div class="project-description">
            <h3>{{ project.title }}</h3>
            <p>{{ project.description }}</p>
            <a :href="project.link" target="_blank">View Project</a>
          </div>
          <div class="project-image">
            <img @click="openModal(project)" :src="project.imageSrc" alt="Project image" />
          </div>
        </div>
      </div>
      <!-- Modal component -->
      <div v-if="openProjectModal" class="modal">
        <div class="modal-content">
          <h3>{{ selectedProject.title }}</h3>
          <p>{{ selectedProject.description }}</p>
          <a :href="selectedProject.link" target="_blank">View Project</a>
          <button @click="closeModal">Close</button>
        </div>
      </div>
    </section>
  </template>
  
  <script>
// Import the image just like you did in the "About" section
import juiceImage from '../assets/images/juice.jpg';
import Evj from '../assets/images/evj.jpg';
import svelte from '../assets/images/svelte.jpg';

export default {
  name: "Projects",
  data() {
    return {
      openProjectModal: false,
      selectedProject: null,
      // Make sure 'projects' is an array
      projects: [
        {
          title: 'Svelte Link Tree Clone (In Progress)',
          description: 'My first look into Svelte with fireship.io. Languages/Tools: Svelte, TypeScript, Firebase ',
          link: 'https://github.com/Eli-Dolney/eli',
          imageSrc: svelte // Use the imported image
        },
        {
          title: 'Job Tracker App',
          description: 'This is a detailed description of the job tracking application...',
          link: 'https://github.com/Eli-Dolney/jobtracker',
          imageSrc: Evj // Use the imported image
        },
        
        //{
         // title: 'Workspace Organizer',
        //  description: 'This is a detailed description of the workspace organizer project...',
        //  link: 'https://github.com/Eli-Dolney/Workspaces',
        //  imageSrc: juiceImage // Use the imported image
        //}
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
  color: #40181C; /* Adjusted text color for readability */
  background-color: #737373; /* Dark theme background */
}

h2 {
  color: #8C164D;
}

.projects-container {
  display: flex;
  flex-wrap: wrap; /* Wrap for better responsiveness */
  gap: 2rem; /* Space between project cards */
  justify-content: center; /* Center cards */
  padding: 20px;
}

.project-description, .project-image {
  flex: 1 1 300px; /* Flex basis set to 300px with grow and shrink */
  max-width: 50%; /* Ensure each takes up no more than half the container width */
  background-color: #403E3F; /* Card background for description */
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease; /* Smooth transform on hover */
}

.project-description h3, .project-description a {
  color: #52B3D9; /* Highlight project titles and links */
  text-decoration: none;
  font-weight: bold;
}

.project-description:hover {
  transform: translateY(-5px); /* Lift card on hover */
}

.project-image img {
  width: 100%; /* Ensure image takes full width of its container */
  height: auto; /* Maintain aspect ratio */
  object-fit: cover; /* Cover the area without distorting the aspect ratio */
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #252934; /* Modal background */
  padding: 2rem;
  border-radius: 8px;
  z-index: 1000;
  max-width: 600px; /* Fixed modal width */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  color: #EAEAEA; /* Modal text color */
}

.modal button {
  padding: 0.5rem 1rem;
  background-color: #DB2EF2; /* Close button color */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .projects-container {
    flex-direction: column;
  }

  .project-description, .project-image {
    width: 100%; /* Full width on smaller screens */
    max-width: 100%; /* Override previous max-width */
  }
}

@media (max-width: 992px) and (min-width: 769px) {
  .project-description, .project-image {
    width: calc(50% - 1rem); /* Two items per row on medium screens */
  }
}
</style>

  
  