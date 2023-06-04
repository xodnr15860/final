import { Route, createBrowserRouter, createRoutesFromElements, Navigate } from "react-router-dom";
import Main from "../components/Main";
import Board from "../components/Board";
import LayoutPage from "../pages/layoutPage";


export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element = {<LayoutPage />}>
            <Route element = {<Navigate />} />
            <Route element = {<Main />} index />
            <Route element = {<Board />} path="/board" />
        </Route>
        
        
        
    )
)
