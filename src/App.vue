<template>
  <div id="app">
    <loading-screen :is-loading="isLoading" @loadingComplete="isLoading = false" />
    <main v-if="!isLoading">
      <Header />
      
      <About />
      <Sidebar />
      <Projects />
      <Contact />
      
    </main>
  </div>
</template>

<script>
import Loading from './components/Loading.vue';
import About from './components/About.vue';
import Sidebar from './components/Sidebar.vue';
import Contact from './components/Contact.vue';
import Centerpiece from './components/Centerpiece.vue';
import Header from './components/Header.vue';
import Projects from './components/Projects.vue';

export default {
  components: {
    Centerpiece,
    Header,
    About,
    'loading-screen':Loading,
    Sidebar,
    Projects, 
    Contact,
    
  },
  data() {
    return {
      isLoading: true,
    };
  },
};

</script>


<style scoped>

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
