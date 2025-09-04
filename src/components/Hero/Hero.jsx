import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Hero.module.css";
import { getImageUrl } from "../../utils";

const images = [
  getImageUrl("hero/agency1.JPG"),
  getImageUrl("hero/agency2.JPG"),
  getImageUrl("hero/agency3.JPG"),
  getImageUrl("hero/agency4.JPG"),
  getImageUrl("hero/agency5.JPG"),
  getImageUrl("hero/agency6.JPG"),
  getImageUrl("hero/agency7.JPG"),
  getImageUrl("hero/agency8.JPG"),
  getImageUrl("hero/agency9.JPG"),
  getImageUrl("hero/agency10.JPG"),
  getImageUrl("hero/agency11.JPG"),
  getImageUrl("hero/agency12.JPG"),
  getImageUrl("hero/agency13.JPG"),
  getImageUrl("hero/agency14.JPG"),
  getImageUrl("hero/agency15.JPG"),
];

const Modal = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.modalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <motion.div
            className={styles.modalContent}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            tabIndex={-1}
            ref={modalRef}
          >
            <button
              className={styles.modalClose}
              onClick={onClose}
              aria-label="Close modal"
            >
              &times;
            </button>
            <h2 id="modal-title" className={styles.modalTitle}>{title}</h2>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const StrategyCallForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.time) newErrors.time = "Time is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", date: "", time: "" });
      setTimeout(() => {
        setSubmitStatus(null);
        onClose();
      }, 3000);
    }, 1200);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  return (
    <form className={styles.modalForm} onSubmit={handleSubmit}>
      <h3 className={styles.formHeadline}>🚀 Book Your Free Strategy Call</h3>
      <p className={styles.formDescription}>
        Let’s map out your growth plan together. On this call, you’ll get:
      </p>
      <ul className={styles.formBenefits}>
        <li>✅ Personalized advice tailored to your business</li>
        <li>✅ Actionable steps you can implement immediately</li>
        <li>✅ See if we’re the right fit to scale together</li>
      </ul>
      <div className={styles.formGroup}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? styles.inputError : ""}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && <span id="name-error" className={styles.error}>{errors.name}</span>}
      </div>
      <div className={styles.formGroup}>
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? styles.inputError : ""}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && <span id="email-error" className={styles.error}>{errors.email}</span>}
      </div>
      <div className={styles.formGroup}>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className={errors.date ? styles.inputError : ""}
          aria-invalid={!!errors.date}
          aria-describedby={errors.date ? "date-error" : undefined}
        />
        {errors.date && <span id="date-error" className={styles.error}>{errors.date}</span>}
      </div>
      <div className={styles.formGroup}>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          className={errors.time ? styles.inputError : ""}
          aria-invalid={!!errors.time}
          aria-describedby={errors.time ? "time-error" : undefined}
        />
        {errors.time && <span id="time-error" className={styles.error}>{errors.time}</span>}
      </div>
      <motion.button
        type="submit"
        className={styles.submitButton}
        disabled={isSubmitting}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isSubmitting ? (
          <span className={styles.spinner}>⏳ Booking...</span>
        ) : (
          "Book My Call"
        )}
      </motion.button>
      {submitStatus === "success" && (
        <motion.p
          className={styles.successMessage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          🎉 Your strategy call is booked! We’ll email you the details shortly.
        </motion.p>
      )}
    </form>
  );
};

