import React, { useEffect, useState } from "react";
import styles from "./ProductsPage.module.css";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchProducts,
  selectProducts,
  selectLoading,
  selectError,
} from "../../Redux/Products/productSlice";

import {
  setMaxPrice,
  selectMaxPrice,
  selectSearchText,
  selectSelectedCategories,
} from "../../Redux/Filters/filterSlice";

function ProductsPage() {
  const dispatch = useDispatch();

  const products = useSelector(selectProducts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const maxPrice = useSelector(selectMaxPrice);
  const searchText = useSelector(selectSearchText);
  const selectedCategories = useSelector(selectSelectedCategories);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, maxPrice, selectedCategories]);

  if (loading) {
    return <h2>Loading Products...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  // Filter Logic
  const filteredProducts = products.filter((product) => {
    const matchSearch = product.title
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchPrice = product.price <= maxPrice;

    const matchCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);

    return matchSearch && matchPrice && matchCategory;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;

  const selectedProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage,
  );

  const pageNumbers = [];

  if (totalPages > 0) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  }

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
                {/* Wishlist Button */}
                <button className={styles.wishlistBtn}>
                  <FaHeart />
                </button>

                {/* Product Image */}
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  loading="lazy"
                />

                {/* Product Info */}
                <div className={styles.productInfo}>
                  <h3>{product.title}</h3>

                  <p className={styles.price}>${product.price}</p>

                  <button className={styles.cartBtn}>Add To Cart</button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 0 && (
          <div className={styles.pagination}>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}>
              Previous
            </button>

            {pageNumbers.map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={currentPage === page ? styles.activePage : ""}>
                {page}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}>
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductsPage;
