'use client';

import { useEffect, useState } from 'react';
import MypageHeader from '../../../components/MyPage/MypageHeader';
import styles from '../../../styles/MyPage/mypage.module.scss';
import PersonalInfo from '../../../components/MyPage/PersonalInfo';
import Dimension from '../../../components/MyPage/Dimension';
import Statistics from '../../../components/MyPage/Statistics';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import MoveLoginModal from '../../../components/MoveLoginModal';
import { useDispatch } from 'react-redux';
import { setUserId } from '../../../Store/userSlice/userSlice';
import Link from 'next/link';

function MyPage() {
  const [selectedComponent, setSelectedComponent] = useState('기본정보');
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 닫힌 상태

  const handleComponentChange = (component) => {
    setSelectedComponent(component);
  };
  const router = useRouter();

  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');
    if (!accessToken) {
      setIsModalOpen(true); // 모달 열기
    }
  }, []);

  const handleModalConfirm = () => {
    setIsModalOpen(false);
    router.push('/login');
  };

  const dispatch = useDispatch();
  const logOut = () => {
    // 로그아웃 시 userId 상태 초기화
    dispatch(setUserId(''));
    sessionStorage.clear(); // 세션 스토리지의 모든 값 제거. (2개 토큰 - R.T , A.T) 제거.
    // 로그아웃 시 UI 갱신
    close();
  };
  return (
    <>
      <div className={styles.mypage_Container}>
        <MypageHeader />
        {isModalOpen ? (
          <Link href="/login">로그인</Link>
        ) : (
          <p onClick={logOut}>로그아웃</p>
        )}

        <div className={styles.mypage_underbar}></div>
        <div className={styles.mypage_components}>
          <div
            className={`${styles.mypage_components_info} ${
              selectedComponent === '기본정보' ? styles.changedComponent : ''
            }`}
            onClick={() => handleComponentChange('기본정보')}
          >
            Info
          </div>
          <div
            className={`${styles.mypage_components_info} ${
              selectedComponent === '치수' ? styles.changedComponent : ''
            }`}
            onClick={() => handleComponentChange('치수')}
          >
            <Image
              src="/ruler.png"
              alt="Ruler"
              width={32} // 이미지의 너비와 높이 조정
              height={32}
              onClick={() => handleComponentChange('치수')}
            />
          </div>
          <div
            className={`${styles.mypage_components_info} ${
              selectedComponent === '통계' ? styles.changedComponent : ''
            }`}
            onClick={() => handleComponentChange('통계')}
          >
            Report
          </div>
        </div>
        {selectedComponent === '기본정보' && <PersonalInfo />}
        {selectedComponent === '치수' && <Dimension />}
        {selectedComponent === '통계' && <Statistics />}
        {/* <MoveLoginModal isOpen={isModalOpen} onConfirm={handleModalConfirm} /> */}
      </div>
    </>
  );
}

export default MyPage;
