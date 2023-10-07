import './Navbar.css'
import logo from '../app-logo.png'
import {Link} from "react-router-dom" 
import DataContext from '../data/DataContext'
import { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

function Navbar() {
    const {userId, setUserId} = useContext(DataContext)
    const location = useLocation()
    // const isLogin =()=>{
    //     if (userId === '-') {
    //         return false
    //     } else {
    //         return true
    //     }
    // }
    // const shortCut =()=>{
    //     if ( location == '/') {
    //         if (isLogin) {
    //             <div className='ShortCut'>
    //                 <label></label>
    //             </div>
    //         }
    //     }
    // }
    // async function getMenu() {
    //     return await axios.get('http://localhost:3030/menu/')
    // }
    // const [acct] = Promise.all([getMenu()]);
    async function getUser() {
        try {
          const response = await axios.get('http://localhost:3030/menu/');
          console.log(response);
          console.log(response.data);
          return response
        } catch (error) {
          console.error(error);
        }
      }
    const re = getUser().data
    console.log(location.pathname)
    return (
        <>
            <div className="logo">
                <Link to="/">
                    <img src={logo} alt='Logo' width={100} height={100}/>
                </Link>
            </div>
        </>
    )
}

export default Navbar