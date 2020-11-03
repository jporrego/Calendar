import React from 'react';

import './Events.css';

function Event(props) {
    return (
        <div className="events" style={{display: props.open ? "flex" : "none"}}>
            <div className="events__date"></div>
            <div className="events__event-list">
                {/*
                <div className="events__event-list__event">
                    <div className="events__event-list__event__time">10:00</div>                    
                    <div className="events__event-list__event__text">Reunion sobre lorem ipsum con lorem ipsum y lorem ipsum.</div>
                    
                </div> 
                */}
                {props.eventList.map((i) => (
                    <div className="events__event-list__event">
                        <div className="events__event-list__event__time">{i.time}</div>                    
                        <div className="events__event-list__event__text">{i.text}</div>                    
                    </div> 
                ))}
            </div>
            <div className="events__close-btn" onClick={props.hideEventsFunc}>x</div>
        </div>
    )
}

export default Event
