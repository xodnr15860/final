import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Board = () => {
  const [boardData, setBoardData] = useState([]);

  useEffect(() => {
    fetchBoardData();
  }, []);

  const fetchBoardData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/free');
      setBoardData(response.data.freeBoards);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching board data:', error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">게시판 목록</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">번호</th>
            <th className="px-4 py-2">제목</th>
            <th className="px-4 py-2">작성자</th>
            <th className="px-4 py-2">작성일자</th>
          </tr>
        </thead>
        <tbody>
          {boardData.map((freeBoard) => (
            <tr key={freeBoard.freeNo}>
              <td className="border px-4 py-2">{freeBoard.freeNo}</td>
              <td className="border px-4 py-2">{freeBoard.freeTitle}</td>
              <td className="border px-4 py-2">{freeBoard.nickname}</td>
              <td className="border px-4 py-2">{freeBoard.freeCreateDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Board;
