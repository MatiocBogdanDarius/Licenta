import React from 'react';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import {
    ROOT,
    HOMEPAGE,
    LOGIN,
    REGISTER,
    PROFILE,
} from "navigation/CONSTANTS";
import {NotFound} from 'navigation/NotFound';
import Home from 'pages/Home';
import LoginAndRegister from 'pages/LoginAndRegister';
import Profile from 'pages/Profile';
import RequireAuth from "./RequireAuth";

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
