'use client';

import React, { useState } from 'react';
import '../../styles/hi/hi.scss';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';

const DynamicPostComponent = dynamic(
  () => import('../../components/hi/PostListComponent')
);

const DynamicClosetComponent = dynamic(
  () => import('../../components/hi/ClosetComponent')
);

const ProfileComponent: React.FC = () => {
  const [showPost, setShowPost] = useState(true);
  const [showCloset, setShowCloset] = useState(false);

  const nickName = useSelector((state: any) => state.userData.userNickName);
  const height = useSelector((state: any) => state.user.height);
  const weight = useSelector((state: any) => state.user.weight);

  return (
    <div className="PostListContainer">
      <div className="profileDiv">
        <img src="/example.png" />
        <div className="profileInfo">
          <div className="profileName">{nickName.value}</div>
          <div className="profileSize">
            {height.value} / {weight.value}
          </div>
        </div>
      </div>
      <div className="followBtn">Follow</div>
      <div className="profileBox">
        <div
          onClick={() => {
            setShowPost(true);
            setShowCloset(false);
          }}
        >
          아이콘
        </div>
        <div
          onClick={() => {
            setShowPost(false);
            setShowCloset(true);
          }}
        >
          아이콘
        </div>
      </div>
      {showPost && <DynamicPostComponent />}
      {showCloset && <DynamicClosetComponent />}
    </div>
  );
};

export default ProfileComponent;
