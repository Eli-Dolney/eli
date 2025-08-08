<template>
  <header :class="{ 'scrolled': isScrolled }">
    <nav>
      <div class="nav-container">
        <div class="brand">
          <router-link to="/">
            <div class="brand-content">
              <i class="fas fa-code brand-icon"></i>
              <span class="brand-text">ELI DOLNEY</span>
            </div>
          </router-link>
        </div>
        
        <div class="nav-links" :class="{ open: isOpen }">
          <div class="nav-links-container">
            <router-link to="/" @click="closeMenu" class="nav-item">
              <i class="fas fa-home"></i>
              <span>Home</span>
            </router-link>
            <router-link to="/about" @click="closeMenu" class="nav-item">
              <i class="fas fa-user"></i>
              <span>About</span>
            </router-link>
            <router-link to="/projects" @click="closeMenu" class="nav-item">
              <i class="fas fa-folder"></i>
              <span>Projects</span>
            </router-link>
            <router-link to="/blog" @click="closeMenu" class="nav-item">
              <i class="fas fa-pen"></i>
              <span>Blog</span>
            </router-link>
            <router-link to="/contact" @click="closeMenu" class="nav-item">
              <i class="fas fa-envelope"></i>
              <span>Contact</span>
            </router-link>
            <router-link to="/charts" @click="closeMenu" class="nav-item">
              <i class="fas fa-chart-line"></i>
              <span>Charts</span>
            </router-link>
          </div>
        </div>
        
        <div class="nav-actions">
          <a href="https://github.com/Eli-Dolney" target="_blank" class="social-link" aria-label="GitHub">
            <i class="fab fa-github"></i>
          </a>
          <a href="https://linkedin.com/in/eli-dolney-415166161" target="_blank" class="social-link" aria-label="LinkedIn">
            <i class="fab fa-linkedin"></i>
          </a>
        </div>
        
        <div class="hamburger" :class="{ open: isOpen }" @click="toggleMenu" aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      isOpen: false,
      isScrolled: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
      // Prevent scrolling when menu is open
      document.body.style.overflow = this.isOpen ? 'hidden' : '';
    },
    closeMenu() {
      this.isOpen = false;
      document.body.style.overflow = '';
    },
  },
  mounted() {
    // Scroll detection
    window.addEventListener('scroll', this.handleScroll);
    
    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
      const navLinks = document.querySelector('.nav-links');
      const hamburger = document.querySelector('.hamburger');
      if (
        this.isOpen && 
        event.target !== navLinks && 
        !navLinks.contains(event.target) &&
        event.target !== hamburger &&
        !hamburger.contains(event.target)
      ) {
        this.closeMenu();
      }
    });
    
    // Close menu on window resize (if switching to desktop view)
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && this.isOpen) {
        this.closeMenu();
      }
    });
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
      // Prevent scrolling when menu is open
      document.body.style.overflow = this.isOpen ? 'hidden' : '';
    },
    closeMenu() {
      this.isOpen = false;
      document.body.style.overflow = '';
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 50;
    },
  },
  beforeUnmount() {
    // Clean up event listeners
    window.removeEventListener('scroll', this.handleScroll);
    document.removeEventListener('click', this.closeMenu);
    window.removeEventListener('resize', this.closeMenu);
  }
};
</script>

<style scoped>
header {
  background: rgba(13, 13, 13, 0.8);
  color: #fff;
  padding: 1rem 0;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

header.scrolled {
  background: rgba(13, 13, 13, 0.95);
  padding: 0.8rem 0;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid rgba(113, 217, 179, 0.2);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  flex-wrap: nowrap;
}

.brand {
  flex: 1;
  text-align: left;
}

.brand a {
  color: #fff;
  text-decoration: none;
  display: inline-block;
  position: relative;
}

.brand-content {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  transition: all 0.3s ease;
}

.brand-icon {
  font-size: 1.3rem;
  color: #71D9B3;
  transition: all 0.3s ease;
}

.brand-text {
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: 1.2px;
  background: linear-gradient(135deg, #71D9B3 0%, #4D208C 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  transition: all 0.3s ease;
}

.brand-content:hover {
  transform: translateY(-2px);
}

.brand-content:hover .brand-icon {
  transform: rotate(15deg);
  color: #4D208C;
}

.brand-content:hover .brand-text {
  text-shadow: 0 10px 15px rgba(77, 32, 140, 0.4);
}

.nav-links {
  display: flex; 
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
  flex-direction: row;
  flex-wrap: nowrap;
}

.nav-item {
  color: #fff;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0.5rem 0.8rem;
  border-radius: 6px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid transparent;
  white-space: nowrap;
}

.nav-item i {
  font-size: 0.8rem;
  transition: all 0.3s ease;
}

.nav-item::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(to right, #71D9B3, #4D208C);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease;
}

.nav-item:hover {
  color: #71D9B3;
  background: rgba(113, 217, 179, 0.1);
  border-color: rgba(113, 217, 179, 0.3);
  transform: translateY(-2px);
}

.nav-item:hover i {
  transform: scale(1.1);
}

.nav-item:hover::before {
  transform: scaleX(1);
  transform-origin: left;
}

.nav-item.router-link-exact-active,
.nav-item.router-link-active {
  color: #71D9B3;
  background: rgba(113, 217, 179, 0.15);
  border-color: rgba(113, 217, 179, 0.5);
  box-shadow: 0 4px 12px rgba(113, 217, 179, 0.2);
}

.nav-item.router-link-exact-active::before,
.nav-item.router-link-active::before {
  transform: scaleX(1);
}

.nav-item.router-link-exact-active i,
.nav-item.router-link-active i {
  transform: scale(1.1);
}

/* Social Links */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-left: 1.5rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  color: #AED8F2;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.social-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(113, 217, 179, 0.2), transparent);
  transition: left 0.5s ease;
}

.social-link:hover::before {
  left: 100%;
}

.social-link:hover {
  background: rgba(113, 217, 179, 0.1);
  color: #71D9B3;
  border-color: rgba(113, 217, 179, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(113, 217, 179, 0.2);
}

.social-link i {
  font-size: 1rem;
  position: relative;
  z-index: 1;
}

.hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  width: 30px;
  height: 20px;
  position: relative;
  z-index: 1001;
}

.hamburger span {
  display: block;
  height: 3px;
  width: 100%;
  background: #fff;
  border-radius: 3px;
  transition: all 0.4s ease;
  transform-origin: center;
}

.hamburger.open span:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
  background: #71D9B3;
}

