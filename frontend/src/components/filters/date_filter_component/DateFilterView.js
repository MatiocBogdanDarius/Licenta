import * as React from 'react';
import style from "./DateFilter.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight, faCalendar} from "@fortawesome/free-solid-svg-icons";

function DateFilterView(props) {
    return (
        <div className={style.date_selector_container}>
            <div className={style.selected_date_container}>
                {props.selectedDate !== -7 ?
                    <div
                        className={style.previous_date_arrow_container}
                        onClick={props.previousDateButtonHandle}
                    >
                        <FontAwesomeIcon icon={faAngleLeft}/>
                    </div>
                    : <div className={style.disable_previous_next_button}></div>
                }
                <div
                    className={style.date_container}
                    onClick={props.toggleDatesOptionsList}
                >
                    <FontAwesomeIcon icon={faCalendar}/>
                    <p>{props.datesList[props.selectedDate]}</p>
                </div>
                {props.selectedDate !== 7 ?
                    <div
                        className={style.next_date_arrow_container}
                        onClick={props.nextDateButtonHandle}
                    >
                        <FontAwesomeIcon icon={faAngleRight}/>
                    </div>
                    : <div className={style.disable_previous_next_button}></div>
                }
            </div>
            {props.isVisibleDateOptionsList &&
                <div className={style.date_options_list}>
                    {Object.keys(props.datesList)
                        .map(x => parseInt(x))
                        .sort((x, y) => x - y)
                        .map(date => {
                            return <div
                                key={`date-${date}`}
                                className={`${style.date_option_container} ${props.selectedDate === date ? style.active_date_option : ''}`}
                                onClick={() => props.selectDateOptionHandle(date)}
                            >
                                <p>{props.datesList[date]}</p>
                            </div>
                        })}
                </div>
            }
        </div>
    );
}

export default DateFilterView;