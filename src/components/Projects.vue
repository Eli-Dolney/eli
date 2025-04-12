<template>
  <section id="projects">
    <div class="section-wrapper" ref="sectionWrapper">
      <div class="section-header">
        <h2>My Projects</h2>
        <div class="underline"></div>
        <p>Check out some of the things I have been working on since I started coding!</p>
      </div>
      
      <!-- Project categories -->
      <div class="categories-container">
        <!-- Python Scripts Section -->
        <div class="category-section" ref="categorySection">
          <div class="category-header">
            <h3>Python Scripts</h3>
            <div class="category-underline"></div>
          </div>
          
          <div class="projects-grid">
            <div 
              v-for="(project, index) in projects.filter(p => p.category === 'Python Scripts')" 
              :key="`python-${index}`" 
              class="project-card"
              :style="{ animationDelay: `${index * 0.15}s` }"
            >
              <div class="project-image-container">
                <img 
                  :src="project.imageSrc" 
                  :alt="`${project.title} preview`"
                  @click="openModal(project)"
                  class="project-image"
                />
                <div class="project-overlay">
                  <button class="view-details-btn" @click="openModal(project)">View Details</button>
                </div>
              </div>
              
              <div class="project-content">
                <h4>{{ project.title }}</h4>
                <p>{{ project.description }}</p>
                <div class="project-footer">
                  <a :href="project.link" target="_blank" class="project-link">
                    <span>View Project</span>
                    <font-awesome-icon :icon="['fas', 'arrow-right']" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Projects Section -->
        <div class="category-section" ref="categorySection">
          <div class="category-header">
            <h3>Projects</h3>
            <div class="category-underline"></div>
          </div>
          
          <div class="projects-grid">
            <div 
              v-for="(project, index) in projects.filter(p => p.category === 'Projects')" 
              :key="`project-${index}`" 
              class="project-card"
              :style="{ animationDelay: `${index * 0.15}s` }"
            >
              <div class="project-image-container">
                <img 
                  :src="project.imageSrc" 
                  :alt="`${project.title} preview`"
                  @click="openModal(project)"
                  class="project-image"
                />
                <div class="project-overlay">
                  <button class="view-details-btn" @click="openModal(project)">View Details</button>
                </div>
              </div>
              
              <div class="project-content">
                <h4>{{ project.title }}</h4>
                <p>{{ project.description }}</p>
                <div class="project-footer">
                  <a :href="project.link" target="_blank" class="project-link">
                    <span>View Project</span>
                    <font-awesome-icon :icon="['fas', 'arrow-right']" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Websites Section -->
        <div class="category-section" ref="categorySection">
          <div class="category-header">
            <h3>Websites</h3>
            <div class="category-underline"></div>
          </div>
          
          <div class="projects-grid">
            <div 
              v-for="(project, index) in projects.filter(p => p.category === 'Websites')" 
              :key="`website-${index}`" 
              class="project-card"
              :style="{ animationDelay: `${index * 0.15}s` }"
            >
              <div class="project-image-container">
                <img 
                  :src="project.imageSrc" 
                  :alt="`${project.title} preview`"
                  @click="openModal(project)"
                  class="project-image"
                />
                <div class="project-overlay">
                  <button class="view-details-btn" @click="openModal(project)">View Details</button>
                </div>
              </div>
              
              <div class="project-content">
                <h4>{{ project.title }}</h4>
                <p>{{ project.description }}</p>
                <div class="project-footer">
                  <a :href="project.link" target="_blank" class="project-link">
                    <span>View Project</span>
                    <font-awesome-icon :icon="['fas', 'arrow-right']" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Project Detail Modal -->
    <div v-if="openProjectModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="closeModal">
          <font-awesome-icon :icon="['fas', 'times']" />
        </button>
        
        <div class="modal-header">
          <h3>{{ selectedProject.title }}</h3>
          <div class="modal-underline"></div>
        </div>
        
        <div class="modal-body">
          <div class="modal-image">
            <img :src="selectedProject.imageSrc" :alt="selectedProject.title">
          </div>
          
          <div class="modal-description">
            <p>{{ selectedProject.description }}</p>
            
            <!-- Optional: Add more details that only show in the modal -->
            <div v-if="selectedProject.technologies" class="modal-tech">
              <h4>Technologies Used:</h4>
              <ul class="tech-list">
                <li v-for="(tech, i) in selectedProject.technologies" :key="i">{{ tech }}</li>
              </ul>
            </div>
            
            <div v-if="selectedProject.features" class="modal-features">
              <h4>Key Features:</h4>
              <ul>
                <li v-for="(feature, i) in selectedProject.features" :key="i">{{ feature }}</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="modal-footer">
          <a :href="selectedProject.link" target="_blank" class="modal-button primary">
            View Project
            <font-awesome-icon :icon="['fas', 'external-link-alt']" />
          </a>
          
          <button class="modal-button secondary" @click="closeModal">Close</button>
        </div>
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
          title: 'Svelte Link Tree Clone',
          description: 'My first look into Svelte with fireship.io. A modern profile links page with customizable themes and analytics.',
          link: 'https://github.com/Eli-Dolney/Svelte',
          imageSrc: svelteImage,
          category: 'Projects',
          technologies: ['Svelte', 'TypeScript', 'Firebase', 'CSS'],
          features: [
            'User authentication',
            'Custom themes',
            'Link analytics',
            'Mobile-responsive design'
          ]
        },
        {
          title: 'Note + Mindmap',
          description: 'An advanced note-taking application that combines traditional notes with visual mind mapping capabilities for better organization and brainstorming.',
          link: 'https://github.com/Eli-Dolney/notes',
          imageSrc: note,
          category: 'Python Scripts',
          technologies: ['Python', 'PyQt', 'SQLite', 'NetworkX'],
          features: [
            'Mind map visualization',
            'Rich text editing',
            'Note categorization',
            'Export to multiple formats'
          ]
        },
        {
          title: 'Stock Price Predictor',
          description: 'A machine learning application that analyzes historical stock data and predicts future prices using various algorithms and technical indicators.',
          link: 'https://github.com/Eli-Dolney/stock/tree/main',
          imageSrc: stock,
          category: 'Python Scripts',
          technologies: ['Python', 'scikit-learn', 'pandas', 'matplotlib', 'yfinance'],
          features: [
            'Multiple prediction models',
            'Technical indicator analysis',
            'Interactive visualization',
            'Historical performance backtesting'
          ]
        },
        {
          title: 'Expense Tracker',
          description: 'A comprehensive expense tracking tool that helps users manage their finances with budgeting features, expense categorization, and visual reports.',
          link: 'https://github.com/Eli-Dolney/expense-tracker',
          imageSrc: expense,
          category: 'Python Scripts',
          technologies: ['Python', 'Tkinter', 'SQLite', 'Matplotlib'],
          features: [
            'Expense categorization',
            'Visual spending reports',
            'Budget planning',
            'Export to CSV/PDF'
          ]
        },
      ]
    };
  },
  mounted() {
    // Animation for the entire section
    const mainObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    mainObserver.observe(this.$refs.sectionWrapper);

    // Animations for individual category sections
    const categoryObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('category-in-view');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    // Observe each category section
    const categorySections = document.querySelectorAll('.category-section');
    categorySections.forEach(section => {
      categoryObserver.observe(section);
    });

    // Animations for individual project cards
    const projectObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('card-in-view');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    // Observe each project card
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      projectObserver.observe(card);
    });
  },
  methods: {
    openModal(project) {
      this.selectedProject = project;
      this.openProjectModal = true;
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    },
    closeModal() {
      this.openProjectModal = false;
      document.body.style.overflow = ''; // Re-enable scrolling
    }
  }
};
</script>

