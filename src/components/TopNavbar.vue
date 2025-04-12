<template>
  <header>
    <nav>
      <div class="nav-container">
        <div class="brand">
          <router-link to="/">
            <span class="brand-text">ELI DOLNEY</span>
          </router-link>
        </div>
        <div class="nav-links" :class="{ open: isOpen }">
          <div class="nav-links-container">
            <router-link to="/" @click="closeMenu">Home</router-link>
            <router-link to="/about" @click="closeMenu">About</router-link>
            <router-link to="/projects" @click="closeMenu">Projects</router-link>
            <router-link to="/contact" @click="closeMenu">Contact</router-link>
            <router-link to="/charts" @click="closeMenu">Charts</router-link>
          </div>
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
  beforeUnmount() {
    // Clean up event listeners
    document.removeEventListener('click', this.closeMenu);
    window.removeEventListener('resize', this.closeMenu);
  }
};
</script>

<style scoped>
header {
  background: linear-gradient(to right, #0D0D0D 0%, #1a1a1a 100%);
  color: #fff;
  padding: 1.2rem 0;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(8px);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
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

.brand-text {
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  background: linear-gradient(135deg, #71D9B3 0%, #4D208C 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  transition: all 0.3s ease;
}

.brand-text:hover {
  transform: translateY(-2px);
  text-shadow: 0 10px 15px rgba(77, 32, 140, 0.4);
}

.nav-links {
  display: flex; 
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
}

.nav-links a {
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.nav-links a::before {
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

.nav-links a:hover {
  color: #71D9B3;
  background-color: rgba(255, 255, 255, 0.05);
}

.nav-links a:hover::before {
  transform: scaleX(1);
  transform-origin: left;
}

.nav-links a.router-link-exact-active,
.nav-links a.router-link-active {
  color: #71D9B3;
  background-color: rgba(113, 217, 179, 0.1);
}

.nav-links a.router-link-exact-active::before,
.nav-links a.router-link-active::before {
  transform: scaleX(1);
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

  .hamburger {
    display: flex;
  }

  .nav-links {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(10, 10, 10, 0.98);
    backdrop-filter: blur(10px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    z-index: 1000;
  }
  
  .nav-links-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 10vh 0;
    overflow-y: auto;
  }

  .nav-links.open {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }

  .nav-links a {
    font-size: 1.6rem;
    font-weight: 600;
    padding: 1.2rem 0;
    width: 80%;
    max-width: 320px;
    text-align: center;
    color: #ffffff;
    border: 1px solid rgba(113, 217, 179, 0.4);
    background: rgba(20, 20, 20, 0.8);
    margin: 0.8rem 0;
    opacity: 0;
    transform: translateY(20px);
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    letter-spacing: 1px;
    position: relative;
    overflow: hidden;
  }
  
  .nav-links a::after {
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
  
  .nav-links a:hover::after,
  .nav-links a.router-link-active::after {
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

  .nav-links a:hover, 
  .nav-links a.router-link-active {
    background: rgba(113, 217, 179, 0.15);
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
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

/* Small mobile devices */
@media (max-width: 480px) {
  .nav-container {
    padding: 0 1rem;
  }
  
  .brand-text {
    font-size: 1.3rem;
  }
  
  .nav-links a {
    width: 85%;
    font-size: 1.4rem;
    padding: 1rem 0;
    margin: 0.6rem 0;
  }
}
</style>