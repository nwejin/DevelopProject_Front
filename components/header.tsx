'use client';

import React, { useEffect, useState } from 'react';
import styles from '../styles/header.module.scss';
import '../styles/icons.scss';
import SideBar from './sidebar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '../Store/Store';
import { usePathname } from 'next/navigation';
import { getUser } from '../service/closetApiService';
import { useDispatch } from 'react-redux';
import {
  setUserNickName,
  setUserImg,
} from '../Store/userSlice/userNickNameSlice';

interface UserData {
  nickname: string;
}

export default function Header() {
  const router = useRouter();

  const path = usePathname();

  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');

    const fetchUserData = async () => {
      if (accessToken) {
        try {
          const fetchUser = await getUser();
          // console.log('유저데이터', fetchUser);
          dispatch(setUserNickName({ value: fetchUser.nickname }));
          dispatch(setUserImg({ value: fetchUser.image_path }));
        } catch (error) {
          console.error('유저 데이터를 가져오는 도중 오류 발생', error);
        }
      }
    };
    fetchUserData();
  }, []);

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');
    if (!accessToken) {
      setIsLogin(true);
    }
  }, []);

  return (
    <header className={styles.container}>
      <ul>
        <li>
          <Link href="/">
            <Image
              src="/ogg_Logo.png"
              alt="로고"
              width={75}
              height={48}
              priority
            />
            {/* <img src="logo.png" alt="로고" /> */}
          </Link>
        </li>
      </ul>
    </header>
  );
}
