import { createBrowserRouter } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import HomePage from "./Pages/Home/HomePage";
import ProductsPage from "./Pages/Products/ProductsPage";

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
    ],
  },
]);

export default router;
