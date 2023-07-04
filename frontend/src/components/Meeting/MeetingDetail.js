import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const MeetingDetail = ({meetNo}) =>{

    const [meeting, setMeeting] = useState([]);

    useEffect(() => {
        axios
          .get(`http://localhost:8080/member/meet/${meetNo}`)
          .then((res) => {
            if (res.status === 200) {
              const data = res.data;
              setMeeting(data.meeting);
            }
          })
          .catch((error) => {
            console.error('Error fetching meeting data:', error);
          });
      }, [meetNo]);


      // {meeting.map((meeting) => (
      // ))}
    return (
        <div>
            <div className="h-screen mt-10 m-auto justify-center rounded-3xl w-[800px] bg-gray-200">
                <div>
                   
                </div>
            </div>
        </div>
        
    )
}
export default MeetingDetail;