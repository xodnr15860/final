import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '../Pagination/Pagination';
import { Link } from 'react-router-dom';

  const MeetingCard = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageInfo, setPageInfo] = useState({});
    const [meetings, setMeetings] = useState([]);
  
    const fetchMeetings = async (page) => {
      try {
        const response = await axios.get("http://localhost:8080/meet", {
          params: {
            page: page,
          },
        });
        const data = response.data;
        setPageInfo(data.pageInfo);
        setMeetings(data.meetings);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const hardcodedProduct = {
      meetNo: 1,
      thumbnail: { uploadFileName: "./logo.png" },
      meetTitle: "모임 1",
      meetContent: "모임 1 내용",
      meetAddress: "서울",
      application: 10,
      meetTotal: 20,
    };
  
    useEffect(() => {
      setMeetings([hardcodedProduct]); // 더미 데이터 ( 추후 삭제 )
      fetchMeetings(currentPage);
    }, [currentPage]);
  
      // 페이지 변경 시 호출되는 콜백 함수
      const handlePageChange = (page) => {
        setCurrentPage(page);
      };
    
      const calculatePagination = () => {
        const meetingsPerPage = 10;
        const totalPages = Math.ceil(meetings.length / meetingsPerPage);
        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, currentPage + 2);
    
        return {
          startPage,
          endPage,
          maxPage: totalPages,
          currentPage,
        };
      };
    
    const paginationInfo = calculatePagination();
    return (
      <div>
        <div className="flex justify-center mt-40">
          <div className="grid grid-cols-2 gap-20">
            {meetings.map((meeting) => (
              <Link to={`/meet/${meeting.meetNo}`}>
              <div className="bg-white rounded-lg w-96  h-40 border shadow-sm flex items-center p-3" key={meeting.meetNo}>
                <img src={meeting.thumbnail.uploadFileName} alt="Meeting Thumbnail" className=" w-24 h-24 mx-5 rounded-lg" />
                <div className="ml-2">
                  <div className="font-semibold text-lg">
                    {meeting.meetTitle.length > 20 ? `${meeting.meetTitle.substring(0, 20)}...` : meeting.meetTitle}
                  </div>
                  <div className="text-sm text-gray-500 flex items-center">{meeting.meetAddress}</div>
                  <div className="flex items-center mt-1">
                    <div className="text-xs text-gray-500">
                      {`${meeting.application}/${meeting.meetTotal}`}
                    </div>
                  </div>
                </div>
              </div>
              </Link>
            ))}
          </div>
        </div>
        {pageInfo && Object.keys(pageInfo).length > 0 && (
          <Pagination pageInfo={paginationInfo} onPageChange={handlePageChange} />
        )}
      </div>
    );
    };
    export default MeetingCard;