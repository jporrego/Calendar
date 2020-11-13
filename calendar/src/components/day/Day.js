import React, {useState, useEffect, useContext} from 'react'
import { CalendarContext } from '../../context/CalendarContext';
import { format } from 'date-fns';

import './Day.css';

function Day(props) {
    const calendarContext = useContext(CalendarContext);

    const [events, setEvents] = useState([]);

    useEffect(() => {
        checkEvents();
    }, [calendarContext.refreshEvents])

    const setColor = () => {
        if (props.currentDay == props.day && props.month == format(new Date, "MMMM") && props.year == format(new Date, "yyyy")) {
            return ["var(--primary-color)", "var(--font-color-light)"];
        } else if (props.currentMonth){
            return ["var(--bg-color)", "var(--font-color-dark)"];
        } else {
            return ["var(--bg-color)", "var(--font-color-grey)"];
        }
    }
    
    const checkEvents = () => {        
        const localStorageEvents = JSON.parse(localStorage.getItem("events"));
        if (localStorageEvents) {
            const tempList = [];
            setEvents([]);

            for (const i of localStorageEvents) {
                if (i.day == props.day && i.month == props.month && i.year == props.year) {
                    tempList.push(i);
                }
            }

            setEvents(tempList);
        }
        
    }

    const showEvents = () => {
        calendarContext.selectDay(props.day, props.month, props.year);
    }
    
    return (
        <div className="day" style={{backgroundColor: setColor()[0], color: setColor()[1]}} onClick={showEvents}>
            {props.day}
            <div className = {events.length > 0 ? "day__notification-true" : "day__notification-false"}>.</div>
        </div>
    )
}

export default Day
