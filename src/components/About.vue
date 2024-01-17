<template>
    <section id="about">
      <div class="section-wrapper">
        <h2>About Me</h2>
        <div class="about-container">
          <div class="about-text">
            <p>
              Cool things are all around us, from breathtaking natural wonders to
              cutting-edge technology. Exploring new and cool things can be a fun
              and rewarding experience that broadens our horizons. Some of the
              coolest things in the world can be found in unexpected places, so
              it's always worth keeping an open mind. Whether it's trying new
              foods, traveling to exotic locations, or discovering new hobbies,
              there's no shortage of cool things to explore in life.
            </p>
            <p>
              Cool! things are all around us, from breathtaking natural wonders to
              cutting-edge technology. Exploring new and cool things can be a fun
              and rewarding experience that broadens our horizons. Some of the
              coolest things in the world can be found in unexpected places, so
              it's always worth keeping an open mind. 
            </p>
            <p>
              Cool things are all around us, from breathtaking natural wonders to
              cutting-edge technology. Exploring new and cool things can be a fun
              and rewarding experience that broadens our horizons. Some of the
              coolest things in the world can be found in unexpected places, so
              it's always worth keeping an open mind. 
            </p>
          </div>
          <div class="about-image">
            <img
              :src="imageSrc"
              alt="Eli and Everly"
              class="profile-image"
              data-aos="fade-up"
              data-aos-offset="0"
              data-aos-duration="1000"
              data-aos-easing="ease-out-quad"
            />
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
import imageSrcImport from '../assets/images/about.jpg';


export default {
  name: "About",
  data() {
    return {
      imageSrc: imageSrcImport,
    };
  },
};
</script>
  
  <style scoped>
  #about {
    padding: 50px 0;
    
    background-color: #0D0D0D;
  }
  
  .section-wrapper {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    
  }
  
  .about-container {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    padding: 40px;
    width: 100%;
    box-sizing: border-box;
    box-shadow: inset 0 0 10px #DB2EF2;
    background-color: #0D0D0D;
    background-color: #1A1E26;
    
    
  }
  
  h2 {
    text-align: center;
    font-size: 3vw;
    margin-bottom: 20px;
    color: aliceblue;
  }
  
  .about-text {
    flex: 2; /* Set the proportion of the about-text to be 2/3 */
    padding-right: 50px;
    color: aliceblue;
  }
  
  .about-image {
    flex: 1; /* Set the proportion of the about-image to be 1/3 */
    height: auto;
    text-align: center;
  }
  
  .about-image img {
    max-width: 100%;
    border-radius: 5px;
  }
  
  .profile-image {
    width: 100%;
    height: 350px;
    object-fit: cover;
  }
  
  p {
    font-size: 1.1rem;
    line-height: 1.6;
  }
  
  @media (max-width: 768px) {
    .about-container {
      flex-direction: column;
    }
  
    .about-text {
      padding-right: 0;
      margin-bottom: 30px;
    }
  
    .about-image {
      width: 100%;
    }
  }
  </style>