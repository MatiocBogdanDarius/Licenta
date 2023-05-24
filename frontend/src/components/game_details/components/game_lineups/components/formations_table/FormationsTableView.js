import * as React from 'react';
import style from "./FormationsTable.module.css";

function FormationsTableView(props) {
    return (
        <div className={style.table}>
            <div className={style.table_home_team}>
                <div className={style.table_team_line}>
                    <div className={style.table_player}></div>
                </div>
                {props.lineups[0].formation.split('-').map(linePlayerName => {
                    return (
                        <div className={style.table_team_line}>
                            {[...Array(+linePlayerName)].map(_ =>  {
                                return (
                                    <div className={style.table_player}></div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
            <div className={style.table_away_team}>
                <div className={style.table_team_line}>
                    <div className={style.table_player}></div>
                </div>
                {props.lineups[1].formation.split('-').map(linePlayerName => {
                    return (
                        <div className={style.table_team_line}>
                            {[...Array(+linePlayerName)].map(_ =>  {
                                return (
                                    <div className={style.table_player}></div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default FormationsTableView;