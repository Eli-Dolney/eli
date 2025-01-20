<template>
  <div id="app">
    <TopNavbar />
    <Sidebar />
    <loading-screen :is-loading="isLoading" @loadingComplete="isLoading = false" />

    <!-- main container (for all pages) -->
    <main v-if="!isLoading">
      <router-view />
    </main>
  </div>
</template>

<script>
import Loading from './components/Loading.vue';
import Sidebar from './components/Sidebar.vue';
import TopNavbar from './components/TopNavbar.vue';

export default {
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
/* -----------------------------------
   #app Container
------------------------------------ */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
  margin: 0;     /* remove default margin */
  padding: 0;    /* remove side padding so home can be full-bleed */
  box-sizing: border-box;
  text-align: center;
  overflow-x: hidden; /* prevent horizontal scroll if something's too wide */
}

main {
  /* Keep for other pages, but we can override on Home if we want no padding */
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  max-width: none;
  width: 100%;
  margin: 0 auto;
  padding: 0;
  overflow-y: auto;
}

/* 
  We can keep router-view styles minimal.
  Individual pages can override as needed.
*/
router-view {
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 1rem;
}

/* Example: adjust at smaller screens */
@media (max-width: 768px) {
  main {
    padding: 1rem;
    max-width: 100%;
  }
}
</style>
