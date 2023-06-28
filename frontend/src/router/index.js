import { Route, createBrowserRouter, createRoutesFromElements, Navigate } from "react-router-dom";
import Main from "../components/Main";
import Board from "../components/Board";
import LayoutPage from "../pages/LayoutPage";
import LoginPage from "../pages/LoginPage";
import Edit from "../components/Edit";
import MyPage from "../components/mypage/MyPage";
import LayoutPage2 from "../pages/LayoutPage2";
import MyEdit from "../components/mypage/MyEdit";
import Calendar from "../components/mypage/Calendar";
import Cart from "../components/mypage/Cart";
import Calorie from "../components/Calorie";
// import Goods from "../components/Goods";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route element = {<LayoutPage />}>
                <Route element = {<Navigate />} />
                <Route element = {<Main />} index />
                <Route element = {<Board />} path="/board" />
                <Route element = {<Edit />} path="/member/edit" />
                <Route element = {<Calorie />} path="/calorie" />
                <Route element = {<Cart />} path="/app/cart" />
                {/* <Route element = {<Goods />} path="goods" /> */}
            </Route>
            
            <Route element = {<LoginPage />} path="/member/login" />
            
            <Route element = {<LayoutPage2 />}>
                <Route element = {<MyPage />} path="/app/mypage" />
                <Route element = {<MyEdit />} path="/member/mypage" />
                <Route element = {<Calendar />} path="" />
            </Route>

        </Route>
        
        
        
        
    )
)
