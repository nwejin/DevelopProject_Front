'use client';
import React, { useEffect, useState } from 'react';
import Calendar from '../../components/coordi/calendar';
import WetherLocation from '../../components/mainpage/Tmfprlxhd';
import Styles from '../../styles/calendar/calendar.module.scss';
import { useDispatch } from 'react-redux';
import { hideBackButton } from '../../Store/mainSlice/mainPageSlice';
import { useRouter } from 'next/navigation';

const CalendarPage: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div className={Styles.mainContainer}>
      <div className={Styles.ggg}>{/* <WetherLocation /> */}</div>
      <Calendar />
    </div>
  );
};

export default CalendarPage;
