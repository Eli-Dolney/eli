<template>
  
  <div id="app">
    <Sidebar />
    <loading-screen :is-loading="isLoading" @loadingComplete="isLoading = false" />
    <main v-if="!isLoading">
      <Header />
      
      <About />
      
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


<style>



#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex; /* Use flex display */
  flex-direction: row; /* Align children (sidebar and main) in a row */
  height: 100vh; /* Make the app full height of the viewport */
  background-color: #5C6A73;
  color: #DCEAF2;
  /* box-shadow: inset 0 0 10px #BFCFD9;*/
}



main > * {
  margin: 20px;
  padding: 20px;
  flex: 1;
  background-color: #5C6A73; /* Uniform color */

}



body{
  background-color: #5C6A73;
  margin: 50px;
  padding: 50px;
  
}
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
