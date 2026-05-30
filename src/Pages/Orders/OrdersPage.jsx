import React from "react";
import styles from "./OrdersPage.module.css";

import { useSelector } from "react-redux";

import { selectOrders } from "../../Redux/Orders/ordersSlice";

function OrdersPage() {
  const orders = useSelector(selectOrders);

  if (orders.length === 0) {
    return (
      <section className={styles.ordersPage}>
        <h1>My Orders</h1>

        <div className={styles.emptyOrders}>
          <h2>No Orders Found</h2>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.ordersPage}>
      <h1>My Orders</h1>

      <div className={styles.ordersContainer}>
        {orders.map((order) => (
          <div key={order.id} className={styles.orderCard}>
            <div className={styles.orderHeader}>
              <h3>Order #{order.id}</h3>

              <p>{new Date(order.createdAt).toLocaleString()}</p>
            </div>

            <div className={styles.orderItems}>
              {order.items.map((item) => (
                <div key={item.id} className={styles.orderItem}>
                  <img src={item.thumbnail} alt={item.title} />

                  <div>
                    <h4>{item.title}</h4>

                    <p>
                      ${item.price} × {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.orderFooter}>
              <h3>Total: ${order.total.toFixed(2)}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default OrdersPage;
