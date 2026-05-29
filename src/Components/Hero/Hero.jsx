import React from "react";
import styles from "./Hero.module.css";
import heroImg from "../../assets/hero.png";

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContainer}>
        {/* Left Content */}
        <div className={styles.heroContent}>
          <h1>
            Discover Your <span>NextCart</span> Style
          </h1>

          <p>
            Shop the latest trends with unbeatable prices. Everything you need,
            all in one place.
          </p>

          <div className={styles.heroButtons}>
            <button className={styles.primaryBtn}>Shop Now</button>
            <button className={styles.secondaryBtn}>Explore</button>
          </div>
        </div>

        {/* Right Image */}
        <div className={styles.heroImage}>
          <img src={heroImg} alt="shopping" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
