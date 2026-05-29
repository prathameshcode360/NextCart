import React, { useEffect } from "react";
import Hero from "../../Components/Hero/Hero";
import FeaturedProducts from "../../Components/FeaturedProducts/FeaturedProducts";
import Footer from "../../Components/Footer/Footer";

import { useDispatch } from "react-redux";
import { fetchProducts } from "../../Redux/Products/productSlice";

function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <Hero />
      <FeaturedProducts />
      <Footer />
    </>
  );
}

export default HomePage;
