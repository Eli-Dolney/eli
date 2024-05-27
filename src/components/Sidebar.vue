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
  width: 100px;      /* Set a specific width */
  background-color: #BFB2A3;  /* Dark background for the sidebar */
  z-index: 1000;    /* High z-index to keep it above other content */
  display: flex;
  flex-direction: column;  /* Stack items vertically */
  align-items: center;     /* Center items horizontally */
  overflow-y: auto;        /* Enable scrolling for overflow */
}

ul {
  position: fixed;
  list-style-type: none;
  float: left;
  top: 50%;
  transform: translateY(-50%);
}

.list-item {
  background: #949BA6;
  color: #fff;
  text-align: center;
  height: 2.5em;  /* Increase the height for bigger icons */
  width: 4em;     /* Increase the width for bigger icons */
  line-height: 2.5em;  /* Adjust line-height */
  border-bottom: 1px solid #3c3c3c;
  position: relative;
  display: block;
  text-decoration: none;
  font-size: 2em;  /* Increase font size for bigger icons */

  transition: all 0.5s linear;
}

.list-item:hover {
  background: #022873;
  color: #949BA6;
  transform: translate(0.9em, -0.9em);
  transition: all 0.25s linear;
  box-shadow: 0 0 1.5em #022873;
}

.list-item:hover:before,
.list-item:hover:after {
  transition: all 0.25s linear;
}

/* left square */
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
  background: #949BA6;
  bottom: -2.25em;
  left: 1.5em;
  transform: rotate(90deg) skew(0, 45deg);
}

.list-item:before {
  height: 2.5em;
  background: #949BA6;
  top: 0.25em;
  left: -0.5em;
  transform: skewY(-45deg);
}

@media (max-width: 768px) {
  nav.nav-two {
    display: none;
  }
}
</style>
