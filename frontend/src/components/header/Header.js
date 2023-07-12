import React, {useContext} from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Context from '../context/sessionContext';

const Header = () => {
    
    const { setLoggedUser, admin, setAdmin, setLoggedIn, loggedIn, nickname } = useContext(Context);

    useEffect(() => {
        const user = sessionStorage.getItem('nickname')
        const isAdminCheck = sessionStorage.getItem('admin');
        if (user) {
            setLoggedUser(user)
            setLoggedIn();
            setAdmin(isAdminCheck)
        }
    }, [loggedIn])

    const onClickLogout = () =>{
        sessionStorage.clear();
        window.location.href = '/';
    }

    const onClickMyPage = () => {
        const memberNo = sessionStorage.getItem('memberNo');
        if(!memberNo) {
            alert('로그인 후 이용부탁드립니다.');
            window.location.href = '/member/login';
        }
    }

    const onClickCalorie = () => {
        window.location.href = '/calorie';
    }

    return (
       <header>
        <nav className="bg-white">
            <div className="flex justify-end items-center mx-auto p-4 mr-2 min-w-1600">
                <div className="flex items-center">
                {/* 로그인이 되어 있을 경우 */}
                {loggedIn ? admin === 'Y' ? (
                    <>
                        <span className='px-2'>{nickname}님 환영합니다.</span>
                        <Link to='/admin' className="text-me hover:text-green-700 px-2" >관리자페이지</Link>
                        {/* <Link to='/app/cart' className="text-me hover:text-green-700 px-2" >장바구니</Link> */}
                        <Link to='/member/mypage' className="text-me hover:text-green-700 px-2" >마이페이지</Link>
                        {/* <Link to='/member/login' className="text-me hover:text-green-700 px-2" >고객센터</Link> */}
                        <Link to='/' onClick={onClickLogout} className="text-me hover:text-green-700 px-2" >로그아웃</Link>
                    </>
                ) : (
                    <>
                        <span className='px-2'>{nickname}님 환영합니다.</span>
                        {/* <Link to='/app/cart' className="text-me hover:text-green-700 px-2" >장바구니</Link> */}
                        <Link to='/member/mypage' className="text-me hover:text-green-700 px-2" >마이페이지</Link>
                        {/* <Link to='/member/login' className="text-me hover:text-green-700 px-2" >고객센터</Link> */}
                        <Link to='/' onClick={onClickLogout} className="text-me hover:text-green-700 px-2" >로그아웃</Link>
                    </>
                ) : (
                    <>
                        <Link to='/member/login' className="text-me hover:text-green-700 px-2">로그인</Link>
                        <Link to='/member/register' className="text-me hover:text-green-700 px-2" >회원가입</Link>
                        {/* <Link to='/app/cart' className="text-me hover:text-green-700 px-2" >장바구니</Link> */}
                        <Link to='/member/mypage' onClick={onClickMyPage} className="text-me hover:text-green-700 px-2" >마이페이지</Link>
                        {/* <Link to='/member/login' className="text-me hover:text-green-700 px-2" >고객센터</Link> */}
                    </>
                )}

                {/* 로그인이 되어 있지 않은 경우 */}
                {/* {!login && (
                )} */}
                </div>
            </div>
        </nav>
        <div>
            <div className='logo-container min-w-900'>
                <Link to='/'>
                    <img src='/logo3.png' alt='로고' className='logo'/>
                </Link>
            </div>
        </div>

        <nav className="bg-white border border-gray-400">
            <div className="max-w-screen-xl min-w-900 px-4 py-4 mx-auto flex justify-center">
                <div className="flex items-center">
                    <ul className="flex justify-center font-medium mt-0 space-x-32">
                        <li>
                            <Link to='/calorie' onClick={onClickCalorie} className="text-black hover:text-green-700" aria-current="page">칼로리사전</Link>
                        </li>
                        <li>
                            <Link to='/calorie/prescription' className="text-black hover:text-green-700" aria-current="page">칼로리처방</Link>
                        </li>
                        <li>
                            <Link to='/board' className="text-black hover:text-green-700" aria-current="page">일반게시판</Link>
                        </li>
                        <li>
                            <Link to='/meet' className="text-black hover:text-green-700" aria-current="page">모임게시판</Link>
                        </li>
                        {/* <li>
                            <Link to='/shop' className="text-black hover:text-green-700" aria-current="page">운동용품샵</Link>
                        </li> */}
                    </ul>
                </div>
            </div>
        </nav>

       </header>
    );
};
 
export default Header;