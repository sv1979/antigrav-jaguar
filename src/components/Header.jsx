import React from 'react';
import '../styles/header.scss';
import logo from '../assets/logo.svg';

const Header = () => {
    return (
        <header className="app-header">
            <div className="container">
                <img src={logo} alt="Jaguar" className="logo" />
            </div>
        </header>
    );
};

export default Header;
