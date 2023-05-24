import React from "react";
import GameStatisticsView from "./GameStatisticsView";
export function GameStatisticsContainer(props) {
    const getOpponentTeam = (team) => {
        return 1 - team;
    }

    const getPercent = (statisticName, team) =>{
        if(statisticName === 'BallPossession')
            return props.statistics[team].statistics[statisticName].value.slice(0, -1);

        const teamStatisticValue = props.statistics[team].statistics[statisticName].value;
        const opponentTeam = getOpponentTeam(team);
        const opponentTeamStatisticValue = props.statistics[opponentTeam].statistics[statisticName].value;
        const totalStatisticValue = teamStatisticValue + opponentTeamStatisticValue;

        return (teamStatisticValue / totalStatisticValue) * 100;
    }

    return (
        <GameStatisticsView
            statistics={props.statistics}
            getPercent={getPercent}
        />
    );
}
