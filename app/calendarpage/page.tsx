'use client';
import React, { useEffect, useState } from 'react';
import Calendar from '../../components/calendarpage/calendarpage';
import WetherLocation from '../../components/mainpage/Tmfprlxhd';
import Styles from '../../styles/calendar/calendar.module.scss';
import MoveLoginModal from '../../components/MoveLoginModal';
import { useDispatch } from 'react-redux';
import { hideBackButton } from '../../Store/mainSlice/mainPageSlice';
import { useRouter } from 'next/navigation';

const CalendarPage: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태 추가

  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');
    if (!accessToken) {
      setIsModalOpen(true); // 모달 열기
    }
    dispatch(hideBackButton());
  }, [dispatch]);

  const handleModalConfirm = () => {
    setIsModalOpen(false);
    router.push('/login'); // 모달 확인 후 로그인 페이지로 이동
  };

  return (
    <div className={Styles.mainContainer}>
      {/* 모달 */}

      <div className={Styles.h1}>
        <h2 className={Styles.h2}>당신의 코디를 등록해봐요!</h2>
      </div>

      <div className={Styles.ggg}>
        <WetherLocation />
      </div>

      <Calendar />
      <MoveLoginModal isOpen={isModalOpen} onConfirm={handleModalConfirm} />
    </div>
  );
};

export default CalendarPage;
