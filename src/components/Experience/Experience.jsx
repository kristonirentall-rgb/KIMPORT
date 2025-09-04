import React, { useState, useRef, useEffect } from "react";
import styles from "./Experience.module.css";
import skills from "../../data/skills.json";
import history from "../../data/history.json";
import { getImageUrl } from "../../utils";

export const Experience = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedExperience, setSelectedExperience] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if mobile on initial render and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 } // Lower threshold for mobile
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Check if skills have categories, otherwise use default categorization
  const hasCategories = skills.some(skill => skill.category);
  
  // Categorize skills
  const skillCategories = hasCategories ? {
    frontend: skills.filter(skill => skill.category === "frontend"),
    backend: skills.filter(skill => skill.category === "backend"),
    mobile: skills.filter(skill => skill.category === "mobile"),
    tools: skills.filter(skill => skill.category === "tools"),
    cloud: skills.filter(skill => skill.category === "cloud"),
    all: skills
  } : {
    frontend: skills.filter(skill => 
      ['react', 'javascript', 'typescript', 'html', 'css', 'bootstrap', 'angular', 'vue', 'sass', 'less', 'redux', 'frontend', 'ui', 'ux']
      .some(term => skill.title.toLowerCase().includes(term))
    ),
    backend: skills.filter(skill => 
      ['node', 'express', 'typescript', 'python', 'django', 'flask', 'java', 'spring', 'php', 'laravel', 'ruby', 'rails', 'backend', 'api']
      .some(term => skill.title.toLowerCase().includes(term))
    ),
    mobile: skills.filter(skill => 
      ['flutter', 'dart', 'mobile', 'android', 'ios', 'react native', 'app']
      .some(term => skill.title.toLowerCase().includes(term))
    ),
    tools: skills.filter(skill => 
      ['git', 'docker', 'webpack', 'babel', 'jenkins', 'ci/cd', 'devops', 'tool', 'linux', 'command', 'testing']
      .some(term => skill.title.toLowerCase().includes(term))
    ),
    cloud: skills.filter(skill => 
      ['aws', 'digitalocean', 'cloud', 'deployment', 'server', 'hosting', 'azure', 'google cloud']
      .some(term => skill.title.toLowerCase().includes(term))
    ),
    all: skills
  };

  const allSkills = activeCategory === "all" ? skills : skillCategories[activeCategory] || [];

  return (
    <section className={styles.container} id="experience" ref={containerRef}>
      <h2 className={`${styles.title} ${isVisible ? styles.titleVisible : ''}`}>
        Skills & Experience
        <div className={styles.titleUnderline}></div>
      </h2>
      
      <div className={styles.content}>
        {/* Skills Section */}
        <div className={styles.skillsSection}>
          <div className={styles.skillsHeader}>
            <h3>Technical Skills</h3>
            <p>Technologies I specialize in</p>
          </div>
          
          <div className={styles.categoryFilters}>
            <button 
              className={`${styles.filterButton} ${activeCategory === "all" ? styles.activeFilter : ''}`}
              onClick={() => setActiveCategory("all")}
            >
              All
            </button>
            <button 
              className={`${styles.filterButton} ${activeCategory === "frontend" ? styles.activeFilter : ''}`}
              onClick={() => setActiveCategory("frontend")}
            >
              Frontend
            </button>
            <button 
              className={`${styles.filterButton} ${activeCategory === "backend" ? styles.activeFilter : ''}`}
              onClick={() => setActiveCategory("backend")}
            >
              Backend
            </button>
            <button 
              className={`${styles.filterButton} ${activeCategory === "mobile" ? styles.activeFilter : ''}`}
              onClick={() => setActiveCategory("mobile")}
            >
              Mobile
            </button>
            <button 
              className={`${styles.filterButton} ${activeCategory === "cloud" ? styles.activeFilter : ''}`}
              onClick={() => setActiveCategory("cloud")}
            >
              Cloud
            </button>
          </div>
          
          {allSkills.length === 0 ? (
            <div className={styles.noSkills}>
              <p>No skills found in this category.</p>
              <button 
                onClick={() => setActiveCategory("all")}
                className={styles.resetButton}
              >
                View All Skills
              </button>
            </div>
          ) : (
            <div className={styles.skillsGrid}>
              {allSkills.map((skill, id) => (
                <div key={id} className={`${styles.skillCard} ${isVisible ? styles.skillVisible : ''}`}>
                  <div className={styles.skillHeader}>
                    <div className={styles.skillIcon}>
                      <img src={getImageUrl(skill.imageSrc)} alt={skill.title} />
                    </div>
                    <span className={styles.skillName}>{skill.title}</span>
                  </div>
                  <div className={styles.skillMeta}>
                    <div className={styles.proficiency}>
                      <div className={styles.proficiencyBar}>
                        <div 
                          className={styles.proficiencyLevel} 
                          style={{ width: `${skill.proficiency || 80}%` }}
                        ></div>
                      </div>
                      <span className={styles.proficiencyText}>
                        {skill.proficiency || 80}%
                      </span>
                    </div>
                    <div className={styles.experience}>
                      <span className={styles.experienceText}>
                        {skill.experience || '3+'} years
                      </span>
                    </div>
                  </div>
                  {skill.description && (
                    <p className={styles.skillDescription}>{skill.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Experience Timeline */}
        <div className={styles.experienceSection}>
          <div className={styles.experienceHeader}>
            <h3>Work Experience</h3>
            <p>My professional journey</p>
          </div>
          
          <div className={styles.timeline}>
            {history.map((historyItem, id) => (
              <div 
                key={id} 
                className={`${styles.timelineItem} ${id === selectedExperience ? styles.selectedExperience : ''} ${isVisible ? styles.timelineVisible : ''}`}
                onClick={() => setSelectedExperience(id)}
              >
                <div className={styles.timelineMarker}>
                  <div className={styles.timelineDot}></div>
                  {id !== history.length - 1 && <div className={styles.timelineLine}></div>}
                </div>
                
                <div className={styles.timelineContent}>
                  <div className={styles.timelineHeader}>
                    <img
                      src={getImageUrl(historyItem.imageSrc)}
                      alt={`${historyItem.organisation} Logo`}
                      className={styles.companyLogo}
                    />
                    <div className={styles.roleInfo}>
                      <h4>{historyItem.role}</h4>
                      <p className={styles.company}>{historyItem.organisation}</p>
                      <p className={styles.duration}>{`${historyItem.startDate} - ${historyItem.endDate}`}</p>
                    </div>
                  </div>
                  
                  <div className={styles.experienceDetails}>
                    <ul>
                      {historyItem.experiences.map((experience, expId) => (
                        <li key={expId}>{experience}</li>
                      ))}
                    </ul>
                    
                    {historyItem.skills && (
                      <div className={styles.roleSkills}>
                        <h5>Technologies:</h5>
                        <div className={styles.skillTags}>
                          {historyItem.skills.map((skill, skillId) => (
                            <span key={skillId} className={styles.skillTag}>
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional qualifications section */}
      <div className={`${styles.qualifications} ${isVisible ? styles.qualificationsVisible : ''}`}>
        <h3>Core Competencies</h3>
        <div className={styles.qualificationsGrid}>
          <div className={styles.qualificationItem}>
            <h4>Full-Stack Development</h4>
            <p>Building responsive websites and applications using modern frameworks like React, Node.js, and TypeScript.</p>
          </div>
          <div className={styles.qualificationItem}>
            <h4>Mobile Development</h4>
            <p>Creating cross-platform mobile applications with React Native and C++, with experience in app store deployment.</p>
          </div>
          <div className={styles.qualificationItem}>
            <h4>Cloud & Deployment</h4>
            <p>Deploying server applications on AWS and DigitalOcean, with CI/CD pipeline implementation.</p>
          </div>
          <div className={styles.qualificationItem}>
            <h4>Testing & Support</h4>
            <p>Performing comprehensive testing and providing technical support and documentation for end users.</p>
          </div>
        </div>
      </div>
    </section>
  );
};