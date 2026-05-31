import React from "react";
import styles from "./ContactPage.module.css";

function ContactPage() {
  return (
    <section className={styles.contactSection}>
      <div className={styles.container}>
        <div className={styles.contactHeader}>
          <h1>Contact Us</h1>
          <p>
            We'd love to hear from you. Whether you have a question about
            products, orders, payments, or anything else, our team is ready to
            help.
          </p>
        </div>

        <div className={styles.contactWrapper}>
          {/* Contact Info */}
          <div className={styles.contactInfo}>
            <h2>Get In Touch</h2>

            <div className={styles.infoCard}>
              <h3>📍 Address</h3>
              <p>123 Commerce Street, Pune, Maharashtra, India</p>
            </div>

            <div className={styles.infoCard}>
              <h3>📞 Phone</h3>
              <p>+91 98765 43210</p>
            </div>

            <div className={styles.infoCard}>
              <h3>✉️ Email</h3>
              <p>support@nextcart.com</p>
            </div>

            <div className={styles.infoCard}>
              <h3>🕒 Working Hours</h3>
              <p>Monday - Saturday: 9:00 AM - 7:00 PM</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className={styles.contactForm}>
            <h2>Send a Message</h2>

            <form>
              <input type="text" placeholder="Your Name" required />

              <input type="email" placeholder="Your Email" required />

              <input type="text" placeholder="Subject" required />

              <textarea rows="6" placeholder="Your Message" required></textarea>

              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;
