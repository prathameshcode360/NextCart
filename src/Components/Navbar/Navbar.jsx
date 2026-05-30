import React, { useEffect, useState, useRef } from "react";
import styles from "./Navbar.module.css";
import logo from "../../assets/logo.png";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";

import { auth } from "../../Firebase/firebase";

import {
  setSearchText,
  selectSearchText,
} from "../../Redux/Filters/filterSlice";

import {
  fetchProducts,
  selectProducts,
  selectSearchSuggestions,
} from "../../Redux/Products/productSlice";

import { selectIsAuthenticated, selectUser } from "../../Redux/Auth/authSlice";

import { selectWishlistCount } from "../../Redux/Wishlist/wishlistSlice";

import { selectCartCount } from "../../Redux/Cart/cartSlice";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchText = useSelector(selectSearchText);
  const products = useSelector(selectProducts);
  const suggestions = useSelector(selectSearchSuggestions);

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  const wishlistCount = useSelector(selectWishlistCount);
  const cartCount = useSelector(selectCartCount);

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

  const handleOrdersClick = () => {
    if (!isAuthenticated) {
      alert("Please login to view orders");
      navigate("/login");
      return;
    }

    navigate("/orders");
  };

  const handleWishlistClick = () => {
    if (!isAuthenticated) {
      alert("Please login to view wishlist");
      navigate("/login");
      return;
    }

    navigate("/wishlist");
  };

  const handleCartClick = () => {
    if (!isAuthenticated) {
      alert("Please login to view cart");
      navigate("/login");
      return;
    }

    navigate("/cart");
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);

      navigate("/");
    } catch (error) {
      console.error(error);
    }
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
          <button onClick={handleWishlistClick}>
            Wishlist
            {wishlistCount > 0 && <span>{wishlistCount}</span>}
          </button>

          <button onClick={handleOrdersClick}>Orders</button>

          <button onClick={handleCartClick}>
            Cart
            {cartCount > 0 && <span>{cartCount}</span>}
          </button>

          {isAuthenticated ? (
            <>
              <button onClick={() => navigate("/profile")}>
                {user?.displayName || "Profile"}
              </button>

              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate("/login")}>Login</button>

              <button onClick={() => navigate("/register")}>Register</button>
            </>
          )}
        </div>
      </nav>

      <Outlet />
    </>
  );
}

export default Navbar;
