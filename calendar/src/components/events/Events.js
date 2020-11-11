import React, {useContext} from 'react';
import {CalendarContext} from '../../context/CalendarContext';

import './Events.css';

function Event(props) {
    const calendarContext = useContext(CalendarContext);

    const createEvent = () => {
        let localStorageEvents = JSON.parse(localStorage.getItem("events"));
        if (localStorageEvents == null) {
            localStorageEvents = []
        }
        const newEvent = {
            day: props.eventList[1],
            month: props.month,
            year: props.year,
            text: "Text",
            time: "21:20"
        }
        localStorageEvents.push(newEvent);
        localStorage.setItem('events', JSON.stringify(localStorageEvents));

        // ------------------------------
        localStorageEvents = JSON.parse(localStorage.getItem("events"));
        const tempList = [];
        if (localStorageEvents) {            

            for (const i of localStorageEvents) {
                if (i.day == props.eventList[1] && i.month == props.month && i.year == props.year) {
                    tempList.push(i);
                }
            }
        }
        console.log(tempList);
        //props.showEventsFunc(tempList);
    }

    return (
        <div className="events" style={{display: props.open ? "flex" : "none"}}>
            <div className="events__date">
                {props.month} {calendarContext.selectedDay}, {props.year} 
                <div className="events__close-btn" onClick={props.hideEventsFunc}>x</div>
            </div>
            <div className="events__event-list">
                {props.eventList.length > 0 ? props.eventList[0].map((i) => (
                    <div className="events__event-list__event">
                        <div className="events__event-list__event__time">{i.time}</div>                    
                        <div className="events__event-list__event__text">{i.text}</div>                    
                    </div> 
                )) : null}
            </div>
            <div className="events__add-btn" onClick={createEvent}>+</div>
        </div>
    )
}

export default Event
