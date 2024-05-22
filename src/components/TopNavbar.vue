<template>
  <header>
    <nav>
      <div class="nav-container">
        <div class="brand">
          <router-link to="/">ELI DOLNEY</router-link>
        </div>
        <div class="nav-links" :class="{ open: isOpen }">
          <router-link to="/" @click="closeMenu">Home</router-link>
          <router-link to="/about" @click="closeMenu">About</router-link>
          <router-link to="/projects" @click="closeMenu">Projects</router-link>
          <router-link to="/contact" @click="closeMenu">Contact</router-link>
        </div>
        <div class="hamburger" @click="toggleMenu">
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
    },
    closeMenu() {
      this.isOpen = false;
    },
  },
};
</script>

<style scoped>
header {
  background: #59534C;
  color: #fff;
  padding: 1.5rem;
  position: relative;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
}

.brand a {
  color: #fff;
  text-decoration: none;
  font-size: 2rem;
  font-weight: bold;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  color: #fff;
  text-decoration: none;
  font-size: 1.2rem;
  position: relative;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: #1e90ff;
}

.nav-links a::after {
  content: '';
  display: block;
  width: 0;
  height: 2px;
  background: #1e90ff;
  transition: width 0.3s;
  position: absolute;
  left: 0;
  bottom: -5px;
}

.nav-links a:hover::after {
  width: 100%;
}

.hamburger {
  display: none;
  flex-direction: column;
  cursor: pointer;
  gap: 6px;
}

.hamburger span {
  height: 4px;
  width: 30px;
  background: #fff;
  transition: all 0.3s;
}

.hamburger.open span:nth-child(1) {
  transform: translateY(10px) rotate(45deg);
}

.hamburger.open span:nth-child(2) {
  opacity: 0;
}

.hamburger.open span:nth-child(3) {
  transform: translateY(-10px) rotate(-45deg);
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    z-index: 1000;
    transition: transform 0.3s;
    transform: translateY(-100%);
  }

  .nav-links.open {
    display: flex;
    transform: translateY(0);
  }

  .nav-links a {
    font-size: 2rem;
    margin-bottom: 2rem;
    color: #fff;
  }

  .hamburger {
    display: flex;
  }
}
</style>
