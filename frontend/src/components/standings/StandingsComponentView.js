import * as React from 'react';
import style from "./StandingsComponent.module.css";

function StandingsComponentView(props) {
    const getButtonClassName = (buttonTargetCompetition) => {
        return `${style.competition_button} ${props.competition === buttonTargetCompetition ? style.active_competition_button : ''}`;
    }

    const getFormViewColor = (status) => {
        if(status === 'W') return style.background_green;
        if(status === 'L') return style.background_red;
        return style.background_yellow;
    }

    return (
        <div className={style.container}>
            {props.contest?.standings?.length > 1 &&
                <div className={style.competition_filter_container}>
                    {props.contest.standings.map((standing, index, _) => {
                        return (
                            <div
                                key={`game-status-filter-${standing[0]?.group}`}
                                className={getButtonClassName(index)}
                                onClick={() => props.competitionButtonsHandle(index)}
                            >
                                <p>{standing[0]?.group.slice(props.contest.name.length + 2)}</p>
                            </div>
                        );
                    })}
                </div>
            }
            <div className={style.standings_container}>
                <div className={style.standings_container_header}>
                    <div className={style.align_in_row}>
                        <div className={style.position_container}><p>#</p></div>
                        <div className={style.team_container}><p>TEAM</p></div>
                    </div>
                    <div className={style.align_in_row}>
                        <div className={style.matches_played_container}><p>MP</p></div>
                        <div className={style.wins_container}><p>W</p></div>
                        <div className={style.draws_container}><p>D</p></div>
                        <div className={style.losses_container}><p>L</p></div>
                        <div className={style.goals_container}><p>G</p></div>
                        <div className={style.points_container}><p>PTS</p></div>
                        <div className={style.form_container}><p>FORM</p></div>
                    </div>
                </div>
                {props.contest?.standings[props.competition?? 0].map((team_standings, index, _) => {
                    return (
                        <div
                            key={`team_standing_${team_standings.team.id}`}
                            className={style.team_standings_container}
                        >
                            <div className={style.align_in_row}>
                                <div className={style.position_container}>
                                    <p>{index + 1}.</p>
                                </div>
                                <div className={style.team_container}>
                                    <img
                                        className={style.team_logo}
                                        src={team_standings.team.logo}
                                        alt=""
                                    />
                                    <p  onClick={() => props.viewTeamDetails(team_standings.team, props.contest)}>
                                        {team_standings.team.name}
                                    </p>
                                </div>
                            </div>
                            <div className={style.align_in_row}>
                                <div className={style.matches_played_container}>
                                    <p>{team_standings.all.played}</p>
                                </div>
                                <div className={style.wins_container}>
                                    <p>{team_standings.all.win}</p>
                                </div>
                                <div className={style.draws_container}>
                                    <p>{team_standings.all.draw}</p>
                                </div>
                                <div className={style.losses_container}>
                                    <p>{team_standings.all.lose}</p>
                                </div>
                                <div className={style.goals_container}>
                                    <p>{`${team_standings.all.goals.for}:${team_standings.all.goals.against}`}</p>
                                </div>
                                <div className={style.points_container}>
                                    <p>{team_standings.points}</p>
                                </div>
                                <div className={style.form_container}>
                                    {team_standings.form.split('').map((status, index, _) => {
                                        return (
                                            <div
                                                key={`game_status_${index}`}
                                                className={`${style.form_view} ${getFormViewColor(status)}`}
                                            >
                                                {status}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default StandingsComponentView;