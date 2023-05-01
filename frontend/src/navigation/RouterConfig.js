import React from 'react';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import {
    ROOT,
    HOMEPAGE,
    LOGIN,
    REGISTER,
    PROFILE, CONTEST_DETAILS, TEAM_DETAILS,
} from "navigation/CONSTANTS";
import {NotFound} from 'navigation/NotFound';
import RequireAuth from "navigation/RequireAuth";
import Home from 'pages/Home';
import LoginAndRegister from 'pages/LoginAndRegister';
import Profile from 'pages/Profile';
import ContestDetails from 'pages/ContestDetails';
import TeamDetails from 'pages/TeamDetails';
import GameDetails from 'components/game_details';

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
                    <Route path={`${CONTEST_DETAILS}/:sport/:countryName/:contestId`} element={<ContestDetails />} />
                    <Route path={`${TEAM_DETAILS}/:sport/:countryName/:teamName/:teamId/:season`} element={<TeamDetails />} />
                    <Route path={"/test"} element={<GameDetails gameId={1015969} />} />

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
