<template>
  <nav class="sidebar">
    <div class="brand-logo">ED</div>
    <ul class="nav-links">
      <li v-for="(link, index) in socialLinks" :key="index" class="nav-item-container">
        <a class="nav-item" :href="link.url" :aria-label="link.name" target="_blank" rel="noopener noreferrer">
          <div class="icon-wrapper">
            <i :class="link.iconClass"></i>
          </div>
          <span class="tooltip">{{ link.name }}</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Sidebar',
  data() {
    return {
      socialLinks: [
        { 
          name: 'Github', 
          url: 'https://bit.ly/Github-Eli', 
          iconClass: 'fab fa-github' 
        },
        { 
          name: 'LinkedIn', 
          url: 'https://bit.ly/Linkedin-Eli', 
          iconClass: 'fab fa-linkedin-in' 
        },
        { 
          name: 'Instagram', 
          url: 'https://bit.ly/Insta-Eli', 
          iconClass: 'fab fa-instagram' 
        },
        { 
          name: 'CodeCamp', 
          url: 'https://bit.ly/CodeCamp-Eli', 
          iconClass: 'fas fa-laptop-code' 
        },
        { 
          name: 'Twitter', 
          url: 'https://bit.ly/Twitter-Eli', 
          iconClass: 'fab fa-twitter' 
        }
      ]
    };
  }
});
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 70px;
  background: linear-gradient(to bottom, #1e1e1e, #0a0a0a);
  box-shadow: 3px 0 10px rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
}

.brand-logo {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #71D9B3, #4D208C);
  color: white;
  border-radius: 50%;
  margin-bottom: 30px;
  font-weight: bold;
  font-size: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.nav-links {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: center;
  gap: 25px;
}

.nav-item-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.nav-item {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  color: #e0e0e0;
  text-decoration: none;
  background: #2a2a2a;
  box-shadow: 
    4px 4px 8px rgba(0, 0, 0, 0.4),
    -2px -2px 6px rgba(255, 255, 255, 0.05);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow: hidden;
}

.icon-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.nav-item i {
  font-size: 1.3rem;
  transition: all 0.3s ease;
}

.nav-item:hover {
  transform: translateY(-5px);
  color: white;
  background: linear-gradient(135deg, #71D9B3, #4D208C);
  box-shadow: 
    0 10px 15px rgba(77, 32, 140, 0.25),
    0 6px 6px rgba(113, 217, 179, 0.15),
    inset 0 1px 1px rgba(255, 255, 255, 0.1);
}

.nav-item:active {
  transform: translateY(-2px);
  box-shadow: 
    0 5px 10px rgba(0, 0, 0, 0.2),
    inset 0 1px 3px rgba(0, 0, 0, 0.2);
}

.tooltip {
  position: absolute;
  left: 70px;
  background: #222;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.8rem;
  opacity: 0;
  pointer-events: none;
  transform: translateX(-10px);
  transition: all 0.3s ease;
  white-space: nowrap;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  z-index: 100;
}

.tooltip::before {
  content: '';
  position: absolute;
  left: -6px;
  top: 50%;
  transform: translateY(-50%);
  border-width: 6px 6px 6px 0;
  border-style: solid;
  border-color: transparent #222 transparent transparent;
}

.nav-item:hover .tooltip {
  opacity: 1;
  transform: translateX(0);
}

/* Responsive Design */
@media (max-width: 992px) {
  .sidebar {
    width: 60px;
  }
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    height: 60px;
    bottom: 0;
    top: auto;
    flex-direction: row;
    padding: 0;
  }
  
  .brand-logo {
    display: none;
  }
  
  .nav-links {
    flex-direction: row;
    justify-content: space-around;
    gap: 0;
  }
  
  .nav-item {
    width: 40px;
    height: 40px;
  }
  
  .tooltip {
    top: -40px;
    left: 50%;
    transform: translateX(-50%) translateY(10px);
  }
  
  .tooltip::before {
    left: 50%;
    top: auto;
    bottom: -6px;
    transform: translateX(-50%);
    border-width: 6px 6px 0 6px;
    border-color: #222 transparent transparent transparent;
  }
  
  .nav-item:hover .tooltip {
    transform: translateX(-50%) translateY(0);
  }
}
</style>