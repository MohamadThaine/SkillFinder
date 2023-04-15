import React from 'react'
import logo from '../Assets/Images/homepage.svg'
import searchIcon from '../Assets/Images/searchIcon.png'
import '../Assets/Styles/MainPage.css'

function MainPage(){
    return(
        <>
            <div className='container mt-5'>
                <div className='row main-intro'>
                    <div className='col ms-5'>
                        <div className='row mt-5'>
                            <h1 style={{color: '#36506C'}}>SkillFinder</h1>
                            <h3>Where your journey begins anew.</h3>
                        </div>
                        <div className='row mt-6'>
                            <div className='col'>
                                <input type='text' placeholder='Search...' className='searchInput' />
                            </div>
                            <div className='col'>
                                <button className='ms-3 searchButton'>
                                    <img src={searchIcon} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='col teaching-logo p-2'>
                        <img src={logo}/>  
                    </div>
                </div>
            </div>
        </>
        
    )
}

export default MainPage