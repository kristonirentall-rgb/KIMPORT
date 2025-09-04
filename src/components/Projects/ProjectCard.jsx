import React, { useState } from "react";
import styles from "./ProjectCard.module.css";
import { getImageUrl } from "../../utils";

export const ProjectCard = ({
  project: { title, imageSrc, description, skills, demo, source },
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={styles.container}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.imageContainer}>
        <img
          src={getImageUrl(imageSrc)}
          alt={`Image of ${title}`}
          className={styles.image}
        />
        <div className={`${styles.imageOverlay} ${isHovered ? styles.overlayVisible : ''}`}>
          <div className={styles.links}>
            <a 
              href={demo} 
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.linkIcon}>👁️</span>
              Live Demo
            </a>
            <a 
              href={source} 
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.linkIcon}>{"</>"}</span>
              Source Code
            </a>
          </div>
        </div>
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        
        <div className={styles.skillsContainer}>
          <h4 className={styles.skillsTitle}>Technologies Used</h4>
          <ul className={styles.skills}>
            {skills.map((skill, id) => (
              <li key={id} className={styles.skill}>
                {skill}
              </li>
            ))}
          </ul>
        </div>
        
        <div className={styles.mobileLinks}>
          <a 
            href={demo} 
            className={styles.mobileLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Demo
          </a>
          <a 
            href={source} 
            className={styles.mobileLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Source Code
          </a>
        </div>
      </div>
    </div>
  );
};