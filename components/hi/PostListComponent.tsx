'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/hi/list.module.scss';

const PostListComponent: React.FC = () => {
  return (
    <div className={styles.postImgList}>
      <img src="/example.png" />
      <img src="/example.png" />
      <img src="/example.png" />
      <img src="/example.png" />
      <img src="/example.png" />
      <img src="/example.png" />
    </div>
  );
};

export default PostListComponent;
