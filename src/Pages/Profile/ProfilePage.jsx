import React from "react";
import { useSelector } from "react-redux";

import { selectUser } from "../../Redux/Auth/authSlice";

import styles from "./ProfilePage.module.css";

function ProfilePage() {
  const user = useSelector(selectUser);

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        <h2 className={styles.heading}>My Profile</h2>

        <div className={styles.profileImageContainer}>
          <img
            className={styles.profileImage}
            src={
              user?.photoURL ||
              "https://cdn-icons-png.flaticon.com/128/1144/1144709.png"
            }
            alt="profile"
          />
        </div>

        <div className={styles.profileInfo}>
          <div className={styles.infoRow}>
            <strong>Name:</strong> {user?.displayName || "Not Available"}
          </div>

          <div className={styles.infoRow}>
            <strong>Email:</strong> {user?.email || "Not Available"}
          </div>

          <div className={styles.infoRow}>
            <strong>User ID:</strong> {user?.uid || "Not Available"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
