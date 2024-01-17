import { createApp } from 'vue';
import App from './App.vue';
import './assets/styles/style.css';

// Importing Font Awesome functionality
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Importing specific Font Awesome icons
import { faGithubSquare, faLinkedin, faInstagramSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import { faLaptopCode, faEnvelope } from '@fortawesome/free-solid-svg-icons'; // Import faLaptopCode and faEnvelope

// Adding icons to the library
library.add(faGithubSquare, faLinkedin, faInstagramSquare, faTwitterSquare, faLaptopCode, faEnvelope); // Include both faLaptopCode and faEnvelope

// Creating the Vue application
const app = createApp(App);

// Registering the FontAwesomeIcon component globally
app.component('font-awesome-icon', FontAwesomeIcon);

// Mounting the app
app.mount('#app');
