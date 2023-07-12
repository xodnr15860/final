import React, { useState, useEffect, useContext, useCallback } from "react";
import Pagination from "../Pagination/Pagination";
import { Link, useNavigate } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { FiMapPin } from "react-icons/fi";
import Context from "../context/sessionContext";
import axiosInstance from "../AxiosInstance";
import handleErrorResponse from "../HandleErrorResponse";

const MeetingCard = () => {
  const navigate = useNavigate();
  const { loggedIn } = useContext(Context);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMeetings = useCallback(async (page) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("http://localhost:8080/api/meet", {
        params: {
          page: page,
        },
      });
      const data = response.data;
      setMeetings(data.meetings);
      setPageInfo(data.pageInfo);
      setLoading(false);
    } catch (error) {
      handleErrorResponse(error, navigate);
      setLoading(false);
    }
  }, []);

  // 페이지 변경 시 데이터 다시 가져오기
  useEffect(() => {
    fetchMeetings(currentPage);
  }, [currentPage, fetchMeetings]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const calculatePagination = () => {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(pageInfo.maxPage, currentPage + 2);

      return {
        startPage,
        endPage,
        maxPage: pageInfo.maxPage,
        currentPage,
      };
    };

    if (Object.keys(pageInfo).length > 0) {
      const paginationInfo = calculatePagination();
      if (paginationInfo.startPage !== pageInfo.startPage || paginationInfo.endPage !== pageInfo.endPage) {
        setPageInfo(paginationInfo);
      }
    }
  }, [meetings, currentPage, pageInfo]);

  // 페이지 변경 시 호출되는 콜백 함수
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="w-full max-w-1100 min-w-1100 m-auto">
          <h1 className="text-3xl font-bold text-green-700 mt-10 border-b-2 border-green-700 mb-8">모임 게시판 </h1>
          <div className="flex flex-col items-center">
            <div className="flex justify-center mt-5">
              <div className="grid grid-cols-2 gap-20">
                {meetings.map((meeting) => (
                  <Link to={`/meet/${meeting.meetNo}`} key={meeting.meetNo}>
                    {" "}
                    <div className="rounded-lg w-[500px] shadow-xl bg-white h-40 flex items-center p-3">
                      <img src={`/api/image/${meeting.thumbnail.storeFileName}`} alt="Meeting Thumbnail" className="w-24 h-24 mx-5 rounded-lg" />
                      <div className="ml-2">
                        <div className="font-semibold text-2xl ">{meeting.meetTitle.length > 10 ? `${meeting.meetTitle.substring(0, 10)}...` : meeting.meetTitle}</div>
                        <div className="flex items-center mt-1">
                          <FiMapPin className="text-2xl items-center mt-1 text-black-500 " />
                          <span className="text-xl ml-3 ">{meeting.meetAddress}</span>
                        </div>
                        <div className="flex items-center mt-1">
                          <VscAccount className="text-2xl mt-1 text-black-500 " />
                          <span className="text-xl ml-3 ">{`${meeting.application}/${meeting.meetTotal}`}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="relative">
        {pageInfo && Object.keys(pageInfo).length > 0 && <Pagination pageInfo={pageInfo} onPageChange={handlePageChange} />}

        <div className="text-right">
          {loggedIn && (
            <Link to="/meet/write">
              <button className="focus:outline-none  text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 mb-8 mt-2  mr-[420px] dark:bg-green-600 dark:hover:bg-green-700">모임 만들기</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
export default MeetingCard;
