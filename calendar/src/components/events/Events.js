import React, {useContext, useState, useEffect} from 'react';
import {CalendarContext} from '../../context/CalendarContext';
import { v4 as uuidv4 } from 'uuid';


import './Events.css';
import { motion, useAnimation } from 'framer-motion';

function Event(props) {
    const {selectedDay, refreshEventsFunc} = useContext(CalendarContext);

    const [eventList, setEventList] = useState([]);
    const [showForm, setShowForm] = useState(false);
    // Event form inputs state
    const [eventData, setEventData] = useState({
        title: "",
        description: "",
        time: ""

    });

    useEffect(() => {
        updateEvents();
    }, [selectedDay]);    

    const updateEvents = () => {
        const localStorageEvents = JSON.parse(localStorage.getItem("events"));

        if (localStorageEvents) {
            const tempList = [];

            for (const i of localStorageEvents) {
                if (i.day == selectedDay.day && i.month == selectedDay.month && i.year == selectedDay.year) {
                    tempList.push(i);
                }
            }

            const sortedTempList = [];

            for (let i = 0; i < tempList.length; i++){
                let currentObjTime = Number(tempList[i].time.replace(":", ""));   
             
                if (i == 0) {
                    sortedTempList.push(tempList[i])
                } else if (currentObjTime > Number(sortedTempList[i-1].time.replace(":", ""))){
                    sortedTempList.push(tempList[i])                                        
                } else {
                    let z = sortedTempList.length;
                    while (currentObjTime < Number(sortedTempList[z-1].time.replace(":", ""))) {
                        z--;
                        if (z == 0) {
                            break;
                        }            
                    }
                    sortedTempList.splice(z, 0, tempList[i])    
                }
            }

            setEventList(sortedTempList);
        }
    }

    const handleChange = (e) => {
        setEventData({...eventData, [e.target.name] : e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        let localStorageEvents = JSON.parse(localStorage.getItem("events"));
        if (localStorageEvents == null) {
            localStorageEvents = []
        }
        const newEvent = {
            day: selectedDay.day,
            month: selectedDay.month,
            year: selectedDay.year,
            title: eventData.title,
            text: eventData.description,
            time: eventData.time
        }
        localStorageEvents.push(newEvent);
        localStorage.setItem('events', JSON.stringify(localStorageEvents));

        updateEvents();
        setShowForm(false);
        refreshEventsFunc();
        setEventData({
            title: "",
            description: "",
            time: ""
    
        });
    }

    const eventsLayout = () => {
         return (
         <motion.div className="events" animate={controls}>
            <div className="events__date">
                {selectedDay.month} {selectedDay.day}, {selectedDay.year} 
                <div className="events__add-btn" onClick={() => (setShowForm(true), triggerAnimation())}>New Event</div>
            </div>
            <div className="events__event-list">
                {eventList.length > 0 ? eventList.map((i) => (
                    <div className="events__event-list__event" key={uuidv4()}>
                        <div className="events__event-list__event__title-and-time">
                            <div className="events__event-list__event__time">{i.time}</div>
                            <div className="events__event-list__event__title">{i.title}</div>
                        </div>                                             
                        <div className="events__event-list__event__text">{i.text}</div>                    
                    </div> 
                )) : <div className="events__event-list__no-event-message">You have no events scheduled for this day.</div>}
            </div>
            
        </motion.div>)
    }

    const formLayout = () => {
        return (
            <motion.div className="event-form" animate={controls}>
                <form onSubmit={handleSubmit} className="event-form__form">
                    <label>
                        Title
                        <input placeholder="" type="text" name="title" maxLength="35" 
                        id="title" onChange={handleChange} value={eventData.title} required/>
                    </label>                               
                    
                    
                    <label>
                        Description
                        <textarea name="description" id="description"  
                        maxLength="120" onChange={handleChange} value={eventData.description} placeholder=""></textarea>
                    </label>
                    <label>
                        Time
                        <input type="time" name="time" id="time" onChange={handleChange} value={eventData.time} required/>
                    </label> 
                    <div className="event-form__form__buttons">
                        <input type="submit" value="Submit"/>
                        <div className="event-form__cancel-btn" id="cancel-btn" onClick={() => (setShowForm(false), triggerAnimation())}>Cancel</div>
                    </div>              
                </form>
            </motion.div>)
    }

    // Animation
    const controls = useAnimation()
    const triggerAnimation = () => {
        controls.start({
            opacity: ["0%", "100%"],
            transition: { duration: .3 },
          })
    }
    return (
        <motion.div animate={{x:[-200, 0], opacity:["0%", "100%"]}}
        transition={{duration: 1, delay: .5, damping: 0}} 
        className="event-background">
            {showForm ? formLayout() : eventsLayout()}
        </motion.div>
        
    )
}

export default Event
