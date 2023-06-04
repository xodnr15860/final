import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className='header-container'>
            <nav>
                <ul className='nav-bar'>
                    <li><Link to='/login'>로그인</Link></li>
                    <li><Link to='/edit'>회원가입</Link></li>
                    <li><Link to='/cart'>장바구니</Link></li>
                    <li><Link to='/myPage'>마이페이지</Link></li>
                    <li><Link to='/customerService'>고객센터</Link></li>
                </ul>
            </nav>
            <hr/>
            <Link to='/'>
                <div className='logo'>
                  <img src='/logo.png' alt='로고' />
                </div>
            </Link>

        </header>
    );
};
 
export default Header;