import './Profile.css' 
import DataContext from '../data/DataContext'
import { useContext, useState } from 'react';
import axios from 'axios';

function Profile() {

    console.log("Rendering Component - Profile")

    const {userId, userDetail, setApiUserDetail, menues, apiGetMenues} = useContext(DataContext)

    const [newUserName,setNewUserName] = useState('')
    const [newWeight,setNewWeight] = useState()
    const [newProtein,setNewProtein] = useState()
    const [newFat,setNewFat] = useState()
    const [newCarb,setNewCarb] = useState()
    const [newMenuName,setNewMenuName] = useState('')
    const [newMenuProtein,setNewMenuProtein] = useState()
    const [newMenuFat,setNewMenuFat] = useState()
    const [newMenuCarb,setNewMenuCarb] = useState()

    async function apiGetUserByUsername() {
        try {
            await console.log("API-apiGetUserByUsername - starting")
            const response = await axios.get("https://go-nutritioncalculator.onrender.com/user/user_name/"+newUserName);
            await console.log("response of apiGetUserByUsername")
            await console.log(response.data)
            await console.log("API-apiGetUserByUsername - finished")
            return response.data
        } catch (error) {
            console.log("API-apiGetUserByUsername - failed")
            console.log(error)
        }
    }

    async function apiUpdateUserDetail(UpdateUserDetail) {
        try {
            await console.log("API-apiUpdateUserDetail - starting")
            const response = await axios.put("https://go-nutritioncalculator.onrender.com/user/goal/"+userId,UpdateUserDetail);
            await console.log("response of apiUpdateUserDetail")
            await console.log(response)
            console.log("API-apiUpdateUserDetail - finished")
        } catch (error) {
            console.log("API-apiUpdateUserDetail - failed")
            console.log(error)
        }
    }

    async function apiDeleteMenu(menuId) {
        try {
            await console.log("API-apiDeleteMenu - starting")
            const response = await axios.delete("https://go-nutritioncalculator.onrender.com/menu/"+menuId);
            await console.log("response of apiDeleteMenu")
            await console.log(response)
            console.log("API-apiDeleteMenu - finished")
        } catch (error) {
            console.log("API-apiDeleteMenu - failed")
            console.log(error)
        }
    }

    async function apiCreateMenu(menuDetail) {
        try {
            await console.log("API-apiCreateMenu - starting")
            const response = await axios.post("https://go-nutritioncalculator.onrender.com/menu/",menuDetail);
            await console.log("response of apiCreateMenu")
            await console.log(response)
            console.log("API-apiCreateMenu - finished")
        } catch (error) {
            console.log("API-apiCreateMenu - failed")
            console.log(error)
        }
    }

    const inputNewUserName = (event) => {
        setNewUserName(event.target.value)
        document.getElementById('newUserName').classList.remove('error')
    }

    const inputNewWeight = (event) => {
        setNewWeight(event.target.value)
    }

    const inputNewProtein = (event) => {
        setNewProtein(event.target.value)
    }

    const inputNewFat = (event) => {
        setNewFat(event.target.value)
    }

    const inputNewCarb = (event) => {
        setNewCarb(event.target.value)
    }

    async function clickSubmitNewDetail() {
        let tempDetail = {}
        if (newWeight >= 0) {
            tempDetail['Weight'] = parseInt(newWeight)
        }
        if (newProtein >= 0) {
            tempDetail['Protein'] = parseInt(newProtein)
        }
        if (newFat >= 0) {
            tempDetail['Fat'] = parseInt(newFat)
        }
        if (newCarb >= 0) {
            tempDetail['Carb'] = parseInt(newCarb)
        }
        if (newUserName !== '') {
            if (!RegExp('^[0-9a-zA-Z]+$').test(newUserName) || newUserName.length <= 5) {
                document.getElementById('alert').innerHTML = 'username can contain only alphabet and number and more than 5 letters'
                document.getElementById('alert').style.visibility = 'visible'
                document.getElementById('alert').style.pointerEvents = 'auto'
                document.getElementById('newUserName').focus()
                document.getElementById('newUserName').classList.add('error')
            } else if ((await apiGetUserByUsername()).UserId === '') {
                tempDetail['UserName'] = newUserName
                await apiUpdateUserDetail(tempDetail)
                await setApiUserDetail(userId)
                await apiGetMenues()
                await setNewUserName('')
                await setNewWeight()
                await setNewProtein()
                await setNewFat()
                await setNewCarb()
                document.getElementById('alert').style.visibility = await 'hidden'
                document.getElementById('alert').style.pointerEvents = await 'none'
                document.getElementById('newUserName').value = await ''
                document.getElementById('newWeight').value = await ''
                document.getElementById('newProtein').value = await ''
                document.getElementById('newFat').value = await ''
                document.getElementById('newCarb').value = await ''
            } else {

                document.getElementById('alert').innerHTML = 'this username is used already'
                document.getElementById('alert').style.visibility = 'visible'
                document.getElementById('alert').style.pointerEvents = 'auto'
                document.getElementById('newUserName').focus()
                document.getElementById('newUserName').classList.add('error')
            }
        } else {
            await apiUpdateUserDetail(tempDetail)
            await setApiUserDetail(userId)
            await apiGetMenues()
            await setNewUserName('')
            await setNewWeight()
            await setNewProtein()
            await setNewFat()
            await setNewCarb()
            document.getElementById('alert').style.visibility = await 'hidden'
            document.getElementById('alert').style.pointerEvents = await 'none'
            document.getElementById('newUserName').value = await ''
            document.getElementById('newWeight').value = await ''
            document.getElementById('newProtein').value = await ''
            document.getElementById('newFat').value = await ''
            document.getElementById('newCarb').value = await ''
        }
    }

    const clickApplySuggestion = (type) => {
        let tempProtein
        let tempFat
        let tempCarb
        if (type === 1) {
            tempProtein = userDetail.Weight*2
            tempFat = userDetail.Weight
            tempCarb = userDetail.Weight*3
        } else if (type === 2) {
            tempProtein = 50
            tempFat = userDetail.Weight
            tempCarb = 130
        } else {
            tempProtein = userDetail.Weight*2
            tempFat = userDetail.Weight
            tempCarb = 130
        }
        setNewProtein(tempProtein)
        setNewFat(tempFat)
        setNewCarb(tempCarb)
        document.getElementById('newProtein').value = tempProtein
        document.getElementById('newFat').value = tempFat
        document.getElementById('newCarb').value = tempCarb
    }

    async function clickDeleteMenu(menuId) {
        await apiDeleteMenu(menuId)
        await apiGetMenues()
    }

    const inputNewMenuName = (event) => {
        setNewMenuName(event.target.value)
    }

    const inputNewMenuProtein = (event) => {
        setNewMenuProtein(parseFloat(event.target.value))
    }

    const inputNewMenuFat = (event) => {
        setNewMenuFat(parseFloat(event.target.value))
    }

    const inputNewMenuCarb = (event) => {
        setNewMenuCarb(parseFloat(event.target.value))
    }

    async function clickCreateMenu() {
        console.log({Name:newMenuName,Protein:newMenuProtein,Fat:newMenuFat,Carb:newMenuCarb,CreatorId:userId,Like:0})
        if (newMenuName !== '' && newMenuProtein >= 0 && newMenuFat >= 0 && newMenuCarb >= 0) {
            await apiCreateMenu({Name:newMenuName,Protein:newMenuProtein,Fat:newMenuFat,Carb:newMenuCarb,CreatorId:userId,Like:0})
            await apiGetMenues()
            await setNewMenuName('')
            await setNewMenuProtein()
            await setNewMenuFat()
            await setNewMenuCarb()
            document.getElementById('newMenuName').value = await ''
            document.getElementById('newMenuProtein').value = await ''
            document.getElementById('newMenuFat').value = await ''
            document.getElementById('newMenuCarb').value = await ''
        }
    }

    return (
            <div className="ProfilePage">
                <div className='Profile'>
                    <header>Profile</header>
                    <div className='ProfileDetail'>
                        <label>Username : {userDetail.UserName}</label>
                        <div className='SetUsername'>
                            <label>Set New Username</label>
                            <input type='text' onChange={inputNewUserName} id='newUserName'></input>
                        </div>
                        <div className='SetWeight'>
                            <label>Weight : {userDetail.Weight + ' kg.'}</label>
                            <input type='number' onChange={inputNewWeight} id='newWeight' placeholder='ss'></input>
                            <label id='setNewWeight'>Set New Weight</label>
                        </div>
                        <div className='SetProtein'>
                            <label>Protein : {userDetail.Protein + ' g.'}</label>
                            <input type='number' onChange={inputNewProtein} id='newProtein' placeholder='ss'></input>
                            <label id='setNewProtein'>Set New Protein</label>
                        </div>
                        <div className='SetFat'>
                            <label>Fat : {userDetail.Fat + ' g.'}</label>
                            <input type='number' onChange={inputNewFat} id='newFat' placeholder='ss'></input>
                            <label id='setNewFat'>Set New Fat</label>
                        </div>
                        <div className='SetCarb'>
                            <label>Carb : {userDetail.Carb + ' g.'}</label>
                            <input type='number' onChange={inputNewCarb} id='newCarb' placeholder='ss'></input>
                            <label id='setNewCarb'>Set New Carb</label>
                        </div>
                        <div className='Suggestion'>
                            <label className='labelSuggestion'>Suggestion (depend on weight)</label>
                            <div className='outer'>
                                <div className='inner'>
                                    <label>1. Build Muscle</label>
                                    <label>Protein : {userDetail.Weight*2 + ' g.'}</label>
                                    <label>Fat : {userDetail.Weight + ' g.'}</label>
                                    <label>Carb : {userDetail.Weight*3 + ' g.'}</label>
                                    <div className='button' onClick={()=>clickApplySuggestion(1)}>Apply</div>
                                </div>
                                <div className='inner'>
                                    <label>2. Healthy Living</label>
                                    <label>Protein : 50 g.</label>
                                    <label>Fat : {userDetail.Weight + ' g.'}</label>
                                    <label>Carb : 130 g.</label>
                                    <div className='button' onClick={()=>clickApplySuggestion(2)}>Apply</div>
                                </div>
                                <div className='inner'>
                                    <label>3. Fat Loss</label>
                                    <label>Protein : {userDetail.Weight*2 + ' g.'}</label>
                                    <label>Fat : {userDetail.Weight + ' g.'}</label>
                                    <label>Carb : 130 g.</label>
                                    <div className='button' onClick={()=>clickApplySuggestion(3)}>Apply</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id='alert'>-</div>
                    <div className='button' id='submitNewDetail' onClick={clickSubmitNewDetail}>Apply</div>
                </div>
                <div className='MyMenu'>
                    <header>My Menu</header>
                    <table>
                        <thead>
                            <tr>
                                <th>Menu</th>
                                <th>Protein</th>
                                <th>Fat</th>
                                <th>Carb</th>
                                <th>Like</th>
                                <th></th>
                            </tr>
                        </thead>
                    </table>
                    <div className='Scroll'>
                        <table>
                            <tbody>
                                {menues?.filter(element=>element.Creator===userDetail.UserName).map(element=>{
                                    return (
                                        <tr key={element.Id}>
                                            <td><span>{element.Name}</span></td>
                                            <td><span>{element.Protein + ' g.'}</span></td>
                                            <td><span>{element.Fat + ' g.'}</span></td>
                                            <td><span>{element.Carb + ' g.'}</span></td>
                                            <td>{element.Like}</td>
                                            <td><div className='button' onClick={event=>clickDeleteMenu(element.Id)}>Delete</div></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <table>
                            <tbody>
                                <tr>
                                    <td><input type='text' id='newMenuName' onChange={inputNewMenuName}/></td>
                                    <td><input type='number' id='newMenuProtein' onChange={inputNewMenuProtein}/></td>
                                    <td><input type='number' id='newMenuFat' onChange={inputNewMenuFat}/></td>
                                    <td><input type='number' id='newMenuCarb' onChange={inputNewMenuCarb}/></td>
                                    <td>0</td>
                                    <td><div className='button' onClick={clickCreateMenu}>Create</div></td>
                                </tr>
                            </tbody>
                        </table>
                    <table>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
    )
}

export default Profile