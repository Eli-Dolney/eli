<template>
  <section id="contact">
    <div class="contact-section-wrapper" ref="sectionWrapper">
      <div class="section-header">
        <h2>Let's Connect</h2>
        <div class="underline"></div>
        <p>Ready to collaborate on your next project? I'm always excited to discuss new opportunities and innovative ideas.</p>
      </div>

      <!-- Contact Stats -->
      <div class="contact-stats">
        <div class="stat-item">
          <div class="stat-icon">
            <i class="fas fa-clock"></i>
          </div>
          <div class="stat-content">
            <h3>Response Time</h3>
            <p>Within 24 hours</p>
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-icon">
            <i class="fas fa-globe"></i>
          </div>
          <div class="stat-content">
            <h3>Location</h3>
            <p>Minnesota, USA</p>
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-icon">
            <i class="fas fa-calendar-check"></i>
          </div>
          <div class="stat-content">
            <h3>Availability</h3>
            <p>Open to opportunities</p>
          </div>
        </div>
      </div>

      <div class="contact-grid">
        <div 
          v-for="(contact, index) in contacts" 
          :key="index" 
          class="contact-card"
          :style="{ animationDelay: `${index * 0.15}s` }"
          @click="handleContactClick(contact)"
        >
          <div class="card-content">
            <div class="icon-container">
              <i :class="contact.icon"></i>
            </div>
            <h3>{{ contact.name }}</h3>
            <p class="contact-description">{{ contact.description }}</p>
            <a 
              :href="contact.link" 
              target="_blank" 
              class="contact-link"
              :aria-label="`Connect with me on ${contact.name}`"
            >
              <span>{{ contact.action }}</span>
              <i class="fas fa-arrow-right"></i>
            </a>
          </div>
          <div class="card-overlay"></div>
        </div>
      </div>

      <div class="contact-form">
        <div class="form-header">
          <h3>Send a Message</h3>
          <p>Have a project in mind? Let's discuss how we can bring your ideas to life.</p>
        </div>
        <form @submit.prevent="submitForm">
          <div class="form-row">
            <div class="form-group">
              <label for="name">Name *</label>
              <input 
                type="text" 
                id="name" 
                v-model="form.name" 
                required
                placeholder="Your full name"
              >
            </div>
            <div class="form-group">
              <label for="email">Email *</label>
              <input 
                type="email" 
                id="email" 
                v-model="form.email" 
                required
                placeholder="your.email@example.com"
              >
            </div>
          </div>
          <div class="form-group">
            <label for="subject">Subject</label>
            <input 
              type="text" 
              id="subject" 
              v-model="form.subject" 
              placeholder="What's this about?"
            >
          </div>
          <div class="form-group">
            <label for="message">Message *</label>
            <textarea 
              id="message" 
              v-model="form.message" 
              rows="6" 
              required
              placeholder="Tell me about your project or how I can help..."
            ></textarea>
          </div>
          <button type="submit" class="submit-btn" :disabled="isSubmitting">
            <span v-if="!isSubmitting">
              <i class="fas fa-paper-plane"></i>
              Send Message
            </span>
            <span v-else class="loading-content">
              <div class="spinner"></div>
              Sending...
            </span>
          </button>
        </form>
        <div v-if="formStatus" :class="['form-status', formStatus.type]">
          <i :class="formStatus.icon"></i>
          <span>{{ formStatus.message }}</span>
        </div>
      </div>

      <!-- Footer Note -->
      <div class="footer-note">
        <p>Thanks for visiting my portfolio! Feel free to reach out for collaborations, questions, or just to say hello.</p>
        <div class="footer-links">
          <a href="https://github.com/Eli-Dolney" target="_blank">
            <i class="fab fa-github"></i>
            View my work on GitHub
          </a>
          <a href="https://linkedin.com/in/eli-dolney-415166161" target="_blank">
            <i class="fab fa-linkedin"></i>
            Connect on LinkedIn
          </a>
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
        { 
          name: 'Email', 
          link: 'mailto:elid3dev@gmail.com', 
          icon: 'fas fa-envelope',
          description: 'Direct communication for projects and collaborations',
          action: 'Send Email'
        },
        { 
          name: 'GitHub', 
          link: 'https://github.com/Eli-Dolney', 
          icon: 'fab fa-github',
          description: 'Explore my code and open-source contributions',
          action: 'View Profile'
        },
        { 
          name: 'LinkedIn', 
          link: 'https://linkedin.com/in/eli-dolney-415166161', 
          icon: 'fab fa-linkedin',
          description: 'Professional network and career opportunities',
          action: 'Connect'
        },
        { 
          name: 'Instagram', 
          link: 'https://instagram.com/e.dolney', 
          icon: 'fab fa-instagram',
          description: 'Behind-the-scenes and personal updates',
          action: 'Follow'
        },
      ],
      form: {
        name: '',
        email: '',
        subject: '',
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
    handleContactClick(contact) {
      // Add click animation
      const card = event.currentTarget;
      card.style.transform = 'scale(0.95)';
      setTimeout(() => {
        card.style.transform = '';
      }, 150);
    },
    
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
          message: 'Your message has been sent! I\'ll get back to you within 24 hours.',
          icon: 'fas fa-check-circle'
        };
        
        // Reset form
        this.form = {
          name: '',
          email: '',
          subject: '',
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
  max-width: 700px;
  margin: 0 auto 1rem;
  line-height: 1.6;
}

