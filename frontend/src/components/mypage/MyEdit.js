import { useState, useEffect } from 'react';
import '../../assets/css/Login.scss';
// import { Link } from 'react-router-dom';
import axios from 'axios';

import Post from "../../components/kakaoApi/Post"; 

const MyEdit = () => {

  const [password, setPassword] = useState("");
  const [pwdConfirm, setPwdConfirm] = useState("");
  const [pwdMatch, setPwdMatch] = useState(true);

  useEffect(() => {
    if (password !== pwdConfirm && pwdConfirm !== "") {
      setPwdMatch(false);
    } else {
      setPwdMatch(true);
    }
  }, [password, pwdConfirm]);

  const [popup, setPopup] = useState(false);

  const [enrollInput, setEnrollInput] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEnrollInput((enrollInput) => ({
      ...enrollInput,
      [name]: value
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter"){
      
    }
  }

  const handleComplete = (data) => {
    setPopup(!popup);
  };

  const IdDoubleCheck = () =>{
    axios.post("http://localhost:8080/member/", null,{
      id:enrollInput.id,
    }).then((res)=>{
      alert("사용가능");
    }).catch((error)=>{
      alert("불가능");
    });
  }  

  const [showAdditionalInput, setShowAdditionalInput] = useState(false);

  // ...

  const handleAddInput = () => {
    setShowAdditionalInput(true);
    axios.get('http://localhost:8080/api/mail/register', {
      params: {
        email: enrollInput.email
      }
    }).then(res => {
      const emailcode = res.data;

      if (emailcode === enrollInput.emailnum){
        console.log("인증되었습니다");
      }else{
        console.log("인증번호가 올바르지 않습니다.");
      }
    }).catch(error => {
      console.log("인증번호 발급 실패");
      console.error(error);
    })
  };

    /**
     * 1. fetch API
     * 2. axios
     * 3. Promise
     * 4. async / await 
     * 5. cors
     */

    return (
        <div className='ml-[470px] mb-10'>
            <h1 className='login-title m-auto'>내 정보 수정</h1>
                <section className='enroll-form'>
                    <form method="post" >
                        <div className="relative">
                        <input type="text" name="id" placeholder="아이디" className='login-input' onChange={handleInputChange} value={enrollInput.id}/>
                          <button type="button" onClick={IdDoubleCheck} className="overlap-button absolute top-1 right-0 mt-2 mr-2 h-8 w-20 rounded-lg bg-gradient-to-r  text-white z-10">
                            중복확인
                          </button>
                        </div>
                        <div>
                          <input type='password' name="password" className='login-input' onKeyDown={handleKeyDown} value={password} onChange={(e) => setPassword(e.target.value)}  placeholder='비밀번호' />
                        </div>
                        <div>
                          <input type='password' name="pwdConfirm" className='login-input' onKeyDown={handleKeyDown}  value={pwdConfirm} onChange={(e) => setPwdConfirm(e.target.value)} placeholder='비밀번호 확인' />
                        </div>
                        {!pwdMatch && (
                          <p className="text-red-500 mb-4 text-sm">
                            비밀번호가 일치하지 않습니다.
                          </p>
                        )}
                        {pwdMatch && password !== "" && pwdConfirm === password && (
                          <p className="text-green-500 mb-4 text-sm">
                            비밀번호가 일치합니다.
                          </p>
                        )}
                        <div className="relative">
                          <input type="text" name="userName" className='login-input'placeholder="이름" onChange={handleInputChange} value={enrollInput.userName}/>
                        </div>
                        <div>
                          <input type="text" name="nickName" className='login-input' placeholder="닉네임" onChange={handleInputChange} value={enrollInput.nickName}/>
                        </div>
                        <div className='relative'>
                          <input type="text" name="email" className='login-input' placeholder="이메일" onChange={handleInputChange} value={enrollInput.email}/>
                          <button type="button" onClick={handleAddInput} className="overlap-button absolute top-1 right-0 mt-2 mr-2 h-8 w-20 rounded-lg bg-gradient-to-r  text-white z-10">
                            인증받기
                          </button>
                          {showAdditionalInput && (
                          <div className='relative'>
                             <input type="text" name="emailnum" className='login-input' placeholder="인증번호" onChange={handleInputChange} value={enrollInput.emailnum} />
                              <button type="button" className="overlap-button absolute top-1 right-0 mt-2 mr-2 h-8 w-20 rounded-lg bg-gradient-to-r  text-white z-10">
                              확인
                              </button>
                          </div>
                          )}
                        </div>
                        <div>
                          <input type="text" name="phone" className='login-input' placeholder="번호" onChange={handleInputChange} value={enrollInput.phone}/>
                        </div>
                        <div className='relative'>
                          <input  className='login-input' placeholder="우편번호"  type="text" required={true} name="zondcode" onChange={handleInputChange} value={enrollInput.zonecode} readOnly/>
                            <button id="enroll" onClick={handleComplete} className="overlap-button absolute top-1 right-0 mt-2 mr-2 h-8 w-28 rounded-lg bg-gradient-to-r  text-white z-10" >
                              우편번호 찾기
                            </button>
                            {popup && (<Post company={enrollInput} setcompany={setEnrollInput}></Post>)}
                        </div>
                        <div>
                          <input className='login-input' placeholder="주소"  type="text" required={true} name="address" onChange={handleInputChange} value={enrollInput.address} readOnly/>
                        </div>
                        <div>
                          <input className='login-input' placeholder="참고항목"  type="text" required={true} name="ref" onChange={handleInputChange} value={enrollInput.ref} readOnly/>
                          </div>
                        <div>
                          <input className='login-input' placeholder="상세주소" type="text" required={true} name="detailAddress" onChange={handleInputChange} value={enrollInput.detailAddress}/>
                        </div>
                        <div className='h-21'>
                          <button type='button' className='login-btn'>완료</button>
                        </div>
                    </form>
                </section>
        </div>
    );
};

export default MyEdit;