import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import randomstring from 'randomstring';
import Apprenticeship from "../Component/Apprenticeship";

import '../Assets/Styles/Search.css'

const range = (start, end) => {
    return [...Array(end).keys()].map((element) => element + start)
};


function Search() {
    const { keyWords } = useParams();
    const [searchKeyWords, setSearchKeyWords] = useState(decodeURIComponent(keyWords.replace('%', ' ')));
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();
    const search = () => {
        if (searchKeyWords === '') return;
        navigate('/Search/' + searchKeyWords);

    }

    onkeyup = (e) => {
        if (e.which === 13) {
            search();
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        searchInDatabase();
    }, [keyWords])

    const searchInDatabase = () => {
        const decodedKeyWords = decodeURIComponent(keyWords.replace('%', ' '));
        fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/searchApprenticeships/${decodedKeyWords}`)
            .then(res => res.json())
            .then(data => {
                if (data.success === false) return;
                setSearchResults(data.apprenticeshipsWithImg);
            })
            .catch(err => {
                setSearchResults([])
            });
    }

    return (
        <div className='container-fluid searchPage'>
            <div className="searchHeader align-items-center">
                <input className="defultInput searchPageInput ms-auto me-auto" placeholder="Search..." value={searchKeyWords} onChange={e => setSearchKeyWords(e.target.value)} />
            </div>
            <div className="row mt-3">
                <div className="flex-column filter-section pb-3">
                    <h4>Filter By</h4>
                    <div className="filter-category">
                        <h6>Category</h6>
                        <div>
                            <input type="checkbox" className="form-check-input" id="Carpenting" value='Carpenting' />
                            <label htmlFor="Carpenting" className="form-check-label ms-2">Carpenting</label>
                        </div>
                        <div className="mt-3">
                            <input type="checkbox" className="form-check-input" id="Graphic Design" value='Graphic Design' />
                            <label htmlFor="Graphic Design" className="form-check-label ms-2">Graphic Design</label>
                        </div>
                        <div className="mt-3">
                            <input type="checkbox" className="form-check-input" id="Fashion Design" value='Fashion Design' />
                            <label htmlFor="Fashion Design" className="form-check-label ms-2">Fashion Design</label>
                        </div>
                        <div className="mt-3">
                            <input type="checkbox" className="form-check-input" id="Networking" value='Networking' />
                            <label htmlFor="Networking" className="form-check-label ms-2">Networking</label>
                        </div>
                    </div>
                    <div className="filter-category mt-4">
                        <h6>Duration</h6>
                        <div>
                            <input type="checkbox" className="form-check-input" id="LessThanMonth" value='LessThanMonth' />
                            <label htmlFor="LessThanMonth" className="form-check-label ms-2">0-1 Month</label>
                        </div>
                        <div className="mt-3">
                            <input type="checkbox" className="form-check-input" id="OneToThreeMonths" value='OneToThreeMonths' />
                            <label htmlFor="OneToThreeMonths" className="form-check-label ms-2">1-3 Months</label>
                        </div>
                        <div className="mt-3">
                            <input type="checkbox" className="form-check-input" id="FourToSix" value='FourToSix' />
                            <label htmlFor="FourToSix" className="form-check-label ms-2">4-6 Months</label>
                        </div>
                        <div className="mt-3">
                            <input type="checkbox" className="form-check-input" id="MoreThanSixMonths" value='MoreThanSixMonths' />
                            <label htmlFor="MoreThanSixMonths" className="form-check-label ms-2">7+ Months</label>
                        </div>
                    </div>
                    <div className="filter-category mt-4">
                        <h6>Learning Method</h6>
                        <div>
                            <input type="radio" className="form-check-input" id="OnlineLearn" value='OnlineLearn' name="LearnMethod" />
                            <label htmlFor="OnlineLearn" className="form-check-label ms-2">Online</label>
                        </div>
                        <div className="mt-3">
                            <input type="radio" className="form-check-input" id="OnSiteLearn" value='OnSiteLearn' name="LearnMethod" />
                            <label htmlFor="OnSiteLearn" className="form-check-label ms-2">On-site</label>
                        </div>
                        <div className="mt-3">
                            <input type="radio" className="form-check-input" id="BothLearn" value='BothLearn' name="LearnMethod" />
                            <label htmlFor="BothLearn" className="form-check-label ms-2">Both</label>
                        </div>
                    </div>
                    <div className="filter-category mt-4">
                        <h6>Simulation</h6>
                        <div>
                            <input type="radio" className="form-check-input" id="YesSim" value='YesSim' name="Simulation" />
                            <label htmlFor="YesSim" className="form-check-label ms-2">Yes</label>
                        </div>
                        <div className="mt-3">
                            <input type="radio" className="form-check-input" id="NoSim" value='NoSim' name="Simulation" />
                            <label htmlFor="NoSim" className="form-check-label ms-2">No</label>
                        </div>
                        <div className="mt-3">
                            <input type="radio" className="form-check-input" id="BothSim" value='BothSim' name="Simulation" />
                            <label htmlFor="BothSim" className="form-check-label ms-2">Both</label>
                        </div>
                    </div>
                    <div className="filter-category mt-4">
                        <h6>Paid</h6>
                        <div>
                            <input type="radio" className="form-check-input" id="YesPaid" value='YesPaid' name="Paid" />
                            <label htmlFor="YesPaid" className="form-check-label ms-2">Yes</label>
                        </div>
                        <div className="mt-3">
                            <input type="radio" className="form-check-input" id="NoPaid" value='NoPaid' name="Paid" />
                            <label htmlFor="NoPaid" className="form-check-label ms-2">No</label>
                        </div>
                        <div className="mt-3">
                            <input type="radio" className="form-check-input" id="BothPaid" value='BothPaid' name="Paid" />
                            <label htmlFor="BothPaid" className="form-check-label ms-2">Both</label>
                        </div>
                    </div>
                </div>
                <div className="col ms-3">
                    {!searchResults && <h3 className="text-center">There was an error pelase try again later or contact us </h3>}{/*In case error occurs in the server, display this message*/}
                    {searchResults && searchResults.length === 0 && <h3 className="text-center">No result found for {decodeURIComponent(keyWords.replace('%', ' '))}</h3>} {/*In case no result found, display this message*/}
                    {searchResults && searchResults.length > 0 && <>
                        <h3 className="text-center">{searchResults.length} Results Found: {decodeURIComponent(keyWords.replace('%', ' '))}</h3>
                        <SearchResult resultList={searchResults} />
                    </>}
                </div>
            </div>
        </div>
    )

}

const SearchResult = ({ resultList }) => {
    const rowLength = range(1, Math.ceil(resultList.length / 4));
    return (
        rowLength.map((row) => (
            <div key={randomstring.generate(5)} className="row result-row">
                {resultList.slice((row - 1) * 4, row * 4).map((result) => (
                    <Apprenticeship key={result.ID} app={result} page='search' />
                ))}
            </div>
        ))
    )
}

export default Search;