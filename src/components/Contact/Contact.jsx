import React, { useState, useRef, useEffect } from "react";
import styles from "./Contact.module.css";
import { getImageUrl } from "../../utils";
import emailjs from '@emailjs/browser';

export const Contact = () => {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    message: "" 
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => sectionRef.current && observer.unobserve(sectionRef.current);
  }, []);

  // Initialize EmailJS with your public key
  useEffect(() => {
    emailjs.init("YjAndAI_X8b4dl4aB");
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Use your EmailJS credentials
      const result = await emailjs.sendForm(
        'service_38sn7m9',
        'template_gl0ckt2',
        formRef.current,
        'YjAndAI_X8b4dl4aB'
      );

      console.log('Email successfully sent!', result.text);
      
      // Reset form and show success message
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitted(true);
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);

    } catch (err) {
      console.error('Failed to send email:', err);
      setError('Failed to send message. Please try again or contact me directly at myemail@email.com');
    } finally {
      setIsLoading(false);
    }
  };

  const contactMethods = [
    { 
      icon: getImageUrl("contact/emailIcon.png"), 
      label: "Email", 
      value: "anthorkim@gmail.com", 
      link: "mailto:anthorkim@gmail.com", 
      color: "#EA4335" 
    },
    { 
      icon: getImageUrl("contact/linkedinIcon.png"), 
      label: "LinkedIn", 
      value: "www.linkedin.com/in/simon-kim-ki-dong-antoh-a09041305", 
      link: "www.linkedin.com/in/simon-kim-ki-dong-antoh-a09041305", 
      color: "#0A66C2" 
    },
    { 
      icon: getImageUrl("contact/githubIcon.png"), 
      label: "GitHub", 
      value: "https://github.com/kristonirentall-rgb", 
      link: "https://github.com/kristonirentall-rgb", 
      color: "#333333" 
    },
    { 
      icon: getImageUrl("contact/phoneIcon.png"), 
      label: "Phone", 
      value: "+233596828273", 
      link: "tel:233596828273", 
      color: "#25D366" 
    }
  ];

  return (
    <section ref={sectionRef} id="contact" className={styles.container}>
      <div className={styles.backgroundAnimation}></div>
      
      <div className={styles.content}>
        <div className={styles.textSection}>
          <h2 className={`${styles.title} ${isVisible ? styles.titleVisible : ''}`}>
            Get In Touch
            <span className={styles.titleUnderline}></span>
          </h2>
          <p className={styles.subtitle}>
            Interested in collaborating or have a project in mind? I'm currently available for 
            freelance opportunities and full-time positions. Let's discuss how we can work together!
          </p>

          <div className={styles.contactMethods}>
            {contactMethods.map((method, index) => (
              <div key={index} className={`${styles.contactItem} ${isVisible ? styles.itemVisible : ''}`} style={{ animationDelay: `${index * 0.15}s` }}>
                <div className={styles.iconWrapper} style={{ backgroundColor: `${method.color}15` }}>
                  <img src={method.icon} alt={method.label} style={{ filter: `drop-shadow(0 0 4px ${method.color}40)` }} />
                </div>
                <div className={styles.contactInfo}>
                  <span className={styles.contactLabel}>{method.label}</span>
                  <a href={method.link} target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                    {method.value}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.formSection}>
          <div className={`${styles.formContainer} ${isVisible ? styles.formVisible : ''}`}>
            <h3>Send me a message</h3>
            
            {isSubmitted ? (
              <div className={styles.successMessage}>
                <div className={styles.successIcon}>✓</div>
                <h4>Thank you for your message!</h4>
                <p>I'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className={styles.contactForm}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder="What would you like to discuss?"
                  ></textarea>
                </div>
                
                {error && (
                  <div className={styles.errorMessage}>
                    {error}
                  </div>
                )}
                
                <button 
                  type="submit" 
                  className={styles.submitButton}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className={styles.loadingSpinner}></div>
                  ) : (
                    <>
                      Send Message
                      <span className={styles.buttonIcon}>→</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      
      <div className={styles.footer}>
        <p>© {new Date().getFullYear()} kimkidong</p>
      </div>
    </section>
  );
};