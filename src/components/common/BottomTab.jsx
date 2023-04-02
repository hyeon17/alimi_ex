import React from 'react';
import '../../styles/BottomTab.scss';
import fullStar from '../../assets/star-full.png';
import allLoc from '../../assets/allloc.png';
import myLoc from '../../assets/myloc.png';
import { useNavigate } from 'react-router-dom';

function BottomTab() {
  const navigate = useNavigate();

  return (
    <nav id='tabs-wrapper'>
      <button className='tabs-item' onClick={() => navigate('/')}>
        <img src={myLoc} width='25' alt='myLoc' />
        <p className='tabs-desc'>내 지역보기</p>
      </button>
      <button className='tabs-item' onClick={() => navigate('all')}>
        <img src={allLoc} width='25' alt='allLoc' />
        <p className='tabs-desc'>전체 시도보기</p>
      </button>
      <button className='tabs-item' onClick={() => navigate('favorite')}>
        <img src={fullStar} width='25' alt='fullStar' />
        <p className='tabs-desc'>즐겨찾기</p>
      </button>
    </nav>
  );
}

export default React.memo(BottomTab);
