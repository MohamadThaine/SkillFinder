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
                <div className="col">
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

export const SearchResult = ({ resultList }) => {
    const rowLength = range(1, Math.ceil(resultList.length / 4));
    return (
        rowLength.map((row) => (
            <div key={randomstring.generate(5)} className="row">
                {resultList.slice((row - 1) * 4, row * 4).map((result) => (
                    <Apprenticeship key={result.ID} app={result} page='search' />
                ))}
            </div>
        ))
    )
}

export default Search;