import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import Networking from '../Assets/Images/NetworkingExample.png';
import GrahpicDesign from '../Assets/Images/GraphicDesignExample.png';
import Carpenters from '../Assets/Images/CarpentersExample.png';
import RatingIcon from '../Assets/Images/RatingIcon.svg';
import '../Assets/Styles/Search.css'

const range = (start, end) => {
    return [...Array(end).keys()].map((element) => element + start)
};


function Search(){
    const { keyWords } = useParams();
    const [searchKeyWords, setSearchKeyWords] = useState(decodeURIComponent(keyWords.replace('%', ' ')));
    const [searchResults, setSearchResults] = useState([{title:'Networking', img:Networking, rating:"4.5 (100 Rating)",price: '60$'}
                                                        ,{title:'Graphic Design', img:GrahpicDesign, rating:"4.5 (100 Rating)",price: '60$'}
                                                        ,{title:'Carpenters', img:Carpenters, rating:"4.5 (100 Rating)",price: '60$'}
                                                        ,{title:'Networking', img:Networking, rating:"4.5 (100 Rating)",price: '60$'}
                                                        ,{title:'Graphic Design', img:GrahpicDesign, rating:"4.5 (100 Rating)",price: '60$'}
                                                        ,{title:'Carpenters', img:Carpenters, rating:"4.5 (100 Rating)",price: '60$'}
                                                        ,{title:'Networking', img:Networking, rating:"4.5 (100 Rating)",price: '60$'}
                                                        ,{title:'Graphic Design', img:GrahpicDesign, rating:"4.5 (100 Rating)",price: '60$'}
                                                        ,{title:'Carpenters', img:Carpenters, rating:"4.5 (100 Rating)",price: '60$'}]);
    const navigate = useNavigate();
    const search = () =>{
        if(searchKeyWords === '') return;
        navigate('/Search/' + searchKeyWords);
    }

    onkeyup = (e) => {
        if(e.which === 13){
            search();
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return(
        <div className='container-fluid searchPage'>
            <div className="searchHeader align-items-center">
                <input className="defultInput searchPageInput ms-auto me-auto" placeholder="Search..." value={searchKeyWords} onChange={e => setSearchKeyWords(e.target.value)}/>
            </div>
            <div className="row mt-3">
                <div className="flex-column filter-section pb-3">
                    <h4>Filter By</h4>
                    <div className="filter-category">
                        <h6>Category</h6>
                        <div>
                            <input type="checkbox" className="form-check-input" id="Carpenting" value='Carpenting'/>
                            <label for="Carpenting" className="form-check-label ms-2">Carpenting</label>
                        </div>
                        <div className="mt-3">
                            <input type="checkbox" className="form-check-input" id="Graphic Design" value='Graphic Design'/>
                            <label for="Graphic Design" className="form-check-label ms-2">Graphic Design</label>
                        </div>
                        <div className="mt-3">
                            <input type="checkbox" className="form-check-input" id="Fashion Design" value='Fashion Design'/>
                            <label for="Fashion Design" className="form-check-label ms-2">Fashion Design</label>
                        </div>
                        <div className="mt-3">
                            <input type="checkbox" className="form-check-input" id="Networking" value='Networking'/>
                            <label for="Networking" className="form-check-label ms-2">Networking</label>
                        </div>
                    </div>    
                    <div className="filter-category mt-4">
                        <h6>Duration</h6>
                        <div>
                            <input type="checkbox" className="form-check-input" id="LessThanMonth" value='LessThanMonth'/>
                            <label for="LessThanMonth" className="form-check-label ms-2">0-1 Month</label>
                        </div>
                        <div className="mt-3">
                            <input type="checkbox" className="form-check-input" id="OneToThreeMonths" value='OneToThreeMonths'/>
                            <label for="OneToThreeMonths" className="form-check-label ms-2">1-3 Months</label>
                        </div>
                        <div className="mt-3">
                            <input type="checkbox" className="form-check-input" id="FourToSix" value='FourToSix'/>
                            <label for="FourToSix" className="form-check-label ms-2">4-6 Months</label>
                        </div>
                        <div className="mt-3">
                            <input type="checkbox" className="form-check-input" id="MoreThanSixMonths" value='MoreThanSixMonths'/>
                            <label for="MoreThanSixMonths" className="form-check-label ms-2">7+ Months</label>
                        </div>
                    </div>  
                    <div className="filter-category mt-4">
                        <h6>Learning Method</h6>
                        <div>
                            <input type="radio" className="form-check-input" id="OnlineLearn" value='OnlineLearn' name="LearnMethod"/>
                            <label for="OnlineLearn" className="form-check-label ms-2">Online</label>
                        </div>
                        <div className="mt-3">
                            <input type="radio" className="form-check-input" id="OnSiteLearn" value='OnSiteLearn' name="LearnMethod"/>
                            <label for="OnSiteLearn" className="form-check-label ms-2">On-site</label>
                        </div>
                        <div className="mt-3">
                            <input type="radio" className="form-check-input" id="BothLearn" value='BothLearn' name="LearnMethod"/>
                            <label for="BothLearn" className="form-check-label ms-2">Both</label>
                        </div>
                    </div>  
                    <div className="filter-category mt-4">
                        <h6>Simulation</h6>
                        <div>
                            <input type="radio" className="form-check-input" id="YesSim" value='YesSim' name="Simulation"/>
                            <label for="YesSim" className="form-check-label ms-2">Yes</label>
                        </div>
                        <div className="mt-3">
                            <input type="radio" className="form-check-input" id="NoSim" value='NoSim' name="Simulation"/>
                            <label for="NoSim" className="form-check-label ms-2">No</label>
                        </div>
                        <div className="mt-3">
                            <input type="radio" className="form-check-input" id="BothSim" value='BothSim' name="Simulation"/>
                            <label for="BothSim" className="form-check-label ms-2">Both</label>
                        </div>
                    </div>   
                    <div className="filter-category mt-4">
                        <h6>Paid</h6>
                        <div>
                            <input type="radio" className="form-check-input" id="YesPaid" value='YesPaid' name="Paid"/>
                            <label for="YesPaid" className="form-check-label ms-2">Yes</label>
                        </div>
                        <div className="mt-3">
                            <input type="radio" className="form-check-input" id="NoPaid" value='NoPaid' name="Paid"/>
                            <label for="NoPaid" className="form-check-label ms-2">No</label>
                        </div>
                        <div className="mt-3">
                            <input type="radio" className="form-check-input" id="BothPaid" value='BothPaid' name="Paid"/>
                            <label for="BothPaid" className="form-check-label ms-2">Both</label>
                        </div>
                    </div>   
                </div>
                <div className="col ms-3">
                    <h3 className="text-center">{searchResults.length} Results Found for {decodeURIComponent(keyWords.replace('%', ' '))}</h3>
                    <SearchResult resultList={searchResults} />
                </div>
            </div>
        </div>
    )
    
}

const SearchResult = ({resultList}) => {
    const rowLength = range(1, Math.ceil(resultList.length/4));
    return(
        rowLength.map((row) => (
            <div className="row result-row">
                {resultList.slice((row - 1)*4, row*4).map((result) => (
                    <Result result={result} />
                ))}
            </div>
        ))
    )
}

const Result = ({result}) => {
    return(
        <div className="result">
            <img className="result-img" src={result.img} />
            <div className="row result-info">
                <h5>{result.title}</h5>
                <h6>Price: {result.price}</h6>
            </div>
            <div className="row me-auto rating-info">
                <img className="rating-star" src={RatingIcon} />
                <span>{result.rating}</span>
            </div>
        </div>
    )
}

export default Search;