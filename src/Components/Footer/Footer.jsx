import React from "react";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerBrand}>
          <h2>NextCart</h2>
          <p>Your one-stop destination for modern shopping.</p>
        </div>

        <div className={styles.footerLinks}>
          <h3>Quick Links</h3>

          <ul>
            <li>Home</li>
            <li>Products</li>
            <li>Categories</li>
            <li>Contact</li>
          </ul>
        </div>

        <div className={styles.footerContact}>
          <h3>Contact</h3>

          <p>support@nextcart.com</p>
          <p>+91 9876543210</p>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <p>© 2026 NextCart. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
