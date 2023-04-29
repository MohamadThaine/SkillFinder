import PageNotFoundPic from '..//Assets/Images/PageNotFound.png'
import { useNavigate } from 'react-router-dom';
function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className="container desc mt-auto mb-auto text-center">
      <img src={PageNotFoundPic} className='pageNotFoundPic' />
      <h1>Page Not Found</h1>
      <h3 className='mt-3 mb-3'>Please check the URL and try again, or use the search bar to find what you're looking for.</h3>
      <button className='btn btn-primary mb-2' onClick={() => navigate(-2)}>Go Back</button>
      <button className='btn btn-primary ms-2 mb-2' onClick={() => navigate('/')}>Go Home</button>
      <button className='btn btn-primary ms-2 mb-2' onClick={() => navigate('/ContactUs')}>Contact US</button>
    </div>
  );
}

export default PageNotFound;