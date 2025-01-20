<template>
  <!-- Our home container that goes full-bleed -->
  <div class="home-content">
    <!-- If "Header" is your hero section, just keep it here -->
    <Header />
  </div>
</template>

<script>
import Header from "./Header.vue";

export default {
  name: "Home",
  components: {
    Header,
  },
  mounted() {
    console.log("Home component mounted!");
  },
};
</script>

<style scoped>
/* The main container for the home page */
.home-content {
  /* Fill the entire viewport */
  width: 100vw;
  min-height: 100vh;

  /* Remove any leftover global spacing */
  margin: 0;
  padding: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-x: hidden;

  /* Optional: If you want a background image on home itself: */
  /* background: url("@/assets/images/some-hero-image.jpg") no-repeat center center / cover; */

  /* If the top navbar is fixed and 60px high, offset if content is hidden behind it:
     padding-top: 60px; 
     or 
     height: calc(100vh - 60px);
  */
}

/* 
  Override the global main styling *just on this page*. 
  The :deep() selector allows you to target the <main> 
  generated in App.vue from within a scoped style.
*/
:deep(main) {
  margin: 0 !important;
  padding: 0 !important;
  max-width: 100% !important;
}

/* If needed, ensure your content doesn’t get hidden behind the navbar.
   This depends on whether your <TopNavbar> is position: fixed.
*/
</style>
