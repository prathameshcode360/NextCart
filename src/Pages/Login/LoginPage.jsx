import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

import { auth, googleProvider } from "../../Firebase/firebase";

import styles from "./LoginPage.module.css";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      console.log("User Logged In:", userCredential.user);

      alert("Login Successful");

      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      console.log("Google User:", result.user);

      alert("Google Login Successful");
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <h2 className={styles.heading}>Login</h2>

        <form onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Password</label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </div>

          <button className={styles.loginBtn} type="submit">
            Login
          </button>
        </form>

        <p className={styles.divider}>OR</p>

        <button className={styles.googleBtn} onClick={handleGoogleLogin}>
          Continue with Google
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
