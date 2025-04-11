import React from 'react'
import { Route, Routes } from 'react-router-dom';

import GuestLayout from '../Layouts/GuestLayout';
import LudoBoard from '../Ludo/LudoBoard';
import Game from '../Ludo/Game';



const Router = () => {
  return (

    <Routes>
      <Route path='/' element={<GuestLayout/>}>
        <Route index element={<Game/>} />
        <Route path='/ludo' element={<LudoBoard/>} />


    

      </Route>
     


    </Routes>

  );
};

export default Router