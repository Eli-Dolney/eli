<template>
  <section id="contact">
    <div class="contact-section-wrapper" ref="sectionWrapper">
      <div class="section-header">
        <h2>Get in Touch</h2>
        <div class="underline"></div>
        <p>Feel free to reach out via any of the platforms below!</p>
      </div>

      <div class="contact-grid">
        <div 
          v-for="(contact, index) in contacts" 
          :key="index" 
          class="contact-card"
          :style="{ animationDelay: `${index * 0.15}s` }"
        >
          <div class="card-content">
            <div class="icon-container">
              <font-awesome-icon :icon="contact.icon" size="3x" />
            </div>
            <h3>{{ contact.name }}</h3>
            <a 
              :href="contact.link" 
              target="_blank" 
              class="contact-link"
              :aria-label="`Connect with me on ${contact.name}`"
            >
              Connect
              <font-awesome-icon :icon="['fas', 'arrow-right']" />
            </a>
          </div>
        </div>
      </div>

      <div class="contact-form">
        <h3>Send a Message</h3>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" v-model="form.name" required>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="form.email" required>
          </div>
          <div class="form-group">
            <label for="message">Message</label>
            <textarea id="message" v-model="form.message" rows="5" required></textarea>
          </div>
          <button type="submit" class="submit-btn" :disabled="isSubmitting">
            <span v-if="!isSubmitting">Send Message</span>
            <span v-else class="spinner"></span>
          </button>
        </form>
        <div v-if="formStatus" :class="['form-status', formStatus.type]">
          {{ formStatus.message }}
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Contact",
  data() {
    return {
      contacts: [
        { name: 'Email', link: 'mailto:elid3dev@gmail.com', icon: ['fas', 'envelope'] },
        { name: 'GitHub', link: 'https://bit.ly/Github-Eli', icon: ['fab', 'github'] },
        { name: 'LinkedIn', link: 'https://bit.ly/Linkedin-Eli', icon: ['fab', 'linkedin'] },
        { name: 'Instagram', link: 'https://bit.ly/Insta-Eli', icon: ['fab', 'instagram'] },
      ],
      form: {
        name: '',
        email: '',
        message: ''
      },
      isSubmitting: false,
      formStatus: null
    };
  },
  mounted() {
    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    // Observe the section wrapper
    observer.observe(this.$refs.sectionWrapper);
    
    // Observe each contact card for staggered animation
    const cards = document.querySelectorAll('.contact-card');
    cards.forEach(card => observer.observe(card));
  },
  methods: {
    submitForm() {
      this.isSubmitting = true;
      this.formStatus = null;
      
      // Simulate form submission with a timeout
      setTimeout(() => {
        // In a real implementation, you would send this data to your backend
        console.log('Form submitted:', this.form);
        
        // Show success message
        this.formStatus = {
          type: 'success',
          message: 'Your message has been sent! I\'ll get back to you soon.'
        };
        
        // Reset form
        this.form = {
          name: '',
          email: '',
          message: ''
        };
        
        this.isSubmitting = false;
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          this.formStatus = null;
        }, 5000);
      }, 1500);
    }
  }
};
</script>

<style scoped>
/* Base styles for the contact section */
#contact {
  background-color: #0D0D0D;
  background-image: linear-gradient(to bottom, #0D0D0D, #181818);
  min-height: 100vh;
  width: 100%;
  margin-left: 0;
  padding: 4rem 2rem;
  box-sizing: border-box;
  position: relative;
}

/* On wider screens, shift to accommodate sidebar */
@media (min-width: 768px) {
  #contact {
    
    width: calc(100% - 100px);
  }
}

/* Section wrapper with initial animation state */
.contact-section-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.contact-section-wrapper.in-view {
  opacity: 1;
  transform: translateY(0);
}

/* Header styling with animated underline */
.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

h2 {
  font-size: 3rem;
  color: #fff;
  margin-bottom: 1rem;
  font-weight: 700;
  letter-spacing: 1px;
}

.underline {
  height: 4px;
  width: 80px;
  background: linear-gradient(90deg, #71D9B3, #4D208C);
  margin: 0 auto 1.5rem;
  border-radius: 2px;
}

.section-header p {
  font-size: 1.4rem;
  color: #AED8F2;
  max-width: 600px;
  margin: 0 auto 1rem;
  line-height: 1.6;
}

/* Contact grid for social/contact links */
.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

/* Individual contact cards */
.contact-card {
  background: rgba(26, 30, 38, 0.7);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  height: 220px;
  position: relative;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275),
              box-shadow 0.4s ease;
  
  /* Staggered animation start state */
  opacity: 0;
  transform: translateY(30px);
  animation: fadeUp 0.6s ease forwards;
  animation-play-state: paused;
}

.contact-card.in-view {
  animation-play-state: running;
}

.contact-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 35px rgba(113, 217, 179, 0.2);
}

.card-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  z-index: 2;
}

/* Icon styling */
.icon-container {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: rgba(77, 32, 140, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: #71D9B3;
  transition: all 0.3s ease;
}

.contact-card:hover .icon-container {
  background: rgba(113, 217, 179, 0.2);
  transform: scale(1.1);
  color: #fff;
}

/* Card heading */
.contact-card h3 {
  color: #fff;
  font-size: 1.4rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

/* Contact link button */
.contact-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: auto;
  padding: 0.6rem 1.2rem;
  background: linear-gradient(135deg, #4D208C, #71D9B3);
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 30px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.contact-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #71D9B3, #4D208C);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.contact-link:hover::before {
  opacity: 1;
}

.contact-link:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(113, 217, 179, 0.4);
}

/* Contact form styling */
.contact-form {
  max-width: 700px;
  margin: 0 auto;
  background: rgba(26, 30, 38, 0.7);
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.contact-form h3 {
  color: #fff;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 600;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  color: #AED8F2;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.8rem 1rem;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(174, 216, 242, 0.2);
  border-radius: 8px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #71D9B3;
  box-shadow: 0 0 0 2px rgba(113, 217, 179, 0.2);
}

.submit-btn {
  display: block;
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #4D208C, #71D9B3);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.submit-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(113, 217, 179, 0.3);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

/* Loading spinner */
.spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Form status messages */
.form-status {
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
}

.form-status.success {
  background: rgba(113, 217, 179, 0.2);
  color: #71D9B3;
  border: 1px solid rgba(113, 217, 179, 0.3);
}

.form-status.error {
  background: rgba(255, 99, 71, 0.2);
  color: tomato;
  border: 1px solid rgba(255, 99, 71, 0.3);
}

/* Animation keyframes */
@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  #contact {
    padding: 3rem 1.5rem;
  }
  
  h2 {
    font-size: 2.5rem;
  }
  
  .section-header p {
    font-size: 1.2rem;
  }
  
  .contact-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
  }
  
  .contact-card {
    height: 200px;
  }
  
  .contact-form {
    padding: 2rem 1.5rem;
  }
}

@media (max-width: 480px) {
  #contact {
    padding: 2.5rem 1rem;
  }
  
  h2 {
    font-size: 2rem;
  }
  
  .section-header p {
    font-size: 1rem;
  }
  
  .contact-grid {
    grid-template-columns: 1fr;
  }
  
  .contact-card {
    height: 180px;
  }
  
  .icon-container {
    width: 60px;
    height: 60px;
  }
  
  .contact-form {
    padding: 1.5rem 1rem;
  }
  
  .contact-form h3 {
    font-size: 1.5rem;
  }
}
</style>