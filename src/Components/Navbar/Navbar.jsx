import React from "react";
import styles from "./Navbar.module.css";
import logo from "../../assets/logo.png";
import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  setSearchText,
  selectSearchText,
} from "../../Redux/Filters/filterSlice";

function Navbar() {
  const dispatch = useDispatch();

  const searchText = useSelector(selectSearchText);

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

            <li>
              <Link to="/products">Products</Link>
            </li>

            <li>
              <Link to="/categories">Categories</Link>
            </li>

            <li>Contact</li>
          </ul>
        </div>

        {/* Search */}
        <div className={styles.navSearch}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchText}
            onChange={(e) => dispatch(setSearchText(e.target.value))}
          />
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
