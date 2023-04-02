import { createSelector } from '@reduxjs/toolkit';

export const selectDustByStation = createSelector(
  [
    (res) => res.data, // 실행 시 첫번째 인자 -> 세번째 줄의 dusts 에 들어감
    (res, stationName) => stationName,
  ], // 실행 시 두번째 인자 -> 세번째 줄의 stationName 에 들어감
  (dusts, stationName) => dusts?.find((dust) => dust.stationName === stationName),
);

export const selectDustByStations = createSelector([(res) => res.data, (res, stationList) => stationList], (dusts, stationList) =>
  dusts?.filter((dust) => stationList.some((station) => station.sidoName === dust.sidoName && station.stationName === dust.stationName)),
);
