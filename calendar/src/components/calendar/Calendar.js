import React from 'react';
import { format, formatDistance, formatRelative, subDays } from 'date-fns'

import Month from '../month/Month.js';
import './Calendar.css';


function Calendar() {

    const month = format(new Date, "MMMM");
    const year = format(new Date, "yyyy");

    return (
        <div className="calendar">
            <Month month={month} year={year}></Month>
        </div>
    )
}

export default Calendar
