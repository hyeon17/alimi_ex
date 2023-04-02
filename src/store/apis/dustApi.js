import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import qs from 'qs';

const args = {
  serviceKey: import.meta.env.VITE_SERVICE_KEY,
  returnType: 'json',
  numOfRows: '100',
  pageNo: '1',
  ver: '1.0',
};

export const dustApi = createApi({
  reducerPath: 'dustApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    paramsSerializer: (params) => qs.stringify(params, { encode: false }),
  }),
  endpoints: (builder) => ({
    getDusts: builder.query({
      query: (sidoName) => {
        return {
          url: '',
          params: { ...args, sidoName },
        };
      },
      transformResponse: (responseData) => {
        // 요청을 보냈다면 {response: {body: {items: [{},{},...]}}} 형태로 응답이 온다
        // const {data} = useGetDustsQuery()
        // data.map()
        return responseData['response']['body']['items'];
      },
    }),
    // 한 쿼리에서 여러 번 요청을 보내고자 할 떄 아래와 같이 사용할 수 있다
    getMultipleDusts: builder.query({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        // 즐겨찾기를 서울, 부산 했다면 각각 요청을 보내고 응답을 받아와야 함
        //  요청을 여러번 보내는 api를 만들어 놓겠다!
        // ['서울','부산','대전'] 매개변수가 넘어왔다
        // 이 배열에 대해서 reduce 함수를 통해서 요청을 보내고, 응답을 쌓는 그런 역할
        // reduce가 쌓는 역할을 하는 함수임
        // getMultipleDusts 쿼리가 리턴하는 data -> 서울, 부산, 대전의 모든 구의 미세먼지 정보
        // 서울, 부산, 대전의 모든 구의 미세먼지 정보 중에서 유저가 즐겨찾기한 것만 필터링

        // sidoName이 ['서울','부산']
        // 서울로 fetch하고, 그결과를 result 에다가 넣고
        // 부산으로 fetch하고, 그결과를 result에다가 쌓고
        const result = await _arg.reduce(async (promise, sidoName) => {
          const argResult = await fetchWithBQ({
            url: '',
            params: { ...args, sidoName: sidoName },
          });
          // 에러처리
          if (argResult.error) return { error: argResult.error };
          // 앞서 처리된 Promise data 받아오기
          const promiseData = await promise.then();
          return Promise.resolve([...promiseData, ...argResult.data['response']['body']['items']]);
        }, Promise.resolve([]));
        return result.error ? { error: result.error } : { data: result };
      },
    }),
  }),
});

export const { useGetDustsQuery, useGetMultipleDustsQuery } = dustApi;
