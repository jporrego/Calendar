import React from 'react';
import { format, getDaysInMonth } from 'date-fns';

import Day from '../day/Day.js';
import './Month.css';

function Month(props) {   
    const daysInMonth = getDaysInMonth(new Date);
    let list = [];

    for (let i = 1; i <= daysInMonth; i++){
        list.push(i);
    }

    return (
        <div className="month">
            <div className="month__name">{props.month} {props.year}</div> 
            <div className="month__days">{list.map((i) => (
                <Day day={i} key={i}></Day>
            ))}</div>
            
        </div>
    )
}

export default Month
