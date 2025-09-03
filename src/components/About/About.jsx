import React, { useState, useEffect, useRef } from "react";
import styles from "./About.module.css";
import { getImageUrl } from "../../utils";

export const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const skills = [
    {
      title: "Full-Stack Development",
      icon: getImageUrl("about/cursorIcon.png"),
      technologies: ["React", "Node.js", "TypeScript", "Express", "MongoDB"],
      proficiency: 90,
      description: "Building responsive websites and applications using modern frameworks. Experienced in creating user-friendly interfaces and robust server solutions that meet business requirements."
    },
    {
      title: "Mobile App Development",
      icon: getImageUrl("about/mobileIcon.png"),
      technologies: ["React Native", "C++", "Google Play", "App Store"],
      proficiency: 85,
      description: "Developing cross-platform mobile applications with Flutter and Dart. Experienced in publishing to both Google Play Store and Apple App Store with proper testing and documentation."
    },
    {
      title: "Cloud Deployment & DevOps",
      icon: getImageUrl("about/cloudIcon.png"),
      technologies: ["AWS", "DigitalOcean", "CI/CD", "Testing", "Vercel"],
      proficiency: 80,
      description: "Deploying and maintaining server applications on cloud platforms. Implementing CI/CD pipelines, performing comprehensive testing, and providing technical support for deployed applications."
    }
  ];

  return (
    <section 
      ref={sectionRef} 
      className={styles.container} 
      id="about"
    >
      <div className={styles.backgroundAnimation}></div>
      
      <h2 className={`${styles.title} ${isVisible ? styles.titleVisible : ''}`}>
        Technical Expertise
        <span className={styles.titleUnderline}></span>
      </h2>
      
      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <div className={styles.imageWrapper}>
            <img
              src={getImageUrl("about/aboutImage.JPG")}
              alt="Mr. World working on a laptop"
              className={`${styles.aboutImage} ${isVisible ? styles.imageVisible : ''}`}
            />
            <div className={styles.imageOverlay}></div>
          </div>
          
          <div className={styles.floatingElements}>
            <div className={styles.floatingElement} style={{ animationDelay: "0s" }}>
              <span>React Native</span>
            </div>
            <div className={styles.floatingElement} style={{ animationDelay: "1s" }}>
              <span>AWS</span>
            </div>
            <div className={styles.floatingElement} style={{ animationDelay: "2s" }}>
              <span>MongoDB</span>
            </div>
          </div>
        </div>
        
        <div className={styles.skillsContainer}>
          {skills.map((skill, index) => (
            <div 
              key={index} 
              className={`${styles.skillCard} ${isVisible ? styles.cardVisible : ''}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className={styles.skillHeader}>
                <div className={styles.skillIcon}>
                  <img src={skill.icon} alt={`${skill.title} icon`} />
                </div>
                <h3>{skill.title}</h3>
              </div>
              
              <p className={styles.skillDescription}>{skill.description}</p>
              
              <div className={styles.proficiencyBar}>
                <div 
                  className={styles.proficiencyFill} 
                  style={{ width: isVisible ? `${skill.proficiency}%` : '0%' }}
                >
                  <span>{skill.proficiency}%</span>
                </div>
              </div>
              
              <div className={styles.technologies}>
                {skill.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className={styles.techTag}>{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional qualifications section */}
      <div className={`${styles.qualifications} ${isVisible ? styles.qualificationsVisible : ''}`}>
        <h3>Professional Qualifications</h3>
        <div className={styles.qualificationsGrid}>
          <div className={styles.qualificationItem}>
            <h4>Education</h4>
            <p>Bachelor's Degree in Information Communication with focus on web and mobile development principles.</p>
          </div>
          <div className={styles.qualificationItem}>
            <h4>Technical Proficiency</h4>
            <p>Expertise in HTML, CSS, JavaScript, Bootstrap, React.js, Next.js, React Native, TypeScript, Node.js, Express.js, and MongoDB databases.</p>
          </div>
          <div className={styles.qualificationItem}>
            <h4>Soft Skills</h4>
            <p>Strong analytical and problem-solving abilities, values-driven approach, strategic planning, and excellent communication skills.</p>
          </div>
        </div>
      </div>
    </section>
  );
};