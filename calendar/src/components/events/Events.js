import React, {useContext, useState, useEffect} from 'react';
import {CalendarContext} from '../../context/CalendarContext';
import { v4 as uuidv4 } from 'uuid';

import './Events.css';

function Event(props) {
    const {selectedDay, month, year} = useContext(CalendarContext);

    const [eventList, setEventList] = useState([]);

    useEffect(() => {
        updateEvents();
    }, [selectedDay]);

    

    const updateEvents = () => {
        const localStorageEvents = JSON.parse(localStorage.getItem("events"));
        if (localStorageEvents) {
            const tempList = [];

            for (const i of localStorageEvents) {
                if (i.day == selectedDay && i.month == month && i.year == year) {
                    tempList.push(i);
                }
            }

            setEventList(tempList);
        }
    }

    const createEvent = () => {
        let localStorageEvents = JSON.parse(localStorage.getItem("events"));
        if (localStorageEvents == null) {
            localStorageEvents = []
        }
        const newEvent = {
            day: selectedDay,
            month: month,
            year: year,
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
                if (i.day == eventList[1] && i.month == month && i.year == year) {
                    tempList.push(i);
                }
            }
        }
        updateEvents();
        //props.showEventsFunc(tempList);
    }

    return (
        <div className="events" style={{display: props.open ? "flex" : "none"}}>
            <div className="events__date">
                {month} {selectedDay}, {year} 
                <div className="events__close-btn" onClick={props.hideEventsFunc}>x</div>
            </div>
            <div className="events__event-list">
                {eventList.length > 0 ? eventList.map((i) => (
                    <div className="events__event-list__event" key={uuidv4()}>
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
