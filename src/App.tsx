import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './views/Home/Home';
import AddEquipment from './views/AddEquipment/AddEquipment';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Home}/>
        <Route path='/create' Component={AddEquipment}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
