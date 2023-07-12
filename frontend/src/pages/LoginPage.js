import { useState } from "react";
import "../assets/css/Login.scss";
import { Link } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [uId, setId] = useState("");
  const [uPwd, setPwd] = useState("");

  const InputChange = (e) => {
    const { name, value } = e.target;
    if (name === "id") {
      setId(value);
    } else if (name === "pwd") {
      setPwd(value);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onClickLogin();
    }
  };

  /** axios post 방식은  기본적으로 헤더가 application/json으로 들어감 */
  const onClickLogin = () => {
    axios
      .post("http://localhost:8080/api/member/login", {
        id: uId,
        pwd: uPwd,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log("로그인 성공");
          const Member = res.data;
          sessionStorage.setItem("memberNo", Member.memberNo);
          sessionStorage.setItem("memberId", Member.memberId);
          sessionStorage.setItem("nickname", Member.nickname);
          sessionStorage.setItem("admin", Member.admin);

          const redirect = sessionStorage.getItem("redirect");
          if (redirect) {
            sessionStorage.removeItem("redirect");
            window.location.replace(redirect);
          } else {
            window.location.replace("/");
          }
        } else {
          throw new Error("로그인에 실패했습니다.");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("로그인에 실패 했습니다. ID와 PWD를 다시 한 번 확인해주세요.");
      });
  };

  const KaKao = () => {
    window.open("https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=5f4936ea948f79e01ae85e35eff3a8e3&redirect_uri=http://localhost:8080/api/member/kakao");
  };

  const Naver = () => {
    window.open("https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=JapyfHeRinhgQikh6zZV&state=qwer&redirect_uri=http://localhost:8080/api/member/naver");
  };

  return (
    <div>
      <div className="login-container">
        <Link to="/">
          <img src="/GoodDay.jpeg" alt="로그인로고" className="login-logo w-[300px] mx-auto mt-20"></img>
        </Link>
      </div>
      <h1 className="login-title m-[-40px]">로그인</h1>
      <section className="login-form">
        <form method="post" onSubmit={onClickLogin}>
          <div>
            <input type="text" name="id" onKeyDown={handleKeyDown} onChange={InputChange} className="login-input" placeholder="아이디" />
          </div>
          <div>
            <input type="password" name="pwd" onKeyDown={handleKeyDown} onChange={InputChange} className="login-input" placeholder="비밀번호" />
          </div>
          <div className="h-21">
            <button type="button" className="login-btn" onClick={onClickLogin}>
              로그인
            </button>
          </div>
          <div className="login-link">
            <Link to="/member/register">회원가입</Link>
            <strong> ㅣ </strong>
            <Link to="/member/find/id">아이디 찾기</Link>
            <strong> ㅣ </strong>
            <Link to="/member/find/pwd">비밀번호 변경</Link>
          </div>
          <div className="img ml-6">
            <img src="/kakao.png" onClick={KaKao} alt="카카오로그인" className="kakao-login ml-4" />
          </div>
          <div className="img ml-6 mt-2 w-[300px] h-[30px]">
            <img src="/naver.png" onClick={Naver} alt="네이버로그인" className="kakao-login ml-4" />
          </div>
        </form>
      </section>
    </div>
  );
};

export default LoginPage;
