import { Route, createBrowserRouter, createRoutesFromElements, Navigate } from "react-router-dom";
import Main from "../components/Main";
import Board from "../components/Board";
import LayoutPage from "../pages/layoutPage";
import LoginPage from "../pages/LoginPage";
import Edit from "../components/Edit";



export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route element = {<LayoutPage />}>
                <Route element = {<Navigate />} />
                <Route element = {<Main />} index />
                <Route element = {<Board />} path="/board" />
                <Route element = {<LoginPage />} path="/login" />
                <Route element = {<Edit />} path="/edit" />
            </Route>


        </Route>
        
        
        
        
    )
)
