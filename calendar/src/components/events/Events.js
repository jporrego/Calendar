import React, {useContext, useState, useEffect} from 'react';
import {CalendarContext} from '../../context/CalendarContext';
import { v4 as uuidv4 } from 'uuid';


import './Events.css';
import { motion, useAnimation } from 'framer-motion';

function Event(props) {
    const {selectedDay, month, year} = useContext(CalendarContext);

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
            day: selectedDay,
            month: month,
            year: year,
            title: eventData.title,
            text: eventData.description,
            time: eventData.time
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
        setShowForm(false);
    }

    const eventsLayout = () => {
         return (
         <motion.div className="events" animate={controls}>
            <div className="events__date">
                {month} {selectedDay}, {year} 
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
                )) : null}
            </div>
            
        </motion.div>)
    }

    const formLayout = () => {
        return (
            <motion.div className="event-form" animate={controls}>
                <form onSubmit={handleSubmit} className="event-form__form">                               
                    <input placeholder="Add a title" type="text" name="title" maxLength="30" id="title" onChange={handleChange} value={eventData.title} required/>
                    
                    <label>
                        Description
                        <textarea name="description" id="description" cols="30" rows="3" 
                        maxLength="100" onChange={handleChange} value={eventData.description}></textarea>
                    </label>
                    <label>
                        Time
                        <input type="time" name="time" id="time" onChange={handleChange} value={eventData.time} required/>
                    </label> 
                    <div className="event-form__form__buttons">
                        <input type="submit" value="Submit"/>
                        <div className="event-form__cancel-btn" onClick={() => (setShowForm(false), triggerAnimation())}>Cancel</div>
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
        <motion.div animate={{x:[-100, 0], opacity:["0%", "100%"]}}
        transition={{duration: 1, delay: .5}} 
        className="event-background">
            {showForm ? formLayout() : eventsLayout()}
        </motion.div>
        
    )
}

export default Event
