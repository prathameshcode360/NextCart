import { createBrowserRouter } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";

import HomePage from "./Pages/Home/HomePage";
import ProductsPage from "./Pages/Products/ProductsPage";
import WishlistPage from "./Pages/Wishlist/WishlistPage";
import CartPage from "./Pages/Cart/CartPage";
import OrdersPage from "./Pages/Orders/OrdersPage";
import LoginPage from "./Pages/Login/LoginPage";
import RegisterPage from "./Pages/Register/RegisterPage";
import ProfilePage from "./Pages/Profile/ProfilePage";

import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <WishlistPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
