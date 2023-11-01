import './App.css';
import Navbar from './components/Navbar'
import Home from './components/Home'
import Profile from './components/Profile'
import LogIn from './components/LogIn'
import SignUp from './components/SignUp'
import DataContext from './data/DataContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';

function App() {

  console.log("Rendering Component - App")

  const [userId,setUserId] = useState('-')
  const [userDetail,setUserDetail] = useState([])
  const [menues,setMenues] = useState([])

  async function apiGetUserDetail(userId) {
    try {
      await console.log('Api-apiGetUserDetail - starting')
      const response = await axios.get('https://go-nutritioncalculator.onrender.com/user/user_id/'+userId);
      await console.log('response.data of apiGetUserDetail')
      await console.log(response.data)
      await console.log('Api-apiGetUserDetail - finished')
      return response.data
    } catch (error) {
      console.log('API-apiGetUserDetail - failed')
      console.error(error);
    }
  }

  async function apiGetMenues() {
    try {
        await console.log('API-apiGetMenues - starting')
        const response = await axios.get('https://go-nutritioncalculator.onrender.com/menu/');
        await console.log('response.data of apiGetMenues')
        await console.log(response.data)
        await setMenues(response.data)
        console.log('API-apiGetMenues - finished')
    } catch(error) {
        console.log('API-apiGetMenues - failed')
        console.log(error)
    }
  }

  async function setApiUserDetail(userId) {
    const response = await apiGetUserDetail(userId)
    await setUserDetail(response)
  }

  useEffect(()=>{
    apiGetMenues()
    setApiUserDetail(userId)
  },[])

  useEffect(()=>{
    setApiUserDetail(userId)
  },[userId])

  return (
    <>
      <DataContext.Provider value={{userId,setUserId,userDetail,apiGetUserDetail,setApiUserDetail,menues,apiGetMenues}}>
        <Navbar/>
        <Routes>
          <Route path='/react-nutritioncalculator' element={<Home/>}/>
          <Route path='/react-nutritioncalculator/profile' element={<Profile/>}/>
          <Route path='/react-nutritioncalculator/login' element={<LogIn/>}/>
          <Route path='/react-nutritioncalculator/signup' element={<SignUp/>}/>
        </Routes>
      </DataContext.Provider>
    </>
  );
}

export default App;
