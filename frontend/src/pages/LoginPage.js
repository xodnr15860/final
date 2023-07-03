import {useContext, useState} from 'react';
import '../assets/css/Login.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Context from '../components/context/sessionContext';

const LoginPage = () => {
    const { setLoggedUser, setLoggedIn} = useContext(Context);
    const [id, setId] = useState('');
    const [pwd, setPwd] = useState('');

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
    
    const onClickButton = async (e) => {
        e.preventDefault();
        
        
        try {
          // const response = await axios.post('http://localhost:8080/member/login', {
          //   id: id,
          //   pwd: pwd,
          // });
          // console.log(response.data);
          sessionStorage.setItem('userNickname', '123124');
          sessionStorage.setItem('admin', 'Y');
          setLoggedIn();
          setLoggedUser('123124')
          
          } catch (error) {
            console.error(error);
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
            <h1 className='login-title'>로그인</h1>
                <section className='login-form'>
                    <form method="post" onSubmit={onClickLogin} >
                        <div>
                          <input type='text' name="id" onKeyDown={handleKeyDown} onChange={InputChange} className='login-input' placeholder='아이디' />
                        </div>
                        <div>
                          <input type='password' name="pwd" onKeyDown={handleKeyDown} onChange={InputChange} className='login-input' placeholder='비밀번호' />
                        </div>
                        <div className='h-21'>
                          <button type='button' className='login-btn' onClick={onClickLogin}>로그인</button>
                        </div>
                        <div className='login-link'>
                          <Link to='/member/register'>회원가입</Link>
                          <strong> ㅣ </strong>
                          <Link to='/member/find/id'>아이디 찾기</Link>
                          <strong> ㅣ </strong>
                          <Link to='/member/find/pwd'>비밀번호 찾기</Link>
                        </div>
                        <div className="img ml-6">
                          <Link to='/kakao'>    
                            <img src='/kakao.png' alt='카카오로그인' className='kakao-login ml-4'/>
                          </Link>
                        </div>
                    </form>
                </section>
        </div>
    );
};

export default LoginPage;
