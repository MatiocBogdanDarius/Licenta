import React, {useCallback, useEffect, useMemo, useState} from "react";
import CalendarView from "./CalendarView";
import * as USER_ACCOUNT_SERVICE from 'services/api/user_account_service'
import {load} from "@progress/kendo-react-intl";
import weekData from 'cldr-core/supplemental/weekData.json';
import currencyData from 'cldr-core/supplemental/currencyData.json';
import likelySubtags from 'cldr-core/supplemental/likelySubtags.json';
import numbers from 'cldr-numbers-full/main/es/numbers.json';
import dateFields from 'cldr-dates-full/main/es/dateFields.json';
import currencies from 'cldr-numbers-full/main/es/currencies.json';
import caGregorian from 'cldr-dates-full/main/es/ca-gregorian.json';
import timeZoneNames from 'cldr-dates-full/main/es/timeZoneNames.json';
import {timezoneNames} from "@progress/kendo-date-math";
import {displayDate} from "./resources/events-utc";
import {guid} from "@progress/kendo-react-common";

load(likelySubtags, currencyData, weekData, numbers, currencies, caGregorian, dateFields, timeZoneNames);

const currentYear = new Date().getFullYear();
const parseAdjust = eventDate => {
    const date = new Date(eventDate);
    date.setFullYear(currentYear);
    return date;
};

const locales = [{
    language: 'en-US',
    locale: 'en'
}, {
    language: 'es-ES',
    locale: 'es'
}];

export function CalendarContainer() {
    const [view, setView] = useState('week');
    const [date, setDate] = useState(displayDate);
    const [locale, setLocale] = useState(locales[0]);
    const [timezone, setTimezone] = useState('Etc/UTC');
    const [orientation, setOrientation] = useState('horizontal');
    const [data, setData] = useState([]);

    const timezones = useMemo(() => timezoneNames(), []);

    useEffect(() => {
        getData()
    }, []);

    const handleViewChange = useCallback(event => {
        setView(event.value);
    }, [setView]);

    const handleDateChange = useCallback(event => {
        setDate(event.value);
    }, [setDate]);

    const handleLocaleChange = useCallback(event => {
        setLocale(event.target.value);
    }, [setLocale]);

    const handleTimezoneChange = useCallback(event => {
        setTimezone(event.target.value);
    }, [setTimezone]);

    const handleOrientationChange = useCallback(event => {
        setOrientation(event.target.getAttribute('data-orientation'));
    }, []);

    const handleDataChange = useCallback(({created, updated, deleted}) => {
        setData(old => old.filter(item => deleted.find(current => current.TaskID === item.TaskID) === undefined).map(item => updated.find(current => current.TaskID === item.TaskID) || item).concat(created.map(item => Object.assign({}, item, {
            TaskID: guid()
        }))));
    }, [setData]);

    const getData = async () => {
        let schedules = await USER_ACCOUNT_SERVICE
            .getUserCalendar()
            .then(response => {
                console.log(response.data)
                return response.data.map(schedule => {
                    return {
                        ...schedule,
                        start: parseAdjust(schedule.start),
                        end: parseAdjust(schedule.end),
                        StartTimezone: null,
                        EndTimezone: null,
                        RecurrenceRule: null,
                        RecurrenceID: null,
                        RecurrenceException: null,
                        isAllDay: false
                    }
                })
            })
            .catch(() => []);

        setData(schedules);
    }

    return (
        <CalendarView
            timezones={timezones}
            view={view}
            date={date}
            locale={locale}
            timezone={timezone}
            data={data}
            orientation={orientation}
            handleViewChange={handleViewChange}
            handleDateChange={handleDateChange}
            handleLocaleChange={handleLocaleChange}
            handleTimezoneChange={handleTimezoneChange}
            handleOrientationChange={handleOrientationChange}
            handleDataChange={handleDataChange}
        />
    );
}
