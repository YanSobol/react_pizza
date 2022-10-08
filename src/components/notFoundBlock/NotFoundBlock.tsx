import React from "react";
import styles from "./NotFoundBlock.module.scss";

const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <div>😕</div>
      <h1>Not found anything!</h1>
    </div>
  );
};

export default NotFoundBlock;
