import { Route, createBrowserRouter, createRoutesFromElements, Navigate } from "react-router-dom";
import Main from "../components/Main";
import LayoutPage from "../pages/layoutPage";


export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element = {<LayoutPage />}>
            <Route element = {<Main />} index />

        </Route>
        
        
        
    )
)
