import React, { useEffect, useState, useRef } from "react";
import styles from "./Navbar.module.css";
import logo from "../../assets/logo.png";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  setSearchText,
  selectSearchText,
} from "../../Redux/Filters/filterSlice";

import {
  fetchProducts,
  selectProducts,
  selectSearchSuggestions,
} from "../../Redux/Products/productSlice";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchText = useSelector(selectSearchText);
  const products = useSelector(selectProducts);
  const suggestions = useSelector(selectSearchSuggestions);

  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchRef = useRef(null);

  // Fetch Products Once
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  // Close Suggestions When Clicking Outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e) => {
    dispatch(setSearchText(e.target.value));
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (productTitle) => {
    dispatch(setSearchText(productTitle));

    setShowSuggestions(false);

    navigate("/products");
  };

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

            <li>Contact</li>
          </ul>
        </div>

        {/* Search */}
        <div className={styles.navSearch} ref={searchRef}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchText}
            onFocus={() => setShowSuggestions(true)}
            onChange={handleSearchChange}
          />

          {showSuggestions && searchText.trim() && suggestions.length > 0 && (
            <div className={styles.suggestions}>
              {suggestions.map((product) => (
                <div
                  key={product.id}
                  className={styles.suggestionItem}
                  onClick={() => handleSuggestionClick(product.title)}>
                  {product.title}
                </div>
              ))}
            </div>
          )}
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
