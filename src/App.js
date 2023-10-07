import './App.css';
import Home from './components/Home'
import Navbar from './components/Navbar'
import DataContext from './data/DataContext';
import { useState } from 'react';

function App() {
  const [userId,setUserId] = useState('-')
  return (
    <>
      <DataContext.Provider value={{userId,setUserId}}>
        <Navbar/>
        <Home/>
      </DataContext.Provider>
    </>
  );
}

export default App;
