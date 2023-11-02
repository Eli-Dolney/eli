<template>
  <div id="app">
    <loading-screen :is-loading="isLoading" @loadingComplete="isLoading = false" />
    <main v-if="!isLoading">
      <About />
    </main>
  </div>
</template>

<script>
import Loading from './components/Loading.vue';
import About from './components/About.vue';

export default {
  components: {
    About,
    'loading-screen':Loading, 
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
