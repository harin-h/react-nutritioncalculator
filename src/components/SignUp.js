import './SignUp.css'
import DataContext from '../data/DataContext'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function SignUp() {

    const {apiGetUserDetail} = useContext(DataContext)
    const navigate = useNavigate()

    const [userId,setUserId] = useState('-')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [username,setUsername] = useState('')

    const inputUserId = (event) => {
        setUserId(event.target.value)
        document.getElementById('inputUserId').classList.remove('error')
    }

    const inputPassword = (event) => {
        setPassword(event.target.value)
        document.getElementById('inputPassword').classList.remove('error')
    }

    const inputConfirmPassword = (event) => {
        setConfirmPassword(event.target.value)
        document.getElementById('inputConfirmPassword').classList.remove('error')
    }

    const inputUsername = (event) => {
        setUsername(event.target.value)
        document.getElementById('inputUsername').classList.remove('error')
    }

    async function apiGetUserByUsername(username) {
        try {
            await console.log("API-apiGetUserByUsername - starting")
            const response = await axios.get("https://go-nutritioncalculator.onrender.com/user/user_name/"+username);
            await console.log("response of apiGetUserByUsername")
            await console.log(response.data)
            await console.log("API-apiGetUserByUsername - finished")
            return response.data
        } catch (error) {
            console.log("API-apiGetUserByUsername - failed")
            console.log(error)
        }
    }

    async function clickNextStep() {
        if (document.getElementById('userId').style.color === 'red') {
            document.getElementById('inputUserId').focus()
            document.getElementById('inputUserId').classList.add('error')
        } else if (document.getElementById('password').style.color === 'red') {
            document.getElementById('inputPassword').focus()
            document.getElementById('inputPassword').classList.add('error')
        } else if (document.getElementById('confirmPassword').style.color === 'red') {
            document.getElementById('inputConfirmPassword').focus()
            document.getElementById('inputConfirmPassword').classList.add('error')
        } else if (document.getElementById('username').style.color === 'red') {
            document.getElementById('inputUsername').focus()
            document.getElementById('inputUsername').classList.add('error')
        } else {
            const responseUserId = await apiGetUserDetail(userId)
            await console.log(responseUserId)
            const responseUsername = await apiGetUserByUsername(username)
            await console.log(responseUsername)
            if(await responseUserId['UserId'] !== '') {
                document.getElementById('alert').innerHTML = "user id is used already"
                document.getElementById('alert').style.visibility = "visible"
                setUserId('-')
                document.getElementById('inputUserId').focus()
                document.getElementById('inputUserId').classList.add('error')
            } else if (await responseUsername['UserId'] !== '') {
                document.getElementById('alert').innerHTML = "username is used already"
                document.getElementById('alert').style.visibility = "visible"
                setUsername('-')
                document.getElementById('inputUsername').focus()
                document.getElementById('inputUsername').classList.add('error')
            } else {
                document.getElementById('FirstPage').style.visibility = "hidden"
                document.getElementById('FirstPage').style['pointer-events'] = "none"
                document.getElementById('SecondPage').style.visibility = "visible"
                document.getElementById('SecondPage').style['pointer-events'] = "auto"
            }
        }
    }

    const [weight,setWeight] = useState()
    const [protein,setProtein] = useState()
    const [fat,setFat] = useState()
    const [carb,setCarb] = useState()

    const inputWeight = (event) => {
        setWeight(parseFloat(event.target.value))
        document.getElementById('weight').classList.remove('error')
    }

    const inputProtein = (event) => {
        setProtein(parseFloat(event.target.value))
    }

    const inputFat = (event) => {
        setFat(parseFloat(event.target.value))
    }

    const inputCarb = (event) => {
        setCarb(parseFloat(event.target.value))
    }

    const clickApplySuggestion = (type) => {
        if (type === 0) {
            document.getElementById('weight').focus()
            document.getElementById('weight').classList.add('error')
        } else {
            let tempProtein
            let tempFat
            let tempCarb
            if (type === 1) {
                tempProtein = weight*2
                tempFat = weight
                tempCarb = weight*3
            } else if (type === 2) {
                tempProtein = 50
                tempFat = weight
                tempCarb = 130
            } else {
                tempProtein = weight*2
                tempFat = weight
                tempCarb = 130
            }
            setProtein(tempProtein)
            setFat(tempFat)
            setCarb(tempCarb)
            document.getElementById('protein').value = tempProtein
            document.getElementById('fat').value = tempFat
            document.getElementById('carb').value = tempCarb
        }
    }

    async function clickCompleteSignUp() {
        try {
            await console.log("API-apiCreateUser - starting")
            const response = await axios.post("https://go-nutritioncalculator.onrender.com/user/",{'UserId':userId,'Password':password,'UserName':username,'Weight':weight,'Protein':protein,'Fat':fat,'Carb':carb});
            await console.log("response of apiCreateUser")
            await console.log(response)
            await console.log("API-apiCreateUser - finished")
            document.getElementById('SecondPage').style.visibility = await "hidden"
            document.getElementById('SecondPage').style['pointer-events'] = await "none"
            document.getElementById('ThirdPage').style.visibility = await "visible"
            document.getElementById('ThirdPage').style['pointer-events'] = await "auto"
        } catch (error) {
            console.log("API-apiCreateUser - failed")
            console.log(error)
        }
    }

    const clickLogIn = () => {
        navigate('/react-nutritioncalculator/login')
    }

    return (
        <div className='SignUp'>
            <div className='FirstPage' id='FirstPage'>
                <label>User Id</label>  
                <input type='text' id='inputUserId' onChange={inputUserId}/>
                <label className='checking' id='userId' style={{'color':(userId.length>=6 && RegExp('^[0-9a-zA-Z]+$').test(userId))?'green':'red'}}>{(userId.length>=6 && RegExp('^[0-9a-zA-Z]+$').test(userId))?'✓':'✗'} user id can contain only alphabet and number and more than 5 letters</label>
                <label>Password</label>
                <input type='password' id='inputPassword' onChange={inputPassword}/>
                <label className='checking' id='password' style={{'color':(password.length>=6 && RegExp('^[0-9a-zA-Z]+$').test(password))?'green':'red'}}>{(password.length>=6 && RegExp('^[0-9a-zA-Z]+$').test(password))?'✓':'✗'} password can contain only alphabet and number and more than 5 letters</label>
                <label>Confirm Password</label>
                <input type='password' id='inputConfirmPassword' onChange={inputConfirmPassword}/>
                <label className='checking' id='confirmPassword' style={{'color':(confirmPassword.length>=6 && RegExp('^[0-9a-zA-Z]+$').test(confirmPassword) && password === confirmPassword)?'green':'red'}}>{(confirmPassword.length>=6 && RegExp('^[0-9a-zA-Z]+$').test(confirmPassword) && password === confirmPassword)?'✓':'✗'}</label>
                <label>Username</label>
                <input type='text' id='inputUsername' onChange={inputUsername}/>
                <label className='checking' id='username' style={{'color':(username.length>=6 && RegExp('^[0-9a-zA-Z]+$').test(username))?'green':'red'}}>{(username.length>=6 && RegExp('^[0-9a-zA-Z]+$').test(username))?'✓':'✗'} password can contain only alphabet and number and more than 5 letters</label>
                <label className='alert' id='alert'>This user id is already used</label>
                <div className='button' onClick={()=>clickNextStep()}>Next Step</div>
            </div>
            <div className='SecondPage' id='SecondPage'>
                <label>Step: set default fields to help you conveniencing to play our calculator (not strict to fill)</label>
                <div className='Field'>
                    <div className='minorField'>
                        <label>Weight</label>
                        <input type='number' id='weight' onChange={inputWeight}/>
                        <label>kg.</label>
                    </div>
                    <div className='minorField'>
                        <label>Protein</label>
                        <input type='number' id='protein' onChange={inputProtein}/>
                        <label>g.</label>
                    </div>
                    <div className='minorField'>
                        <label>Fat</label>
                        <input type='number' id='fat' onChange={inputFat}/>
                        <label>g.</label>
                    </div>
                    <div className='minorField'>
                        <label>Carb</label>
                        <input type='number' id='carb' onChange={inputCarb}/>
                        <label>g.</label>
                    </div>
                </div>
                <div className='Suggestion'>
                    <label className='labelSuggestion'>Suggestion (depend on weight)</label>
                    {weight>0
                    ?
                    <div className='outer'>
                        <div className='inner'>
                            <label>1. Build Muscle</label>
                            <label>Protein : {weight*2 + ' g.'}</label>
                            <label>Fat : {weight + ' g.'}</label>
                            <label>Carb : {weight*3 + ' g.'}</label>
                            <div className='button' onClick={()=>clickApplySuggestion(1)}>Apply</div>
                        </div>
                        <div className='inner'>
                            <label>2. Healthy Living</label>
                            <label>Protein : 50 g.</label>
                            <label>Fat : {weight + ' g.'}</label>
                            <label>Carb : 130 g.</label>
                            <div className='button' onClick={()=>clickApplySuggestion(2)}>Apply</div>
                        </div>
                        <div className='inner'>
                            <label>3. Fat Loss</label>
                            <label>Protein : {weight*2 + ' g.'}</label>
                            <label>Fat : {weight + ' g.'}</label>
                            <label>Carb : 130 g.</label>
                            <div className='button' onClick={()=>clickApplySuggestion(3)}>Apply</div>
                        </div>
                    </div>    
                    :<div className='outer'>
                        <div className='inner'>
                            <label>Need to fill weight</label>
                            <div className='button' onClick={()=>clickApplySuggestion(0)}>Go!</div>
                        </div>
                    </div>}
                </div>
                <div className='button' onClick={()=>clickCompleteSignUp()}>Complete Sign Up</div>
            </div>
            <div className='ThirdPage' id='ThirdPage'>
                <label>Thank You For Joining Our Website</label>
                <div className='button' onClick={()=>clickLogIn()}>Let's Log In</div>
            </div>
        </div>
    )
}

export default SignUp