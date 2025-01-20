<template>
  <div class="centerpiece-container">
    <div class="centerpiece-screen">
      <!-- Background Image -->
      <div class="screen-image"></div>
      <!-- Animated Overlay Stripes -->
      <div class="screen-overlay"></div>
      <!-- Main Content (Name) -->
      <div class="screen-content">
        <div class="name-wrapper">
          <span class="name" data-value="Eli Dolney">Eli Dolney</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Centerpiece",
  mounted() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const screens = document.querySelectorAll(".centerpiece-screen");

    screens.forEach((screen) => {
      const name = screen.querySelector(".name");
      screen.addEventListener("mouseenter", () => {
        let iteration = 0;
        let interval = setInterval(() => {
          name.innerText = name.innerText
            .split("")
            .map((char, index) => {
              if (index < iteration) {
                return name.dataset.value[index];
              }
              return letters[Math.floor(Math.random() * 26)];
            })
            .join("");

          if (iteration >= name.dataset.value.length) {
            clearInterval(interval);
          }
          // Increase iteration by half step to slow the effect a bit
          iteration += 0.5;
        }, 70);
      });
    });
  },
};
</script>

<style scoped>
/* 
  1) Outer container: fill screen minus the navbar, 
     center contents horizontally + vertically 
*/
.centerpiece-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  /* Subtract the navbar’s height if you have a fixed top nav ~80px tall */
  min-height: calc(100vh - 80px);
  margin: 0 auto;
  padding: 0; /* Remove extra padding that pushes the card down */
  box-sizing: border-box;
}

/* 
  2) The card-like “screen” shape. 
     - Use clamp() to scale between 280px and 400px 
     - Keep your aspect ratio for a “phone” look 
*/
.centerpiece-screen {
  position: relative;
  width: clamp(280px, 30vw, 400px);
  aspect-ratio: 10 / 16;
  border: 3px solid #bfced9;
  border-radius: 1rem;
  background-color: rgba(255, 255, 255, 0.04);
  overflow: hidden;
  margin: 0.5rem; /* Slight margin if you have only one screen, can be 0 if you want it higher */
}

/* Optional decorative bars */
.centerpiece-screen::before,
.centerpiece-screen::after {
  content: "";
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  z-index: 4;
}
.centerpiece-screen::before {
  top: 0;
  width: 15%;
  height: 5px;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
}
.centerpiece-screen::after {
  bottom: 0;
  width: 25%;
  height: 5px;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}

/* 3) Animated striped overlay */
.screen-overlay {
  position: absolute;
  z-index: 2;
  inset: 0;
  background: 
    linear-gradient(
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0.1) 3px,
      transparent 3px,
      transparent 9px
    );
  background-size: 100% 9px;
  animation: pan-overlay 22s infinite linear;
}
@keyframes pan-overlay {
  from { background-position: 0 0; }
  to   { background-position: 0 -100%; }
}

/* 4) Background image */
.screen-image {
  position: absolute;
  z-index: 1;
  inset: 0;
  background-image: url("../assets/images/evj.jpg");
  background-size: 300%;
  background-position: center;
  animation: pan-image 12s linear infinite;
}
@keyframes pan-image {
  0% {
    background-position: 36% 0%;
    background-size: 180%;
  }
  20% {
    background-position: 36% 50%;
  }
  20.0001% {
    background-position: 0% 50%;
    background-size: 160%;
  }
  40% {
    background-position: 50% 50%;
    background-size: 160%;
  }
  40.0001% {
    background-position: 100% 50%;
  }
  60% {
    background-position: 50% 50%;
  }
  60.0001% {
    background-position: 36% 100%;
  }
  80% {
    background-position: 36% 50%;
  }
  80.0001% {
    background-position: 50% 50%;
    background-size: 200%;
  }
  100% {
    background-position: 50% 50%;
    background-size: 130%;
  }
}

/* 5) Content + name */
.screen-content {
  position: relative;
  z-index: 3;
  width: 100%;
  height: 100%;
  /* If the name is too low, reduce or remove padding-bottom. 
     e.g. padding-bottom: 3rem; */
  padding-bottom: 6rem; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end; 
}

/* Name near the top, if you prefer it centered within the card,
   use top: 50%; transform: translate(-50%, -50%) instead. */
.name-wrapper {
  position: absolute;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
}
.name {
  font-family: "Source Code Pro", monospace;
  font-size: 2rem;
  text-transform: uppercase;
  color: #f0f0f0;
  letter-spacing: 0.1rem;
  text-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
}

/* 6) Responsive refinements */
@media (max-width: 700px) {
  .name {
    font-size: 1.6rem;
  }
}
</style>