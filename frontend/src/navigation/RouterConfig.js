import React from 'react';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import {
    ROOT,
    HOMEPAGE,
    LOGIN,
    REGISTER,
    PROFILE, CONTEST_DETAILS,
} from "navigation/CONSTANTS";
import {NotFound} from 'navigation/NotFound';
import RequireAuth from "navigation/RequireAuth";
import Home from 'pages/Home';
import LoginAndRegister from 'pages/LoginAndRegister';
import Profile from 'pages/Profile';
import ContestDetails from 'pages/ContestDetails';

const ROLES = {
    SIMPLE_USER: 'SIMPLE_USER',
}

export const RouterConfig = () => {
    return (<div>
            <Router >
                <Routes>
                    {/* public routes */}
                    <Route path={ROOT} element={<Home />} />
                    <Route path={HOMEPAGE} element={<Home />} />
                    <Route path={LOGIN} element={<LoginAndRegister />} />
                    <Route path={REGISTER} element={<LoginAndRegister />} />
                    <Route path={CONTEST_DETAILS} element={<ContestDetails />} />

                    {/* private routes */}
                    <Route element={<RequireAuth allowedRoles={[ROLES.SIMPLE_USER]} />}>
                        <Route path={PROFILE} element={<Profile />} />
                    </Route>
                    {/* catch all */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
    </div>
    )
}
