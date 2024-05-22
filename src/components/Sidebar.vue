<template>
    <nav class="nav-two">
      <ul>
        <li>
          <a class="list-item" href="https://bit.ly/Github-Eli" v-tooltip="'Github'">
            <font-awesome-icon :icon="['fab', 'github-square']" />
          </a>
        </li>
        <li>
          <a class="list-item" href="https://bit.ly/Linkedin-Eli" v-tooltip="'LinkedIn'">
            <font-awesome-icon :icon="['fab', 'linkedin']" />
          </a>
        </li>
        <li>
          <a class="list-item" href="https://bit.ly/Insta-Eli" v-tooltip="'Instagram'">
            <font-awesome-icon :icon="['fab', 'instagram-square']" />
          </a>
        </li>
        <li>
          <a class="list-item" href="https://bit.ly/CodeCamp-Eli" v-tooltip="'CodeCamp'">
            <font-awesome-icon :icon="['fas', 'laptop-code']" />
          </a>
        </li>
        <li>
          <a class="list-item" href="https://bit.ly/Twitter-Eli" v-tooltip="'Twitter'">
            <font-awesome-icon :icon="['fab', 'twitter-square']" />
          </a>
        </li>
      </ul>
    </nav>
  </template>
  

  
  <script>
  export default {
    name: 'Sidebar',
  };
  </script>
  
  <style scoped>
nav.nav-two {
    position: fixed;  /* Fix position to the left of the screen */
    top: 0;           /* Align to the top */
    bottom: 0;        /* Stretch to the bottom */
    left: 0;          /* Align to the left */
    width: 80px;      /* Set a specific width */
    background-color: #BFB2A3;  /* Dark background for the sidebar */
    z-index: 1000;    /* High z-index to keep it above other content */
    display: flex;
    flex-direction: column;  /* Stack items vertically */
    align-items: center;     /* Center items horizontally */
    overflow-y: auto;        /* Enable scrolling for overflow */
}

ul {
  position: fixed;
  transform: rotate(-70) skew(20deg, 15deg);
  list-style-type: none;
  float: left;
  top: 50%;
  transform: translateY(-50%);
}

.clearfix {
  zoom: 1;
}
.clearfix:before,
.clearfix:after {
  content: "";
  display: block;
  height: 0;
  overflow: hidden;
}
.clearfix:after {
  clear: both;
}
.list-item {
  background: #000;
  color: #fff;
  text-align: center;
  height: 2.5em;
  width: 4em;
  line-height: 2.5em;
  border-bottom: 1px solid #3c3c3c;
  position: relative;
  display: block;
  text-decoration: none;

  transition: all 0.5s linear;
}
.list-item:hover {
  background: #022873;
  color: #000;
  transform: translate(0.9em, -0.9em);
  transition: all 0.25s linear;
  box-shadow: 0 0 1.5em #022873;
}
.list-item:hover:before,
.list-item:hover:after {
  transition: all 0.25s linear;
}
.list-item:hover:before {
  background: #022873;
  width: 1em;
  top: 0.5em;
  left: -1em;
}
.list-item:hover:after {
  background: #022873;
  width: 1em;
  bottom: -2.5em;
  left: 1em;
  height: 4em;
}
.list-item:before,
.list-item:after {
  content: "";
  position: absolute;
  transition: all 0.25s linear;
  width: 0.5em;
}
.list-item:after {
  height: 4em;
  background: #181818;
  bottom: -2.25em;
  left: 1.5em;
  transform: rotate(90deg) skew(0, 45deg);
}
.list-item:before {
  height: 2.5em;
  background: #121212;
  top: 0.25em;
  left: -0.5em;
  transform: skewY(-45deg);
}

.mobile-menu-icon {
  display: none;
}

.slide-out-menu {
  display: none;
  position: fixed;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background-color: #333;
  transition: left 0.3s ease;
  z-index: 1000;
  overflow: auto; /* Add overflow property */
}

.slide-out-menu ul {
  padding: 0;
  margin: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center; /* Change back to center */
  align-items: center;
}

.slide-out-menu li {
  list-style-type: none;
}

.slide-out-menu a {
  display: block;
  padding: 10px;
  color: #fff;
  text-decoration: none;
  font-size: 1.2em;
  text-align: center; /* Added for better alignment */
  width: 100%; /* Add width property */
}

.slide-out-menu a:hover {
  background: #DB2EF2;
  color: #000;
}
@media (max-width: 768px) {
  nav.nav-two {
    display: none;
  }
}

  </style>