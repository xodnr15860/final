import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className='header-container'>
            <nav>
                <ul className='header-navbar'>
                    <li><Link to='/login'>로그인</Link></li>
                    <li><Link to='/edit'>회원가입</Link></li>
                    <li><Link to='/cart'>장바구니</Link></li>
                    <li><Link to='/myPage'>마이페이지</Link></li>
                    <li><Link to='/customerService'>고객센터</Link></li>
                </ul>
            </nav>
            <div>
                 <div className='logo-container'>
                    <Link to='/'>
                      <img src='/아이유.webp' alt='로고' className='logo'/>
                    </Link>
                </div>
            </div>
            <hr/>
            <div>
                <ul className='header-category'>
                    <li><Link to='/calorieDic'>칼로리사전</Link></li>
                    <li><Link to='/'>일반게시판</Link></li>
                    <li><Link to='/'>모임게시판</Link></li>
                    <li><Link to='/goodsShop'>운동용품샵</Link></li>
                    <li><Link to='/'></Link></li>
                </ul>
            </div>
            <hr/>
        </header>
    );
};
 
export default Header;