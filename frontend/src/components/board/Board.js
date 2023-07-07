import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Board = () => {
  const [boardData, setBoardData] = useState([]);
  const [pageInfo, setPageInfo] = useState('');

  const navigate = useNavigate();

  const onClickBoardEdit = () => {
    navigate('/board/detail');
  }

  const today = new Date().toISOString().substring(0, 10);

  useEffect(() => {
    axiosBoardData();
  }, []);

  const axiosBoardData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/free');
      setBoardData(response.data.freeBoards);
      setPageInfo(response.data.pageInfo);
    } catch (error) {
      console.error('Error fetching board data:', error);
    }
  };

  useEffect(() => {
    // console.log(boardData);
  }, [boardData]);

  useEffect(() => {
    // console.log(page);
  }, [pageInfo]);

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
              <td className="border-y px-4 py-2 text-center">{freeBoard.freeTitle}</td>
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

      <div className='text-right'>
        <button onClick={onClickBoardEdit} className='focus:outline-none text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-8 mt-8 dark:bg-green-600 dark:hover:bg-green-700'>글쓰기</button>
      </div>
    </div>
  );
};

export default Board;
