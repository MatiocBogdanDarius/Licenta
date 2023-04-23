import React, {useEffect, useState} from "react";
import DateFilterView from "./DateFilterView";
import {addDays} from "date-fns";

export function DateFilterContainer(props) {
    const [isVisibleDateOptionsList, setIsVisibleDateOptionsList] = useState(false);
    const [datesList, setDatesList] = useState([]);

    useEffect(() => initDatesList(), [])

    const initDatesList = () => {
        let newDatesList = [];

        for (let increment = -7; increment <= 7; increment++) {
            let date = addDays(new Date(), increment)
            const day = ('0' + date.getDate()).slice(-2);
            const month = ('0' + (date.getMonth() + 1)).slice(-2);
            date = `${day}/${month}`

            newDatesList[increment] = date;
        }

        setDatesList(newDatesList);
        props.selectDateOptionHandle(0);
    }

    const previousDateButtonHandle = () => {
        props.selectDateOptionHandle(prevState => --prevState)
    }

    const nextDateButtonHandle = () => {
        props.selectDateOptionHandle(prevState => ++prevState)
    }

    const toggleDatsOptionsList = () => {
        setIsVisibleDateOptionsList(prevState => !prevState)
    }

    return (
        <DateFilterView
            selectedDate={props.selectedDate}
            isVisibleDateOptionsList={isVisibleDateOptionsList}
            datesList={datesList}
            setSelectedDate={props.setSelectedDate}
            previousDateButtonHandle={previousDateButtonHandle}
            nextDateButtonHandle={nextDateButtonHandle}
            toggleDatesOptionsList={toggleDatsOptionsList}
            selectDateOptionHandle={props.selectDateOptionHandle}
        />
    );
}
