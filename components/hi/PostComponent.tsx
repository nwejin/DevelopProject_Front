'use client';
import React, { useEffect, useRef, useState } from 'react';
import styles from '../../styles/hi/community.module.scss';

const PostComponent: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  // const textLimit = useRef<number>(170);
  const content = `Lorem Ipsum is simply dummy text of the printing and typesetting
  industry. Lorem Ipsum has been the industry's standard dummy text ever
  since the 1500s, when an unknown printer took a galley of type and
  scrambled it to make a type specimen book. It has survived not only five
  centuries, but also the leap into electronic typesetting, remaining
  essentially unchanged.`;
  const showAllContent = () => {
    setShowAll(true);
  };

  return (
    <div className={styles.postContainer}>
      <div className={styles.postUser}>
        <div className={styles.postUserImg}>
          <img src="/example.png" />
        </div>
        <div className={styles.postUserName}>ogg_sample</div>
      </div>
      <div className={styles.postImg}>
        <img src="/example.png" />
      </div>
      <div className={styles.postBtnBox}>
        <div className={styles.postLikeBtn}>
          <span className="material-symbols-outlined">favorite</span>
        </div>
        <div className={styles.postCmtBtn}>
          <span className="material-symbols-outlined">mode_comment</span>
        </div>
      </div>
      <div className={styles.postWriteId}>ogg_sample</div>
      {/* <div className="postWriteContent"> */}
      <div className={styles.postWriteContent}>
        {' '}
        {showAll ? content : `${content.slice(0, 100)}...`}
      </div>
      {!showAll && <span onClick={showAllContent}>더보기</span>}
    </div>
  );
};

export default PostComponent;
