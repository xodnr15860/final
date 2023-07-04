import {useState} from 'react';
import '../assets/css/Login.scss';
import {Link} from 'react-router-dom';
import axios from 'axios';
const LoginPage = () => {
    const [id, setId] = useState('');
    const [pwd, setPwd] = useState('');
    const onChangeId = e => {
        setId(e.target.value);
    }

    const onChangePwd = e => {
        setPwd(e.target.value);
    }
    
    const onClickButton = async (e) => {
        e.preventDefault();

    try {
        
      const response = await axios.post('http://localhost:8080/member/login', {
        id: id,
        pwd: pwd,
      });
      console.log(response.data);
      window.sessionStorage.setItem('nickname', '123124'); 

      } catch (error) {
        console.error(error);
      }
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
        <h1 className='login-title'>로그인</h1>
            <section className='login-form'>
                <form onSubmit={onClickButton} >
                    <div>
                      <input type='text' value={id} onChange={onChangeId} className='login-input' placeholder='아이디' />
                    </div>
                    <div>
                      <input type='password' value={pwd} onChange={onChangePwd} className='login-input' placeholder='비밀번호' />
                    </div>
                    <div>
                      <button type='submit' className='login-btn'>로그인</button>
                    </div>
                    <div className='login-link'>
                      <Link to=''>회원가입</Link>
                      <strong> ㅣ </strong>
                      <Link to=''>아이디 찾기</Link>
                      <strong> ㅣ </strong>
                      <Link to=''>비밀번호 찾기</Link>
                    </div>
                    <Link to='/kakao'>
                        <img src='kakao.png' alt='카카오로그인' className='login-kakao' />
                    </Link>
                </form>
            </section>
    </div>
    );
};


export default LoginPage;