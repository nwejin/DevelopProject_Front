'use client';
import { useState } from 'react';
import styles from '../../../styles/hi/profile.module.scss';
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const DynamicPostComponent = dynamic(
  () => import('../../../components/hi/PostListComponent')
);

const DynamicClosetComponent = dynamic(
  () => import('../../../components/hi/ClosetComponent')
);

const MyPage = () => {
  const nickName = useSelector((state: any) => state.userData.userNickName);
  const [showPost, setShowPost] = useState(true);
  const [showCloset, setShowCloset] = useState(false);

  return (
    <>
      <div className={styles.profileContainer}>
        <div className={styles.profileHeader}>
          <div className={styles.profileInfoBox}>
            <img className={styles.profileImg} src="/example.png" />
            <div className={styles.profileInfo}>
              <div className={styles.profileName}>ogg_example</div>
              <div className={styles.profileSize}>170cm / 50kg</div>
            </div>
          </div>
          <div className={styles.profileBtnBox}>
            <div>프로필 편집</div>
            <div>프로필 편집</div>
          </div>
        </div>
        <div className={styles.btnBox}>
          <div
            onClick={() => {
              setShowPost(true);
              setShowCloset(false);
            }}
            className={styles.listBtnDiv}
          >
            <img className={styles.listBtn} src="/list.png" />
          </div>
          <div
            onClick={() => {
              setShowPost(false);
              setShowCloset(true);
            }}
            className={styles.codiBtnDiv}
          >
            <img className={styles.codiBtn} src="/codi.png" />
          </div>
        </div>
        {showPost && <DynamicPostComponent />}
        {showCloset && <DynamicClosetComponent />}
      </div>
    </>
  );
};

export default MyPage;
