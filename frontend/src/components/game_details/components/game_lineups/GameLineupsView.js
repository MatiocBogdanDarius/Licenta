import * as React from 'react';
import style from "./GameLineups.module.css";
import FormationsTable from "./components/formations_table";

function GameLineupsView(props) {
    return (
        <div className={style.container}>
            <div className={style.formations_info}>
                <p>{props.lineups[0].formation}</p>
                <p>FORMATION</p>
                <p>{props.lineups[1].formation}</p>
            </div>
            <FormationsTable lineups={props.lineups}/>
            <div className={style.info_container}>
                <div className={style.info_header}>STARTING LINEUPS</div>
                <div className={style.info_content}>
                    <div className={style.info_home_team}>
                        {props.lineups[0].startXI.map(({player}) => {
                            return (
                                <div key={`player-${player.id}`} className={style.info_player}>
                                    {`${player.number} ${player.name}`}
                                </div>
                            );
                        })}
                    </div>
                    <div className={style.info_away_team}>
                        {props.lineups[1].startXI.map(({player}) => {
                            return (
                                <div key={`player-${player.id}`} className={style.info_player}>
                                    {`${player.name} ${player.number}`}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className={style.info_container}>
                <div className={style.info_header}>SUBSTITUTES</div>
                <div className={style.info_content}>
                    <div className={style.info_home_team}>
                        {props.lineups[0].substitutes.map(({player}) => {
                            return (
                                <div key={`player-${player.id}`} className={style.info_player}>
                                    {`${player.number} ${player.name}`}
                                </div>
                            );
                        })}
                    </div>
                    <div className={style.info_away_team}>
                        {props.lineups[1].substitutes.map(({player}) => {
                            return (
                                <div key={`player-${player.id}`} className={style.info_player}>
                                    <p>{`${player.name} ${player.number}`}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className={style.info_container}>
                <div className={style.info_header}>COACHES</div>
                <div className={style.info_content}>
                    <div className={style.info_home_team}>
                        {props.lineups[0].coach.name}
                    </div>
                    <div className={style.info_away_team}>
                        {props.lineups[1].coach.name}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GameLineupsView;