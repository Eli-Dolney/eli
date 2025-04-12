<template>
  <div id="app">
    <loading-screen v-if="isLoading" @loadingComplete="isLoading = false" />
    <div v-else class="app-container">
      <TopNavbar />
      <Sidebar />
      <main class="main-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import Loading from './components/Loading.vue';
import Sidebar from './components/Sidebar.vue';
import TopNavbar from './components/TopNavbar.vue';

export default {
  name: 'App',
  components: {
    TopNavbar,
    Sidebar,
    'loading-screen': Loading,
  },
  data() {
    return {
      isLoading: true,
    };
  },
};
</script>

<style>
/* Global styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  overflow-x: hidden;
}

/* App container */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}

/* Main content area */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 70px; /* Match sidebar width */
  transition: margin-left 0.3s ease;
}

/* Adjust router-view content spacing */
.main-content .router-view {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
    margin-bottom: 60px; /* Match sidebar height in mobile view */
    padding: 1rem;
  }
}
</style>