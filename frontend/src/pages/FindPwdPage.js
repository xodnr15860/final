import { useState } from 'react';
import '../assets/css/Login.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';


const FindPwdPage = () => {

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');

    const InputChange = (e) => {
      const { name, value } = e.target;
      if (name === "userName") {
        setUserName(value);
      } else if (name === "email") {
        setEmail(value);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        onClickFind();
      }
    };
    

    const onClickFind = () => {
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };
  
      const formData = new URLSearchParams();
      formData.append('userName', userName);
      formData.append('email', email);
  
      axios
        .post("http://localhost:8080/member/find/password", formData.toString(), config)
        .then((res) => {
          if (res.status === 200) {
            console.log('비밀번호 찾기 성공');
            const memberpwd = res.data;
            alert(`회원님의 비밀번호는 ${memberpwd}입니다.`);
          } else {
            throw new Error("아이디 찾기에 실패했습니다.");
          }
        })
        .catch((error) => {
          console.log(error);
          alert(error.msg);
        });
    };

    /**
     * 1. fetch API
     * 2. axios
     * 3. Promise
     * 4. async / await 
     * 5. cors
     */

    return (
        <div>
          <div className='login-container'>
            <Link to ="/">
              <img src='/GoodDay.jpeg' alt='로그인로고' className='login-logo'></img>
            </Link>
          </div>
            <h1 className='login-title'>비밀번호 찾기</h1>
                <section className='login-form'>
                    <form method="post" onSubmit={onClickFind} >
                        <div>
                          <input type='text' name="userName" onKeyDown={handleKeyDown} onChange={InputChange} className='login-input' placeholder='이름' />
                        </div>
                        <div>
                          <input type='text' name="email" onKeyDown={handleKeyDown} onChange={InputChange} className='login-input' placeholder='이메일' />
                        </div>
                        <div className='h-21'>
                          <button type='button' className='login-btn' onClick={onClickFind}>비밀번호 찾기</button>
                        </div>
                        <div className='login-link'>
                          <Link to='/member/register'>회원가입</Link>
                          <strong> ㅣ </strong>
                          <Link to='/member/find/id'>아이디 찾기</Link>
                          <strong> ㅣ </strong>
                          <Link to='/member/find/pwd'>비밀번호 찾기</Link>
                        </div>
                    </form>
                </section>
        </div>
    );
};

export default FindPwdPage;
