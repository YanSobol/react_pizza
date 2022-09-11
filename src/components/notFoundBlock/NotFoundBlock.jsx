import React from "react";
import styles from "./NotFoundBlock.module.scss";

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <div>😕</div>
      <h1>Not found anything!</h1>
    </div>
  );
};

export default NotFoundBlock;
