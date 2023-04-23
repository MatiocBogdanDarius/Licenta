import React from 'react';
import style from './Calendar.module.css';
import {IntlProvider, LocalizationProvider} from "@progress/kendo-react-intl";

import {AgendaView, DayView, MonthView, Scheduler, WeekView} from '@progress/kendo-react-scheduler';
import '@progress/kendo-date-math/tz/Etc/UTC';
import '@progress/kendo-date-math/tz/Europe/Sofia';
import '@progress/kendo-date-math/tz/Europe/Madrid';
import '@progress/kendo-date-math/tz/Asia/Dubai';
import '@progress/kendo-date-math/tz/Asia/Tokyo';
import '@progress/kendo-date-math/tz/America/New_York';
import '@progress/kendo-date-math/tz/America/Los_Angeles';
import 'Sport-Events/dist/css/sport-events.css';
import {customModelFields} from './resources/events-utc';

function CalendarView(props) {
    return (
        <div className={style.calendar_section}>
            <LocalizationProvider language={props.locale.language}>
                <IntlProvider locale={props.locale.locale}>
                    <Scheduler
                        className={style.scheduler}
                        data={props.data}
                        onDataChange={props.handleDataChange}
                        view={props.view}
                        onViewChange={props.handleViewChange}
                        date={props.date}
                        onDateChange={props.handleDateChange}
                        editable={true}
                        timezone={props.timezone}
                        modelFields={customModelFields}
                        group={{
                            resources: ['GAMES']
                        }}
                        resources={[{
                            name: 'GAMES',
                            data: [{text: 'Schedule', value: 1}],
                            field: 'GameID',
                            valueField: 'value',
                            textField: 'text',
                            colorField: 'color'
                        }]}
                    >
                        <DayView showWorkHours={false}/>
                        <WeekView showWorkHours={false}/>
                        <MonthView/>
                        <AgendaView/>
                    </Scheduler>
                </IntlProvider>
            </LocalizationProvider>
        </div>
    );
}

export default CalendarView;