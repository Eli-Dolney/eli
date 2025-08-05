<template>
  <section id="projects">
    <div class="section-wrapper" ref="sectionWrapper">
      <div class="section-header">
        <h2>My Projects</h2>
        <div class="underline"></div>
        <p>Explore my journey through code - from Python scripts to full-stack applications</p>
      </div>
      
      <!-- Project Filter Tabs -->
      <div class="filter-tabs">
        <button 
          v-for="category in categories" 
          :key="category.id"
          :class="['filter-tab', activeCategory === category.id ? 'active' : '']"
          @click="setActiveCategory(category.id)"
        >
          <i :class="category.icon"></i>
          {{ category.name }}
          <span class="project-count">{{ getProjectCount(category.id) }}</span>
        </button>
      </div>
      
      <!-- Projects Grid -->
      <div class="projects-container">
        <div class="projects-grid">
          <div 
            v-for="(project, index) in filteredProjects" 
            :key="project.id" 
            class="project-card"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="project-header">
              <div class="project-icon">
                <i :class="getProjectIcon(project.language)"></i>
              </div>
              <div class="project-stats">
                <span class="stat">
                  <i class="fas fa-star"></i>
                  {{ project.stars }}
                </span>
                <span class="stat">
                  <i class="fas fa-code-branch"></i>
                  {{ project.forks }}
                </span>
              </div>
            </div>
            
            <div class="project-content">
              <h3 class="project-title">{{ project.name }}</h3>
              <p class="project-description">{{ project.description }}</p>
              
              <div class="project-meta">
                <span class="language">
                  <span class="language-dot" :style="{ backgroundColor: getLanguageColor(project.language) }"></span>
                  {{ project.language }}
                </span>
                <span class="updated">Updated {{ formatDate(project.updatedAt) }}</span>
              </div>
              
              <div class="project-topics" v-if="project.topics && project.topics.length">
                <span 
                  v-for="topic in project.topics.slice(0, 3)" 
                  :key="topic" 
                  class="topic-tag"
                >
                  {{ topic }}
                </span>
                <span v-if="project.topics.length > 3" class="topic-more">
                  +{{ project.topics.length - 3 }}
                </span>
              </div>
            </div>
            
            <div class="project-actions">
              <a 
                :href="project.htmlUrl" 
                target="_blank" 
                class="action-btn primary"
              >
                <i class="fab fa-github"></i>
                View Code
              </a>
              <button 
                @click="openProjectModal(project)" 
                class="action-btn secondary"
              >
                <i class="fas fa-info-circle"></i>
                Details
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- GitHub Stats Section -->
      <div class="github-stats">
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">
              <i class="fas fa-repository"></i>
            </div>
            <div class="stat-content">
              <h3>{{ githubStats.repos }}</h3>
              <p>Repositories</p>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon">
              <i class="fas fa-star"></i>
            </div>
            <div class="stat-content">
              <h3>{{ githubStats.stars }}</h3>
              <p>Stars Earned</p>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon">
              <i class="fas fa-code-branch"></i>
            </div>
            <div class="stat-content">
              <h3>{{ githubStats.forks }}</h3>
              <p>Forks</p>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon">
              <i class="fas fa-users"></i>
            </div>
            <div class="stat-content">
              <h3>{{ githubStats.followers }}</h3>
              <p>Followers</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Enhanced Project Modal -->
    <div v-if="selectedProject" class="modal-overlay" @click="closeProjectModal">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="closeProjectModal">
          <i class="fas fa-times"></i>
        </button>
        
        <div class="modal-header">
          <div class="modal-project-info">
            <div class="project-icon-large">
              <i :class="getProjectIcon(selectedProject.language)"></i>
            </div>
            <div class="project-details">
              <h2>{{ selectedProject.name }}</h2>
              <p class="project-description">{{ selectedProject.description }}</p>
              <div class="project-meta-large">
                <span class="language">
                  <span class="language-dot" :style="{ backgroundColor: getLanguageColor(selectedProject.language) }"></span>
                  {{ selectedProject.language }}
                </span>
                <span class="created">Created {{ formatDate(selectedProject.createdAt) }}</span>
                <span class="updated">Updated {{ formatDate(selectedProject.updatedAt) }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="modal-body">
          <div class="modal-stats">
            <div class="stat-item">
              <i class="fas fa-star"></i>
              <span>{{ selectedProject.stars }} stars</span>
            </div>
            <div class="stat-item">
              <i class="fas fa-code-branch"></i>
              <span>{{ selectedProject.forks }} forks</span>
            </div>
            <div class="stat-item">
              <i class="fas fa-eye"></i>
              <span>{{ selectedProject.watchers }} watchers</span>
            </div>
            <div class="stat-item">
              <i class="fas fa-circle"></i>
              <span>{{ selectedProject.size }} KB</span>
            </div>
          </div>
          
          <div class="modal-topics" v-if="selectedProject.topics && selectedProject.topics.length">
            <h3>Topics</h3>
            <div class="topics-grid">
              <span 
                v-for="topic in selectedProject.topics" 
                :key="topic" 
                class="topic-tag-large"
              >
                {{ topic }}
              </span>
            </div>
          </div>
          
          <div class="modal-readme" v-if="selectedProject.readme">
            <h3>README</h3>
            <div class="readme-content" v-html="selectedProject.readme"></div>
          </div>
        </div>
        
        <div class="modal-footer">
          <a 
            :href="selectedProject.htmlUrl" 
            target="_blank" 
            class="modal-btn primary"
          >
            <i class="fab fa-github"></i>
            View on GitHub
          </a>
          <a 
            v-if="selectedProject.homepage" 
            :href="selectedProject.homepage" 
            target="_blank" 
            class="modal-btn secondary"
          >
            <i class="fas fa-external-link-alt"></i>
            Live Demo
          </a>
          <button class="modal-btn tertiary" @click="closeProjectModal">
            Close
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Projects",
  data() {
    return {
      selectedProject: null,
      activeCategory: 'all',
      categories: [
        { id: 'all', name: 'All Projects', icon: 'fas fa-th-large' },
        { id: 'python', name: 'Python', icon: 'fab fa-python' },
        { id: 'javascript', name: 'JavaScript', icon: 'fab fa-js-square' },
        { id: 'vue', name: 'Vue.js', icon: 'fab fa-vuejs' },
        { id: 'svelte', name: 'Svelte', icon: 'fab fa-svelte' },
        { id: 'web', name: 'Web Dev', icon: 'fas fa-globe' }
      ],
      projects: [
        {
          id: 1,
          name: 'stock',
          description: 'Python script to get stock data and charts with real-time market analysis and visualization tools.',
          language: 'Python',
          htmlUrl: 'https://github.com/Eli-Dolney/stock',
          homepage: null,
          stars: 1,
          forks: 0,
          watchers: 1,
          size: 45,
          topics: ['python', 'stock-analysis', 'data-visualization', 'finance'],
          createdAt: '2024-01-15T10:30:00Z',
          updatedAt: '2024-12-20T14:22:00Z',
          readme: 'A comprehensive stock analysis tool built with Python. Features include real-time data fetching, technical indicators, and interactive charts.'
        },
        {
          id: 2,
          name: 'eli',
          description: 'Personal portfolio website built with Vue.js showcasing my projects and skills.',
          language: 'Vue',
          htmlUrl: 'https://github.com/Eli-Dolney/eli',
          homepage: 'https://elidolney.dev/',
          stars: 0,
          forks: 0,
          watchers: 1,
          size: 1250,
          topics: ['vue', 'portfolio', 'personal-website', 'frontend'],
          createdAt: '2024-02-10T09:15:00Z',
          updatedAt: '2024-12-25T16:45:00Z',
          readme: 'My personal portfolio website built with Vue.js. Features a modern design, responsive layout, and showcases my projects and skills.'
        },
        {
          id: 3,
          name: 'keyboardkombat',
          description: 'Interactive typing game built with JavaScript to improve typing speed and accuracy.',
          language: 'JavaScript',
          htmlUrl: 'https://github.com/Eli-Dolney/keyboardkombat',
          homepage: null,
          stars: 0,
          forks: 0,
          watchers: 1,
          size: 89,
          topics: ['javascript', 'typing-game', 'web-game', 'interactive'],
          createdAt: '2024-03-05T11:20:00Z',
          updatedAt: '2024-11-18T13:30:00Z',
          readme: 'A fun typing game that helps users improve their typing speed and accuracy. Features multiple difficulty levels and real-time feedback.'
        },
        {
          id: 4,
          name: 'Svelte',
          description: 'Svelte Link Tree clone with modern UI and customizable themes.',
          language: 'Svelte',
          htmlUrl: 'https://github.com/Eli-Dolney/Svelte',
          homepage: null,
          stars: 0,
          forks: 0,
          watchers: 1,
          size: 234,
          topics: ['svelte', 'linktree', 'social-links', 'modern-ui'],
          createdAt: '2024-04-12T15:45:00Z',
          updatedAt: '2024-10-30T10:15:00Z',
          readme: 'A modern Link Tree clone built with Svelte. Features customizable themes, analytics, and a clean, responsive design.'
        },
        {
          id: 5,
          name: 'Coin',
          description: 'Cryptocurrency tracking application built with Vue.js and real-time price data.',
          language: 'Vue',
          htmlUrl: 'https://github.com/Eli-Dolney/Coin',
          homepage: null,
          stars: 0,
          forks: 0,
          watchers: 1,
          size: 567,
          topics: ['vue', 'cryptocurrency', 'crypto-tracking', 'real-time-data'],
          createdAt: '2024-05-20T08:30:00Z',
          updatedAt: '2024-12-15T12:20:00Z',
          readme: 'A cryptocurrency tracking application that displays real-time prices, market data, and portfolio management features.'
        },
        {
          id: 6,
          name: 'network_scanner',
          description: 'Python network scanner for discovering devices and analyzing network topology.',
          language: 'Python',
          htmlUrl: 'https://github.com/Eli-Dolney/network_scanner',
          homepage: null,
          stars: 0,
          forks: 0,
          watchers: 1,
          size: 78,
          topics: ['python', 'network-scanner', 'network-analysis', 'security'],
          createdAt: '2024-06-08T14:20:00Z',
          updatedAt: '2024-12-22T09:45:00Z',
          readme: 'A comprehensive network scanner built with Python. Features device discovery, port scanning, and network topology analysis.'
        },
        {
          id: 7,
          name: 'expense-tracker',
          description: 'Personal expense tracking application with budgeting and financial analysis features.',
          language: 'Python',
          htmlUrl: 'https://github.com/Eli-Dolney/expense-tracker',
          homepage: null,
          stars: 0,
          forks: 0,
          watchers: 1,
          size: 156,
          topics: ['python', 'expense-tracker', 'budgeting', 'finance'],
          createdAt: '2024-07-15T16:10:00Z',
          updatedAt: '2024-12-10T11:30:00Z',
          readme: 'A personal expense tracking application that helps users manage their finances with budgeting features and financial analysis.'
        }
      ],
      githubStats: {
        repos: 18,
        stars: 23,
        forks: 5,
        followers: 5
      }
    };
  },
  computed: {
    filteredProjects() {
      if (this.activeCategory === 'all') {
        return this.projects;
      }
      return this.projects.filter(project => {
        const language = project.language.toLowerCase();
        switch (this.activeCategory) {
          case 'python':
            return language === 'python';
          case 'javascript':
            return language === 'javascript';
          case 'vue':
            return language === 'vue';
          case 'svelte':
            return language === 'svelte';
          case 'web':
            return ['vue', 'javascript', 'svelte'].includes(language);
          default:
            return true;
        }
      });
    }
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
  },
  methods: {
    setActiveCategory(categoryId) {
      this.activeCategory = categoryId;
    },
    getProjectCount(categoryId) {
      if (categoryId === 'all') {
        return this.projects.length;
      }
      return this.filteredProjects.length;
    },
    getProjectIcon(language) {
      const icons = {
        'Python': 'fab fa-python',
        'JavaScript': 'fab fa-js-square',
        'Vue': 'fab fa-vuejs',
        'Svelte': 'fab fa-svelte',
        'HTML': 'fab fa-html5',
        'CSS': 'fab fa-css3-alt',
        'TypeScript': 'fab fa-js-square'
      };
      return icons[language] || 'fas fa-code';
    },
    getLanguageColor(language) {
      const colors = {
        'Python': '#3776ab',
        'JavaScript': '#f7df1e',
        'Vue': '#4fc08d',
        'Svelte': '#ff3e00',
        'HTML': '#e34f26',
        'CSS': '#1572b6',
        'TypeScript': '#3178c6'
      };
      return colors[language] || '#6c757d';
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        return 'yesterday';
      } else if (diffDays < 7) {
        return `${diffDays} days ago`;
      } else if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
      } else if (diffDays < 365) {
        const months = Math.floor(diffDays / 30);
        return `${months} month${months > 1 ? 's' : ''} ago`;
      } else {
        const years = Math.floor(diffDays / 365);
        return `${years} year${years > 1 ? 's' : ''} ago`;
      }
    },
    openProjectModal(project) {
      this.selectedProject = project;
      document.body.style.overflow = 'hidden';
    },
    closeProjectModal() {
      this.selectedProject = null;
      document.body.style.overflow = '';
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

/* Filter Tabs */
.filter-tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.filter-tab {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #AED8F2;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  font-weight: 500;
}

.filter-tab:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.filter-tab.active {
  background: linear-gradient(135deg, #806FBF, #71D9B3);
  color: white;
  border-color: transparent;
  box-shadow: 0 5px 15px rgba(113, 217, 179, 0.3);
}

.project-count {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
}

/* Projects Container */
.projects-container {
  margin-bottom: 4rem;
}

/* Projects Grid */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 2rem;
}

/* Project Card */
.project-card {
  background: rgba(26, 30, 38, 0.8);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.project-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(113, 217, 179, 0.1), transparent);
  transition: left 0.5s ease;
}

