import './LogIn.css'
import DataContext from '../data/DataContext'
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LogIn() {

    const {setUserId,apiGetUserDetail} = useContext(DataContext)
    const navigate = useNavigate()

    const [logInUserId,setLogInUserId] = useState('')
    const [logInPassword,setLogInPassword] = useState('')

    const inputUserId = (event) => {
        setLogInUserId(event.target.value)
    }

    const inputPassword = (event) => {
        setLogInPassword(event.target.value)
    }

    async function checkLogIn() {
        const response = await apiGetUserDetail(logInUserId)
        if (await response['Password'] === logInPassword) {
            await setUserId(logInUserId)
            await navigate('/react-nutritioncalculator/profile')
        } else {
            document.getElementById('wrongKey').style.visibility = await "visible"
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
                <input type='password' onChange={inputPassword} id='password'/>
                <label id='wrongKey'>Username or Password is incorrect</label>
                <div className='button1' onClick={()=>checkLogIn()}>Log In</div>
            </div>
            <div id='seperateButton'></div>
            <div className='button2' onClick={()=>clickSignUp()}>Create New Account</div>
        </div>
    )
}

export default LogIn