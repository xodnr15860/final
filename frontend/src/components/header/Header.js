import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
       <header>
        <nav className="bg-white">
            <div className="flex justify-end items-center mx-auto max-w-screen-xl p-4 mr-2">
                <div className="flex items-center">
                    <Link to='/member/login' className="text-me hover:text-green-700 px-2">로그인</Link>
                    <Link to='/member/edit' className="text-me hover:text-green-700 px-2" >회원가입</Link>
                    <Link to='/app/cart' className="text-me hover:text-green-700 px-2" >장바구니</Link>
                    <Link to='/app/mypage' className="text-me hover:text-green-700 px-2" >마이페이지</Link>
                    <Link to='/member/login' className="text-me hover:text-green-700 px-2" >고객센터</Link>
                </div>
            </div>
        </nav>
        <div>
            <div className='logo-container'>
                <Link to='/'>
                    <img src='/logo3.png' alt='로고' className='logo'/>
                </Link>
            </div>
        </div>
        <nav className="bg-white border border-gray-400">
            <div className="max-w-screen-xl px-4 py-4 mx-auto flex justify-center">
                <div className="flex items-center">
                    <ul className="flex justify-center font-medium mt-0 space-x-32">
                        <li>
                            <Link to='/calorie' className="text-black hover:text-green-700" aria-current="page">칼로리사전</Link>
                        </li>
                        <li>
                            <Link to='/board' className="text-black hover:text-green-700" aria-current="page">일반게시판</Link>
                        </li>
                        <li>
                            <Link to='' className="text-black hover:text-green-700" aria-current="page">모임게시판</Link>
                        </li>
                        <li>
                            <Link to='' className="text-black hover:text-green-700" aria-current="page">운동용품샵</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

       </header>
    );
};
 
export default Header;