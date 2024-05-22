<template>
  <div id="app">
    <TopNavbar />
    <Sidebar />
    <loading-screen :is-loading="isLoading" @loadingComplete="isLoading = false" />
    <main v-if="!isLoading">
      <router-view /> <!-- This will render the correct component based on the route -->
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
    'loading-screen': Loading,
    Sidebar,
  },
  data() {
    return {
      isLoading: true,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  flex-direction: column; /* Change to column to stack TopNavbar, Sidebar, and main */
  min-height: 100vh; /* Ensure the height is at least the viewport height */
  background-color: #BFB2A3;
  color: #DCEAF2;
  width: 100%;
}

main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center children horizontally */
  justify-content: flex-start; /* Align children at the top */
  width: 100%;
  padding: 20px;
  overflow-y: auto; /* Enable vertical scrolling */
}

router-view {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Align content at the top */
}

body {
  background-color: #BFB2A3;
  margin: 0;
  padding: 0;
  overflow-x: hidden; /* Prevent horizontal scroll */
}

.logo {
  height: 6em;
  padding: 1.5em;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
