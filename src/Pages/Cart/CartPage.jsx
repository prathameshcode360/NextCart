import React from "react";
import styles from "./CartPage.module.css";

import { useDispatch, useSelector } from "react-redux";

import {
  selectCartItems,
  selectCartTotal,
  clearCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../Redux/Cart/cartSlice";

import { selectUser } from "../../Redux/Auth/authSlice";
import { useNavigate } from "react-router-dom";

import { placeOrder } from "../../Redux/Orders/ordersSlice";

function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  const user = useSelector(selectUser);

  const handleIncrease = (productId) => {
    dispatch(
      increaseQuantity({
        uid: user.uid,
        productId,
      }),
    );
  };

  const handleDecrease = (productId) => {
    dispatch(
      decreaseQuantity({
        uid: user.uid,
        productId,
      }),
    );
  };

  const handleRemove = (productId) => {
    dispatch(
      removeFromCart({
        uid: user.uid,
        productId,
      }),
    );
  };

  const handleClearCart = () => {
    dispatch(clearCart(user.uid));
  };

  const handleCheckout = async () => {
    try {
      await dispatch(
        placeOrder({
          uid: user.uid,
          items: cartItems,
          total,
        }),
      ).unwrap();

      await dispatch(clearCart(user.uid)).unwrap();

      navigate("/orders");
    } catch (error) {
      console.error(error);
      alert("Failed to place order");
    }
  };

  return (
    <section className={styles.cartPage}>
      <h1>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className={styles.emptyCart}>
          <h2>Your Cart Is Empty</h2>
        </div>
      ) : (
        <>
          <div className={styles.cartContainer}>
            {cartItems.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className={styles.productImage}
                />

                <div className={styles.productDetails}>
                  <h3>{item.title}</h3>

                  <p>${item.price}</p>

                  <div className={styles.quantityControls}>
                    <button onClick={() => handleDecrease(item.id)}>-</button>

                    <span>{item.quantity}</span>

                    <button onClick={() => handleIncrease(item.id)}>+</button>
                  </div>
                </div>

                <button
                  className={styles.removeBtn}
                  onClick={() => handleRemove(item.id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className={styles.summary}>
            <h2>Total: ${total.toFixed(2)}</h2>

            <div className={styles.actions}>
              <button className={styles.clearBtn} onClick={handleClearCart}>
                Clear Cart
              </button>

              <button className={styles.checkoutBtn} onClick={handleCheckout}>
                Proceed To Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default CartPage;
