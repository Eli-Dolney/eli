<template>
  <div class="home-content">
    <Header />
    <Centerpiece />
  </div>
</template>
  
  <script>
  import Header from './Header.vue';
  
  
  export default {
  name: 'Home',
  components: {
    Header,
  },
  mounted() {
    console.log("Home component mounted!");
  }
}
  </script>
  
  <style>
  div {
    width: 100%; 
    padding-top: 10px;
    /* Ensure full width */
  }

  

  </style>