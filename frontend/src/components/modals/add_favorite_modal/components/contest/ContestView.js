import * as React from 'react';
import style from './Contest.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown, faAngleUp, faCalendarPlus} from "@fortawesome/free-solid-svg-icons";
import GameList from "../game_list";

function ContestView(props) {
    return (
        <div className={style.container}>
            {props.showHeader &&
                <div className={style.header}>
                    <div className={style.header_left}>
                        {/*<FontAwesomeIcon*/}
                        {/*    icon={faCalendarPlus}*/}
                        {/*    type="checkbox"*/}
                        {/*    // onClick={() => props.handleCheck(game)}*/}
                        {/*    className={`${style.check_button} ${props.isCheckedAllAfterTodayGames ? style.checked : ''}`}*/}
                        {/*/>*/}
                        <h2 className={style.header_title}>{props.title}</h2>
                    </div>
                    <FontAwesomeIcon
                        icon={props.showContest ? faAngleUp : faAngleDown}
                        className={style.toggle_contest_icon}
                        onClick={props.toggleMatchesListIconHandle}
                    />
                </div>
            }
            {props.showContest &&
                <div className={style.games_container}>
                    {props.games?.today?.length !== 0 &&
                        <GameList
                            title="Today's Matches"
                            games={props.games?.today}
                            selectedGames={props.selectedGames}
                            setSelectedGames={props.setSelectedGames}
                        />
                    }
                    {props.games?.after_today?.length !== 0 &&
                        <GameList
                            title="Scheduled"
                            games={props.games?.after_today}
                            selectedGames={props.selectedGames}
                            setSelectedGames={props.setSelectedGames}
                        />
                    }
                    {props.games?.before_today?.length !== 0 &&
                        <GameList
                            title="Played"
                            games={props.games?.before_today}
                            selectedGames={props.selectedGames}
                            setSelectedGames={props.setSelectedGames}
                        />
                    }
                </div>
            }
        </div>
    );
}

export default ContestView;