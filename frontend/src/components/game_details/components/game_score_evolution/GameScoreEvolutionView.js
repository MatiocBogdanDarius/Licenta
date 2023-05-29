import * as React from 'react';
import style from "./GameScoreEvolution.module.css";

function GameScoreEvolutionView(props) {
    const getStyle = (field) => {
        return {
            fontWeight: field.bold ? 'bold' : 'normal',
            color: field.bold ? '#86C232': "white"
        }
    }

    return (
        <div className={style.container}>
            <div className={style.header}>
                <div className={style.player_container}></div>
                <div className={style.statistics_container}>
                    {props.evolutionScore.evolution.map(field => {
                        return (
                            <div className={style.statistics_column}
                                 style={getStyle(field)}
                            >
                                {field.short_name}
                            </div>
                        );
                    })}
                </div>
            </div>
            {['home', 'away'].map(team => {
                return (
                    <div className={style.row}>
                        <div className={style.player_container}>
                            <img
                                className={style.logo}
                                src={props.evolutionScore.teams[team].logo}
                                alt=""
                            />
                            <div className={style.team_name}>
                                {props.evolutionScore.teams[team].name}
                            </div>
                        </div>
                        <div className={style.statistics_container}>
                            {props.evolutionScore.evolution.map(field => {
                                return (
                                    <div className={style.statistics_column}
                                        style={getStyle(field)}
                                    >
                                        {field.values[team]}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default GameScoreEvolutionView;