<style scoped>
/* Base Styles */
#projects {
  background-color: #0D0D0D;
  background-image: linear-gradient(to bottom, #0D0D0D, #181818);
  min-height: 100vh;
  width: 100%;
  margin-left: 0;
  padding: 4rem 2rem;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}

@media (min-width: 768px) {
  #projects {
    
    width: 100%;
  }
}

/* Main Section Wrapper */
.section-wrapper {
  max-width: 1400px;
  margin: 0 auto;
  box-sizing: border-box;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.section-wrapper.in-view {
  opacity: 1;
  transform: translateY(0);
}

/* Section Header Styling */
.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

h2 {
  font-size: 3.5rem;
  color: #fff;
  margin-bottom: 1rem;
  font-weight: 700;
  letter-spacing: 1px;
}

.underline {
  height: 4px;
  width: 120px;
  background: linear-gradient(90deg, #71D9B3, #806FBF);
  margin: 0 auto 1.5rem;
  border-radius: 2px;
}

.section-header p {
  font-size: 1.4rem;
  color: #AED8F2;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Categories Container */
.categories-container {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

/* Category Section */
.category-section {
  border-radius: 16px;
  padding: 2.5rem;
  background: rgba(26, 30, 38, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(174, 216, 242, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.category-section.category-in-view {
  opacity: 1;
  transform: translateY(0);
}

/* Category Header */
.category-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.category-header h3 {
  font-size: 2.2rem;
  color: #806FBF;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.category-underline {
  height: 3px;
  width: 80px;
  background: linear-gradient(90deg, #806FBF, #71D9B3);
  margin: 0 auto 1rem;
  border-radius: 1.5px;
}

/* Projects Grid */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2.5rem;
}

/* Project Card */
.project-card {
  background: rgba(13, 13, 13, 0.7);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275),
              box-shadow 0.4s ease;
  border: 1px solid rgba(174, 216, 242, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
  
  /* Animation start state */
  opacity: 0;
  transform: translateY(30px);
  animation: fadeUp 0.6s ease forwards;
  animation-play-state: paused;
}

.project-card.card-in-view {
  animation-play-state: running;
}

.project-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(113, 217, 179, 0.2);
}

/* Project Image Container */
.project-image-container {
  position: relative;
  overflow: hidden;
  height: 220px;
  width: 100%;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.project-card:hover .project-image {
  transform: scale(1.05);
}

/* Image Overlay */
.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(13, 13, 13, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .project-overlay {
  opacity: 1;
}

/* View Details Button */
.view-details-btn {
  padding: 0.8rem 1.5rem;
  background: linear-gradient(135deg, #806FBF, #71D9B3);
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.view-details-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(113, 217, 179, 0.4);
}

/* Project Content */
.project-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.project-content h4 {
  font-size: 1.4rem;
  color: #fff;
  margin-bottom: 0.8rem;
  font-weight: 600;
}

.project-content p {
  color: #AED8F2;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  text-align: left;
  flex-grow: 1;
}

/* Project Footer */
.project-footer {
  margin-top: auto;
  display: flex;
  justify-content: flex-start;
}

/* Project Link Button */
.project-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  background: linear-gradient(135deg, #4D208C, #71D9B3);
  color: #fff;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  border-radius: 6px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.project-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #71D9B3, #4D208C);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 0;
}

.project-link:hover::before {
  opacity: 1;
}

.project-link span,
.project-link svg {
  position: relative;
  z-index: 1; /* Place above the pseudo-element */
}

.project-link:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(113, 217, 179, 0.4);
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
  box-sizing: border-box;
}

.modal-content {
  background: #1A1E26;
  border-radius: 12px;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  animation: modalFadeIn 0.4s ease;
  border: 1px solid rgba(174, 216, 242, 0.1);
}

/* Modal Close Button */
.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #fff;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  z-index: 10;
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: rotate(90deg);
}

/* Modal Header */
.modal-header {
  padding: 2rem 2rem 1rem;
  text-align: center;
}

.modal-header h3 {
  font-size: 2rem;
  color: #fff;
  margin-bottom: 0.5rem;
}

.modal-underline {
  height: 3px;
  width: 100px;
  background: linear-gradient(90deg, #71D9B3, #806FBF);
  margin: 0.5rem auto 1rem;
  border-radius: 1.5px;
}

/* Modal Body */
.modal-body {
  padding: 0 2rem 2rem;
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .modal-body {
    flex-direction: row;
    gap: 2rem;
  }
}

/* Modal Image */
.modal-image {
  flex: 1;
  min-width: 0;
  margin-bottom: 1.5rem;
}

@media (min-width: 768px) {
  .modal-image {
    flex: 0 0 45%;
    margin-bottom: 0;
  }
}

.modal-image img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

/* Modal Description */
.modal-description {
  flex: 1;
  min-width: 0;
}

.modal-description p {
  color: #AED8F2;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  text-align: left;
}

/* Tech List */
.modal-tech h4,
.modal-features h4 {
  color: #fff;
  font-size: 1.2rem;
  margin-bottom: 0.8rem;
}

.tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin-bottom: 1.5rem;
}

.tech-list li {
  background: rgba(113, 217, 179, 0.2);
  color: #71D9B3;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
}

/* Features List */
.modal-features ul {
  list-style: none;
  padding: 0;
  margin-bottom: 1.5rem;
}

.modal-features li {
  padding: 0.5rem 0;
  color: #AED8F2;
  border-bottom: 1px solid rgba(174, 216, 242, 0.1);
  position: relative;
  padding-left: 1.5rem;
}

.modal-features li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: #71D9B3;
}

/* Modal Footer */
.modal-footer {
  padding: 1.5rem 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

/* Modal Buttons */
.modal-button {
  padding: 0.8rem 1.5rem;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.modal-button.primary {
  background: linear-gradient(135deg, #806FBF, #71D9B3);
  color: #fff;
  border: none;
  text-decoration: none;
}

.modal-button.primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(113, 217, 179, 0.4);
}

.modal-button.secondary {
  background: transparent;
  border: 1px solid rgba(174, 216, 242, 0.3);
  color: #AED8F2;
}

.modal-button.secondary:hover {
  background: rgba(174, 216, 242, 0.1);
}

/* Animations */
@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Adjustments */
@media (max-width: 992px) {
  .projects-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
  }
  
  h2 {
    font-size: 3rem;
  }
  
  .category-header h3 {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  #projects {
    padding: 3rem 1.5rem;
  }
  
  .section-header {
    margin-bottom: 3rem;
  }
  
  h2 {
    font-size: 2.5rem;
  }
  
  .section-header p {
    font-size: 1.2rem;
  }
  
  .categories-container {
    gap: 3rem;
  }
  
  .category-section {
    padding: 2rem 1.5rem;
  }
  
  .category-header h3 {
    font-size: 1.8rem;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .modal-content {
    padding: 1rem;
  }
  
  .modal-header h3 {
    font-size: 1.8rem;
  }
}

@media (max-width: 480px) {
  #projects {
    padding: 2.5rem 1rem;
  }
  
  h2 {
    font-size: 2rem;
  }
  
  .section-header p {
    font-size: 1rem;
  }
  
  .category-section {
    padding: 1.5rem 1rem;
  }
  
  .category-header h3 {
    font-size: 1.6rem;
  }
  
  .project-content h4 {
    font-size: 1.2rem;
  }
  
  .modal-header h3 {
    font-size: 1.6rem;
  }
  
  .modal-description p {
    font-size: 1rem;
  }
  
  .modal-footer {
    flex-direction: column;
  }
  
  .modal-button {
    width: 100%;
    justify-content: center;
  }
}
</style>