import './Home.css'
import {Link} from 'react-router-dom' 
import DataContext from '../data/DataContext'
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import star from '../star.png'
import star_off from '../star-off.png'

function Home() {

    console.log("Rendering Component - Home")

    const {userId, userDetail, setApiUserDetail, menues, apiGetMenues} = useContext(DataContext)

    const [showMenues,setShowMenues] = useState(menues)
    const [searchMenuBar,setSearchMenu] = useState("")
    const [searchCreatorBar,setSearchCreator] = useState("")
    const [myMenuCheck,setMyMenuCheck] = useState(false)
    const [myFavCheck,setMyFavCheck] = useState(false)

    const [chosenMenues,setChosenMenues] = useState([])

    const [favoriteLists,setFavoriteLists] = useState([])
    const [showFavoriteLists,setShowFavoriteLists] = useState([])
    const [searchFavoriteListBar,setSearchFavoriteListBar] = useState("")
    const [favoriteListName,setFavoriteListName] = useState("")

    const [weight,setWeight] = useState(userId!=='-'?userDetail.Weight:0)
    const [proteinNeed,setProteinNeed] = useState(userId!=='-'?userDetail.Protein:0)
    const [fatNeed,setFatNeed] = useState(userId!=='-'?userDetail.Fat:0)
    const [carbNeed,setCarbNeed] = useState(userId!=='-'?userDetail.Carb:0)

    async function apiUpdateFavoriteMenu(menuId) {
        try {
            await console.log("API-apiUpdateFavoriteMenu - starting")
            const responseUpdateLikeMenu = await axios.put("https://go-nutritioncalculator.onrender.com/menu/like/"+menuId+"/"+userId);
            await console.log("response of apiUpdateFavoriteMenu - Updating Like Menu")
            await console.log(responseUpdateLikeMenu)
            const responseUpdateFavortieMenu = await axios.put("https://go-nutritioncalculator.onrender.com/user/fav_menu/"+userId+"/"+menuId);
            await console.log("response of apiUpdateFavoriteMenu - Updating Favorite Menu")
            await console.log(responseUpdateFavortieMenu)
            console.log("API-apiUpdateFavoriteMenu - finished")
        } catch(error) {
            console.log("API-apiUpdateFavoriteMenu - failed")
            console.log(error)
        }
    }

    async function apiGetFavoriteLists() {
        try {
            await console.log("API-apiGetFavoriteLists - starting")
            const response = await axios.get("https://go-nutritioncalculator.onrender.com/fav_list/" + userId);
            await console.log("response.data of apiGetFavoriteLists")
            await console.log(response.data)
            await setFavoriteLists(response.data)
            console.log("API-apiGetFavoriteLists - finished")
        } catch(error) {
            console.log("API-apiGetFavoriteLists - failed")
            console.log(error)
        }
    }

    async function apiCreateFavoriteList(data) {
        try {
            await console.log("API-apiCreateFavoriteList - starting")
            const response = await axios.post("https://go-nutritioncalculator.onrender.com/fav_list/",data);
            await console.log("response of apiCreateFavoriteList")
            await console.log(response)
            console.log("API-apiCreateFavoriteList - finished")
        } catch(error) {
            console.log("API-apiCreateFavoriteList - failed")
            console.log(error)
        }
    }

    async function apiUpdateFavoriteList(favoriteListId,data) {
        try {
            await console.log("API-apiUpdateFavoriteList - starting")
            const response = await axios.put("https://go-nutritioncalculator.onrender.com/fav_list/"+favoriteListId,data);
            await console.log("response of apiUpdateFavoriteList")
            await console.log(response)
            console.log("API-apiUpdateFavoriteList - finished")
        } catch(error) {
            console.log("API-apiUpdateFavoriteList - failed")
            console.log(error)
        }
    }

    async function apIdeleteFavoriteList(favoriteListId) {
        try {
            await console.log("API-apIdeleteFavoriteList - starting")
            const response = await axios.delete("https://go-nutritioncalculator.onrender.com/fav_list/"+favoriteListId);
            await console.log("response of apIdeleteFavoriteList")
            await console.log(response)
            console.log("API-apIdeleteFavoriteList - finished")
        } catch(error) {
            console.log("API-apIdeleteFavoriteList - failed")
            console.log(error)
        }
    }

    useEffect(()=>{
        setWeight(userId!=='-'?userDetail.Weight:0)
        setProteinNeed(userId!=='-'?userDetail.Protein:0)
        setFatNeed(userId!=='-'?userDetail.Fat:0)
        setCarbNeed(userId!=='-'?userDetail.Carb:0)
        document.getElementById('weight').value = userId!=='-'?userDetail.Weight:0
        document.getElementById('proteinNeed').value = userId!=='-'?userDetail.Protein:0
        document.getElementById('fatNeed').value = userId!=='-'?userDetail.Fat:0
        document.getElementById('carbNeed').value = userId!=='-'?userDetail.Carb:0
    },[userDetail])

    useEffect(()=>{
        if (userId !== "-") {
            apiGetFavoriteLists()
        }
    },[userId])

    useEffect(()=>{
        let tempSearchMenuBar = menues
        if (searchMenuBar !== "") {
            tempSearchMenuBar = tempSearchMenuBar.filter(element=>RegExp("^".concat(searchMenuBar.toLowerCase())).test(element.Name.toLowerCase()))
        }
        let tempSearchCreatorBar = menues
        if (searchCreatorBar !== "") {
            tempSearchCreatorBar = tempSearchCreatorBar.filter(element=>RegExp("^".concat(searchCreatorBar.toLowerCase())).test(element.Creator.toLowerCase()))
        }
        let tempMyMenuCheck = menues
        if (myMenuCheck !== false) {
            tempMyMenuCheck = tempMyMenuCheck.filter(element=>userDetail.UserName === element.Creator)
        }
        let tempMyFavCheck = menues
        if (myFavCheck !== false) {
            let tempFavoriteMenues = userDetail.FavoriteMenu.split(",")
            tempMyFavCheck = tempMyFavCheck.filter(element=>tempFavoriteMenues.includes((element.Id).toString()))
        }
        setShowMenues((tempSearchMenuBar.filter(element1=>tempSearchCreatorBar.some(element2=>element1.Id===element2.Id))).filter(element1=>tempMyMenuCheck.some(element2=>element1.Id===element2.Id)).filter(element1=>tempMyFavCheck.some(element2=>element1.Id===element2.Id)))
    },[menues,searchMenuBar,searchCreatorBar,myMenuCheck,myFavCheck])

    useEffect(()=>{
        let tempSearchFavoriteListBar = favoriteLists
        if (searchFavoriteListBar !== "") {
            tempSearchFavoriteListBar = tempSearchFavoriteListBar.filter(element=>RegExp("^".concat(searchFavoriteListBar.toLowerCase())).test(element.Name.toLowerCase()))
        }
        setShowFavoriteLists(tempSearchFavoriteListBar)
    },[favoriteLists,searchFavoriteListBar])

    useEffect(()=>{
        if (favoriteLists?.length>0 && document.getElementById('favoriteList'+favoriteLists[0].Id) !== null) {
            for(let i=0;i<favoriteLists.length&&favoriteLists.length>0;i++) {
                if (document.getElementById('favoriteList'+favoriteLists[i].Id) !== null) {
                    document.getElementById('favoriteList'+favoriteLists[i].Id).value = favoriteLists[i].Name
                }
            }
        }
    },[favoriteLists])

    const inputSearchMenuBar = (event) => {
        setSearchMenu(event.target.value)
    }

    const inputSearchCreatorBar = (event) => {
        setSearchCreator(event.target.value)
    }

    const checkMyMenuCheck = () => {
        if (myMenuCheck) {
            setMyMenuCheck(false)
        } else {
            setMyMenuCheck(true)
        }
    }

    const checkMyFavCheck = () => {
        if (myFavCheck) {
            setMyFavCheck(false)
        } else {
            setMyFavCheck(true)
        }
    }

    async function clickFavoriteStar(menuId) {
        if (userId !== "-") {
            await apiUpdateFavoriteMenu(menuId)
            await setApiUserDetail(userId)
            await apiGetMenues()
        }
    }

    const addChosenMenu = (menuId) => {
        const tempMenu = menues.filter(element=>element.Id===menuId)[0]
        const name = tempMenu.Name
        const protein = tempMenu.Protein
        const fat = tempMenu.Fat
        const carb = tempMenu.Carb
        let tempChosenMenues
        if (chosenMenues.length===0) {
            tempChosenMenues = [{menuId:menuId,name:name,protein:protein,fat:fat,carb:carb,amount:1}]
        } else if (chosenMenues.filter(element=>element.menuId===menuId).length===0) {
            tempChosenMenues = [...chosenMenues.filter(element=>element.menuId!==menuId),{menuId:menuId,name:name,protein:protein,fat:fat,carb:carb,amount:1}]
        } else {
            const tempChosenMenu = chosenMenues.filter(element=>element.menuId===menuId)[0]
            tempChosenMenues = [...chosenMenues.filter(element=>element.menuId!==menuId),{menuId:menuId,name:name,protein:tempChosenMenu.protein+protein,fat:tempChosenMenu.fat+fat,carb:tempChosenMenu.carb+carb,amount:tempChosenMenu.amount+1}]
        }
        tempChosenMenues.sort((a,b)=>{
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1
            } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1
            } else {
                return 0
            }
        })
        setChosenMenues(tempChosenMenues)
    } 

    const removeChosenMenu = (menuId) => {
        if (chosenMenues.filter(element=>element.menuId===menuId).length !== 0) {
            const tempChosenMenu = chosenMenues.filter(element=>element.menuId===menuId)[0]
            let tempChosenMenues
            if (tempChosenMenu.amount === 1) {
                tempChosenMenues = chosenMenues.filter(element=>element.menuId!==menuId)
            } else {
                const tempMenu = menues.filter(element=>element.Id===menuId)[0]
                const name = tempMenu.Name
                const protein = tempMenu.Protein
                const fat = tempMenu.Fat
                const carb = tempMenu.Carb
                tempChosenMenues = [...chosenMenues.filter(element=>element.menuId!==menuId),{menuId:menuId,name:name,protein:tempChosenMenu.protein-protein,fat:tempChosenMenu.fat-fat,carb:tempChosenMenu.carb-carb,amount:tempChosenMenu.amount-1}]
            }
            tempChosenMenues.sort((a,b)=>{
                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                    return -1
                } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return 1
                } else {
                    return 0
                }
            })
            setChosenMenues(tempChosenMenues)
        }
    } 

    async function clickSaveToFavoriteLists() {
        let tempChosenMenues = chosenMenues
        tempChosenMenues.sort((a,b)=>{return a.menuId - b.menuId})
        let tempMenues = ""
        let tempList = ""
        let tempProtein = tempChosenMenues.reduce((value,e)=>{const total = e.protein + value; return total;},0)
        let tempFat = tempChosenMenues.reduce((value,e)=>{const total = e.fat + value; return total;},0)
        let tempCarb = tempChosenMenues.reduce((value,e)=>{const total = e.carb + value; return total;},0)
        for (let i=0 ; i<tempChosenMenues.length ; i++) {
            tempMenues = tempMenues + tempChosenMenues[i].name + " " + tempChosenMenues[i].amount + ", "
            for (let j=1 ; j<=tempChosenMenues[i].amount ; j++) {
                tempList = tempList + tempChosenMenues[i].menuId + ","
            }
        }
        await apiCreateFavoriteList({UserId:userId,Name:"Untitled",Menues:tempMenues.slice(0,tempMenues.length-2),List:tempList.slice(0,tempList.length-1),Protein:tempProtein,Fat:tempFat,Carb:tempCarb})
        await apiGetFavoriteLists()
    }

    const inputSearchFavoriteListBar = (event) => {
        setSearchFavoriteListBar(event.target.value)
    }

    const inputFavoriteListName = (event) => {
        setFavoriteListName(event.target.value)
    }

    const focusFavoriteListName = (favoriteListId) => {
        setFavoriteListName((showFavoriteLists.filter(element=>element.Id===favoriteListId)[0]).Name)
    }

    async function checkChangingName(favoriteListId) {
        if (favoriteListName !== showFavoriteLists.filter(element=>element.Id===favoriteListId)[0].Name && favoriteListName !== "") {
            await apiUpdateFavoriteList(favoriteListId,{Name:favoriteListName})
            await apiGetFavoriteLists() 
        }
    }

    const clickApplyFavoriteList = (favoriteListId) => {
        let tempList = favoriteLists.filter(element=>element.Id===favoriteListId)[0].List.split(",")
        let tempChosenMenues = []
        for (let i=0 ; i<tempList.length ; i++) {
            const tempMenuId = parseInt(tempList[i])
            const tempMenu = menues.filter(element=>element.Id===tempMenuId)[0]
            const tempName = tempMenu.Name
            const tempProtein = tempMenu.Protein
            const tempFat = tempMenu.Fat
            const tempCarb = tempMenu.Carb
            if (tempChosenMenues.length===0) {
                tempChosenMenues = [{menuId:tempMenuId,name:tempName,protein:tempProtein,fat:tempFat,carb:tempCarb,amount:1}]
            } else if (tempChosenMenues.filter(element=>element.menuId===tempMenuId).length===0) {
                tempChosenMenues = [...tempChosenMenues.filter(element=>element.menuId!==tempMenuId),{menuId:tempMenuId,name:tempName,protein:tempProtein,fat:tempFat,carb:tempCarb,amount:1}]
            } else {
                const tempChosenMenu = tempChosenMenues.filter(element=>element.menuId===tempMenuId)[0]
                tempChosenMenues = [...tempChosenMenues.filter(element=>element.menuId!==tempMenuId),{menuId:tempMenuId,name:tempName,protein:tempChosenMenu.protein+tempProtein,fat:tempChosenMenu.fat+tempFat,carb:tempChosenMenu.carb+tempCarb,amount:tempChosenMenu.amount+1}]
            }
        }
        tempChosenMenues.sort((a,b)=>{
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1
            } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1
            } else {
                return 0
            }
        })
        setChosenMenues(tempChosenMenues)
    }

    async function clickDeleteFavoriteList(favoriteListId) {
        await apIdeleteFavoriteList(favoriteListId)
        await apiGetFavoriteLists()
    }

    const clickMyWeight = () => {
        document.getElementById('weight').value = userDetail.Weight
        setWeight(userDetail.Weight)
        document.getElementById('weight').classList.remove('error')
    }

    const inputWeight = (event) => {
        setWeight(event.target.value)
        document.getElementById('weight').classList.remove('error')
    }

    const inputProteinNeed = (event) => {
        setProteinNeed(event.target.value)
    }

    const inputFatNeed = (event) => {
        setFatNeed(event.target.value)
    }

    const inputCarbNeed = (event) => {
        setCarbNeed(event.target.value)
    }

    const ClickApplyNutritionSuggest = (type) => {
        if (weight > 0) {
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
            setProteinNeed(tempProtein)
            setFatNeed(tempFat)
            setCarbNeed(tempCarb)
            document.getElementById('proteinNeed').value = tempProtein
            document.getElementById('fatNeed').value = tempFat
            document.getElementById('carbNeed').value = tempCarb
        } else {
            document.getElementById('checkbox').checked = false
            document.getElementById('weight').focus()
            document.getElementById('weight').classList.add('error')
        }
    }

    return (
            <div className="Home">
                <div className="MenuList">
                    <header>Menu</header>
                    <div className="Search">
                        <div className="SearchMenu">
                            <input type="text" placeholder="sss" onChange={inputSearchMenuBar}/>
                            <label>Search Menu</label>
                        </div>
                        <div className="SearchCreator">
                            <input type="text" placeholder="sss" onChange={inputSearchCreatorBar}/>
                            <label>Search Creator</label>
                        </div>
                        <label>My Menu</label>
                        <div className="MyMenu" onClick={checkMyMenuCheck}>
                            <input className="checkbox" type="checkbox"/>
                            <div className="indicator"></div>
                            <div className="background"></div>
                        </div>
                        <label>My Fav</label>
                        <div className="MyFav" onClick={checkMyFavCheck}>
                            <input className="checkbox" type="checkbox"/>
                            <div className="indicator"></div>
                            <div className="background"></div>
                        </div>
                    </div>
                    <table className="HeadTable">
                        <thead>
                            <tr>
                                <th>Menu</th>
                                <th>Protein</th>
                                <th>Fat</th>
                                <th>Carb</th>
                                <th>Creator</th>
                                <th>Like</th>
                                <th>Favorite</th>
                                <th>+</th>
                                <th>-</th>
                            </tr>
                        </thead>
                    </table>
                    <div className="Scroll">
                        <table className="BodyTable">
                            <tbody>
                                {showMenues.map((element)=>{
                                    return (
                                            <tr key={element.Id}>
                                                <td><span>{element.Name}</span></td>
                                                <td><span>{(element.Protein).toString().concat(" g.")}</span></td>
                                                <td><span>{(element.Fat).toString().concat(" g.")}</span></td>
                                                <td><span>{(element.Carb).toString().concat(" g.")}</span></td>
                                                <td><span>{element.Creator}</span></td>
                                                <td><span>{element.Like}</span></td>
                                                {(userId !== "-" && userDetail.FavoriteMenu?.split(",").includes((element.Id).toString()))
                                                    ?<td><img src={star} alt="Logo" width={30} height={30} onClick={event=>clickFavoriteStar(element.Id)}/></td>
                                                    :<td><img src={star_off} alt="Logo" width={30} height={30} onClick={event=>clickFavoriteStar(element.Id)}/></td>
                                                }
                                                <td><div className="button" onClick={event=>addChosenMenu(element.Id)}>+</div></td>
                                                <td><div className="button" onClick={event=>removeChosenMenu(element.Id)}>-</div></td>
                                            </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <table className="CloseTable">
                        <tfoot>
                            <tr>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </tfoot>
                    </table>
                    <Link to={userId==="-"?"/login":"/profile"}>
                        <div className="AddMenu">Add New Menu</div>
                    </Link>
                </div>
                <div className="ChosenList">
                    <header>Chosen List</header>
                    <table className="HeadTable">
                        <thead>
                            <tr>
                                <th>Menu</th>
                                <th>Protein</th>
                                <th>Fat</th>
                                <th>Carb</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                    </table>
                    <div className="Scroll">
                        <table className="BodyTable">
                            <tbody>
                                {(chosenMenues.sort((a,b)=>{return a.name - b.name})).map(element=>{
                                    return (
                                        <tr key={element.menuId}>
                                            <td><span>{element.name}</span></td>
                                            <td><span>{element.protein + " g."}</span></td>
                                            <td><span>{element.fat + " g."}</span></td>
                                            <td><span>{element.carb + " g."}</span></td>
                                            <td><span>{element.amount}</span></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <table className="TotalTable">
                        <tfoot>
                            <tr>
                                <th>Total</th>
                                <th>{chosenMenues.reduce((value,e)=>{const total = e.protein + value; return total;},0)+" g."}</th>
                                <th>{chosenMenues.reduce((value,e)=>{const total = e.fat + value; return total;},0)+" g."}</th>
                                <th>{chosenMenues.reduce((value,e)=>{const total = e.carb + value; return total;},0)+" g."}</th>
                                <th>{chosenMenues.reduce((value,e)=>{const total = e.amount + value; return total;},0)}</th>
                            </tr>
                        </tfoot>
                    </table>
                    {userId==="-"
                    ?
                    <Link to="/login">
                        <div className="SaveToFav">Save To Favorite List</div>
                    </Link>
                    :
                    <div className="SaveToFav" onClick={clickSaveToFavoriteLists}>Save To Favorite List</div>
                    }
                    
                </div>
                <div className="FavoriteList">
                    <header>Favorite List</header>
                    <div className="SearchFavList">
                        <input type="text" placeholder="sss" onChange={inputSearchFavoriteListBar}/>
                        <label>Search Favorite List</label>
                    </div>
                    <table className="HeadTable">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Menues</th>
                                <th>Protein</th>
                                <th>Fat</th>
                                <th>Carb</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                    </table>
                    <div className="Scroll">
                        <table className="BodyTable">
                            <tbody>
                                {showFavoriteLists?.map((element)=>{
                                    return (
                                        <tr key={element.Id}>
                                            <td><input type='text' id={'favoriteList'+element.Id} onChange={inputFavoriteListName} onFocus={event=>focusFavoriteListName(element.Id)} onBlur={event=>checkChangingName(element.Id)}/></td>
                                            <td><span>{element.Menues}</span></td>
                                            <td><span>{element.Protein + " g."}</span></td>
                                            <td><span>{element.Fat + " g."}</span></td>
                                            <td><span>{element.Carb + " g."}</span></td>
                                            <td><div className="button" onClick={event=>clickApplyFavoriteList(element.Id)}>Apply</div></td>
                                            <td><div className="button" onClick={event=>clickDeleteFavoriteList(element.Id)}>Delete</div></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <table className="CloseTable">
                        <tfoot>
                            <tr>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div className="Summary">
                    <header>Summary</header>
                    <div className="Weight">
                        <label>Weight</label>
                        <input type="number" min="0" onChange={inputWeight} id='weight'/>
                        <label>kg.</label>
                        {userId!=="-"?<div className='UseMyDefaultWeight' onClick={clickMyWeight}>My Weight</div>:<></>}
                    </div>
                    <table className="HeadTable">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Protein</th>
                                <th>Fat</th>
                                <th>Carb</th>
                            </tr>
                        </thead>
                    </table>
                    <table className="BodyTable">
                        <tbody>
                            <tr>
                                <td>Total Gain (g.)</td>
                                <td>{chosenMenues.reduce((value,e)=>{const total = e.protein + value; return total;},0)+" g."}</td>
                                <td>{chosenMenues.reduce((value,e)=>{const total = e.fat + value; return total;},0)+" g."}</td>
                                <td>{chosenMenues.reduce((value,e)=>{const total = e.carb + value; return total;},0)+" g."}</td>
                            </tr>
                            <tr>
                                <td>Nutrition Need (g.)</td>
                                <td><input type="number" placeholder="-" onChange={inputProteinNeed} id='proteinNeed'/></td>
                                <td><input type="number" placeholder="-" onChange={inputFatNeed} id='fatNeed'/></td>
                                <td><input type="number" placeholder="-" onChange={inputCarbNeed} id='carbNeed'/></td>
                            </tr>
                            <tr>
                                <td>Difference (g.)</td>
                                <td>{chosenMenues.reduce((value,e)=>{const total = e.protein + value; return total;},0)>=proteinNeed?"+ "+ (chosenMenues.reduce((value,e)=>{const total = e.protein + value; return total;},0) - proteinNeed):"- "+ (proteinNeed - chosenMenues.reduce((value,e)=>{const total = e.protein + value; return total;},0))}</td>
                                <td>{chosenMenues.reduce((value,e)=>{const total = e.fat + value; return total;},0)>=fatNeed?"+ "+ (chosenMenues.reduce((value,e)=>{const total = e.fat + value; return total;},0) - fatNeed):"- "+ (fatNeed - chosenMenues.reduce((value,e)=>{const total = e.fat + value; return total;},0))}</td>
                                <td>{chosenMenues.reduce((value,e)=>{const total = e.carb + value; return total;},0)>=carbNeed?"+ "+ (chosenMenues.reduce((value,e)=>{const total = e.carb + value; return total;},0) - carbNeed):"- "+ (carbNeed - chosenMenues.reduce((value,e)=>{const total = e.carb + value; return total;},0))}</td>
                            </tr>
                        </tbody>
                    </table>
                    <table className="CloseTable">
                        <tfoot>
                            <tr>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </tfoot>
                    </table>
                    <div className='SuggestionNutrition'>
                        <input className="checkbox" type="checkbox" id='checkbox'/>
                        <div className='indicator'>?</div>
                        <div className='SuggestionArrow'></div>
                        <div className='SuggestionDetail'>
                            <label>Nutrtion Need for Building Muscle (depend on weight)</label>
                            <label>{(weight>0)?"Protein = "+ weight*2 + " g., Fat = " + weight + " g., Carb = " + weight*3 +" g.":"Need to fill weight"}</label>
                            <div className="button" onClick={()=>ClickApplyNutritionSuggest(1)}>Apply</div>
                            <label>Nutrtion Need for Healthy Living (depend on weight)</label>
                            <label>{(weight>0)?"Protein = 50 g., Fat = " + weight + " g., Carb = 130 g.":"Need to fill weight"}</label>
                            <div className="button" onClick={()=>ClickApplyNutritionSuggest(2)}>Apply</div>
                            <label>Nutrtion Need for Fat Loss (depend on weight)</label>
                            <label>{(weight>0)?"Protein = "+ weight*2 + " g., Fat = " + weight + " g., Carb = 130 g.":"Need to fill weight"}</label>
                            <div className="button" onClick={()=>ClickApplyNutritionSuggest(3)}>Apply</div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Home