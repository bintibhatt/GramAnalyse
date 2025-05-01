import React from 'react';
import Image from 'next/image';
import headerIcon from '@/../public/icon.png';

const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <div className="header__branding">
                    <Image src={headerIcon} alt="GramAnalyse Icon" className="header__icon" />
                    <h1 className="header__title">GramAnalyse</h1>
                </div>
                <nav className="header__nav">
                    <ul className="header__menu">
                        <li><a href="#home" className="header__link">Home</a></li>
                        <li><a href="#about" className="header__link">About</a></li>
                        <li><a href="#contact" className="header__link">Contact</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
