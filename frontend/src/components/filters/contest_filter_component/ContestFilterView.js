import * as React from 'react';
import style from "./ContestFilter.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown, faAngleUp} from "@fortawesome/free-solid-svg-icons";

function ContestFilterView(props) {
    return (
        <div className={style.container}>
            <div className={style.header}>
                <p>COUNTRIES</p>
            </div>
            {props.countries.map(country => {
                return (<div key={`contests-${country.name}`}>
                    <div
                        className={style.country_title}
                        onClick={(e) => props.toggleCountryContestButtonsHandler(e, country.name)}
                    >
                        <p>{country.name}</p>
                        <FontAwesomeIcon
                            icon={country.isVisibleContests ? faAngleUp : faAngleDown}
                            className={style.icon}
                        />
                    </div>
                    {country.isVisibleContests &&
                        <div className={style.contests_list}>
                            {country.contests.map(contest => {
                                return <div
                                    key={`contests-${country.name}-${contest.league.id}`}
                                    className={style.contest_title}
                                    onClick={() => props.selectContestButtonsHandle(contest)}
                                >
                                    <p>{contest.league.name}</p>
                                </div>
                            })}
                        </div>}
                </div>)
            })}
            {props.isVisibleShowMoreButton &&
                <div
                    className={style.show_more_countries_button}
                    onClick={props.showMoreCountriesButtonHandle}
                >
                    <p>{`Show ${props.isVisibleAllCountries ? 'less' : 'more'}`}</p>
                    <FontAwesomeIcon
                        icon={props.isVisibleAllCountries ? faAngleUp : faAngleDown}
                        className={style.icon}
                    />
                </div>
            }
        </div>
    );
}

export default ContestFilterView;