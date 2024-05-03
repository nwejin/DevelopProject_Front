import React from 'react';
import styles from '../../styles/Coordi/coordi.module.scss';

interface MyComponentProps {
  imageSrc: string;
  onClick: () => void;
}

const MyComponent: React.FC<MyComponentProps> = ({ imageSrc, onClick }) => {
  return (
    <>
      <div className={styles.imgBox}>
        <img
          className={styles.img} // 이미지에 스타일 클래스 적용
          src={imageSrc}
          alt="Image"
          onClick={onClick}
        />
      </div>
      <div className={styles.descBox}>
        <span className={styles.brand}>브랜드</span>
        <span className={styles.productName}>제품명</span>
        <span className={styles.price}>가격</span>
      </div>
    </>
  );
};

export default MyComponent;
