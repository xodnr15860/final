import { useState, useEffect } from "react";
import "../assets/css/Login.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const FindPwdPage = () => {
  const Navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [pwdConfirm, setPwdConfirm] = useState("");
  const [pwdMatch, setPwdMatch] = useState(true);
  const [emailCode, setEmailCode] = useState("");
  const [isCodeVerified, setIsCodeVerified] = useState(false);

  useEffect(() => {
    if (password !== pwdConfirm && pwdConfirm !== "") {
      setPwdMatch(false);
    } else {
      setPwdMatch(true);
    }
  }, [password, pwdConfirm]);

  const [pwdInput, setpwdInput] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setpwdInput((pwdInput) => ({
      ...pwdInput,
      [name]: value,
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
    }
  };

  const updatePwd = () => {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    const formData = new URLSearchParams();
    formData.append("email", pwdInput.email);
    formData.append("pwd", password);

    axios
      .post("http://localhost:8080/api/member/find/password", formData.toString(), config)
      .then((res) => {
        if (res.status === 200) {
          alert("비밀번호가 변경되었습니다. 다시 로그인 해주세요.");
          Navigate("/member/login");
        } else {
          throw new Error("비밀번호 변경 실패.");
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error.msg);
      });
  };

  const [showAdditionalInput, setShowAdditionalInput] = useState(false);

  const handleAddInput = () => {
    alert("입력하신 이메일로 인증번호를 보냈습니다.");
    setShowAdditionalInput(true);

    axios
      .get("http://localhost:8080/api/mail/find/password", {
        params: {
          email: pwdInput.email,
        },
      })
      .then((res) => {
        const emailcode = res.data;
        setEmailCode(emailcode);
      })
      .catch((error) => {
        console.log("인증번호 발급 실패");
        console.error(error);
      });
  };

  const checkCode = () => {
    const usercode = String(pwdInput.emailcode).trim();
    const servercode = String(emailCode).trim();

    if (usercode === servercode) {
      alert("인증이 완료되었습니다.");
      setIsCodeVerified(true);
    } else {
      alert("인증번호가 일치하지 않습니다. 다시 확인 해주세요.");
      setIsCodeVerified(false);
    }
  };

  return (
    <div>
      <div className="login-container">
        <Link to="/">
          <img src="/GoodDay.jpeg" alt="로그인로고" className="login-logo w-[300px] mx-auto mt-20"></img>
        </Link>
      </div>
      <h1 className="login-title m-[-40px]">비밀번호 변경</h1>
      <section className="login-form">
        <form method="post">
          <div>
            <input type="text" name="id" onKeyDown={handleKeyDown} onChange={handleInputChange} className="login-input" placeholder="아이디" />
          </div>
          <div className="relative">
            <input type="text" name="email" className="login-input" placeholder="이메일" onChange={handleInputChange} value={pwdInput.email} />
            <button type="button" onClick={handleAddInput} className="overlap-button absolute top-1 right-0 mt-2 mr-2 h-8 w-20 rounded-lg bg-gradient-to-r  text-white z-10">
              인증받기
            </button>
            {showAdditionalInput && (
              <div className="relative">
                <input type="number" name="emailcode" className="login-input" placeholder="인증번호" onChange={handleInputChange} value={pwdInput.emailcode} />
                <button type="button" onClick={checkCode} className="overlap-button absolute top-1 right-0 mt-2 mr-2 h-8 w-20 rounded-lg bg-gradient-to-r  text-white z-10">
                  확인
                </button>
              </div>
            )}
          </div>
          <div>
            <input type="password" name="password" className="login-input" onKeyDown={handleKeyDown} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호" />
          </div>
          <div>
            <input type="password" name="pwdConfirm" className="login-input" onKeyDown={handleKeyDown} value={pwdConfirm} onChange={(e) => setPwdConfirm(e.target.value)} placeholder="비밀번호 확인" />
          </div>
          {!pwdMatch && <p className="text-red-500 mb-4 text-sm">비밀번호가 일치하지 않습니다.</p>}
          {pwdMatch && password !== "" && pwdConfirm === password && <p className="text-green-500 mb-4 text-sm">비밀번호가 일치합니다.</p>}
          <div className="h-21">
            <button type="button" className="login-btn" onClick={updatePwd} onKeyDown={handleKeyDown} disabled={!isCodeVerified}>
              비밀번호 변경
            </button>
          </div>
          <div className="login-link">
            <Link to="/member/register">회원가입</Link>
            <strong> ㅣ </strong>
            <Link to="/member/find/id">아이디 찾기</Link>
            <strong> ㅣ </strong>
            <Link to="/member/find/pwd">비밀번호 변경</Link>
          </div>
        </form>
      </section>
    </div>
  );
};

export default FindPwdPage;
