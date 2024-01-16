import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Cart from './pages/Cart';
import Book from './pages/Book';

function App() {
  const [lastScrollTop, setLastScrollTop] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const nav = document.getElementById('header');
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if(currentScrollTop > lastScrollTop){
        nav.style.opacity = '0';
      }else{
        nav.style.opacity = '1';
      }
      setLastScrollTop(currentScrollTop);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);
  return (
    <div className="App">
      <div id='top'></div>
        <Navbar/>
      <main>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/products' element={<Products/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/book/:isbn' element={<Book/>}/>
        </Routes>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
