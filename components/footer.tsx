'use client';

import styles from '../styles/footer.module.scss';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../Store/Store';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const userId = useSelector((state: RootState) => state.user.userId);

  const path = usePathname();
  console.log(path);

  if (path === '/login') {
    return null;
  } else if (path === '/signup') {
    return null;
  }

  return (
    <div className={styles.container}>
      <ul>
        <li>
          <Link href="/">
            <span className="material-symbols-outlined">forum</span>
          </Link>
        </li>
        <li>
          <Link href="/AIrecommend">
            <span className="material-symbols-outlined">checkroom</span>
          </Link>
        </li>
        <li>
          <Link href={`/closet/${userId}`}>
            <span className="material-symbols-outlined">add_circle</span>
          </Link>
        </li>
        <li>
          <Link href="/coordi">
            <span className="material-symbols-outlined">apparel</span>
          </Link>
        </li>
        <li>
          <Link href="/mypage">
            <span className="material-symbols-outlined">person</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
