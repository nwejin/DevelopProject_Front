import React from 'react';
import styles from '../../styles/hi/list.module.scss';

const ClosetComponent: React.FC = () => {
  return (
    <div className={styles.closetList}>
      <div className={styles.closetProduct}>
        <img src="/example.png" />
        <div className={styles.productBrand}>브랜드명</div>
        <div className={styles.productName}>제품명제품명</div>
        <div className={styles.productPrice}>20000원</div>
      </div>
      <div className={styles.closetProduct}>
        <img src="/example.png" />
        <div className={styles.productBrand}>브랜드명</div>
        <div className={styles.productName}>제품명제품명</div>
        <div className={styles.productPrice}>20000원</div>
      </div>
      <div className={styles.closetProduct}>
        <img src="/example.png" />
        <div className={styles.productBrand}>브랜드명</div>
        <div className={styles.productName}>제품명제품명</div>
        <div className={styles.productPrice}>20000원</div>
      </div>
    </div>
  );
};

export default ClosetComponent;
