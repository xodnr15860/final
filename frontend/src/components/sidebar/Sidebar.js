import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-white h-screen w-56 flex flex-col items-center">
      <ul className="flex flex-col items-start space-y-5 mt-6">
        <li>
          <h2 className="px-4 py-2 rounded-lg transition-colors duration-200 font-extrabold text-xl">마이페이지</h2>
        </li>
        <li>
          <Link
            to="/"
            className=" hover:text-green-700 font-bold px-4 py-2 rounded-lg transition-colors duration-200"
          >
            목표 설정
          </Link>
        </li>
        <li>
          <Link
            to="/member/mypage"
            className=" hover:text-green-700 font-bold px-4 py-2 rounded-lg transition-colors duration-200"
          >
            내 정보 수정
          </Link>
        </li>
        <li>
          <Link
            to="/"
            className=" hover:text-green-700 font-bold px-4 py-2 rounded-lg transition-colors duration-200"
          >
            게시글 목록
          </Link>
        </li>
        <li>
          <Link
            to="/"
            className=" hover:text-green-700 font-bold px-4 py-2 rounded-lg transition-colors duration-200"
          >
            모임 목록
          </Link>
        </li> 
        <li>
          <Link
            to="/"
            className=" hover:text-green-700 font-bold px-4 py-2 rounded-lg transition-colors duration-200"
          >
            To do List
          </Link>
        </li>
        {/* <li>
          <Link
            to="/app/mypage/order_list_opt"
            className=" hover:text-green-700 font-bold px-4 py-2 rounded-lg transition-colors duration-200"
          >
            주문내역
          </Link>
        </li> */}
        {/* Add more sidebar links as needed */}
      </ul>
    </div>
  );
};

export default Sidebar;
