import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../resources/img/dark.png';
import { useSignedIn } from '../context/stateContext';
import SignIn from './SignIn';
import SignUp from './SignUp';
import apiURL from '../apiConfig';

const Navbar = () => {
    const {loading, signedIn, setSignedIn} = useSignedIn();
    const navigate = useNavigate();
    const [signInShow, setSignInShow] = useState(false);
    const [signUpShow, setSignUpShow] = useState(false);
    useEffect(() => {
        if (!signInShow && !signUpShow) {
            document.body.style.overflow = 'auto';
        }
        
        document.body.style.overflow = 'auto';
    
        if (signInShow || signUpShow) {
          document.body.style.overflow = 'hidden';
        }
    
        return () => {
          document.body.style.overflow = 'auto';
        }
      }, [signInShow, signUpShow]);

     /* const handleLogOut = () => {
        fetch(`${apiURL}/logout`)
            .then(res => {
                setSignedIn(res.json().logged)
                navigate('/');
            });
      }*/
      const handleLogOut = () => {
        fetch(`${apiURL}/logout`, {
            method: "GET",
            credentials: "include",
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(res => {
                setSignedIn(res.json().logged)
                navigate('/');
            });
      }
  return (
    <div>
        <header className="App-header" id='header'>
            <nav className="navbar navbar-expand-md navbar-dark bg-transparet fixed-top">
                <div className="container d-flex justify-content-space-between align-items-center pb-2 border-md border-bottom ">
                    <img src={logo} alt="Kitab logo" width={150} height={50}/>
                    <button className="navbar-toggler shaddow-none border-0" id="toggle" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="sidebar offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <img src={logo} alt="Kitab logo" width={150} height={50}/>
                        <button type="button" className="btn-close color-white shadow-none" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body d-flex justify-content-center align-items-center flex-column flex-md-row">
                        <ul className="navbar-nav justify-content-center align-items-md-center fs-5 flex-grow-1 gap-3 pe-3">
                            <li className="nav-item">
                                <Link className="link text-decoration-none" to='/'>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="link text-decoration-none" to="/products">All Products</Link>
                            </li>
                            {(signedIn && !loading) && <li className="nav-item">
                                 <Link className="link text-decoration-none" to="/cart">
                                    <i className='bi bi-cart d-none d-md-block'></i>
                                    <span className='d-md-none'>View Cart</span>
                                </Link>
                            </li>
                            }
                        </ul>
                        <form className="d-flex flex-column flex-md-row flex-lg-row p-4 justify-content-center align-items-center gap-3" role="search">
                            {(signedIn && !loading) ? 
                            <button className="btn auth" type="button" onClick={() => handleLogOut()}>LogOut</button> :
                            <>
                                <button className="btn auth" type="button" onClick={() => setSignInShow(true)} data-bs-dismiss="offcanvas" aria-label="Close">SignIn</button>
                                <button className="btn auth" type="button" onClick={() => setSignUpShow(true)} data-bs-dismiss="offcanvas" aria-label="Close">SignUp</button>
                            </>
                            }
                        </form>
                    </div>
                    </div>
                </div>
            </nav>
        </header>
        <SignIn show={signInShow} onHide={() => setSignInShow(false)} signup={() => setSignUpShow(true)}/>
        <SignUp show={signUpShow} onHide={() => setSignUpShow(false)}/>
    </div>
  )
}
export default Navbar;