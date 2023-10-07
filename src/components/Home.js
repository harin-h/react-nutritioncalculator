import './Home.css'
import {Link} from "react-router-dom" 

const linkStyle = {
    background:'#5072A7',
    textDecoration:"none"
};

function Home(props) {

    return (
            <div className='Home'>
                {/* <div className='ShortCut'>
                    <label>Log In</label>
                </div>
                <div className='ShortCut'>
                    <label className='UserName'>BOBBIGON</label>
                    <label>|</label>
                    <Link to="/profile" style={linkStyle} >
                        <label className='Profile'>Profile</label>
                    </Link>
                    <label>|</label>
                    <Link to="/" style={linkStyle}>
                        <label className='LogOut'>Log Out</label>
                    </Link>
                </div> */}
                <div className='MenuList'>
                    <header>Menu</header>
                    <div className='Search'>
                        <div className='SearchMenu'>
                            <input type='text' placeholder='sss'/>
                            <label>Search Menu</label>
                        </div>
                        <div className='SearchCreator'>
                            <input type='text' placeholder='sss'/>
                            <label>Search Creator</label>
                        </div>
                        <label>My Menu</label>
                        <div className='MyMenu'>
                            <input className='checkbox' type='checkbox'/>
                            <div className='indicator'></div>
                            <div className='background'></div>
                        </div>
                    </div>
                    <table className='HeadTable'>
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
                    </table>
                    <div className='Scroll'>
                        <table className='BodyTable'>
                            <tr>
                                <td><span>Chicken</span></td>
                                <td><span>10 g.</span></td>
                                <td><span>0.500000 g.</span></td>
                                <td><span>00000000000 g.</span></td>
                                <td><span>Fitness Firstsssssssssssssssssss</span></td>
                                <td><span>11</span></td>
                                <td><span>star</span></td>
                                <td><div className='button'>+</div></td>
                                <td><div className='button'>-</div></td>
                            </tr>
                            <tr>
                                <td><span>Whey</span></td>
                                <td><span>30 g.</span></td>
                                <td><span>5 g.</span></td>
                                <td><span>100 g.</span></td>
                                <td><span>BAAM</span></td>
                                <td><span>200</span></td>
                                <td>star</td>
                                <td><div className='button'>+</div></td>
                                <td><div className='button'>-</div></td>
                            </tr>
                            <tr>
                                <td><span>Whey</span></td>
                                <td><span>30 g.</span></td>
                                <td><span>5 g.</span></td>
                                <td><span>100 g.</span></td>
                                <td><span>BAAM</span></td>
                                <td><span>200</span></td>
                                <td>star</td>
                                <td><div className='button'>+</div></td>
                                <td><div className='button'>-</div></td>
                            </tr>
                            <tr>
                                <td><span>Whey</span></td>
                                <td><span>30 g.</span></td>
                                <td><span>5 g.</span></td>
                                <td><span>100 g.</span></td>
                                <td><span>BAAM</span></td>
                                <td><span>200</span></td>
                                <td>star</td>
                                <td><div className='button'>+</div></td>
                                <td><div className='button'>-</div></td>
                            </tr>
                            <tr>
                                <td><span>Whey</span></td>
                                <td><span>30 g.</span></td>
                                <td><span>5 g.</span></td>
                                <td><span>100 g.</span></td>
                                <td><span>BAAM</span></td>
                                <td><span>200</span></td>
                                <td>star</td>
                                <td><div className='button'>+</div></td>
                                <td><div className='button'>-</div></td>
                            </tr>
                            <tr>
                                <td><span>Whey</span></td>
                                <td><span>30 g.</span></td>
                                <td><span>5 g.</span></td>
                                <td><span>100 g.</span></td>
                                <td><span>BAAM</span></td>
                                <td><span>200</span></td>
                                <td>star</td>
                                <td><div className='button'>+</div></td>
                                <td><div className='button'>-</div></td>
                            </tr>
                            <tr>
                                <td><span>Whey</span></td>
                                <td><span>30 g.</span></td>
                                <td><span>5 g.</span></td>
                                <td><span>100 g.</span></td>
                                <td><span>BAAM</span></td>
                                <td><span>200</span></td>
                                <td>star</td>
                                <td><div className='button'>+</div></td>
                                <td><div className='button'>-</div></td>
                            </tr>
                        </table>
                    </div>
                    <table className='CloseTable'>
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
                    </table>
                    <div className='AddMenu'>Add New Menu</div>
                </div>
                <div className='ChosenList'>
                    <header>Chosen List</header>
                    <table className='HeadTable'>
                        <tr>
                            <th>Menu</th>
                            <th>Protein</th>
                            <th>Fat</th>
                            <th>Carb</th>
                            <th>Amount</th>
                        </tr>
                    </table>
                    <div className='Scroll'>
                        <table className='BodyTable'>
                            <tr>
                                <td><span>Chicken</span></td>
                                <td><span>10 g.</span></td>
                                <td><span>0.500000 g.</span></td>
                                <td><span>00000000000 g.</span></td>
                                <td><span>11</span></td>
                            </tr>
                            <tr>
                                <td><span>Whey</span></td>
                                <td><span>30 g.</span></td>
                                <td><span>5 g.</span></td>
                                <td><span>100 g.</span></td>
                                <td><span>200</span></td>
                            </tr>
                            <tr>
                                <td><span>Whey</span></td>
                                <td><span>30 g.</span></td>
                                <td><span>5 g.</span></td>
                                <td><span>100 g.</span></td>
                                <td><span>200</span></td>
                            </tr>
                            <tr>
                                <td><span>Whey</span></td>
                                <td><span>30 g.</span></td>
                                <td><span>5 g.</span></td>
                                <td><span>100 g.</span></td>
                                <td><span>200</span></td>
                            </tr>
                            <tr>
                                <td><span>Whey</span></td>
                                <td><span>30 g.</span></td>
                                <td><span>5 g.</span></td>
                                <td><span>100 g.</span></td>
                                <td><span>200</span></td>
                            </tr>
                            <tr>
                                <td><span>Whey</span></td>
                                <td><span>30 g.</span></td>
                                <td><span>5 g.</span></td>
                                <td><span>100 g.</span></td>
                                <td><span>200</span></td>
                            </tr>
                        </table>
                    </div>
                    <table className='TotalTable'>
                        <tr>
                            <th>Total</th>
                            <th>40 g.</th>
                            <th>5.5 g.</th>
                            <th>100 g.</th>
                            <th>2</th>
                        </tr>
                    </table>
                    <div className='SaveToFav'>Save To Favorite List</div>
                </div>
                <div className='FavoriteList'>
                    <header>Favorite List</header>
                    <div className='SearchFavList'>
                        <input type='text' placeholder='sss'/>
                        <label>Search Favorite List</label>
                    </div>
                    <table className='HeadTable'>
                        <tr>
                            <th>Name</th>
                            <th>Menues</th>
                            <th>Protein</th>
                            <th>Fat</th>
                            <th>Carb</th>
                            <th></th>
                        </tr>
                    </table>
                    <div className='Scroll'>
                        <table className='BodyTable'>
                            <tr>
                                <td>Normal Work Out Day</td>
                                <td>Whey 2, Chicken 1</td>
                                <td>40 g.</td>
                                <td>5.5 g.</td>
                                <td>100 g.</td>
                                <td><div className='button'>Apply</div></td>
                            </tr>
                            <tr>
                                <td>Normal Work Out Day</td>
                                <td>Whey 2, Chicken 1</td>
                                <td>40 g.</td>
                                <td>5.5 g.</td>
                                <td>100 g.</td>
                                <td><div className='button'>Apply</div></td>
                            </tr>
                            <tr>
                                <td>Normal Work Out Day</td>
                                <td>Whey 2, Chicken 1</td>
                                <td>40 g.</td>
                                <td>5.5 g.</td>
                                <td>100 g.</td>
                                <td><div className='button'>Apply</div></td>
                            </tr>
                            <tr>
                                <td>Normal Work Out Day</td>
                                <td>Whey 2, Chicken 1</td>
                                <td>40 g.</td>
                                <td>5.5 g.</td>
                                <td>100 g.</td>
                                <td><div className='button'>Apply</div></td>
                            </tr>
                            <tr>
                                <td>Normal Work Out Day</td>
                                <td>Whey 2, Chicken 1</td>
                                <td>40 g.</td>
                                <td>5.5 g.</td>
                                <td>100 g.</td>
                                <td><div className='button'>Apply</div></td>
                            </tr>
                        </table>
                    </div>
                    <table className='CloseTable'>
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </table>
                </div>
                <div className='Summary'>
                    <header>Summary</header>
                    <div className='Weight'>
                        <label>Weight</label>
                        <input type='number' min='0'/>
                        <label>kg.</label>
                    </div>
                    <table className='HeadTable'>
                        <tr>
                            <th></th>
                            <th>Protein</th>
                            <th>Fat</th>
                            <th>Carb</th>
                        </tr>
                    </table>
                    <table className='BodyTable'>
                        <tr>
                            <td>Total Gain (g.)</td>
                            <td>40 g.</td>
                            <td>5.5 g.</td>
                            <td>100 g.</td>
                        </tr>
                        <tr>
                            <td>Nutrition Need (g.)</td>
                            <td><input type='number' placeholder="-"/></td>
                            <td><input type='number' placeholder="-"/></td>
                            <td><input type='number' placeholder="-"/></td>
                        </tr>
                        <tr>
                            <td>Difference (g.)</td>
                            <td><input type='number' placeholder="-"/></td>
                            <td><input type='number' placeholder="-"/></td>
                            <td><input type='number' placeholder="-"/></td>
                        </tr>
                    </table>
                    <table className='CloseTable'>
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </table>
                </div>
            </div>
    )
}

export default Home