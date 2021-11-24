import React from "react";
import './styles/Login.scss';
import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Main from "./components/Main";

function App() {
    return (
        <Routes>
            <Route path="/registration" element={<Register/>}/>
            <Route path="/" element={<Main/>}/>
        </Routes>
    );
}

export default App;
