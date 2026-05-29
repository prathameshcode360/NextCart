import React from "react";
import styles from "./Categories.module.css";

import { useDispatch, useSelector } from "react-redux";

import {
  selectProducts,
  selectLoading,
  selectError,
} from "../../Redux/Products/productSlice";

import {
  toggleCategory,
  selectSelectedCategories,
} from "../../Redux/Filters/filterSlice";

function Categories() {
  const dispatch = useDispatch();

  const products = useSelector(selectProducts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const selectedCategories = useSelector(selectSelectedCategories);

  const categories = [...new Set(products.map((product) => product.category))];

  if (loading) {
    return <h2>Loading Categories...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  return (
    <section className={styles.categoriesPage}>
      <div className={styles.container}>
        <h2>Shop By Categories</h2>

        <div className={styles.categoriesGrid}>
          {categories.map((category) => (
            <div
              key={category}
              className={`${styles.categoryCard} ${
                selectedCategories.includes(category)
                  ? styles.activeCategory
                  : ""
              }`}>
              <div className={styles.categoryIcon}>📦</div>

              <h3>{category}</h3>

              <button onClick={() => dispatch(toggleCategory(category))}>
                {selectedCategories.includes(category) ? "Selected" : "Explore"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;