.project-card:hover::before {
  left: 100%;
}

.project-card:hover {
  transform: translateY(-5px);
  border-color: rgba(113, 217, 179, 0.3);
  box-shadow: 0 15px 35px rgba(113, 217, 179, 0.1);
}

/* Project Header */
.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.project-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #806FBF, #71D9B3);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
}

.project-stats {
  display: flex;
  gap: 1rem;
}

.stat {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: #AED8F2;
  font-size: 0.8rem;
}

.stat i {
  color: #71D9B3;
}

/* Project Content */
.project-content {
  margin-bottom: 1.5rem;
}

.project-title {
  font-size: 1.3rem;
  color: white;
  margin-bottom: 0.8rem;
  font-weight: 600;
}

.project-description {
  color: #AED8F2;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.project-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.language {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #AED8F2;
  font-size: 0.8rem;
}

.language-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.updated {
  color: #6c757d;
  font-size: 0.8rem;
}

/* Project Topics */
.project-topics {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.topic-tag {
  background: rgba(113, 217, 179, 0.1);
  color: #71D9B3;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.7rem;
  border: 1px solid rgba(113, 217, 179, 0.2);
}

.topic-more {
  background: rgba(255, 255, 255, 0.1);
  color: #AED8F2;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.7rem;
}

/* Project Actions */
.project-actions {
  display: flex;
  gap: 0.8rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  border: none;
}

.action-btn.primary {
  background: linear-gradient(135deg, #806FBF, #71D9B3);
  color: white;
}

.action-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(113, 217, 179, 0.3);
}

.action-btn.secondary {
  background: transparent;
  color: #AED8F2;
  border: 1px solid rgba(174, 216, 242, 0.3);
}

.action-btn.secondary:hover {
  background: rgba(174, 216, 242, 0.1);
  border-color: rgba(174, 216, 242, 0.5);
}

/* GitHub Stats */
.github-stats {
  margin-top: 4rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.stat-card {
  background: rgba(26, 30, 38, 0.8);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-3px);
  border-color: rgba(113, 217, 179, 0.3);
  box-shadow: 0 10px 25px rgba(113, 217, 179, 0.1);
}

.stat-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #806FBF, #71D9B3);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.8rem;
}

