import './Navbar.css'
import logo from '../app-logo.png'
import { Link } from "react-router-dom" 
import DataContext from '../data/DataContext'
import { useContext } from 'react'
import { useLocation } from 'react-router-dom'

const NavigatePage = (props) => {

    console.log('Nested Component-Navigate Page - starting')
    console.log('userId = '+ props.userId)
    console.log('userDetail.UserName = '+ props.userDetail.UserName)
    console.log('location.pathname = '+ props.location)

    const clickLogOut = () => {
        props.setUserId('-')
    }

    if(props.userId === '-') {
        return (
            <div className='NavBar'>
                <Link to="/login">
                    Log-In
                </Link>
            </div>
        )
    } else {
        if (props.location === '/') {
            return (
                <div className='NavBar'>
                    <label>{props.userDetail.UserName}</label>
                    <label> | </label>
                    <Link to="/profile" className='Link'>
                        Profile Page
                    </Link>
                    <label> | </label>
                    <Link to="/login" className='Link' onClick={clickLogOut}>
                        Log-Out
                    </Link>
                </div>
            )
        } else if (props.location === '/profile') {
            return (
                <div className='NavBar'>
                    <label>{props.userDetail.UserName}</label>
                    <label> | </label>
                    <Link to="/" className='Link'>
                        Calculation Page
                    </Link>
                    <label> | </label>
                    <Link to="/login" className='Link' onClick={clickLogOut}>
                        Log-Out
                    </Link>
                </div>
            )
        }
    }
}

function Navbar() {

    console.log("Rendering Component - Navbar")

    const { userId, setUserId, userDetail, setUserDetail } = useContext(DataContext)
    const location = useLocation()
    
    return (
        <>
            <div className="logo">
                <Link to="/">
                    <img src={logo} alt='Logo' width={100} height={100}/>
                </Link>
                <NavigatePage userId={userId} setUserId={setUserId} userDetail={userDetail} setUserDetail={setUserDetail} location={location.pathname}/>
            </div>
        </>
    )
}

export default Navbar