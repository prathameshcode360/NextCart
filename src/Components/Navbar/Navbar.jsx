import React from "react";
import styles from "./Navbar.module.css";
import logo from "../../assets/logo.png";
import { Link, Outlet } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav className={styles.navbar}>
        {/* Logo */}
        <div className={styles.navLogo}>
          <img src={logo} alt="logo" />
        </div>

        {/* Navigation Links */}
        <div className={styles.navLinks}>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>Products</li>
            <li>Categories</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Search */}
        <div className={styles.navSearch}>
          <input type="text" placeholder="Search products..." />
        </div>

        {/* Actions */}
        <div className={styles.navActions}>
          <button>Wishlist</button>

          <button>Orders</button>

          <button>
            Cart
            <span>0</span>
          </button>

          <div className={styles.profile}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/1144/1144709.png"
              alt="profile"
            />
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;