.stat-content h3 {
  font-size: 2rem;
  color: white;
  margin: 0 0 0.3rem 0;
  font-weight: 700;
}

.stat-content p {
  color: #AED8F2;
  margin: 0;
  font-size: 0.9rem;
}

/* Enhanced Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  box-sizing: border-box;
}

.modal-content {
  background: #1A1E26;
  border-radius: 20px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5);
  animation: modalFadeIn 0.4s ease;
  border: 1px solid rgba(113, 217, 179, 0.2);
}

/* Modal Close Button */
.modal-close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  width: 40px;
  height: 40px;
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
  padding: 2rem 2rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-project-info {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
}

.project-icon-large {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #806FBF, #71D9B3);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2.5rem;
  flex-shrink: 0;
}

.project-details h2 {
  font-size: 2rem;
  color: white;
  margin: 0 0 0.8rem 0;
  font-weight: 700;
}

.project-details .project-description {
  color: #AED8F2;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.project-meta-large {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}

.project-meta-large .language {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #AED8F2;
  font-size: 0.9rem;
}

.project-meta-large .language-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.created, .updated {
  color: #6c757d;
  font-size: 0.9rem;
}

/* Modal Body */
.modal-body {
  padding: 2rem;
}

.modal-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: #AED8F2;
  font-size: 0.9rem;
}

