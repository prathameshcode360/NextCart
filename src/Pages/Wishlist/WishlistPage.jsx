import React from "react";
import styles from "./WishlistPage.module.css";
import { useDispatch, useSelector } from "react-redux";

import {
  removeFromWishlist,
  selectWishlistItems,
  selectWishlistLoading,
} from "../../Redux/Wishlist/wishlistSlice";

import { selectUser } from "../../Redux/Auth/authSlice";

function WishlistPage() {
  const dispatch = useDispatch();

  const wishlistItems = useSelector(selectWishlistItems);
  const loading = useSelector(selectWishlistLoading);

  const user = useSelector(selectUser);

  const handleRemove = (productId) => {
    dispatch(
      removeFromWishlist({
        uid: user.uid,
        productId,
      }),
    );
  };

  if (loading) {
    return <h2 className={styles.message}>Loading Wishlist...</h2>;
  }

  return (
    <section className={styles.wishlistPage}>
      <div className={styles.container}>
        <h2>My Wishlist</h2>

        {wishlistItems.length === 0 ? (
          <div className={styles.emptyWishlist}>
            <h3>Your wishlist is empty ❤️</h3>
            <p>Add products to your wishlist and they will appear here.</p>
          </div>
        ) : (
          <div className={styles.productGrid}>
            {wishlistItems.map((product) => (
              <div key={product.id} className={styles.productCard}>
                <img src={product.thumbnail} alt={product.title} />

                <div className={styles.productInfo}>
                  <h3>{product.title}</h3>

                  <p className={styles.price}>${product.price}</p>

                  <button
                    className={styles.removeBtn}
                    onClick={() => handleRemove(product.id)}>
                    Remove From Wishlist
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default WishlistPage;
