import * as React from 'react';
import style from "./GamePlayers.module.css";
import TeamPlayersStatistics from "./components/team_players_statistics";

function GamePlayersView(props) {
    return (
        <div className={style.container}>
            {props.teams.map(({players, team: info}) => {
                return (
                    <div className={style.team_container}>
                        <div className={style.info}>
                            <img className={style.team_logo} src={info.logo} alt=""/>
                            <div>{info.name}</div>
                        </div>
                        <TeamPlayersStatistics players={players}/>
                    </div>
                );
            })}
        </div>
    );
}

export default GamePlayersView;