import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const MeetingEdit = () => {
  const navigate = useNavigate();
  const { meetNo } = useParams();
  const memberNo = sessionStorage.getItem("memberNo");
  const [meeting, setMeeting] = useState({});

  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/meet/${meetNo}`)
      .then((res) => {
        if (res.status === 200) {
          const data = res.data;
          console.log(data);
          setMeeting(data.meeting);
        }
      })
      .catch((error) => {
        console.error("Error fetching meeting data:", error);
      });
  }, [meetNo]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(meeting && meeting.thumbnail ? `/api/image/${meeting.thumbnail.storeFileName}` : null);
    }
  };

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMeeting((meetingUpdate) => ({
      ...meetingUpdate,
      [name]: value,
    }));
  };

  const meetingUpdate = async () => {
    const formData = new FormData();
    formData.append("memberNo", memberNo);
    formData.append("meetTitle", meeting.meetTitle);
    formData.append("meetContent", meeting.meetContent);
    formData.append("meetAddress", meeting.meetAddress);
    formData.append("meetTotal", meeting.meetTotal);
    formData.append("openKakao", meeting.openKakao);

    if (fileInputRef.current.files.length > 0) {
      formData.append("thumbnail", fileInputRef.current.files[0]);
    } else if (meeting.thumbnail) {
      const response = await axios.get(`/api/image/${meeting.thumbnail.storeFileName}`, {
        responseType: "blob",
      });
      formData.append("thumbnail", response.data, meeting.thumbnail.storeFileName);
    }
    console.log(formData);

    try {
      await fetch(`/api/meet/${meetNo}/edit`, {
        method: "POST",
        body: formData,
      });
      navigate("/meet");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="justify-center items-center">
      <div className="w-full max-w-1100 min-w-1100 m-auto">
        <h1 className="text-3xl font-bold text-green-700 mt-10 border-b-2 border-green-700 mb-8">모임 수정하기</h1>
        <div className="shadow-2xl border border-gray-200 h-auto mt-10 mb-10 m-auto justify-center rounded-3xl w-[1100px] bg-green-100">
          <div className="felx justify-center">
            <div className="flex">
              {meeting && meeting.thumbnail && (
                <div className="bg-white rounded-3xl w-[400px] h-[400px] m-10 text-gray-500 text-3xl flex justify-center items-center cursor-pointer " onClick={handleDivClick}>
                  {selectedImage ? <img src={selectedImage} alt="Uploaded" className="max-w-[400px] max-h-[400px]" /> : <img src={`/api/image/${meeting.thumbnail.storeFileName}`} alt="Meeting Thumbnail"></img>}
                  <input ref={fileInputRef} type="file" hidden onChange={handleImageUpload} accept="image/*" />
                </div>
              )}
              <div className="flex flex-col justify-center ml-10">
                <label className="text-2xl mb-5">모임 정보</label>
                <input name="meetTitle" type="text" placeholder="모임 이름" value={meeting.meetTitle || ""} onChange={handleInputChange} className="border border-gray-300 p-4 w-[500px] mb-5 rounded-lg" />
                <input name="meetAddress" type="text" placeholder="장소" value={meeting.meetAddress || ""} onChange={handleInputChange} className="border border-gray-300 p-4 w-[500px] mb-5 rounded-lg" />
                <input name="meetTotal" type="number" placeholder="모임 정원" value={meeting.meetTotal || ""} onChange={handleInputChange} className="border border-gray-300 p-4 w-[500px] mb-5 rounded-lg" />
                <input name="openKakao" type="text" placeholder="open Kakao talk 주소" required value={meeting.openKakao || ""} onChange={handleInputChange} className="border border-gray-300 p-4 w-[500px] mb-5 rounded-lg" />
              </div>
            </div>
            <div className="flex justify-center items-center relative">
              <div>
                <label className="text-2xl ml-10">모임 소개</label>
                <textarea name="meetContent" type="text" value={meeting.meetContent || ""} onChange={handleInputChange} className="focus:outline-none resize-none p-3 border border-gray-300 rounded-lg mx-10 mt-5 w-[1020px] h-[430px]"></textarea>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-10">
            <button
              onClick={() => {
                meetingUpdate();
              }}
              className="focus:outline-none text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 mb-8 mr-2 dark:bg-green-600 dark:hover:bg-green-700"
            >
              수정
            </button>
            <Link to="/meet">
              <button className="focus:outline-none text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 mb-8 ml-2 dark:bg-green-600 dark:hover:bg-green-700">취소</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingEdit;
