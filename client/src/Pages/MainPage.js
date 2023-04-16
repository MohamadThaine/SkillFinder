import React from 'react'
import logo from '../Assets/Images/homepage.svg'
import searchIcon from '../Assets/Images/searchIcon.png'
import Carpentering from '../Assets/Images/CarpenteringIcon.png'
import GraphicDesign from '../Assets/Images/Designer.png'
import Agriculture from '../Assets/Images/Farming.png'
import Networking from '../Assets/Images/Networking.png'
import Electricity from '../Assets/Images/Electricity.png'
import Fashion from '../Assets/Images/Fashion.png'
import '../Assets/Styles/MainPage.css'

function MainPage(){
    return(
        <>
            <div className='container-fluid mt-5 intro'>
                <div className='row main-intro'>
                    <div className='col ms-5'>
                        <div className='row mt-5'>
                            <h1 style={{color: '#36506C'}}>SkillFinder</h1>
                            <h3>Where your journey begins anew.</h3>
                        </div>
                        <div className='row mt-6'>
                            <div className='col'>
                                <input type='text' placeholder='Search for apprenticeship...' className='searchInput' />
                            </div>
                            <div className='col'>
                                <button className='searchButton'>
                                    <img src={searchIcon} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-3 teaching-logo p-3'>
                        <img src={logo}/>  
                    </div>
                </div>
            </div>
            <div className='container mt-5'>  
                <h2 className='text-center top'>Top Categories</h2>
                <div className='row justify-content-between mt-4 categories-row'>
                    <div className='col-sm-3 d-flex justify-content-center category'>
                        <img src={Carpentering}/>
                        <h4 className='ms-2'>Carpentering</h4>
                    </div>
                    <div className='col-sm-3 d-flex justify-content-center category'>
                        <img src={GraphicDesign}/>
                        <h4 className='ms-2'>Graphic Design</h4>
                    </div>
                    <div className='col-sm-3 d-flex justify-content-center category'>
                        <img src={Agriculture}/>
                        <h4 className='ms-2'>Agriculture</h4>
                    </div>
                </div>
                <div className='row justify-content-between mt-4 categories-row'>
                    <div className='col-sm-3 d-flex justify-content-center category'>
                        <img src={Networking}/>
                        <h4 className='ms-2'>Networking</h4>
                    </div>
                    <div className='col-sm-3 d-flex justify-content-center  category'>
                        <img src={Electricity}/>
                        <h4 className='ms-2'>Electricity</h4>
                    </div>
                    <div className='col-sm-3 d-flex justify-content-center category'>
                        <img src={Fashion}/>      
                        <h4 className='ms-2'>Fashion Design</h4> 
                    </div>
                </div>
            </div>
        </>
        
    )
}

export default MainPage