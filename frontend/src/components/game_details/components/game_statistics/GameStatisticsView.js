import * as React from 'react';
import style from "./GameStatistics.module.css";

function GameStatisticsView(props) {
    return (
        <div className={style.container}>
            {props.statistics?.length === 0 && <p>Events are not available</p>}
            {/*{props.statistics[0].statistics}*/}
            <div className={style.statistics_container}>
                <p>Ball Possession</p>
                <div className={style.bars}>
                    <div className={`${style.bar} ${style.display_reverse}`}>
                        <div
                            className={style.red_bar}
                            style={{width: '50%'}}
                        ></div>
                    </div>
                    <div className={style.bar}>
                        <div
                            className={style.white_bar}
                            style={{width: '50%'}}
                        ></div>
                    </div>
                </div>
            </div>
            <div className={style.statistics_container}>
                <p>Goal Attempts</p>
                <div className={style.bars}>
                    <div className={`${style.bar} ${style.display_reverse}`}>
                        <div
                            className={style.red_bar}
                            style={{width: '50%'}}
                        ></div>
                    </div>
                    <div className={style.bar}>
                        <div
                            className={style.white_bar}
                            style={{width: '50%'}}
                        ></div>
                    </div>
                </div>
            </div>
            <div className={style.statistics_container}>
                <p>Shots on Goal</p>
                <div className={style.bars}>
                    <div className={`${style.bar} ${style.display_reverse}`}>
                        <div
                            className={style.red_bar}
                            style={{width: '50%'}}
                        ></div>
                    </div>
                    <div className={style.bar}>
                        <div
                            className={style.white_bar}
                            style={{width: '50%'}}
                        ></div>
                    </div>
                </div>
            </div>
            <div className={style.statistics_container}>
                <p>Total passes</p>
                <div className={style.bars}>
                    <div className={`${style.bar} ${style.display_reverse}`}>
                        <div
                            className={style.red_bar}
                            style={{width: '50%'}}
                        ></div>
                    </div>
                    <div className={style.bar}>
                        <div
                            className={style.white_bar}
                            style={{width: '50%'}}
                        ></div>
                    </div>
                </div>
            </div>
            <div className={style.statistics_container}>
                <p>Passes accurate</p>
                <div className={style.bars}>
                    <div className={`${style.bar} ${style.display_reverse}`}>
                        <div
                            className={style.red_bar}
                            style={{width: '50%'}}
                        ></div>
                    </div>
                    <div className={style.bar}>
                        <div
                            className={style.white_bar}
                            style={{width: '50%'}}
                        ></div>
                    </div>
                </div>
            </div>
            <div className={style.statistics_container}>
                <p>Passes %</p>
                <div className={style.bars}>
                    <div className={`${style.bar} ${style.display_reverse}`}>
                        <div
                            className={style.red_bar}
                            style={{width: '50%'}}
                        ></div>
                    </div>
                    <div className={style.bar}>
                        <div
                            className={style.white_bar}
                            style={{width: '50%'}}
                        ></div>
                    </div>
                </div>
            </div>
            <div className={style.statistics_container}>
                <p>Corner Kicks</p>
                <div className={style.bars}>
                    <div className={`${style.bar} ${style.display_reverse}`}>
                        <div
                            className={style.red_bar}
                            style={{width: '50%'}}
                        ></div>
                    </div>
                    <div className={style.bar}>
                        <div
                            className={style.white_bar}
                            style={{width: '50%'}}
                        ></div>
                    </div>
                </div>
            </div>
            <div className={style.statistics_container}>
                <p>Offsides</p>
                <div className={style.bars}>
                    <div className={`${style.bar} ${style.display_reverse}`}>
                        <div
                            className={style.red_bar}
                            style={{width: '50%'}}
                        ></div>
                    </div>
                    <div className={style.bar}>
                        <div
                            className={style.white_bar}
                            style={{width: '50%'}}
                        ></div>
                    </div>
                </div>
            </div>
            <div className={style.statistics_container}>
                <p>Goalkeeper Saves</p>
                <div className={style.bars}>
                    <div className={`${style.bar} ${style.display_reverse}`}>
                        <div
                            className={style.red_bar}
                            style={{width: '50%'}}
                        ></div>
                    </div>
                    <div className={style.bar}>
                        <div
                            className={style.white_bar}
                            style={{width: '50%'}}
                        ></div>
                    </div>
                </div>
            </div>
            <div className={style.statistics_container}>
                <p>Fouls</p>
                <div className={style.bars}>
                    <div className={`${style.bar} ${style.display_reverse}`}>
                        <div
                            className={style.red_bar}
                            style={{width: '50%'}}
                        ></div>
                    </div>
                    <div className={style.bar}>
                        <div
                            className={style.white_bar}
                            style={{width: '50%'}}
                        ></div>
                    </div>
                </div>
            </div>
            <div className={style.statistics_container}>
                <p>Yellow Cards</p>
                <div className={style.bars}>
                    <div className={`${style.bar} ${style.display_reverse}`}>
                        <div
                            className={style.red_bar}
                            style={{width: '50%'}}
                        ></div>
                    </div>
                    <div className={style.bar}>
                        <div
                            className={style.white_bar}
                            style={{width: '50%'}}
                        ></div>
                    </div>
                </div>
            </div>
            <div className={style.statistics_container}>
                <p>Red Cards</p>
                <div className={style.bars}>
                    <div className={`${style.bar} ${style.display_reverse}`}>
                        <div
                            className={style.red_bar}
                            style={{width: '50%'}}
                        ></div>
                    </div>
                    <div className={style.bar}>
                        <div
                            className={style.white_bar}
                            style={{width: '50%'}}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GameStatisticsView;