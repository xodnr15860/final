import React from "react";
import { Link } from "react-router-dom";
import './CBcomponent.css';


const CbButton = ({id,trigger}) =>{

    const onClickMyPage = () => {
        const loginUser = sessionStorage.getItem("memberId");

        if(loginUser){
            window.location.replace("/app/mypage");
        } else {
            alert("로그인 후 이용 가능합니다.");
            sessionStorage.setItem("redirect","/app/mypage");
            window.location.replace("/member/login");
        }
    }

    const renderButton = () =>{
        if(id ==='3'){
            return(
                <div>
                    <Link to="/member/login">
                    <button className="btn">로그인</button>
                    </Link>
                </div>
            );
        } else if(id ==='4'){
            return(
                <div>
                    <Link to="/member/find/id">
                    <button className="btn">ID 찾기</button>
                    </Link>
                    &nbsp;
                    <Link to="/member/find/password">
                    <button className="btn">PW 찾기</button>
                    </Link>
                </div>
            );
        }  else if(id ==='5'){
            return(
                <div>
                    <Link to="/meet">
                    <button className="btn">모임 게시판</button>
                    </Link>
                </div>
            );
        } else if(id ==='6'){
            return(
                <div>
                    <Link to="/shop">
                    <button className="btn">운동용품 샵</button>
                    </Link>
                </div>
            );
        } else if(id ==='7'){
            return(
                <div>
                    <button className="btn" onClick={onClickMyPage}>마이페이지</button>
                </div>
            );
        }
        else if(id ==='finish'){
            return(
                <div>챗봇을 종료합니다...</div>
            )
        }
    };

    return (
        <div>
            {renderButton()}
        </div>
    );
}


export default CbButton;