.hamburger.open span:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}

.hamburger.open span:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
  background: #71D9B3;
}

@media (max-width: 768px) {
  .nav-container {
    padding: 0 1.5rem;
  }

  .brand-text {
    font-size: 1.5rem;
  }

  .nav-actions {
    display: none;
  }

  .hamburger {
    display: flex;
  }

  .nav-links {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100vw;
    height: auto;
    background: rgba(10, 10, 10, 0.98);
    backdrop-filter: blur(10px);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    z-index: 1000;
    padding: 1rem 0;
  }
  
  .nav-links-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: auto;
    padding: 0 1rem;
    overflow-x: auto;
    gap: 0.5rem;
  }

  .nav-links.open {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }

  .nav-item {
    font-size: 0.9rem;
    font-weight: 600;
    padding: 0.5rem 0.8rem;
    width: auto;
    max-width: none;
    text-align: center;
    color: #ffffff;
    border: 1px solid rgba(113, 217, 179, 0.4);
    background: rgba(20, 20, 20, 0.8);
    margin: 0;
    opacity: 0;
    transform: translateY(20px);
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    letter-spacing: 0.5px;
    position: relative;
    overflow: hidden;
    justify-content: center;
    white-space: nowrap;
  }
  
  .nav-item::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #71D9B3 0%, #4D208C 100%);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease;
  }
  
  .nav-item:hover::after,
  .nav-item.router-link-active::after {
    transform: scaleX(1);
  }
  
  .nav-links.open a {
    animation: fadeInUp 0.6s forwards;
  }
  
  .nav-links.open a:nth-child(1) { animation-delay: 0.1s; }
  .nav-links.open a:nth-child(2) { animation-delay: 0.2s; }
  .nav-links.open a:nth-child(3) { animation-delay: 0.3s; }
  .nav-links.open a:nth-child(4) { animation-delay: 0.4s; }
  .nav-links.open a:nth-child(5) { animation-delay: 0.5s; }

  .nav-item:hover, 
  .nav-item.router-link-active {
    background: rgba(113, 217, 179, 0.15);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
    border-color: rgba(113, 217, 179, 0.7);
    color: #7EEDC3;
  }
  
  /* Animation for menu items */
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(30px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

/* Desktop styles - ensure horizontal layout */
@media (min-width: 769px) {
  .nav-links {
    position: static !important;
    width: auto !important;
    height: auto !important;
    background: transparent !important;
    backdrop-filter: none !important;
    transform: none !important;
    opacity: 1 !important;
    visibility: visible !important;
    flex-direction: row !important;
    padding: 0 !important;
    display: flex !important;
    justify-content: center;
    align-items: center;
    gap: 0.3rem;
    flex-wrap: nowrap;
  }
  
  .nav-links-container {
    flex-direction: row !important;
    width: auto !important;
    height: auto !important;
    padding: 0 !important;
    overflow: visible !important;
    gap: 0.3rem !important;
    display: flex;
  }
  
  .nav-item {
    font-size: 0.9rem !important;
    padding: 0.5rem 0.8rem !important;
    width: auto !important;
    max-width: none !important;
    margin: 0 !important;
    opacity: 1 !important;
    transform: none !important;
    border-radius: 6px !important;
    box-shadow: none !important;
    text-shadow: none !important;
    letter-spacing: normal !important;
    background: rgba(255, 255, 255, 0.02) !important;
    border: 1px solid transparent !important;
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    white-space: nowrap;
  }
}

/* Small mobile devices */
@media (max-width: 480px) {
  .nav-container {
    padding: 0 1rem;
  }
  
  .brand-text {
    font-size: 1.3rem;
  }
  
  .nav-item {
    width: auto;
    font-size: 0.8rem;
    padding: 0.4rem 0.6rem;
    margin: 0;
  }
  
  .nav-links-container {
    gap: 0.3rem;
    padding: 0 0.5rem;
  }
}
</style>