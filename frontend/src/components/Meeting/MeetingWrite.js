import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const MeetingWrite = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  const [meetingInput, setMeetingInput] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMeetingInput((meetingInput) => ({
      ...meetingInput,
      [name]: value,
    }));
  };

  const memberNo = sessionStorage.getItem("memberNo");
  axios.interceptors.request.use(
    function(config) {
      config.headers["memberNo"] = `${memberNo}`;
      return config;
    },
    function(error) {
      return Promise.reject(error);
    }
  );

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("memberNo", memberNo);
    formData.append("meetTitle", meetingInput.meetTitle);
    formData.append("meetContent", meetingInput.meetContent);
    formData.append("meetAddress", meetingInput.meetAddress);
    formData.append("meetTotal", meetingInput.meetTotal);
    formData.append("openKakao", meetingInput.openKakao);
    formData.append("thumbnail", fileInputRef.current.files[0]);

    try {
      await axios.post("/api/meet/write", formData);
      navigate("/meet");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="justify-center items-center">
      <div className="w-full max-w-1100 min-w-1100 m-auto">
        <h1 className="text-3xl font-bold text-green-700 mt-10 border-b-2 border-green-700 mb-8">모임 만들기</h1>
        <div className="shadow-2xl border border-gray-200 h-auto mt-10 mb-10 m-auto justify-center rounded-3xl w-[1100px] bg-green-100">
          <div className="felx justify-center">
            <div className="flex">
              <div className="bg-white rounded-3xl w-[400px] h-[400px] m-10 text-gray-500 text-3xl flex justify-center items-center cursor-pointer" onClick={handleDivClick}>
                {selectedImage ? <img src={selectedImage} alt="Uploaded" className="max-w-[400px] max-h-[400px]" /> : "사진 +"}
                <input ref={fileInputRef} type="file" hidden onChange={handleImageUpload} accept="image/*" />
              </div>
              <div className="flex flex-col justify-center ml-10">
                <label className="text-2xl mb-5">모임 정보</label>
                <input name="meetTitle" type="text" placeholder="모임 이름" onChange={handleInputChange} value={meetingInput.meetTitle || ""} className="border border-gray-300 p-4 w-[500px] mb-5 rounded-lg" />
                <input name="meetAddress" type="text" placeholder="장소" onChange={handleInputChange} value={meetingInput.meetAddress || ""} className="border border-gray-300 p-4 w-[500px] mb-5 rounded-lg" />
                <input name="meetTotal" type="number" placeholder="모임 정원" onChange={handleInputChange} value={meetingInput.meetTotal || ""} className="border border-gray-300 p-4 w-[500px] mb-1 rounded-lg" />
                <label className="text-right text-red-600 font-bold">※오픈카카오톡 채팅방을 만든 후 작성해주세요</label>
                <input name="openKakao" type="text" placeholder="open Kakao talk 주소" onChange={handleInputChange} value={meetingInput.openKakao || ""} required className="border border-gray-300 p-4 w-[500px] mb-5 rounded-lg" />
              </div>
            </div>
            <div className="flex justify-center items-center relative">
              <div>
                {!meetingInput.meetContent && <p className="absolute top-[250px] left-[290px] text-2xl">하고자 하는 모임을 자유롭게 소개해주세요 🙂</p>}
                <label className="text-2xl ml-10">모임 소개</label>
                <textarea name="meetContent" type="text" onChange={handleInputChange} value={meetingInput.meetContent || ""} className="focus:outline-none resize-none p-3 border border-gray-300 rounded-lg mx-10 mt-5 w-[1020px] h-[430px]"></textarea>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-10">
            <button
              onClick={() => {
                handleSubmit();
              }}
              className="focus:outline-none text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 mb-8 mr-2 dark:bg-green-600 dark:hover:bg-green-700"
            >
              작성
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

export default MeetingWrite;
