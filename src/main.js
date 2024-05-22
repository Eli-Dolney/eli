import { createApp } from 'vue';
import App from './App.vue';
import './assets/styles/style.css';
import router from './router'; // Ensure this import points correctly to your router configuration file

// Importing Font Awesome functionality
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Importing specific Font Awesome icons
import { faGithubSquare, faLinkedin, faInstagramSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import { faLaptopCode, faEnvelope } from '@fortawesome/free-solid-svg-icons';

// Adding icons to the library
library.add(faGithubSquare, faLinkedin, faInstagramSquare, faTwitterSquare, faLaptopCode, faEnvelope);

// Creating the Vue application
const app = createApp(App);

// Registering the FontAwesomeIcon component globally
app.component('font-awesome-icon', FontAwesomeIcon);

// Using the router
app.use(router); // Make sure to use the router in your Vue app

// Mounting the app to the DOM
app.mount('#app');
