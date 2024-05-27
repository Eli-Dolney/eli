<template>
  <header>
    <div class="centerpiece-wrapper">
      <Centerpiece /> <!-- This is the correct place to include it if needed in header -->
      <button @click="open = true" class="open-modal-button">Click Me</button>
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
        <p>Website is a work in progress; some elements and styles might not work properly!</p>
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
  box-shadow: inset 0 0 10px #AED8F2;
  padding: 20px;
}

.centerpiece-wrapper {
  transform: translateY(-20%);
  color: #DCEAF2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.open-modal-button {
  background-color: #D95032;
  color: #DCEAF2;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 1.5rem; /* Adjusted font size for better mobile compatibility */
  cursor: pointer;
  transition: background-color 0.2s;
}

.open-modal-button:hover {
  background-color: #BFCFD9;
}

.icon-wrapper {
  display: flex;
  gap: 20px;
  flex-wrap: wrap; /* Allows icons to wrap to the next line if needed */
  justify-content: center;
}

.large-icon {
  font-size: 3rem; /* Adjusted icon size for mobile */
}

.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 90%; /* Adjusted width for better mobile compatibility */
  max-width: 300px;
  margin-left: -45%; /* Adjusted for new width */
  background-color: #5C6A73;
  border-radius: 10px;
  padding: 20px;
  font-size: 1.5rem; /* Adjusted font size for better mobile compatibility */
  color: #DCEAF2;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.close-modal-button {
  background-color: #BFCFD9;
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

@media (max-width: 768px) {
  header {
    padding: 10px;
  }

  .centerpiece-wrapper {
    transform: translateY(0); /* Remove the negative translate for mobile */
    gap: 10px;
  }

  .open-modal-button {
    font-size: 1.2rem; /* Smaller font size for mobile */
    padding: 8px 16px;
  }

  .large-icon {
    font-size: 2rem; /* Smaller icons for mobile */
  }

  .modal {
    top: 30%; /* Adjusted top position for better centering */
    left: 50%;
    width: 90%; /* Full width for mobile */
    margin-left: -45%; /* Adjusted for new width */
  }
}
</style>
