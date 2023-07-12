import axiosInstance from "../AxiosInstance";
import handleErrorResponse from "../HandleErrorResponse";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { FiMapPin } from "react-icons/fi";

const MeetingDetail = () => {
  const navigate = useNavigate();
  const nickname = sessionStorage.getItem("nickname");
  const memberNo = sessionStorage.getItem("memberNo");

  const { meetNo } = useParams();
  const [meeting, setMeeting] = useState({});
  const [user, setUser] = useState({});
  const [isEnrolled, setIsEnrolled] = useState(false);

  const delMeeting = () => {
    const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");

    if (confirmDelete) {
      axiosInstance
        .delete(`http://localhost:8080/api/meet/${meetNo}`)
        .then(() => {
          alert("모임이 삭제되었습니다.");
          navigate("/meet");
        })
        .catch((error) => {
          console.error("모임 삭제 중 오류 발생:", error);
          handleErrorResponse(error, navigate);
        });
    }
  };

  useEffect(() => {
    axiosInstance
      .get(`http://localhost:8080/api/meet/${meetNo}`)
      .then((res) => {
        if (res.status === 200) {
          const data = res.data;
          console.log(data);
          setMeeting(data.meeting);
          setUser(data.applicationList);
          const isEnrolled = data.applicationList.some((user) => user.memberNo === Number(memberNo));
          setIsEnrolled(isEnrolled);
        }
      })
      .catch((error) => {
        console.error("모임 데이터를 가져오는 중 오류 발생:", error);
        handleErrorResponse(error, navigate);
      });
  }, [meetNo]);

  useEffect(() => {
    axiosInstance
      .post(`http://localhost:8080/api/meet/${meetNo}/application`)
      .then((res) => {})
      .catch((error) => {
        console.error("모임 데이터 패치 실패", error);
        handleErrorResponse(error, navigate);
      });
  }, [meetNo]);

  const enMeet = () => {
    if (!isEnrolled) {
      setIsEnrolled(true);
      window.open(meeting.openKakao);
      const requestBody = new URLSearchParams();
      requestBody.append("memberNo", memberNo);
      axiosInstance({
        method: "post",
        url: `http://localhost:8080/api/meet/${meetNo}/join`,
        data: requestBody.toString(),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
        .then((res) => {
          if (res.status === 200) {
            axiosInstance
              .get(`http://localhost:8080/api/meet/${meetNo}`)
              .then((res) => {
                if (res.status === 200) {
                  const data = res.data;
                  setMeeting(data.meeting);
                  setUser(data.applicationList);
                }
              })
              .catch((error) => {
                console.error("모임 데이터를 가져오는 중 오류 발생:", error);
                handleErrorResponse(error, navigate);
              });
            console.log("가입 완료");
          }
        })
        .catch((error) => {
          handleErrorResponse(error, navigate);
          console.log("오류 발생");
        });
    } else {
      setIsEnrolled(false);
      const requestBody = new URLSearchParams();
      requestBody.append("memberNo", memberNo);
      axiosInstance({
        method: "delete",
        url: `http://localhost:8080/api/meet/${meetNo}/join`,
        data: requestBody.toString(),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
        .then((res) => {
          if (res.status === 200) {
            axiosInstance
              .get(`http://localhost:8080/api/meet/${meetNo}`)
              .then((res) => {
                if (res.status === 200) {
                  const data = res.data;
                  setMeeting(data.meeting);
                  setUser(data.applicationList);
                }
              })
              .catch((error) => {
                console.error("모임 데이터를 가져오는 중 오류 발생:", error);
                handleErrorResponse(error, navigate);
              });
            console.log("취소 완료");
          }
        })
        .catch((error) => {
          console.log("오류 발생");
          handleErrorResponse(error, navigate);
        });
    }
  };

  return (
    <div className="relative">
      <div className="shadow-2xl border border-gray-200 h-screen mt-10 mb-10 m-auto justify-center rounded-3xl w-[800px] bg-green-100">
        <div>
          {meeting && meeting.thumbnail && (
            <div key={meeting.meetNo}>
              <img src={`/api/image/${meeting.thumbnail.storeFileName}`} alt="Meeting Thumbnail" className="h-60 m-auto justify-center rounded-t-3xl w-[800px]" />
              <div className=" h-20 mx-auto absolute top-[200px] left-0 right-0 bottom-0 justify-center w-[660px] rounded-3xl bg-white border-2 border-black">
                <span className="flex justify-center mt-1">{meeting.nickname}</span>
                <span className="text-2xl flex justify-center mt-1">{meeting.meetTitle}</span>
              </div>
              <div className="mt-40 ml-20">
                <br></br>
                <p className="text-2xl mb-5">{meeting.meetContent}</p>
                <div className="flex items-center mt-60">
                  <FiMapPin className="text-2xl items-center mt-1 text-black-500 " />
                  <span className="text-xl ml-3 ">{meeting.meetAddress}</span>
                </div>
                <div className="flex items-center mt-1">
                  <VscAccount className="text-2xl mt-1 text-black-500 " />
                  <span className="text-xl ml-3 ">{`${meeting.application}/${meeting.meetTotal}`}</span>
                </div>
                <div className="absolute bottom-4 right-4 flex space-x-2">
                  {meeting.nickname === nickname ? (
                    <div className="space-x-4">
                      <Link to={`/meet/${meeting.meetNo}/edit`} key={meeting.meetNo}>
                        <button className="focus:outline-none text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700">수정</button>
                      </Link>
                      <button onClick={delMeeting} className="focus:outline-none text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700">
                        삭제
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      {!isEnrolled ? (
                        <button onClick={enMeet} className="focus:outline-none text-white bg-green-600 hover:bg-green-700 font-medium mb-10 h-10 mr-[500px] m-auto rounded-3xl w-[400px] dark:bg-green-600 dark:hover:bg-green-700">
                          가입 신청
                        </button>
                      ) : (
                        <button onClick={enMeet} className="focus:outline-none text-white bg-red-600 hover:bg-red-700 font-medium mb-10 h-10 mr-[500px] m-auto rounded-3xl w-[400px] dark:bg-red-600 dark:hover:bg-red-700">
                          신청 취소
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeetingDetail;
