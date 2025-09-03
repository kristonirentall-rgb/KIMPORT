import React, { useState, useEffect } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import styles from "./Navbar.module.css";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleResize = () => {
      if (window.innerWidth > 768 && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [menuOpen]);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
    // Prevent body scroll when menu is open
    document.body.style.overflow = menuOpen ? 'unset' : 'hidden';
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  const handleLinkClick = () => {
    handleMenuClose();
  };

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.navContainer}>
        <a className={styles.title} href="/" onClick={handleMenuClose}>
          <span className={styles.firstName}>KIM</span>
          <span className={styles.lastName}>KIDONG</span>
        </a>
        
        <div className={styles.menu}>
          <button
            className={`${styles.menuBtn} ${menuOpen ? styles.menuOpen : ''}`}
            onClick={handleMenuToggle}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className={styles.menuIcon}></span>
            <span className={styles.menuIcon}></span>
            <span className={styles.menuIcon}></span>
          </button>
          
          <div className={`${styles.menuOverlay} ${menuOpen ? styles.overlayOpen : ''}`} 
               onClick={handleMenuClose}>
          </div>
          
          <ul className={`${styles.menuItems} ${menuOpen ? styles.menuOpen : ''}`}>
            <li>
              <a href="#about" onClick={handleLinkClick}>
                <span className={styles.menuNumber}>01.</span>
                About
              </a>
            </li>
            <li>
              <a href="#projects" onClick={handleLinkClick}>
                <span className={styles.menuNumber}>02.</span>
                Projects
              </a>
            </li>
            <li>
              <a href="#experience" onClick={handleLinkClick}>
                <span className={styles.menuNumber}>03.</span>
                Experience
              </a>
            </li>
            <li>
              <a href="#contact" onClick={handleLinkClick}>
                <span className={styles.menuNumber}>04.</span>
                Contact
              </a>
            </li>
            <li className={styles.socialLinks}>
              <a
                href="https://github.com/kristonirentall-rgb"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
                aria-label="GitHub"
              >
                <FaGithub className={styles.socialIcon} />
              </a>
              <a
                href="https://www.linkedin.com/in/simon-kim-ki-dong-antoh-a09041305"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
                aria-label="LinkedIn"
              >
                <FaLinkedin className={styles.socialIcon} />
              </a>
            </li>
          </ul>
        </div>

        {/* Desktop Social Links */}
        <div className={styles.desktopSocials}>
          <a
            href="https://github.com/kristonirentall-rgb"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub className={styles.desktopSocialIcon} />
          </a>
          <a
            href="https://www.linkedin.com/in/simon-kim-ki-dong-antoh-a09041305"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin className={styles.desktopSocialIcon} />
          </a>
        </div>
      </div>
    </nav>
  );
};