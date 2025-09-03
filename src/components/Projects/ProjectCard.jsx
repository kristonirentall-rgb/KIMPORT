import React from "react";
import styles from "./ProjectCard.module.css";
import { getImageUrl } from "../../utils";

export const ProjectCard = ({
  project: { title, imageSrc, description, skills, demo, source, impact },
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={getImageUrl(imageSrc)}
          alt={`Preview of ${title}`}
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>

        {impact && <p className={styles.impact}><strong>Impact:</strong> {impact}</p>}

        <ul className={styles.skills}>
          {skills.map((skill, id) => (
            <li key={id} className={styles.skill}>
              {skill}
            </li>
          ))}
        </ul>

        <div className={styles.links}>
          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.demoBtn}
            >
              Live Demo
            </a>
          )}
          {source && (
            <a
              href={source}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.codeBtn}
            >
              View Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
