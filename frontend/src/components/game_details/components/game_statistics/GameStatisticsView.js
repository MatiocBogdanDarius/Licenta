import * as React from 'react';
import style from "./GameStatistics.module.css";

function GameStatisticsView(props) {
    const getBarStyle = (statisticName, team) => {
        const percent =  props.getPercent(statisticName, team);

        return percent > 50 ? style.red_bar : style.white_bar
    }

    return (
        <div className={style.container}>
            {props.statistics?.length === 0 && <p>Events are not available</p>}
            {Object.keys(props.statistics[0].statistics).map(statisticName => {
                return props.statistics[0].statistics[statisticName].value
                    ? <div key={`statistic-${statisticName}`}
                           className={style.statistic_container}
                    >
                        <div className={style.statistic_info}>
                            <p>{props.statistics[0].statistics[statisticName].value ?? 0}</p>
                            <h2>{props.statistics[0].statistics[statisticName].type}</h2>
                            <p>{props.statistics[1].statistics[statisticName].value ?? 0}</p>
                        </div>
                        <div className={style.bars}>
                            <div className={`${style.bar} ${style.display_reverse}`}>
                                <div className={getBarStyle(statisticName, 0)}
                                    style={{width: `${props.getPercent(statisticName, 0)}%`}}
                                ></div>
                            </div>
                            <div className={style.bar}>
                                <div className={getBarStyle(statisticName, 1)}
                                    style={{width: `${props.getPercent(statisticName, 1)}%`}}
                                ></div>
                            </div>
                        </div>
                    </div>
                    : <React.Fragment key={`statistic-${statisticName}`} />
            })}
        </div>
    );
}

export default GameStatisticsView;