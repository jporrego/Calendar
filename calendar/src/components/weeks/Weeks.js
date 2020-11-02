import React from 'react'
import { format, getDaysInMonth } from 'date-fns';

import Day from '../day/Day.js';
import './Weeks.css';

function Weeks(props) {

    let monthDays = [];
    for (let i = 1; i <= props.daysInMonth; i++){
        monthDays.push(i);
    }

    let prevMonthDays = [];
    for (let i = (props.daysPreviousMonth - props.firstDay + 2); i <= props.daysPreviousMonth; i++){
        prevMonthDays.push(i);
    }

    let nextMonthDays = [];
    for (let i = 1; i <= (42 - props.daysInMonth - props.firstDay + 1); i++){
        nextMonthDays.push(i);
    }

    return (
        <div className="weeks">
            <div className="weeks__day-name">
                    <div>mon</div>
                    <div>tue</div>
                    <div>wed</div>
                    <div>thu</div>
                    <div>fri</div>
                    <div>sat</div>
                    <div>sun</div>
            </div>
            <div className="weeks__content">
                {prevMonthDays.map((i) => (
                    <Day day={i} key={i} currentMonth={false}></Day>
                ))}

                {monthDays.map((i) => (
                    <Day day={i} currentMonth={true} key={i} currentDay={format(new Date, "d")}></Day>
                ))}

                {nextMonthDays.map((i) => (
                    <Day day={i} key={i} currentMonth={false}></Day>
                ))}
            </div>            
        </div>
    )
}

export default Weeks
