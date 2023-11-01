import './LogIn.css'
import DataContext from '../data/DataContext'
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LogIn() {

    const {setUserId} = useContext(DataContext)
    const navigate = useNavigate()

    const [logInUserId,setLogInUserId] = useState("")
    const [logInPassword,setLogInPassword] = useState("")

    async function apiLogin(data) {
        try {
            await console.log("API-apiLogin - starting")
            await console.log("data - ",data)
            const response = await axios.post('https://go-nutritioncalculator.onrender.com/user/login',data);
            await console.log("response of apiLogin")
            await console.log(response)
            await console.log("API-apiLogin - finished")
            return response.data
        } catch (error) {
            console.log("API-apiLogin - failed")
            console.log(error)
        }
    }

    const inputUserId = (event) => {
        setLogInUserId(event.target.value)
    }

    const inputPassword = (event) => {
        setLogInPassword(event.target.value)
    }

    async function checkLogIn() {
        const response = await apiLogin({UserId:logInUserId,Password:logInPassword})
        await console.log(response)
        if (await response['IsPasswordCorrect'] === true) {
            await setUserId(logInUserId)
            await navigate('/react-nutritioncalculator/profile')
        } else {
            document.getElementById('wrongKey').style.visibility = await "visible"
        }
    }

    const pressEnter = (event) => {
        if(event.key === "Enter") {
            checkLogIn()
        }
    }

    const clickSignUp = () => {
        navigate('/react-nutritioncalculator/signup')
    }

    return (
        <div className='LogIn'>
            <div className='LogInDetail'>
                <label>User Id</label>
                <input type='text' onChange={inputUserId}/>
                <label>Password</label>
                <input type='password' onChange={inputPassword} id='password' onKeyDown={event=>pressEnter(event)}/>
                <label id='wrongKey'>Username or Password is incorrect</label>
                <div className='button1' onClick={()=>checkLogIn()}>Log In</div>
            </div>
            <div id='seperateButton'></div>
            <div className='button2' onClick={()=>clickSignUp()}>Create New Account</div>
        </div>
    )
}

export default LogIn