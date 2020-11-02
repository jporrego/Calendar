import { format } from 'date-fns';
import React from 'react'

import './Day.css';

function Day(props) {

    const setColor = () => {
        if (props.currentDay == props.day && props.month == format(new Date, "MMMM") && props.year == format(new Date, "yyyy")) {
            return ["var(--primary-color)", "var(--font-color-light)"];
        } else if (props.currentMonth){
            return ["var(--bg-color)", "var(--font-color-dark)"];
        } else {
            return ["var(--bg-color)", "var(--font-color-grey)"];
        }
    } 

    return (
        <div className="day" style={{backgroundColor: setColor()[0], color: setColor()[1]}}>
            {props.day}
        </div>
    )
}

export default Day
