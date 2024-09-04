import React from "react";

import styles from "./UserProfile.module.scss";

const UserProfile = () => {
  return (
    <div className={styles.userProfile}>
      <div className={styles.userAvatar}>R</div>
      <div className={styles.userName}>Rok Samsa</div>
    </div>
  );
};

export default UserProfile;
