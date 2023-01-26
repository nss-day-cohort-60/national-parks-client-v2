import { Route, Routes } from 'react-router-dom';
import { NavBar } from './nav/navbar';
import './NationalPark.css';

export const NationalPark = () => {
  return (<Routes>
    <Route path ="*" element ={<>
          < NavBar />
          </>
    } />
  </Routes>)
}
