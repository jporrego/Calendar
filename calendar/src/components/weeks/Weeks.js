import React, {useEffect, useState} from 'react'
import { format, getDaysInMonth } from 'date-fns';
import { motion } from "framer-motion";

import Day from '../day/Day.js';
import Event from '../events/Events.js';
import './Weeks.css';


function Weeks(props) {
    const [monthDays, setMonthDays] = useState([]);
    const [prevMonthDays, setPrevMonthDays] = useState([]);
    const [nextMonthDays, setNextMonthDays] = useState([]);
    const [openEvents, setOpenEvents] = useState(false);
    const [eventList, setEventList] = useState([]);

    useEffect(() => {
        calculateDays();
        hideEvents();
    }, [props.month, props.year]);

    const calculateDays = () => {
        setMonthDays([]);
        setPrevMonthDays([]);
        setNextMonthDays([]);

        setTimeout(() => {
            let monthDaysList = [];
            for (let i = 1; i <= props.daysInMonth; i++){
                monthDaysList.push(i);
            }
            setMonthDays(monthDaysList);

            let prevMonthDaysList = [];
            for (let i = (props.daysPreviousMonth - props.firstDay + 2); i <= props.daysPreviousMonth; i++){
                prevMonthDaysList.push(i);
            }
            setPrevMonthDays(prevMonthDaysList);

            let nextMonthDaysList = [];
            for (let i = 1; i <= (42 - props.daysInMonth - props.firstDay + 1); i++){
                nextMonthDaysList.push(i);
            }
            setNextMonthDays(nextMonthDaysList);
        }, 10);

        
    } 


    const variants = {
        visible: { opacity: 1, y:"0px", transition: {
          when: "beforeChildren",
          staggerChildren: .1,
          duration: .25,
        }, },
        hidden: { opacity: 0, y:"-10px" },
      }

    const dayVariants = {
      visible: { opacity: 1, y:"0px", transition: {
        when: "beforeChildren",
        staggerChildren: .01,
        duration: .3,
        initialDelay: 1,
      }, },
      hidden: { opacity: 0, y:"-10px" },
    }

    const events = [
        {
            day: 5,
            month: "November",
            year: 2020,
            text: "text text text text text text text",
            time: "10:00"
        },
        {
            day: 17,
            month: "November",
            year: 2020,
            text: "text text text text text text text",
            time: "11:45"
        },
        {
            day: 10,
            month: "December",
            year: 2020,
            text: "text text text text text text text",
            time: "14:30"
        },
        {
            day: 30,
            month: "October",
            year: 2020,
            text: "text text text text text text text",
            time: "20:15"
        }           
    ]
    
    

    const showEvents = (eventList) => {
        setOpenEvents(true);
        setEventList(eventList);
    }

    const hideEvents = () => {
        setOpenEvents(false);
    }

    return (
        <div className="weeks">
            <motion.div className="weeks__day-name" initial="hidden" animate="visible" variants={variants}>
                    <motion.div variants={variants}>mon</motion.div>
                    <motion.div variants={variants}>tue</motion.div>
                    <motion.div variants={variants}>wed</motion.div>
                    <motion.div variants={variants}>thu</motion.div>
                    <motion.div variants={variants}>fri</motion.div>
                    <motion.div variants={variants}>sat</motion.div>
                    <motion.div variants={variants}>sun</motion.div>
            </motion.div>
            <motion.div className="weeks__content" initial="hidden" animate="visible" variants={dayVariants}>
                {prevMonthDays.map((i) => (
                    <motion.div variants={dayVariants} style={{width: "100%", height: "100%"}}>
                        <Day day={i} key={i} currentMonth={false} ></Day>
                    </motion.div>
                ))}

                {monthDays.map((i) => (
                    <motion.div variants={dayVariants} style={{width: "100%", height: "100%"}}>
                        <Day day={i} currentMonth={true} key={i} currentDay={format(new Date, "d")}
                        month = {props.month} year = {props.year} showEventsFunc={showEvents} eventList={eventList}></Day>
                     </motion.div>
                ))}

                {nextMonthDays.map((i) => (
                    <motion.div variants={dayVariants} style={{width: "100%", height: "100%"}}>
                        <Day day={i} key={i} currentMonth={false}></Day>
                    </motion.div>
                ))}
            </motion.div>            
            <motion.div className="event-modal">
                <Event open={openEvents} hideEventsFunc={hideEvents} 
                eventList={eventList} month = {props.month} year = {props.year}></Event>
            </motion.div>
        </div>
    )
}

export default Weeks
