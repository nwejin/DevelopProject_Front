'use client';
import React, { use, useEffect, useState } from 'react';
import Styles from '../../../styles/Coordi/coordi.module.scss';
import Codicomponent from '../../../components/coordi/codicomponent';
import AiRecommend from '../../../components/coordi/aiRecommend';
import SelectedDateDisplay from '../../../components/coordi/date';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Store/Store';
import { hideBackButton } from '../../../Store/mainSlice/mainPageSlice';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

const CodiPage: React.FC<{ selectedDate?: string; userId?: string }> = () => {
  const selectedDate = useSelector(
    (state: RootState) => state.calendar.selectedDate
  );
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');
    if (!accessToken) {
      alert('로그인 후 이용 가능합니다.'); // 모달 열기
    }
    dispatch(hideBackButton());
  }, [dispatch]);

  const [isTab, setIsTab] = useState(true);

  useEffect(() => {
    console.log(isTab);
  }, [isTab]);

  const defaultCoordi = () => {
    setIsTab(true);
  };

  const aiCoordi = () => {
    setIsTab(false);
  };

  return (
    <div className={Styles.container}>
      <SelectedDateDisplay selectedDate={selectedDate} />
      <div className={Styles.selectTab}>
        <p onClick={defaultCoordi} className={isTab ? Styles.clicked : ''}>
          나만의 코디
        </p>
        <p onClick={aiCoordi} className={isTab ? '' : Styles.clicked}>
          AI 코디
        </p>
      </div>
      {isTab ? <Codicomponent /> : <AiRecommend />}
      <button className={Styles.saveBtn}>저장하기</button>
    </div>
  );
};

export default CodiPage;
