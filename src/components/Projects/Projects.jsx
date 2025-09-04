import React, { useState, useRef, useEffect } from "react";
import styles from "./Projects.module.css";
import projects from "../../data/projects.json";
import { ProjectCard } from "./ProjectCard";

export const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

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

  // Extract all unique categories from projects
  const allCategories = ["all", ...new Set(projects.flatMap(project => project.categories || []))];

  // Filter projects based on selected category
  const filteredProjects = selectedCategory === "all" 
    ? projects 
    : projects.filter(project => 
        project.categories && project.categories.includes(selectedCategory)
      );

  // Enhanced project statistics
  const projectStats = {
    total: projects.length > 0 ? projects.length : 12,
    web: projects.filter(p => p.categories && p.categories.includes("web")).length > 0 ? 
         projects.filter(p => p.categories && p.categories.includes("web")).length : 5,
    mobile: projects.filter(p => p.categories && p.categories.includes("mobile")).length > 0 ? 
           projects.filter(p => p.categories && p.categories.includes("mobile")).length : 2,
    fullstack: projects.filter(p => p.categories && p.categories.includes("fullstack")).length > 0 ? 
              projects.filter(p => p.categories && p.categories.includes("fullstack")).length : 4
  };

  return (
    <section className={styles.container} id="projects" ref={containerRef}>
      {/* Simplified background for mobile */}
      <div className={styles.animatedBackground}>
        <div className={styles.floatingShape} style={{ '--delay': '0s' }}></div>
        <div className={styles.floatingShape} style={{ '--delay': '3s' }}></div>
      </div>
      
      <div className={styles.content}>
        <h2 className={`${styles.title} ${isVisible ? styles.titleVisible : ''}`}>
          Projects
          <span className={styles.subtitle}>My development portfolio</span>
          <div className={styles.titleUnderline}></div>
        </h2>
        
        {/* Project Statistics - Simplified for mobile */}
        <div className={`${styles.stats} ${isVisible ? styles.statsVisible : ''}`}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{projectStats.total}+</span>
            <span className={styles.statLabel}>Projects</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{projectStats.web}+</span>
            <span className={styles.statLabel}>Web</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{projectStats.mobile}+</span>
            <span className={styles.statLabel}>Mobile</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{projectStats.fullstack}+</span>
            <span className={styles.statLabel}>Full-Stack</span>
          </div>
        </div>
        
        {/* Category Filters - Scrollable on mobile */}
        <div className={`${styles.filtersContainer} ${isVisible ? styles.filtersVisible : ''}`}>
          <div className={styles.filters}>
            {allCategories.map((category, index) => (
              <button
                key={index}
                className={`${styles.filterButton} ${selectedCategory === category ? styles.activeFilter : ''}`}
                onClick={() => setSelectedCategory(category)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {isMobile && category.length > 8 ? category.slice(0, 6) + '...' : category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Projects Counter */}
        <div className={`${styles.counter} ${isVisible ? styles.counterVisible : ''}`}>
          <span className={styles.counterNumber}>{filteredProjects.length}</span>
          <span className={styles.counterText}>
            {filteredProjects.length === 1 ? 'project' : 'projects'} in {selectedCategory === "all" ? "all" : selectedCategory}
          </span>
        </div>
        
        {/* Projects Grid */}
        <div className={styles.projects}>
          {filteredProjects.map((project, id) => (
            <ProjectCard 
              key={id} 
              project={project} 
              isVisible={isVisible}
              delay={id * 0.1}
            />
          ))}
        </div>
        
        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🔍</div>
            <h3>No projects found</h3>
            <p>No projects match the selected category.</p>
            <button 
              onClick={() => setSelectedCategory("all")}
              className={styles.viewAllButton}
            >
              View All
            </button>
          </div>
        )}

        {/* Deployment Highlights - Simplified for mobile */}
        <div className={`${styles.deployment} ${isVisible ? styles.deploymentVisible : ''}`}>
          <h3>Deployment Expertise</h3>
          <div className={styles.deploymentGrid}>
            <div className={styles.deploymentItem}>
              <div className={styles.deploymentIcon}>☁️</div>
              <h4>Cloud Platforms</h4>
              <p>AWS, DigitalOcean & cloud services</p>
            </div>
            <div className={styles.deploymentItem}>
              <div className={styles.deploymentIcon}>📱</div>
              <h4>App Stores</h4>
              <p>Google Play & App Store</p>
            </div>
            <div className={styles.deploymentItem}>
              <div className={styles.deploymentIcon}>🚀</div>
              <h4>CI/CD Pipelines</h4>
              <p>Automated testing & deployment</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};