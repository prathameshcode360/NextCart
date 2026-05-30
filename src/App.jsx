import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import store from "./Redux/store";
import router from "./router";

import { auth } from "./Firebase/firebase";

import { setUser, clearUser } from "./Redux/Auth/authSlice";

import { fetchWishlist } from "./Redux/Wishlist/wishlistSlice";

function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          }),
        );

        // Load wishlist after login
        dispatch(fetchWishlist(user.uid));
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
