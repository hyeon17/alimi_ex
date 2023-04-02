import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '@/components/common/Layout';
import AllLocations from '@/pages/AllLocations';
import FavoriteLocations from '@/pages/FavoriteLocations';
import MyLocation from '@/pages/MyLocation';
import NotFound from '@/pages/NotFound';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<MyLocation />} />
          <Route path='/all' element={<AllLocations />} />
          <Route path='/favorite' element={<FavoriteLocations />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
