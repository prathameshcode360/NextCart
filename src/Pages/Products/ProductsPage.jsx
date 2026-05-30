import React, { useEffect, useState } from "react";
import styles from "./ProductsPage.module.css";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import {
  selectProducts,
  selectFilteredProducts,
  selectLoading,
  selectError,
} from "../../Redux/Products/productSlice";

import {
  setMinPrice,
  setMaxPrice,
  toggleCategory,
  selectMinPrice,
  selectMaxPrice,
  selectSelectedCategories,
} from "../../Redux/Filters/filterSlice";

import Pagination from "../../Components/Pagination/Pagination";

function ProductsPage() {
  const dispatch = useDispatch();

  const products = useSelector(selectProducts);
  const filteredProducts = useSelector(selectFilteredProducts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const minPrice = useSelector(selectMinPrice);
  const maxPrice = useSelector(selectMaxPrice);
  const selectedCategories = useSelector(selectSelectedCategories);

  const categories = [...new Set(products.map((product) => product.category))];

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
      <div className={styles.layout}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <h3>Filters</h3>

          <div className={styles.filterSection}>
            <h4>Categories</h4>

            {categories.map((category) => (
              <label key={category} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => dispatch(toggleCategory(category))}
                />
                {category}
              </label>
            ))}
          </div>

          <div className={styles.filterSection}>
            <h4>Price Range</h4>

            <div className={styles.priceInputs}>
              <input
                type="number"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => dispatch(setMinPrice(Number(e.target.value)))}
              />

              <input
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => dispatch(setMaxPrice(Number(e.target.value)))}
              />
            </div>
          </div>
        </aside>

        {/* Products */}
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
      </div>
    </section>
  );
}

export default ProductsPage;