.stat-item i {
  color: #71D9B3;
  font-size: 1.1rem;
}

/* Modal Topics */
.modal-topics {
  margin-bottom: 2rem;
}

.modal-topics h3 {
  color: white;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.topics-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.topic-tag-large {
  background: rgba(113, 217, 179, 0.15);
  color: #71D9B3;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  border: 1px solid rgba(113, 217, 179, 0.3);
  transition: all 0.3s ease;
}

.topic-tag-large:hover {
  background: rgba(113, 217, 179, 0.25);
  transform: translateY(-2px);
}

/* Modal README */
.modal-readme {
  margin-bottom: 2rem;
}

.modal-readme h3 {
  color: white;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.readme-content {
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 12px;
  color: #AED8F2;
  font-size: 0.95rem;
  line-height: 1.6;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Modal Footer */
.modal-footer {
  padding: 1.5rem 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.02);
}

/* Modal Buttons */
.modal-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  border: none;
}

.modal-btn.primary {
  background: linear-gradient(135deg, #806FBF, #71D9B3);
  color: white;
}

.modal-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(113, 217, 179, 0.3);
}

.modal-btn.secondary {
  background: transparent;
  color: #AED8F2;
  border: 1px solid rgba(174, 216, 242, 0.3);
}

.modal-btn.secondary:hover {
  background: rgba(174, 216, 242, 0.1);
  border-color: rgba(174, 216, 242, 0.5);
}

.modal-btn.tertiary {
  background: rgba(255, 255, 255, 0.1);
  color: #AED8F2;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.modal-btn.tertiary:hover {
  background: rgba(255, 255, 255, 0.15);
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