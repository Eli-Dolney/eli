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
  background: #949BA6;
  color: #fff;
  padding: 1.5rem 2rem;
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

.brand {
  flex: 1;
  text-align: left;
}

.brand a {
  color: #fff;
  text-decoration: none;
  font-size: 2rem;
  font-weight: bold;
}

.nav-links {
  display: flex;
  flex: 2;
  justify-content: space-evenly;
  position: relative;
}

.nav-links a {
  color: #fff;
  text-decoration: none;
  font-size: 1.2rem;
  position: relative;
  padding: 0.5rem 1rem;
  transition: color 0.3s, transform 0.3s;
  border: 2px solid transparent;
  border-radius: 5px;
  background-clip: padding-box;
  margin: 0 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Added box shadow */
}

.nav-links a::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  bottom: -2px;
  right: -2px;
  background: linear-gradient(45deg, #db2ef2, #022873);
  z-index: -1;
  transition: transform 0.3s;
  border-radius: 7px;
}

.nav-links a:hover {
  color: #db2ef2;
  transform: scale(1.05);
}

.nav-links a:hover::before {
  transform: scale(1.1);
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
