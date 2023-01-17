import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Inventory from '../pages/Inventory';

export default function Links() {
  return (
    <>
      <Routes>
        <Route path="/" element={
              <Home />
          } 
        />
        <Route path="/inventory" element={
              <Inventory />
          } 
        />
      </Routes>
    </>
  );
}