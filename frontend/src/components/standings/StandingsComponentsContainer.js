import React, {useEffect, useState} from "react";
import StandingsComponentView from "./StandingsComponentView";
import * as SPORT_EVENT_AGGREGATOR_SERVICE from "services/api/sport_event_aggregator";
import {TEAM_DETAILS} from "navigation/CONSTANTS";
import {useNavigate, useParams} from "react-router-dom";
import {NO_IMAGE, SPORTS} from "../../assets/constants/Data";


export function StandingsComponentsContainer(props) {
    const { sport } = useParams();
    const navigate = useNavigate();
    const [contest, setContest] = useState();
    const [competition, setCompetition] = useState(0);

    useEffect(() => {
        getStandings()
    }, [])

    const getStandings = () => {
        SPORT_EVENT_AGGREGATOR_SERVICE
            .getStandings(sport, props.league, props.season)
            .then(response => {
                setContest(response.data[0].league);
                console.log("standing", response.data[0].league);
            })
    }

    const competitionButtonsHandle = (selectedCompetition) =>{
        setCompetition(selectedCompetition);
    }

    const viewTeamDetails = (team, league) => {
        const path = `${TEAM_DETAILS}/${sport}/${league.country}/${team.name}/${team.id}/${league.season}`;
        navigate(path);
    }

    const loadingImageErrorHandler = (event) => {
        event.target.src = NO_IMAGE
    }

    return (
        <StandingsComponentView
            sport={SPORTS[sport]}
            contest={contest}
            competition={competition}
            competitionButtonsHandle={competitionButtonsHandle}
            viewTeamDetails={viewTeamDetails}
            loadingImageErrorHandler={loadingImageErrorHandler}
        />
    );
}
