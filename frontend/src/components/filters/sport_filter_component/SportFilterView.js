import * as React from 'react';
import style from "./SportFilter.module.css";
import {SPORTS} from "assets/constants/Data";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";

function SportFilterView(props) {
    const getButtonClassName = (buttonTargetSport) => {
        return `${style.sport_filter_button} ${props.selectedSport === buttonTargetSport ? style.active_sport_filter_button : ''}`
    }

    return (
        <div className={style.sport_filter_container}>
            <div className={style.sport_filter_buttons_list}>
                {Object.values(SPORTS).map(sport => {
                    return (
                        <div
                            key={`sport-filter-${sport.name}`}
                            className={getButtonClassName(sport.name)}
                            onClick={() => props.selectSportButtonsHandler(sport.name)}
                        >
                            {sport === SPORTS.HANDBALL ?
                                <img
                                    src={sport.icon}
                                    className={style.sport_filter_button_icon}
                                    alt=""
                                />
                                : <FontAwesomeIcon
                                    icon={sport.icon}
                                    className={style.sport_filter_button_icon}
                                />
                            }
                            <p>{sport.name}</p>
                        </div>
                    );
                })}
            </div>
            <div className={style.sport_filter_more_option_button}>
                <p>More</p>
                <FontAwesomeIcon
                    icon={faAngleDown}
                    className={style.sport_filter_more_option_icon}
                />
            </div>
        </div>
    );
}

export default SportFilterView;