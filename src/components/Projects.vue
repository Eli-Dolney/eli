<template>
    <section id="projects">
      <div class="section-wrapper">
        <h2>My Projects</h2>
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

export default {
  name: "Projects",
  data() {
    return {
      openProjectModal: false,
      selectedProject: null,
      // Make sure 'projects' is an array
      projects: [
        {
          title: 'Eli’s First Project',
          description: 'This is a detailed description of the first project...',
          link: 'https://github.com/Eli-Dolney/eli',
          imageSrc: juiceImage // Use the imported image
        },
        {
          title: 'Job Tracker App',
          description: 'This is a detailed description of the job tracking application...',
          link: 'https://github.com/Eli-Dolney/jobtracker',
          imageSrc: juiceImage // Use the imported image
        },
        {
          title: 'Workspace Organizer',
          description: 'This is a detailed description of the workspace organizer project...',
          link: 'https://github.com/Eli-Dolney/Workspaces',
          imageSrc: juiceImage // Use the imported image
        }
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
}

.projects-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.project-description {
  flex: 1;
  padding-right: 20px; 
  box-shadow: inset 0 0 10px #DB2EF2;/* Adjust the padding as needed */
}

.project-image {
  flex: 1;
  text-align: center;
}

.project-image img {
  max-width: 50%;
  height: auto;
  cursor: pointer;
  border-radius: 5px;
}
  
  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    z-index: 1000;
    max-width: 90%;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  }
  
  .modal-content {
    text-align: left;
  }
  
  .modal button {
    padding: 0.5rem 1rem;
    background-color: #dc3545; /* Example close button color */
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .projects-grid {
      flex-direction: column;
      align-items: center;
    }
  
    .project-card {
      width: 90%; /* Full width on smaller screens */
      margin-bottom: 1rem;
    }
  }
  
  @media (max-width: 992px) and (min-width: 769px) {
    .project-card {
      width: calc(50% - 2rem); /* Two items per row on medium screens */
    }
  }
  </style>
  
  