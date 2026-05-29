import React from "react";
import styles from "./FeaturedProducts.module.css";
import { FaHeart } from "react-icons/fa";

import { useSelector } from "react-redux";
import {
  selectProducts,
  selectLoading,
  selectError,
} from "../../Redux/Products/productSlice";

function FeaturedProducts() {
  const products = useSelector(selectProducts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const featuredProducts = products.slice(0, 8);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <section className={styles.featuredProducts}>
      <div className={styles.container}>
        <h2>Featured Products</h2>

        <div className={styles.productGrid}>
          {featuredProducts.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <button className={styles.wishlistBtn}>
                <FaHeart />
              </button>

              <img src={product.thumbnail} alt={product.title} />

              <div className={styles.productInfo}>
                <h3>{product.title}</h3>
                <p>${product.price}</p>

                <button className={styles.cartBtn}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
