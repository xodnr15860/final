import { Route, createBrowserRouter, createRoutesFromElements, Navigate } from "react-router-dom";
import Main from "../components/Main";
import Board from "../components/Board";
import LayoutPage from "../pages/LayoutPage";
import LoginPage from "../pages/LoginPage";
import MyPage from "../components/mypage/MyPage";
import LayoutPage2 from "../pages/LayoutPage2";
import MyEdit from "../components/mypage/MyEdit";
import Calendar from "../components/mypage/Calendar";
import Cart from "../components/mypage/Cart";
import Calorie from "../components/Calorie";
import CaloriePrescription from "../components/CaloriePrescription";
import CaloriePrescriptionResult from "../components/CaloriePrescriptionResult";
import Product from "../components/Shop/Product";
import FindIdPage from "../pages/FindIdPage"
import FindPwdPage from "../pages/FindPwdPage"
import EnrollPage from "../pages/EnrollPage";
import MeetingCard from "../components/Meeting/MeetingCard";
import MeetingDetail from "../components/Meeting/MeetingDetail";


export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route element = {< LayoutPage />}>
                <Route element = {<Navigate />} />
                <Route element = {<Main />} index />
                <Route element = {<Board />} path="/board" />
                <Route element = {<Calorie />} path="/calorie" />
                <Route element = {<CaloriePrescription />} path="/calorie/prescription" />
                <Route element = {<CaloriePrescriptionResult />} path="/calorie/prescription/result" />
                <Route element = {<Cart />} path="/app/cart" />
                <Route element = {<MeetingCard/>} path="/meet"/>
                <Route element = {<MeetingDetail/>} path="/meet/:meetNo"/>
                <Route element = {<Product/>} path="/shop"/>

            </Route>

            <Route element = {<LoginPage />} path="/member/login" />
            <Route element = {<FindIdPage />} path="/member/find/id"/>
            <Route element = {<FindPwdPage />} path="/member/find/pwd"/>
            <Route element = {<EnrollPage />} path="/member/register"/>


            <Route element = {<LayoutPage2 />}>
                <Route element = {<MyPage />} path="/app/mypage" />
                <Route element = {<MyEdit />} path="/member/mypage" />
                <Route element = {<Calendar />} path="" />
            </Route>


        </Route>
        
        
        
        
    )
)
