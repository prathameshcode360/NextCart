import React from "react";
import styles from "./FeaturedProducts.module.css";
import { FaHeart } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  selectProducts,
  selectLoading,
  selectError,
} from "../../Redux/Products/productSlice";

import {
  addToWishlist,
  removeFromWishlist,
  selectWishlistItems,
} from "../../Redux/Wishlist/wishlistSlice";

import { selectUser, selectIsAuthenticated } from "../../Redux/Auth/authSlice";

import { addToCart } from "../../Redux/Cart/cartSlice";

function FeaturedProducts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector(selectProducts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const wishlistItems = useSelector(selectWishlistItems);

  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const featuredProducts = products.slice(0, 8);

  const handleWishlistToggle = (product) => {
    if (!isAuthenticated) {
      alert("Please login to use wishlist");
      navigate("/login");
      return;
    }

    const exists = wishlistItems.some((item) => item.id === product.id);

    if (exists) {
      dispatch(
        removeFromWishlist({
          uid: user.uid,
          productId: product.id,
        }),
      );
    } else {
      dispatch(
        addToWishlist({
          uid: user.uid,
          product,
        }),
      );
    }
  };

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      alert("Please login to use cart");
      navigate("/login");
      return;
    }

    dispatch(
      addToCart({
        uid: user.uid,
        product,
      }),
    );
  };

  if (loading) {
    return <h2>Loading Products...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  return (
    <section className={styles.featuredProducts}>
      <div className={styles.container}>
        <h2>Featured Products</h2>

        <div className={styles.productGrid}>
          {featuredProducts.map((product) => {
            const isWishlisted = wishlistItems.some(
              (item) => item.id === product.id,
            );

            return (
              <div key={product.id} className={styles.productCard}>
                <button
                  className={styles.wishlistBtn}
                  onClick={() => handleWishlistToggle(product)}>
                  <FaHeart color={isWishlisted ? "red" : "#ccc"} />
                </button>

                <img
                  src={product.thumbnail}
                  alt={product.title}
                  loading="lazy"
                />

                <div className={styles.productInfo}>
                  <h3>{product.title}</h3>

                  <p className={styles.price}>${product.price}</p>

                  <button
                    className={styles.cartBtn}
                    onClick={() => handleAddToCart(product)}>
                    Add To Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
