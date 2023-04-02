import React from 'react';
import { Card, Loading, Menu } from '../components';
import { useGetDustsQuery } from '../store/apis/dustApi';
import { selectDustByStation } from '../store/slices/dustSlice';
import { useLocationSlice } from '../store/slices/locationSlice';

function MyLocation() {
  const { myLocation, dispatch } = useLocationSlice();
  const {
    data: dust,
    isLoading,
    isError,
    isFetching,
  } = useGetDustsQuery(myLocation.sidoName, {
    // 굳이 다시 data 의 내용을 꺼내서 set 하지 않아도,
    // 아래 코드를 통해서 바로 특정 filter 결과를 data 에 할당할 수 있습니다.
    selectFromResult: (result) => ({
      ...result,
      data: selectDustByStation(result, myLocation.stationName),
    }),
  });

  if (isLoading || isFetching) {
    return <Loading />;
  }
  if (isError || !dust) {
    return <div>오류 발생</div>;
  }
  return (
    <>
      <Menu location={myLocation} isMine={true} dispatch={dispatch} />
      <Card dust={dust} dispatch={dispatch} isMine={true} />
    </>
  );
}

export default MyLocation;
