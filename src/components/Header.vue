<template>
  <header>
    <div class="centerpiece-wrapper">
      <Centerpiece />
      <button @click="open = true" class="open-modal-button">Click Me 1</button>
      <div class="icon-wrapper">
          <a class="link" href="https://bit.ly/Linkedin-Eli" target="_blank">
            <font-awesome-icon :icon="['fab', 'linkedin']" size="4x" class="large-icon" />
          </a>
          <a class="link" href="https://bit.ly/Github-Eli" target="_blank">
            <font-awesome-icon :icon="['fab', 'github-square']" size="4x" class="large-icon" />
          </a>
      </div>
    </div>
    <Teleport to="body">
      <div v-if="open" class="modal">
        <p>Website is work in progress some elements and styles might be not work properly !</p>
        <button @click="open = false" class="close-modal-button">Close</button>
      </div>
    </Teleport>
  </header>
</template>
  
  <script>
  import Centerpiece from './Centerpiece.vue';
  
  export default {
    name: 'Header',
    components: {
      Centerpiece,
    },
    data() {
      return {
        open: false,
      };
    },
  };
  </script>
  
  <style scoped>
  header {
    background-image: linear-gradient(
        rgba(82, 92, 101, 0.7),
        rgba(90, 81, 81, 0.7),
        rgba(0, 0, 0, 0.7)
      ),
      url(../assets/images/IMG_0455.jpg);
    
    background-size: cover;
    background-position: center;
    background-color: #1A1E26;
    background-attachment: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    
    
  }
  
  .centerpiece-wrapper {
    transform: translateY(-20%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  
  }
  
  .open-modal-button {
    background-color: white;
    color: black;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 2rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .open-modal-button:hover {
    background-color: #4a5364;
  }
  
  .modal {
    position: fixed;
    z-index: 999;
    top: 20%;
    left: 50%;
    width: 300px;
    margin-left: -150px;
    background-color: #283040;
    border-radius: 10px;
    padding: 20px;
    font-size: 2rem;
    color: white;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .close-modal-button {
    background-color: white;
    color: black;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .close-modal-button:hover {
    background-color: #4a5364;
  }
  </style>