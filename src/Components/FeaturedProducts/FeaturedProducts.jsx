import React from "react";
import styles from "./FeaturedProducts.module.css";
import { FaHeart } from "react-icons/fa";

function FeaturedProducts() {
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: "$99",
      image: "https://via.placeholder.com/250",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: "$149",
      image: "https://via.placeholder.com/250",
    },
    {
      id: 3,
      name: "Running Shoes",
      price: "$79",
      image: "https://via.placeholder.com/250",
    },
    {
      id: 4,
      name: "Backpack",
      price: "$59",
      image: "https://via.placeholder.com/250",
    },
    {
      id: 5,
      name: "Bluetooth Speaker",
      price: "$89",
      image: "https://via.placeholder.com/250",
    },
    {
      id: 6,
      name: "Gaming Mouse",
      price: "$49",
      image: "https://via.placeholder.com/250",
    },
    {
      id: 7,
      name: "Laptop Bag",
      price: "$69",
      image: "https://via.placeholder.com/250",
    },
    {
      id: 8,
      name: "Sunglasses",
      price: "$39",
      image: "https://via.placeholder.com/250",
    },
  ];

  return (
    <section className={styles.featuredProducts}>
      <div className={styles.container}>
        <h2>Featured Products</h2>

        <div className={styles.productGrid}>
          {products.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <button className={styles.wishlistBtn}>
                <FaHeart />
              </button>

              <img src={product.image} alt={product.name} />

              <div className={styles.productInfo}>
                <h3>{product.name}</h3>
                <p>{product.price}</p>

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
