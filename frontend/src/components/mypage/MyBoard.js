import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const MyBoard = () => {
  const [boardData, setBoardData] = useState([]);
  const [pageInfo, setPageInfo] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const navigate = useNavigate();
  
  const fetchData = async () => {
      try {
          const response = await axios.get(`http://localhost:8080/api/my-page/free/${memberNo}`, {
              params: {
                  page: currentPage
                }
            });
            console.log(response);
            setBoardData(response.data.freeBoards);
            setPageInfo(response.data.pageInfo);
        } catch (error) {
            console.error(error);
        }
    };
    
    useEffect(() => {
      fetchData();
    }, [currentPage]);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
  }, [boardData]);

  useEffect(() => {
  }, [pageInfo]);


  const today = new Date().toISOString().substring(0, 10);
  const memberNo = sessionStorage.getItem('memberNo');

  const totalPages = Math.ceil(pageInfo.listCount / pageInfo.boardLimit);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className='w-full max-w-1100 m-auto mt-6 ml-40'>
      <h1 className="text-3xl font-bold text-green-700 border-b-2 border-green-700 mb-8">내 게시물 목록</h1>

      <table className="w-full">
        <thead>
          <tr>
            <th className="px-0 py-2">번호</th>
            <th className="px-40 py-2">제목</th>
            <th className="px-4 py-2">작성자</th>
            <th className="px-2 py-2">작성일자</th>
          </tr>
        </thead>
        <tbody>
          {boardData.map((freeBoard) => (
            <tr key={freeBoard.freeNo}>
              <td className="border-y px-4 py-2 text-center">{freeBoard.freeNo}</td>
              <td className="border-y px-4 py-2 text-center cursor-pointer" onClick={() => navigate(`/board/detail/${freeBoard.freeNo}`)}>{freeBoard.freeTitle}</td>
              <td className="border-y px-4 py-2 text-center">{freeBoard.nickname}</td>
              <td className="border-y px-4 py-2 text-center">
                {new Date(freeBoard.freeCreateDate).toLocaleString("ko-KR", {
                  timeZone: "Asia/Seoul",
                  ...(freeBoard.freeCreateDate.substring(0, 10) === today
                    ? { hour: "2-digit", minute: "2-digit", hour12: false }
                    : { dateStyle: "short" })
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav aria-label="Page navigation">
            
            <ul className="w-full inline-flex items-center justify-center -space-x-px pt-10 mb-10">
               
                {/* 이전 페이지 버튼 */}
                {currentPage > 1 && (
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    className="bg-white border border-gray-300 rounded-l-lg px-3 py-2 hover:bg-gray-100 dark:border-gray-700">
                    <span className="sr-only">이전</span>
                    <svg
                        aria-hidden="true"
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                    ></path>
                    </svg>
                </button>
                )}
    
                {/*페이징 버튼 렌더링 */}
                {pageNumbers.map((pageNumber) => (
                <li key={pageNumber}>
                    <p
                    className={`px-3 py-2 leading-tight bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 ${
                        currentPage === pageNumber ? "z-10 border-blue-300 bg-green-400 hover:bg-green-400" : ""
                    }`}
                    onClick={() => onPageChange(pageNumber)}
                    >
                    {pageNumber}
                    </p>
                </li>
                ))}
    
                {/* 다음 페이지 버튼 */}
                {pageInfo.currentPage < totalPages && (
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        className="bg-white border border-gray-300 rounded-r-lg px-3 py-2 hover:bg-gray-100 dark:border-gray-700">
                            <span className="sr-only">다음</span>
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fillRule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clipRule="evenodd">
                                    </path>
                                </svg>
                    </button>
                )}
    
                </ul>
              </nav>




    </div>



  );
};

export default MyBoard;
