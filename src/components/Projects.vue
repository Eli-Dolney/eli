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
  color: #EAEAEA; /* Adjusted text color for readability */
  background-color: #1A1E26; /* Dark theme background */
}

.projects-container {
  display: flex;
  flex-wrap: wrap; /* Wrap for better responsiveness */
  gap: 2rem; /* Space between project cards */
  justify-content: center; /* Center cards */
}

.project-description {
  flex: 1;
  background-color: #252934; /* Card background */
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease; /* Smooth transform on hover */
  box-shadow: inset 0 0 10px #DB2EF2;
}

.project-description h3 {
  color: #DB2EF2; /* Highlight project titles */
}

.project-description a {
  color: #4E9F3D; /* CTA link color */
  text-decoration: none;
  font-weight: bold;
}

.project-description:hover {
  transform: translateY(-5px); /* Lift card on hover */
}

.project-image img {
  max-width: 50%;
  height: auto;
  cursor: pointer;
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
  background-color: #DB2EF2; /* Example close button color */
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

  .project-description {
    width: 100%; /* Full width on smaller screens */
    margin-bottom: 1rem;
  }
}

@media (max-width: 992px) and (min-width: 769px) {
  .project-description {
    width: calc(50% - 1rem); /* Two items per row on medium screens */
  }
}
</style>
  
  