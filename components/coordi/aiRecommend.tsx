'use client';

import { useEffect, useState } from 'react';
import {
  getUserClothes,
  aiRecommendPost,
} from '../../service/closetApiService';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import styles from '../../styles/closet/aiRecommend.module.scss';
import Link from 'next/link';

interface clothes {
  brand: string;
  color: string | null;
  createdAt: string;
  id: number;
  imagePath: string;
  liked: boolean;
  majorCategory: string;
  middleCategory: string;
  nickname: string;
  price: number;
  productName: string;
  score: number;
  season: string;
  size: string;
  style: string;
  thickness: string;
  user_id: number;
  userid: string;
}

export default function AiRecommend() {
  const router = useRouter();

  // 유저 옷 정보 저장
  const [isUserData, setIsUserData] = useState<clothes[]>([]);
  // Ai 전달용 데이터
  const [isAiData, setIsAiData] = useState('');
  const [isRecommend, setIsRecommend] = useState('');

  // ai추천 옷
  const [isOuter, setIsOuter] = useState([]);
  const [isTop, setIsTop] = useState([]);
  const [isPants, setIsPants] = useState([]);
  const [isShoes, setIsShoes] = useState([]);
  const [isAccessory, setIsAccessory] = useState([]);

  // 날씨 데이터 받아오기
  const weatherData = useSelector((state: any) => ({
    temp: state.aiRecommend.weather.temp,
    weather: state.aiRecommend.weather.weather,
  }));

  const transformedData: any = {
    weather: [weatherData.temp, weatherData.weather],
  };

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 닫힌 상태
  const [weatherModal, setWeatherModal] = useState(false);

  const handleModalConfirm = () => {
    setIsModalOpen(false);
    router.push('/login');
  };

  useEffect(() => {
    // 날씨 정보가 없으면 뒤로가기 (너무 빨리 접속 시 날씨 데이터를 못불러옴)

    const accessToken = sessionStorage.getItem('accessToken');

    if (!accessToken) {
      setIsModalOpen(true); // 모달 열기
    } else if (weatherData.weather === '') {
      setWeatherModal(true);
    }

    const fetchData = async () => {
      try {
        // 유저 옷 정보 불러오기
        const userClothData = await getUserClothes();
        setIsUserData(userClothData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const groupByData = (isUserData: clothes[]) => {
      return isUserData.reduce((groups: any, item: clothes) => {
        let category: string;
        switch (item.majorCategory) {
          case 'Top':
          case 'Outer':
          case 'Shoes':
            category = item.majorCategory;
            break;
          case 'Pants':
          case 'Skirt':
          case 'Onepiece':
            category = 'Bottom';
            break;
          case 'Accessory':
            category = 'Hat';
            break;
        }
        if (!groups[category]) {
          groups[category] = [];
        }
        groups[category].push([item.productName, item.middleCategory]);
        return groups;
      }, {});
    };
    const newGroup = groupByData(isUserData);
    // console.log(newGroup);
    for (const category in newGroup) {
      transformedData[category] = newGroup[category];
    }
    setIsAiData(transformedData);
  }, [isUserData]);

  // ai 추천 새로고침
  const aiRecommendBtn = async () => {
    const button = document.querySelector(
      `.${styles.refreshBtn}`
    ) as HTMLButtonElement;
    const disabledClassName = `${styles.refreshBtnDisabled}`;

    if (!button.classList.contains(disabledClassName)) {
      button.classList.add(disabledClassName);

      try {
        // console.log(isAiData);
        const userClothData = await aiRecommendPost(isAiData);
        setIsRecommend(userClothData);
        // console.log(userClothData);
        // console.log(userClothData[0]);

        // 데이터를 majorCategory를 기준으로 그룹화
        const groupByMajorCategory = (isRecommend) => {
          const groups = {};
          isRecommend.forEach((item) => {
            const { majorCategory } = item;
            if (!groups[majorCategory]) {
              groups[majorCategory] = [];
            }
            groups[majorCategory].push(item);
          });
          return groups;
        };
        const groupedData = groupByMajorCategory(userClothData);

        setIsAccessory(groupedData['Accessory']);
        setIsTop(groupedData['Top']);
        setIsPants(groupedData['Pants']);
        setIsOuter(groupedData['Outer']);
        setIsShoes(groupedData['Shoes']);

        // console.log(isAccessory[0]);
        // console.log(isTop[0]);
        // console.log(isOuter[0]);
        // console.log(isPants[0]);
        // console.log(isShoes[0]);

        // console.log(isAccessory);
        // console.log(isTop);
        // console.log(isOuter);
        // console.log(isPants);
        // console.log(isShoes);

        // console.log(isAccessory[0].imagePath);
        // console.log(isTop[0].imagePath);
        // console.log(isOuter[0].imagePath);
        // console.log(isPants[0].imagePath);
        // console.log(isShoes[0].imagePath);
      } catch (error) {
        console.log(error);
      }

      setTimeout(() => {
        button.classList.remove(disabledClassName); // 비활성화 클래스 제거
      }, 5000);
    }
  };

  //   console.log(isAccessory[0]);
  //   console.log(isTop[0]);
  //   console.log(isOuter[0]);
  //   console.log(isPants[0]);
  //   console.log(isShoes[0]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.refreshBox}>
          <button onClick={aiRecommendBtn} className={styles.refreshBtn}>
            <span className="material-symbols-outlined">refresh</span>
          </button>
        </div>
        <div className={styles.mainContainer}>
          {/* <span className={styles.descText}>
            버튼을 눌러 AI 추천 코디를 받아보세요!
          </span> */}
          <div className={styles.clothesInfo}>
            {isOuter && isOuter.length > 0 && isOuter[0].id ? (
              <Link
                href={
                  isOuter && isOuter.length > 0 && isOuter[0].id
                    ? `/clothes/${isOuter[0].id}`
                    : ''
                }
              >
                {isOuter &&
                  isOuter.length > 0 &&
                  isOuter[0].imagePath !== null && (
                    <>
                      <div className={styles.imgBox}>
                        <img src={isOuter[0].imagePath} alt="" />
                      </div>
                      <div className={styles.descBox}>
                        <span className={styles.brand}>{isOuter[0].brand}</span>
                        <span className={styles.productName}>
                          {isOuter[0].productName}
                        </span>
                        <span className={styles.price}>{isOuter[0].price}</span>
                      </div>
                    </>
                  )}
              </Link>
            ) : (
              <span className={styles.noData}> 추천 옷 정보가 없습니다 </span>
            )}
          </div>
          <div className={styles.clothesInfo}>
            {isTop && isTop.length > 0 && isTop[0].id ? (
              <Link
                href={
                  isTop && isTop.length > 0 && isTop[0].id
                    ? `/clothes/${isTop[0].id}`
                    : ''
                }
              >
                {isTop && isTop.length > 0 && isTop[0].imagePath !== null && (
                  <>
                    <div className={styles.imgBox}>
                      <img src={isTop[0].imagePath} alt="" />
                    </div>
                    <div className={styles.descBox}>
                      <span className={styles.brand}>{isTop[0].brand}</span>
                      <span className={styles.productName}>
                        {isTop[0].productName}
                      </span>
                      <span className={styles.price}>{isTop[0].price}</span>
                    </div>
                  </>
                )}
              </Link>
            ) : (
              <span className={styles.noData}> 추천 옷 정보가 없습니다 </span>
            )}
          </div>
          <div className={styles.clothesInfo}>
            {isPants && isPants.length > 0 && isPants[0].id ? (
              <Link
                href={
                  isPants && isPants.length > 0 && isPants[0].id
                    ? `/clothes/${isPants[0].id}`
                    : ''
                }
              >
                {isPants &&
                  isPants.length > 0 &&
                  isPants[0].imagePath !== null && (
                    <>
                      <div className={styles.imgBox}>
                        <img src={isPants[0].imagePath} alt="" />
                      </div>
                      <div className={styles.descBox}>
                        <span className={styles.brand}>{isPants[0].brand}</span>
                        <span className={styles.productName}>
                          {isPants[0].productName}
                        </span>
                        <span className={styles.price}>{isPants[0].price}</span>
                      </div>
                    </>
                  )}
              </Link>
            ) : (
              <span className={styles.noData}> 추천 옷 정보가 없습니다 </span>
            )}
          </div>
          <div className={styles.clothesInfo}>
            {isShoes && isShoes.length > 0 && isShoes[0].id ? (
              <Link
                href={
                  isShoes && isShoes.length > 0 && isShoes[0].id
                    ? `/clothes/${isShoes[0].id}`
                    : ''
                }
              >
                {isShoes &&
                  isShoes.length > 0 &&
                  isShoes[0].imagePath !== null && (
                    <>
                      <div className={styles.imgBox}>
                        <img src={isShoes[0].imagePath} alt="" />
                      </div>
                      <div className={styles.descBox}>
                        <span className={styles.brand}>{isShoes[0].brand}</span>
                        <span className={styles.productName}>
                          {isShoes[0].productName}
                        </span>
                        <span className={styles.price}>{isShoes[0].price}</span>
                      </div>
                    </>
                  )}
              </Link>
            ) : (
              <span className={styles.noData}> 추천 옷 정보가 없습니다 </span>
            )}
          </div>
          <div className={styles.clothesInfo}>
            {isAccessory && isAccessory.length > 0 && isAccessory[0].id ? (
              <Link
                href={
                  isAccessory && isAccessory.length > 0 && isAccessory[0].id
                    ? `/clothes/${isAccessory[0].id}`
                    : ''
                }
              >
                {isAccessory &&
                  isAccessory.length > 0 &&
                  isAccessory[0].imagePath !== null && (
                    <>
                      <div className={styles.imgBox}>
                        <img src={isAccessory[0].imagePath} alt="" />
                      </div>
                      <div className={styles.descBox}>
                        <span className={styles.brand}>
                          {isAccessory[0].brand}
                        </span>
                        <span className={styles.productName}>
                          {isAccessory[0].productName}
                        </span>
                        <span className={styles.price}>
                          {isAccessory[0].price}
                        </span>
                      </div>
                    </>
                  )}
              </Link>
            ) : (
              <span className={styles.noData}> 추천 옷 정보가 없습니다 </span>
            )}
          </div>
        </div>
      </div>
      {/* <MoveLoginModal isOpen={isModalOpen} onConfirm={handleModalConfirm} />
      <WeatherCheckModal isOpen={weatherModal} /> */}
    </>
  );
}
