import { useNavigate } from "react-router";

const handleErrorResponse = (error, navigate) => {
  if (error.response && error.response.status === 401) {
    alert("로그인 후 이용해주세요.");
    navigate("/member/login");
  } else {
    console.error("Error:", error);
  }
};

export default handleErrorResponse;
