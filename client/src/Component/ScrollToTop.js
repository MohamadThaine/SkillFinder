import { useEffect } from 'react';
import arrowUp from '../Assets/Images/arrow-up.svg'
import '../Assets/Styles/ScrollToTop.css'
import useOnScreen from '../Hooks/useOnScreen';

function ScrollToTop({viewRef}){
    const isViewVisable = useOnScreen(viewRef)
    const scrollToTop = () => {
        window.scrollTo(0,0);
    }

    useEffect(() => {
        const onScroll = () => {
            if(!isViewVisable){
                document.querySelector('.scroll-to-top').classList.add('show-scroll-to-top');
                setTimeout(() => {
                    document.querySelector('.scroll-to-top').classList.remove('show-scroll-to-top');
                    document.querySelector('.scroll-to-top').classList.add('hover-to-show');
                }, 1500)
            }else{
                document.querySelector('.scroll-to-top').classList.remove('show-scroll-to-top');
                document.querySelector('.scroll-to-top').classList.remove('hover-to-show');
            }
        }

        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    })

    return<button className="scroll-to-top d-flex" onClick={scrollToTop}>
            <img src={arrowUp} alt="arrow-up" />
        </button>
}

export default ScrollToTop;