const PackagesModal = () => {
  const packages = [
    {
      tier: "Starter (Low)",
      target: "Small shops, salons, boutiques",
      priceGHS: "₵3,500 – ₵6,000",
      priceUSD: "$250 – $450",
      features: [
        "1–3 pages",
        "Mobile-friendly",
        "WhatsApp/CTA button",
        "Basic SEO",
        "1-week delivery",
      ],
    },
    {
      tier: "Growth (Medium)",
      target: "Restaurants, gyms, clinics, small hotels",
      priceGHS: "₵8,000 – ₵15,000",
      priceUSD: "$600 – $1,100",
      features: [
        "5–7 pages",
        "Booking/inquiry forms",
        "Google Maps + Analytics",
        "Social media integration",
        "SEO optimization",
        "2-week delivery",
      ],
    },
    {
      tier: "Enterprise (High)",
      target: "Real estate firms, schools, hotels, car dealerships",
      priceGHS: "₵18,000 – ₵30,000+",
      priceUSD: "$1,300 – $2,200+",
      features: [
        "10+ pages",
        "Online payments",
        "Blog/news section",
        "Custom dashboards/CRM",
        "Advanced animations",
        "3 months free maintenance",
        "4–6 weeks delivery",
      ],
    },
    {
      tier: "Basic Landing Page",
      priceGHS: "₵2,500 – ₵5,000",
      priceUSD: "$200 – $350",
      features: [
        "1-page responsive design",
        "Mobile-friendly",
        "Contact form/WhatsApp button",
        "2–3 day delivery",
      ],
    },
    {
      tier: "Professional Landing Page",
      priceGHS: "₵6,000 – ₵10,000",
      priceUSD: "$450 – $750",
      features: [
        "Everything in Basic",
        "Custom design",
        "Conversion CTAs",
        "SEO optimization",
        "Basic animations",
        "Google Maps integration",
      ],
    },
    {
      tier: "Premium Landing Page",
      priceGHS: "₵12,000 – ₵20,000",
      priceUSD: "$900 – $1,500",
      features: [
        "Everything in Professional",
        "Online booking/payments",
        "Advanced animations",
        "Analytics & tracking",
        "A/B testing",
        "3 months support & updates",
      ],
    },
  ];

  return (
    <div className={styles.packagesContent}>
      <h3 className={styles.packagesTitle}>🌍 Website & Landing Page Packages</h3>
      <div className={styles.packagesGrid}>
        {packages.map((pkg, index) => (
          <motion.div
            key={index}
            className={styles.packageCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
          >
            <h4 className={styles.packageTier}>{pkg.tier}</h4>
            {pkg.target && <p className={styles.packageTarget}>{pkg.target}</p>}
            <p className={styles.packagePrice}>
              {pkg.priceGHS} ({pkg.priceUSD})
            </p>
            <ul className={styles.packageFeatures}>
              {pkg.features.map((feature, i) => (
                <li key={i}>✅ {feature}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
      <motion.a
        href="#contact"
        className={styles.packageCta}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Contact Us for a Quote
      </motion.a>
    </div>
  );
};

export const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [modalType, setModalType] = useState(null);

  useEffect(() => {
    // Preload images to reduce flicker
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const openModal = (type) => setModalType(type);
  const closeModal = () => setModalType(null);

  return (
    <section className={styles.container} role="banner">
      <motion.div
        className={styles.background}
        key={images[currentImage]}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{ backgroundImage: `url(${images[currentImage]})` }}
      />
      <div className={styles.darkOverlay}></div>
      <div className={styles.overlay}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <h1 className={styles.title}>
            Building Websites That <span>Grow Businesses</span>
          </h1>
          <p className={styles.subtitle}>
            We design, develop & deploy high-impact websites and apps that help
            Ghanaian and global businesses thrive.
          </p>
          <p className={styles.description}>
            From stunning landing pages to full-stack solutions, we specialize
            in creating digital platforms that drive sales, capture leads, and
            put your brand on the map.
          </p>
          <div className={styles.highlights}>
            <motion.div
              className={styles.highlightItem}
              whileHover={{ scale: 1.05 }}
            >
              <span className={styles.highlightIcon}>🚀</span>
              High-converting business websites
            </motion.div>
            <motion.div
              className={styles.highlightItem}
              whileHover={{ scale: 1.05 }}
            >
              <span className={styles.highlightIcon}>🔒</span>
              Blockchain & AI-powered solutions
            </motion.div>
            <motion.div
              className={styles.highlightItem}
              whileHover={{ scale: 1.05 }}
            >
              <span className={styles.highlightIcon}>📈</span>
              SEO & Growth-focused development
            </motion.div>
          </div>
          <div className={styles.ctaContainer}>
            <motion.button
              className={styles.primaryBtn}
              onClick={() => openModal("packages")}
              aria-label="View our premium packages"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Our Premium Packages
            </motion.button>
            <motion.a
              href="#projects"
              className={styles.secondaryBtn}
              aria-label="See our work"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              See Our Work
            </motion.a>
            <motion.button
              className={styles.tertiaryBtn}
              onClick={() => openModal("contact")}
              aria-label="Book a strategy call"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book a Strategy Call
            </motion.button>
          </div>
        </motion.div>
      </div>
      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
      <Modal
        isOpen={modalType === "packages"}
        onClose={closeModal}
        title="Our Premium Packages"
      >
        <PackagesModal />
      </Modal>
      <Modal
        isOpen={modalType === "contact"}
        onClose={closeModal}
        title="Book Your Strategy Call"
      >
        <StrategyCallForm onClose={closeModal} />
      </Modal>
    </section>
  );
};