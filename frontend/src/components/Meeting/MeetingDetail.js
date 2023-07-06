import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MeetingDetail = ({ meetNo }) => {
  const hardcodedProduct = {
    meetNo: 1,
    thumbnail: { uploadFileName: "/logo3.png" },
    meetTitle: "모임 1",
    meetContent: "모임 1 내용",
    meetAddress: "서울",
    application: 10,
    meetTotal: 20,
  };

  const [meeting, setMeeting] = useState([hardcodedProduct]);

  useEffect(() => {
    // axios
    //   .get(`http://localhost:8080/member/meet/${meetNo}`)
    //   .then((res) => {
    //     if (res.status === 200) {
    //       const data = res.data;
    //       setMeeting(data.meeting);
    //     }
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching meeting data:', error);
    //   });
  }, []);

  return (
    <div className="relative">
      <div className="shadow-2xl border border-gray-200 h-screen mt-10 mb-10 m-auto justify-center rounded-3xl w-[800px] bg-gray-200">
        <div>
          {meeting.map((meeting) => (
            <div key={meeting.meetNo}>
              <img src={meeting.thumbnail.uploadFileName} alt="Meeting Thumbnail" className="h-60 m-auto justify-center rounded-t-3xl w-[800px]" />
              <div className=" h-20 mx-auto absolute top-[200px] left-0 right-0 bottom-0 justify-center w-[660px] rounded-3xl bg-white border-4 border-black">
                <span className="text-3xl flex justify-center mt-4">{meeting.meetTitle}</span>
              </div>
              <div className="mt-40">
                <span>모임 이름</span>
                <br></br>
                <p>{meeting.meetContent}</p>
                <p>{meeting.meetAddress}</p>
                <p>{meeting.application}</p>
                <p>{meeting.meetTotal}</p>
                <button>
                  <Link to=""></Link>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MeetingDetail;
