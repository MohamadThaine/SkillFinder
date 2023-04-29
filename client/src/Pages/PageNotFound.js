import PageNotFoundPic from '..//Assets/Images/PageNotFound.png'
import { useNavigate } from 'react-router-dom';
function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className="container desc mt-auto mb-auto text-center">
      <img src={PageNotFoundPic} className='pageNotFoundPic' />
      <h1>Page Not Found</h1>
      <h3 className='mt-3'>Please check the URL and try again, or use the search bar to find what you're looking for.</h3>
      <button className='btn btn-primary' onClick={() => navigate(-2)}>Go Back</button>
    </div>
  );
}

export default PageNotFound;