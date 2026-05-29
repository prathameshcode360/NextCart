import React, { useEffect, useState } from "react";
import styles from "./ProductsPage.module.css";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import {
  selectFilteredProducts,
  selectLoading,
  selectError,
} from "../../Redux/Products/productSlice";

import { setMaxPrice, selectMaxPrice } from "../../Redux/Filters/filterSlice";

import Pagination from "../../Components/Pagination/Pagination";

function ProductsPage() {
  const dispatch = useDispatch();

  const filteredProducts = useSelector(selectFilteredProducts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const maxPrice = useSelector(selectMaxPrice);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Reset page whenever filtered products change
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProducts]);

  if (loading) {
    return <h2>Loading Products...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  // Pagination Logic

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;

  const selectedProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage,
  );

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  return (
    <section className={styles.productsPage}>
      {/* Filters Section */}

      <div className={styles.priceFilter}>
        <p>Max Price: ${maxPrice}</p>

        <input
          type="range"
          min="0"
          max="1000"
          value={maxPrice}
          onChange={(e) => dispatch(setMaxPrice(Number(e.target.value)))}
        />
      </div>

      {/* Products Section */}

      <div className={styles.container}>
        <h2>All Products</h2>

        <div className={styles.productGrid}>
          {selectedProducts.length === 0 ? (
            <h3>No Products Found</h3>
          ) : (
            selectedProducts.map((product) => (
              <div key={product.id} className={styles.productCard}>
                <button className={styles.wishlistBtn}>
                  <FaHeart />
                </button>

                <img
                  src={product.thumbnail}
                  alt={product.title}
                  loading="lazy"
                />

                <div className={styles.productInfo}>
                  <h3>{product.title}</h3>

                  <p className={styles.price}>${product.price}</p>

                  <button className={styles.cartBtn}>Add To Cart</button>
                </div>
              </div>
            ))
          )}
        </div>

        {totalPages > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageNumbers={pageNumbers}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </section>
  );
}

export default ProductsPage;
