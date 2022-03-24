import React, { useState, useEffect } from 'react';
import { Nav, NavLink, NavMenu } from 'react-router-dom';
import './Navbar.css';
import logo from './images/logo.png'


function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <NavLink to='/' className='navbar-logo' onClick={closeMobileMenu}>
              CapitolGains
          <img className="navbar-logopic" src={logo} alt="logo"/>
          </NavLink>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <NavLink to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                to='/politicians'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Politicians
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                to='/about'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                About
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
