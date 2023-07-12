import { useState, useEffect } from 'react';
import '../../assets/css/Login.scss';
// import { Link } from 'react-router-dom';
import axios from 'axios';

import Post from "../../components/kakaoApi/Post"; 

const MyEdit = () => {

  const [memberDatas, setMemberDatas] = useState('');
  const [pwModalOpen, setPwModalOpen] = useState(false);
  const [nicknameModalOpen, setNicknameModalOpen] = useState(false);
  const [phoneModalOpen, setPhoneModalOpen] = useState(false);
  const [currentPassword, setcurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordComfirm, setNewPasswordComfirm] = useState('');
  const [newNickname, setNewNickname] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const memberNo = sessionStorage.getItem('memberNo');

  const memberData = async () => {
    try {
      const res = await axios.post(`http://localhost:8080/api/member/edit/${memberNo}`);
      setMemberDatas(res.data);
      console.log(res.data);
      
    } catch {

    }
  };

  const pwOpenModal = () => {
    setPwModalOpen(true);
  };

  const pwCloseModal = () => {
    setPwModalOpen(false);
    setcurrentPassword('');
    setNewPassword('');
    setNewPasswordComfirm('');
  };
  const nicknameOpenModal = () => {
    setNicknameModalOpen(true);
  };

  const nicknameCloseModal = () => {
    setNicknameModalOpen(false);
    setNewNickname('');
  };

  const phoneOpenModal = () => {
    setPhoneModalOpen(true);
  };

  const phoneCloseModal = () => {
    setPhoneModalOpen(false);
    setNewPhone('');
  };

  const handleChangePassword = async () => {
    try {
      await axios.put(`http://localhost:8080/api/member/edit/${memberNo}/password` , {
        currentPwd: currentPassword,
        newPwd: newPassword
      })
      pwCloseModal();
      setcurrentPassword('');
      setNewPassword('');
      setNewPasswordComfirm('');
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleChangeNickname = async () => {
    try {
      await axios.put(`http://localhost:8080/api/member/edit/${memberNo}/nickname` , {
        nickname: newNickname
      })
      nicknameCloseModal();
      setNewNickname('');
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleChangePhone = async () => {
    try {
      await axios.put(`http://localhost:8080/api/member/edit/${memberNo}/phone` , {
        phone: newPhone
      })
      phoneCloseModal();
      setNewPhone('');
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    // memberNo 값이 변경될 때마다 memberData 함수 호출
    memberData();
  }, [memberNo]);
  
    return (
        <div className='ml-[500px] mb-10'>
            <h1 className='login-title m-auto'>내 정보 수정</h1>
                <section className='enroll-form'>
                    <form method="post" >

                      {/* 아이디 부분 */}
                      <div name="id" className='border border-gray-300 rounded-md h-14 mb-2'>
                        <span className='text-xl pl-4 pt-[1000px]'>{memberDatas.memberId}</span>
                      </div>
                    
                      {/* 비밀번호 부분 */}
                      <div className="relative">
                        <div name="password" className='border border-gray-300 rounded-md h-14 mb-2'>
                          <span className='text-xl pl-4'>********</span>
                        </div>
                        <button type="button" onClick={pwOpenModal} className="overlap-button absolute top-1 right-0 mt-2 mr-2 h-8 w-30 rounded-lg bg-gradient-to-r  text-white z-10">
                          비밀번호 변경
                        </button>
                      </div>
                        {/* 모달 */}
                        {pwModalOpen && (
                          <div className="modal">
                            <div className="modal-content">
                              {/* 비밀번호 변경 내용 */}
                              <h2 className='font-bold'>비밀번호 변경</h2>
                                <input type="password" className='border border-gray-300 rounded-md h-14 w-[400px] mb-2' value={currentPassword} onChange={(e) => setcurrentPassword(e.target.value)} /> <br/>
                                <input type="password" className='border border-gray-300 rounded-md h-14 w-[400px] mb-2' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} /> <br/>
                                <input type="password" className='border border-gray-300 rounded-md h-14 w-[400px] mb-2' value={newPasswordComfirm} onChange={(e) => setNewPasswordComfirm(e.target.value)} /> <br/>
                                <div className="flex justify-end">
                                  <button type="button" className="overlap-button h-8 w-10 rounded-lg bg-gradient-to-r text-white z-10" onClick={handleChangePassword}>
                                    변경
                                  </button>
                                  <button type="button" className="overlap-button h-8 w-10 rounded-lg bg-gradient-to-r text-white z-10" onClick={pwCloseModal}>
                                    닫기
                                  </button>
                                </div>
                            </div>
                          </div>
                        )}

                      {/* 이름 부분 */}
                        <div name="userName" className='border border-gray-300 rounded-md h-14 mb-2'>
                          <span className='text-xl pl-4'>{memberDatas.name}</span>
                        </div>

                      {/* 닉네임 부분 */}
                      <div className="relative">
                        <div name="nickName" className='border border-gray-300 rounded-md h-14 mb-2'>
                          <span className='text-xl pl-4'>{memberDatas.nickname}</span>
                        </div>
                        <button type="button" className="overlap-button absolute top-1 right-0 mt-2 mr-2 h-8 w-20 rounded-lg bg-gradient-to-r  text-white z-10" onClick={nicknameOpenModal}>
                          닉네임 변경
                        </button>
                      </div>
                        {/* 모달 */}
                        {nicknameModalOpen && (
                          <div className="modal">
                            <div className="modal-content">
                              {/* 닉네임 변경 내용 */}
                              <h2 className='font-bold'>닉네임 변경</h2>
                                <input type="text" className='border border-gray-300 rounded-md h-14 w-[400px] mb-2' value={newNickname} onChange={(e) => setNewNickname(e.target.value)} /> <br/>
                                <div className="flex justify-end">
                                  <button type="button" className="overlap-button h-8 w-10 rounded-lg bg-gradient-to-r text-white z-10" onClick={handleChangeNickname}>
                                    변경
                                  </button>
                                  <button type="button" className="overlap-button h-8 w-10 rounded-lg bg-gradient-to-r text-white z-10" onClick={nicknameCloseModal}>
                                    닫기
                                  </button>
                                </div>
                            </div>
                          </div>
                        )}
                      
                      {/* 이메일 부분 */}
                      <div>
                        <div name="email" className='border border-gray-300 rounded-md h-14 mb-2'>
                          <span className='text-xl pl-4'>{memberDatas.email}</span>   
                        </div>
                      </div>

                      {/* 전화번호 부분 */}
                      <div className='relative'>
                        <div name="phone" className='border border-gray-300 rounded-md h-14 mb-2'>
                          <span className='text-xl pl-4'>{memberDatas.phone}</span>
                          <button type="button" id="enroll" className="overlap-button absolute top-1 right-0 mt-2 mr-2 h-8 w-30 rounded-lg bg-gradient-to-r text-white z-10" onClick={phoneOpenModal} >
                            전화번호 변경
                          </button>
                        </div>
                      </div>
                      {/* 모달 */}
                      {phoneModalOpen && (
                          <div className="modal">
                            <div className="modal-content">
                              {/* 닉네임 변경 내용 */}
                              <h2 className='font-bold'>전화번호 변경</h2>
                                <input type="text" className='border border-gray-300 rounded-md h-14 w-[400px] mb-2' value={newPhone} onChange={(e) => setNewPhone(e.target.value)} /> <br/>
                                <div className="flex justify-end">
                                  <button type="button" className="overlap-button h-8 w-10 rounded-lg bg-gradient-to-r text-white z-10" onClick={handleChangePhone}>
                                    변경
                                  </button>
                                  <button type="button" className="overlap-button h-8 w-10 rounded-lg bg-gradient-to-r text-white z-10" onClick={phoneCloseModal}>
                                    닫기
                                  </button>
                                </div>
                            </div>
                          </div>
                        )}


                      {/* 주소 부분 */}
                      <div className='relative'>
                        <div className='border border-gray-300 rounded-md h-14 mb-2' required={true} name="zondcode">
                          {/* {popup && (<Post company={enrollInput} setcompany={setEnrollInput}></Post>)} */}
                        </div>
                      </div>
                      
                      <div>
                        <div className='border border-gray-300 rounded-md h-14 mb-2' required={true} name="address">
                          <span className='text-xl pl-4'></span>
                        </div>
                      </div>

                      <div>
                        <div className='border border-gray-300 rounded-md h-14 mb-2' required={true} name="ref">
                          <span className='text-xl pl-4'></span>
                        </div>
                      </div>

                      <div>
                        <div className='border border-gray-300 rounded-md h-14 mb-2' required={true} name="detailAddress">
                          <span className='text-xl pl-4'></span>
                        </div>
                      </div>

                    </form>
                </section>
        </div>
    );
};

export default MyEdit;