/* Contact Stats */
.contact-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.stat-item {
  background: rgba(26, 30, 38, 0.7);
  border-radius: 12px;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.stat-item:hover {
  transform: translateY(-5px);
  border-color: rgba(113, 217, 179, 0.3);
  box-shadow: 0 10px 25px rgba(113, 217, 179, 0.1);
}

.stat-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #806FBF, #71D9B3);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
}

.stat-content h3 {
  color: white;
  font-size: 1.2rem;
  margin: 0 0 0.5rem 0;
  font-weight: 600;
}

.stat-content p {
  color: #AED8F2;
  margin: 0;
  font-size: 1rem;
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
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  height: 280px;
  position: relative;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  
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
  border-color: rgba(113, 217, 179, 0.3);
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(113, 217, 179, 0.1), rgba(128, 111, 191, 0.1));
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.contact-card:hover .card-overlay {
  opacity: 1;
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

.icon-container i {
  font-size: 1.8rem;
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
  margin-bottom: 0.8rem;
  font-weight: 600;
}

.contact-description {
  color: #AED8F2;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  text-align: center;
  flex-grow: 1;
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
  max-width: 800px;
  margin: 0 auto;
  background: rgba(26, 30, 38, 0.7);
  border-radius: 16px;
  padding: 3rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.form-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.form-header h3 {
  color: #fff;
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.form-header p {
  color: #AED8F2;
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 500px;
  margin: 0 auto;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  color: #AED8F2;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 1rem 1.2rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(174, 216, 242, 0.2);
  border-radius: 10px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: rgba(174, 216, 242, 0.5);
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #71D9B3;
  box-shadow: 0 0 0 3px rgba(113, 217, 179, 0.1);
  background: rgba(255, 255, 255, 0.08);
}

.submit-btn {
  display: block;
  width: 100%;
  padding: 1.2rem;
  background: linear-gradient(135deg, #4D208C, #71D9B3);
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
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

.loading-content {
  display: flex;
  align-items: center;
  gap: 0.8rem;
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
  padding: 1.2rem;
  border-radius: 10px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  font-weight: 500;
}

.form-status.success {
  background: rgba(113, 217, 179, 0.15);
  color: #71D9B3;
  border: 1px solid rgba(113, 217, 179, 0.3);
}

.form-status.error {
  background: rgba(255, 99, 71, 0.15);
  color: tomato;
  border: 1px solid rgba(255, 99, 71, 0.3);
}

/* Footer Note */
.footer-note {
  text-align: center;
  margin-top: 4rem;
  padding: 2rem;
  background: rgba(26, 30, 38, 0.5);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-note p {
  color: #AED8F2;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.footer-links a {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #71D9B3;
  text-decoration: none;
  font-weight: 500;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  background: rgba(113, 217, 179, 0.1);
  border: 1px solid rgba(113, 217, 179, 0.2);
  transition: all 0.3s ease;
}

.footer-links a:hover {
  background: rgba(113, 217, 179, 0.2);
  border-color: rgba(113, 217, 179, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(113, 217, 179, 0.2);
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
  
  .contact-stats {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .stat-item {
    padding: 1.5rem;
  }
  
  .contact-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  .contact-card {
    height: 260px;
  }
  
  .contact-form {
    padding: 2rem 1.5rem;
  }
  
  .form-row {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .footer-links {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
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