<template>
  <section id="contact">
    <div class="section-wrapper">
      <div class="container">
        <h1>Contact Me</h1>
        <div class="accordion">
          <!-- Email link with envelope icon -->
          <div class="accordion-panel expanded" @click="toggleAccordion">
            <div class="accordion-panel-header">
              <a href="mailto:elid3dev@gmail.com">
                <font-awesome-icon :icon="['fas', 'envelope']" size="3x" style="color: white;" />
              </a>
            </div>
          </div>

          <!-- GitHub link with GitHub icon -->
          <div class="accordion-panel" @click="toggleAccordion">
            <div class="accordion-panel-header">
              <a href="https://bit.ly/Github-Eli" target="_blank" rel="noopener noreferrer">
                <font-awesome-icon :icon="['fab', 'github-square']" size="3x" style="color: white;" />
              </a>
            </div>
          </div>

          <!-- LinkedIn link with LinkedIn icon -->
          <div class="accordion-panel" @click="toggleAccordion">
            <div class="accordion-panel-header">
              <a href="https://bit.ly/Linkedin-Eli" target="_blank" rel="noopener noreferrer">
                <font-awesome-icon :icon="['fab', 'linkedin']" size="3x" style="color: white;" />
              </a>
            </div>
          </div>
          
          <!-- Instagram link with Instagram icon -->
          <div class="accordion-panel" @click="toggleAccordion">
            <div class="accordion-panel-header">
              <a href="https://bit.ly/Insta-Eli" target="_blank" rel="noopener noreferrer">
                <font-awesome-icon :icon="['fab', 'instagram-square']" size="3x" style="color: white;" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

  
  
  
  <script>
  export default {
    name: "Contact",
    methods: {
      toggleAccordion(event) {
        const activePanel = event.target.closest(".accordion-panel");
        if (!activePanel) return;
  
        const panels = activePanel.parentElement.querySelectorAll(".accordion-panel");
  
        panels.forEach((panel) => {
          panel.classList.remove("expanded");
        });
  
        activePanel.classList.add("expanded");
      },
    },
  };
  </script>
  
  
  
  
  <style scoped>
  /* ... Global styles ... */

  /* Contact section styling */
  #contact {
    padding: 50px 0;
    background-color: #0D0D0D;
  }

  /* h1 styling */
  h1 {
    text-align: center;
    font-size: 3rem;
    margin-bottom: 20px;
    color: aliceblue;
  }

  /* Container styling */
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 80%;
    margin: 0 auto;
    padding: 2rem;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
    background-color: #0D0D0D;
  }

  /* Accordion styling */
  .accordion {
    display: flex;
    gap: 0.5rem;
    padding: 0.5rem;
    margin-top: 2rem;
    background-color: #0D0D0D;
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  /* Accordion panel styling */
  .accordion-panel {
    position: relative;
    isolation: isolate;
    flex: 1;
    overflow: hidden;
    padding: 0.5rem;
    border-radius: 0.25rem;
    background-color: #1A1E26;
    box-shadow: inset 0 0 10px #DB2EF2;
    transition: flex-basis 300ms ease;
    margin: 0.5rem;
  }

  /* Expanded accordion panel styling */
  .accordion-panel.expanded {
    flex: 5;
  }

  /* Accordion title styling */
  .accordion-title {
    font-size: 2rem;
    color: aliceblue;
    margin: 0;
  }

  /* Panel image styling */
  .panel-image {
    width: 150px;
    height: 150px;
    margin-bottom: 1rem;
  }

  /* Media queries */
  @media (min-width: 45em) {
    .accordion {
      flex-direction: row;
      align-items: stretch;
    }

    .accordion-panel:not(.expanded) {
      flex: 1;
    }

    .accordion-panel-header {
      flex-direction: row;
    }

    .accordion-panel-header,
    .accordion-link-button {
      font-size: 2rem;
    }

    .accordion-link-button {
      padding: 10px 20px;
    }
  }

  @media (max-width: 44.999em) {
    .accordion-title {
      writing-mode: horizontal-tb;
    }
  }

  @media (max-width: 600px) {
    .accordion {
      flex-direction: column;
    }

    .accordion-panel {
      width: 100%;
      margin-bottom: 1rem;
    }

    .accordion-title {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }

    .panel-image {
      width: 100px;
      height: 100px;
      margin: 0 auto;
    }

    .accordion-panel-header {
      flex-direction: column;
      align-items: center;
    }

    .accordion-link-button {
      padding: 5px 10px;
      font-size: 0.8rem;
    }
  }

  /* Additional styling can be added below as needed */
</style>

