import React, { useCallback, useMemo } from 'react';
import '../../styles/Card.scss';
import emptyStar from '../../assets/star-line.png';
import fullStar from '../../assets/star-full.png';
import gradeData from '../../constants/gradeData.json';
import { addFavoriteItem, deleteFavoriteItem } from '../../store/slices/favoriteSlice';

function Card({ dust, favorite, dispatch, isMine }) {
  const isFavorite = useMemo(
    () => favorite?.some((element) => element.sidoName === dust.sidoName && element.stationName === dust.stationName),
    [favorite, dust],
  );
  const onStarClick = useCallback(() => {
    isFavorite
      ? dispatch(deleteFavoriteItem({ sidoName: dust.sidoName, stationName: dust.stationName }))
      : dispatch(addFavoriteItem({ sidoName: dust.sidoName, stationName: dust.stationName }));
  }, [isFavorite, dust]);

  return (
    <div className='card-item' style={{ backgroundColor: gradeData[dust.pm10Grade].color }}>
      <div className='header-wrapper'>
        <p className='header-content'>
          <span className='station-text'>{dust.stationName}</span>
          <span className='sido-text'>{dust.sidoName}</span>
        </p>
        {!isMine && (
          <button className='fav-star' onClick={onStarClick}>
            {isFavorite ? (
              <img src={fullStar} className='to-white' width='25' alt='fullStar' />
            ) : (
              <img src={emptyStar} className='to-white' width='25' alt='emptyStar' />
            )}
          </button>
        )}
      </div>
      <div className='info-wrapper'>
        <p className='grade-text' style={{ color: gradeData[dust.pm10Grade].color }}>
          {gradeData[dust.pm10Grade].text}
        </p>
        <p className='value-text'>미세먼지 수치 : {dust.pm10Value}</p>
        <p className='time-text'>({dust.dataTime} 기준)</p>
      </div>
    </div>
  );
}

export default Card;
