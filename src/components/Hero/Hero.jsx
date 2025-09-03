import React from "react";
import styles from "./Hero.module.css";
import { getImageUrl } from "../../utils";

export const Hero = () => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Full-Stack Developer</h1>
        <p className={styles.subtitle}>Specializing in Web & Mobile Solutions</p>
        <p className={styles.description}> I am Antoh Simon Kim-Ki Dong. An
          experienced full-stack developer with expertise in building responsive websites, 
          mobile applications, and scalable server solutions. Proficient in modern technologies 
          including React, Node.js, TypeScript, Flutter, and cloud deployment on AWS and DigitalOcean. 
          I've successfully delivered projects for organizations like Accra Metropolitan Assembly, 
          Sedan Landbank, and PEC Consult — creating user-friendly applications with comprehensive 
          testing, documentation, and end-user support.
        </p>
        <div className={styles.highlights}>
          <div className={styles.highlightItem}>
            <span className={styles.highlightIcon}>🚀</span>
            Full-stack web & mobile development
          </div>
          <div className={styles.highlightItem}>
            <span className={styles.highlightIcon}>☁️</span>
            Cloud deployment expertise
          </div>
          <div className={styles.highlightItem}>
            <span className={styles.highlightIcon}>📱</span>
            App store publication
          </div>
        </div>
        <div className={styles.ctaContainer}>
          <a href="mailto:yourname@email.com" className={styles.contactBtn}>
            Contact Me
          </a>
          <a href="#projects" className={styles.projectsBtn}>
            View Projects
          </a>
        </div>
      </div>
      <img
        src={getImageUrl("hero/heroImage.PNG")}
        alt="Portrait of Mr. World"
        className={styles.heroImg}
      />
      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
    </section>
  );
};