import { useNavigate } from 'react-router-dom';
import logo from '../resources/img/dark.png';
import './styles/Home.css';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';

const Home = () => {
    const [ref, inView] = useInView();
    const [ref1, inView1] = useInView();
    const [ref2, inView2] = useInView();
    const [ref3, inView3] = useInView();
    const [ref4, inView4] = useInView();

    const navigate = useNavigate();
    const [quote, setQuote] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch("https://api.api-ninjas.com/v1/quotes?category=knowledge", {
            headers: {
                'X-Api-Key': 'JAyhIZq2mgUFK12muUIw+w==KgsSJSVaH5rzVIeF',
            }
        }).then(response => {
            return response.json()
        }).then(data => {
            setQuote(data);
            setTimeout(() => setLoading(false), 2000);
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
    }, []);
    return(
        <>
            <div className="background container-fluid d-flex justify-content-center align-items-center min-vh-100"> 
                <div className='intro d-flex flex-column justify-content-center align-items-center '>
                    <img className="img-fluid mx-auto d-block position-sticky" src={logo} alt='Kitab Logo' width={700} height={300}/>
                </div>
            </div>
            <div className="container-fluid text-center p-3 bg-dark border-top border-bottom">
                <div className="col d-flex flex-columns justify-content-center align-items-center p-5">
                    <div className='mt-3 text-justify container-fluid'>
                        <i className="bi bi-quote h1"></i><br/>
                            {loading ?   
                                <div className="card-text container text-center quote-Load placeholder-glow">
                                    <span className="placeholder col-12 placeholder-lg mb-2"></span>
                                    <span className="placeholder col-8 placeholder-lg mb-2"></span>
                                    <span className="placeholder col-6 placeholder-lg"></span>
                                </div>
                                : 
                                <p className='h2 '>
                                    <TypeAnimation
                                        sequence={['', 0, quote[0].quote, 1000]}
                                        speed={50}
                                        omitDeletionAnimation={true}
                                        cursor={true}/>
                                </p>
                            }
                        <i className="bi bi-quote h1"></i>
                        <p className='h5 text-center'>
                            {loading ?
                                <div className="card-text quote-Load placeholder-glow">
                                    <span className="placeholder col-3 placeholder-md"></span>
                                </div> 
                                : 
                                <TypeAnimation
                                    sequence={['', 0, quote[0].author, 1000]}
                                    speed={20}
                                    omitDeletionAnimation={true}
                                    cursor={false}/>
                            }
                        </p>
                    </div>
                </div>
            </div>
            <div ref={ref4} className='container-fluid text-center pt-4' >
                <div className={`row mb-4 ${inView4 && 'animate-down1'}`}>
                    <div className="card text-center bg-transparent text-white">
                        <div className="card-header h2 fw-bold ">
                            Kitab Store
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">You Can Order Now</h5>
                            <p className="card-text h3 me-5 pe-4">يمكنك الطلب الان</p>
                                <div className='animate-arrow'><i className="bi bi-arrow-bar-down h1"></i></div>
                        </div>
                    </div>
                </div>
                <div className='row p-2 p-md-0 mx-md-1 mx-lg-0 gap-3 gap-lg-5 justify-content-center mb-5'>
                    <div ref={ref1} className={`col col-12 col-lg-4 rounded-2 bg-dark  category ${inView1 && 'animate-down1'}`} onClick={() => navigate('/products', {state: {cat: 'fiction'}})}>
                        <div className='d-flex justify-content-center align-items-center border-bottom gap-2 text-bold'><div className='fs-2'>Fiction</div><i className="bi bi-arrow-right white"></i></div>
                        <p className='mt-2'>Immerse yourself in captivating worlds of imagination and storytelling.</p>
                    </div>
                    <div ref={ref2} className={`col col-12 col-lg-4 rounded-2 bg-dark  category ${inView2 && 'animate-down2'}`} onClick={() => navigate('/products', {state: {cat: 'non-fiction'}})}>
                    <div className='d-flex justify-content-center align-items-center border-bottom gap-1 text-bold '><div className='fs-2 no-wrap'>Non-Fiction</div><i className="bi bi-arrow-right white"></i></div>
                        <p className='mt-2'>Explore the realms of reality with informative and factual narratibves.</p>
                    </div>
                    <div ref={ref3} className={`col col-12 col-lg-3 rounded-2 bg-dark  category ${inView3 && 'animate-down3'}`} onClick={() => navigate('/products', {state: {cat: 'self-help'}})}>
                    <div className='d-flex justify-content-center align-items-center border-bottom gap-2 text-bold '><div className='fs-2 no-wrap'>Self-Help</div><i className="bi bi-arrow-right white"></i></div>
                        <p className='mt-2'>Empower your personal growth with practical insights and guidance.</p>
                    </div>
                </div>
                <div id="about" className="text-center bg-dark p-2 mb-3">
                    <div ref={ref} className={`col d-flex flex-column justify-content-center align-items-center gap-3 p-3 ${inView && 'animate-up'}`}>
                        <div>
                                <h1>About Us</h1>
                        </div>
                        <p className='text-justify'>Welcome to our online Store, where the love for literature meets the convenience of modern shopping. At <i className='h5'>Kitab</i>, we're passionate about connecting readers with captivating stories, insightful knowledge, and literary treasure. Our curated collection spans genres from timeless classics to contemporary bestsellers, ensuring there's a book for every taste and interest.</p>
                    </div>
                </div>
                <div className={`go-top ${inView4 && 'animate-top'}`}><a className="h1" href='#top'><i className='bi bi-arrow-up-square'></i></a></div>
            </div> 
        </>
    )
}
export default Home;