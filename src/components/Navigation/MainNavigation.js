import React from "react";
import MyTeam from "../MyTeam/MyTeam";
import Home from "../Home/Home";
import Standings from "../Standings/Standings";
import MatchDay from "../MatchDay/Match";
import { Route, Routes, useLocation } from "react-router-dom";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Rules from "../Rules/Rules";
import MySeason from "../MatchDay/MySeason/MySeason";
import Error from "../Error/Error";
import ProtectedRoutes, { MatchProtectedRoute } from "./Validation";
import { TeamProtectedRoutes } from "./Validation";

export default function AnimatetRoutes() {
    const location = useLocation();

    return (
        <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route element={<TeamProtectedRoutes />}>
                <Route path="/my-team" element={<MyTeam />} />
                <Route path="/profile" element={<Profile />} />
            </Route>
            <Route element={<ProtectedRoutes />}>
                <Route path="/standings" element={<Standings />} />
            </Route>
            <Route element={<MatchProtectedRoute />}>
                <Route path="/match-day" element={<MatchDay />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="*" element={<Error />} />
            <Route path="/my-season" element={<MySeason />} />
        </Routes>
    );
}
