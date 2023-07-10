import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Board = () => {
  const [boardData, setBoardData] = useState([]);
  const [pageInfo, setPageInfo] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const memberNo = sessionStorage.getItem('memberNo');

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  // const perPage = 20;
  // const maxPages = 10;

  // 현재 페이지 데이터 계산
  // const indexOfLastItem = pageInfo.currentPage * pageInfo.boardLimit;
  // const indexOfFirstItem = indexOfLastItem - pageInfo.boardLimit;
  // const currentItems = searchData.slice(indexOfFirstItem, indexOfLastItem);

  // 전체 페이지 수 계산
  // const totalPages = Math.ceil(response.data.length / perPage);

  // 페이징 버튼 배열 생성
  // const pageNumbers = [];
  // const visiblePages = Math.min(maxPages, totalPages);
  // const pageOffset = (Math.ceil(currentPage / maxPages) - 1) * maxPages;

  // let startPage = 1 + pageOffset;
  // let endPage = Math.min(startPage + visiblePages - 1, totalPages);

  // for (let i = startPage; i <= endPage; i++) {
  //     pageNumbers.push(i);
  // }


  const onClickBoardEdit = () => {
    navigate('/board/edit');
  }

  const today = new Date().toISOString().substring(0, 10);

  useEffect(() => {
    axiosBoardData();
  }, [currentPage]);

  const axiosBoardData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/free', {
        params: {
          page: currentPage
        }
      });
      setBoardData(response.data.freeBoards);
      setPageInfo(response.data.pageInfo);
    } catch (error) {
      console.error('Error fetching board data:', error);
    }
  };

  const onClickBoardDetail = (freeNo) => {
    navigate(`/board/detail/${freeNo}`);
  };

  useEffect(() => {
    // console.log(boardData);
  }, [boardData]);

  useEffect(() => {
    // console.log(page);
  }, [pageInfo]);

  const totalPages = Math.ceil(pageInfo.listCount / pageInfo.boardLimit);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);


  return (
    <div className="w-full max-w-1100 min-w-1100 m-auto mb-10">
      <h1 className="text-3xl font-bold text-green-700 mt-10 border-b-2 border-green-700 mb-8">일반게시판</h1>
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
              <td className="border-y px-4 py-2 text-center cursor-pointer" onClick={() => onClickBoardDetail(freeBoard.freeNo)}>{freeBoard.freeTitle}</td>
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
            
        <ul className="w-full inline-flex items-center justify-center -space-x-px pt-10">
           
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
                    currentPage === pageNumber ? "z-10 border-blue-300 bg-green-200 hover:bg-green-400" : ""
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

        
      

      {memberNo && (
      <div className='text-right'>
        <button onClick={onClickBoardEdit} className='focus:outline-none text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-8 mt-8 dark:bg-green-600 dark:hover:bg-green-700'>글쓰기</button>
      </div>
      )}
    </div>

  

  );
};

export default Board;
