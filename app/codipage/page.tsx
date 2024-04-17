'use client';
import React, { useEffect, useState } from 'react';
import Styles from '../../styles/calendar/calendar.module.scss';
import Codicomponent from '../../components/codipage/codicomponent';
import SelectedDateDisplay from '../../components/codipage/date';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store/Store';
import MoveLoginModal from '../../components/MoveLoginModal';
import { hideBackButton } from '../../Store/mainSlice/mainPageSlice';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

const CodiPage: React.FC<{ selectedDate?: string; userId?: string }> = () => {
  const selectedDate = useSelector(
    (state: RootState) => state.calendar.selectedDate
  );
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
    <div className={Styles.all}>
      <SelectedDateDisplay selectedDate={selectedDate} />

      <Codicomponent />
      <MoveLoginModal isOpen={isModalOpen} onConfirm={handleModalConfirm} />
    </div>
  );
};

export default CodiPage;
