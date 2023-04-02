import React from 'react';
import { Card, Loading, Menu } from '../components';
import { useGetDustsQuery } from '../store/apis/dustApi';
import { useFavoriteSlice } from '../store/slices/favoriteSlice';
import { useLocationSlice } from '../store/slices/locationSlice';

function AllLocations() {
  const { favorite, dispatch } = useFavoriteSlice();
  const { allLocation } = useLocationSlice();
  const { data: dusts, isLoading, isError, isFetching } = useGetDustsQuery(allLocation.sidoName);

  if (isLoading || isFetching) {
    return <Loading />;
  }
  if (isError || !dusts) {
    return <div>오류 발생</div>;
  }
  return (
    <>
      <Menu location={allLocation} dispatch={dispatch} />
      {dusts.map((dust) => (
        <Card dust={dust} favorite={favorite} dispatch={dispatch} />
      ))}
    </>
  );
}

export default AllLocations;
