import React from 'react'
import logo from '../Assets/Images/homepage.svg'
import searchIcon from '../Assets/Images/searchIcon.svg'
import Carpentering from '../Assets/Images/CarpenteringIcon.png'
import GraphicDesign from '../Assets/Images/Designer.png'
import Agriculture from '../Assets/Images/Farming.png'
import Networking from '../Assets/Images/Networking.png'
import Electricity from '../Assets/Images/Electricity.png'
import Fashion from '../Assets/Images/Fashion.png'
import '../Assets/Styles/Home.css'

function Home(){
    return(
        <>
            <div className='container-fluid mt-5 intro'>
                <div className='row main-intro'>
                    <div className='col ms-5'>
                        <div className='row mt-5 p-3'>
                            <h1 style={{color: '#36506C'}}>SkillFinder</h1>
                            <h3>Where your journey begins anew.</h3>
                        </div>
                        <div className='row mt-6 p-3'>
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
                    <div className='col-sm-4 teaching-logo p-3'>
                        <img src={logo}/>  
                    </div>
                </div>
            </div>
            <div className='container'>  
                <h2 className='text-center top'>Top Categories</h2>
                <div className='row justify-content-between mt-4'>
                    <div className='col-sm-3 d-flex justify-content-center category'>
                        <img className='ms-3' src={Carpentering}/>
                        <h4 className='col-md-4 me-5'>Carpentering</h4>
                    </div>
                    <div className='col-sm-3 d-flex justify-content-center category'>
                        <img className='ms-3' src={GraphicDesign}/>
                        <h4 className='col-md-4 me-5'>Graphic Design</h4>
                    </div>
                    <div className='col-sm-3 d-flex justify-content-center category'>
                        <img className='ms-3' src={Agriculture}/>
                        <h4 className='col-md-4 me-5'>Agriculture</h4>
                    </div>
                </div>
                <div className='row justify-content-between mt-4 pb-3'>
                    <div className='col-sm-3 d-flex justify-content-center category'>
                        <img className='ms-3' src={Networking}/>
                        <h4 className='col-md-4 me-5'>Networking</h4>
                    </div>
                    <div className='col-sm-3 d-flex justify-content-center  category'>
                        <img className='ms-3' src={Electricity}/>
                        <h4 className='col-md-4 me-5'>Electricity</h4>
                    </div>
                    <div className='col-sm-3 d-flex justify-content-center category'>
                        <img className='ms-3' src={Fashion}/>      
                        <h4 className='col-md-4 me-5'>Fashion Design</h4> 
                    </div>
                </div>
            </div>
        </>
        
    )
}

export default Home