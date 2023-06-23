import { useParams } from "react-router-dom"
import { SearchResult } from "./Search";
import { useEffect, useState } from "react";

const Category = () => {
    const { Name } = useParams();
    const [apprenticeships, setApprenticeships] = useState([])

    useEffect(() => {
        fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/getCategoryApprenticeships/${Name}`)
            .then(res => res.json())
            .then(data => {
                if (!data.success) return setApprenticeships([]);
                setApprenticeships(data.apprenticeshipsWithImg);
            })
            .catch(err => {
                setApprenticeships([])
            });
    }, [Name])

    return (
        <div className='container-fluid'>
            <h1 className="text-center">{Name}</h1>
            <div className="row mt-3">
                <div className="col">
                    {!apprenticeships && <h3 className="text-center">There was an error pelase try again later or contact us </h3>}{/*In case error occurs in the server, display this message*/}
                    {apprenticeships && apprenticeships.length === 0 && <h3 className="text-center">No Apprenticeship found for {Name}</h3>} {/*In case no result found, display this message*/}
                    {apprenticeships && apprenticeships.length > 0 && <SearchResult resultList={apprenticeships} />}
                </div>
            </div>
        </div>
    )
}

export default Category