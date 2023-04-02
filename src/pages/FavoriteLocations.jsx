import React from 'react';
import { Card, Loading } from '../components';
import { useGetMultipleDustsQuery } from '../store/apis/dustApi';
import { selectDustByStations } from '../store/slices/dustSlice';
import { useFavoriteSlice } from '../store/slices/favoriteSlice';

function FavoriteLocations() {
  // 지금 즐겨찾기에 저장해야 하는건 sidoName, stationName -> 얘네를 필터링 하는 방식
  //  {sidoName: '서울', stationName: '강남구'}가 5개 있다면
  // 서울로 여러번 요청을 보내는 것이 아닌 정확이 어떤 sidoName이 있는지 확인하고 sidoName이 '서울' 만 있다면 거기로만 요청
  // 사실은 api가 stationName 마다 key값을 제공만 하고 있기 때문에
  // 백엔드가 없어서 생기는 비효율성
  // 백엔드가 있으면 -> 그냥 백엔드에서 즐겨찾기 한 애들만 미세먼지 정보만 보내주면 됨
  const { favorite, dispatch, favoriteSidos } = useFavoriteSlice();
  const {
    data: dusts,
    isLoading,
    isError,
  } = useGetMultipleDustsQuery(favoriteSidos, {
    selectFromResult: (result) => ({
      ...result,
      data: selectDustByStations(result, favorite),
    }),
  });

  if (isLoading) {
    return <Loading />;
  }
  if (isError || !dusts) {
    return <div>오류 발생</div>;
  }
  return (
    <>
      {dusts.map((dust) => (
        <Card dust={dust} favorite={favorite} dispatch={dispatch} />
      ))}
    </>
  );
}

export default FavoriteLocations;
