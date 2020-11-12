import React, {useEffect, useState, useContext} from 'react';
import { v4 as uuidv4 } from 'uuid';
import {CalendarContext} from '../../context/CalendarContext';
import { format, getDaysInMonth } from 'date-fns';
import { motion } from "framer-motion";

import Day from '../day/Day.js';
import Events from '../events/Events.js';
import './Weeks.css';


function Weeks() {
    const 
    {month, 
    year,
    previousMonth,
    nextMonth,
    firstDay,
    daysInMonth,
    previousMonthDays} = useContext(CalendarContext);

    const [monthDays, setMonthDays] = useState([]);
    const [prevMonthDays, setPrevMonthDays] = useState([]);
    const [nextMonthDays, setNextMonthDays] = useState([]);
    const [openEvents, setOpenEvents] = useState(false);
    const [eventList, setEventList] = useState([]);

    useEffect(() => {
        calculateDays();
        hideEvents();
    }, [month, year]);

    const calculateDays = () => {
        setMonthDays([]);
        setPrevMonthDays([]);
        setNextMonthDays([]);

        setTimeout(() => {
            let monthDaysList = [];
            for (let i = 1; i <= daysInMonth; i++){
                monthDaysList.push(i);
            }
            setMonthDays(monthDaysList);

            let prevMonthDaysList = [];
            for (let i = (previousMonthDays - firstDay + 2); i <= previousMonthDays; i++){
                prevMonthDaysList.push(i);
            }
            setPrevMonthDays(prevMonthDaysList);

            let nextMonthDaysList = [];
            for (let i = 1; i <= (42 - daysInMonth - firstDay + 1); i++){
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

    const checkIfDecember = () => {
        if (month == "December") {
            // return list including previous year ---------------------
            return "January";
        } else {
            return nextMonth;
        }
    }
    const checkIfJanuary = () => {
        if (month == "January") {
            // return list including previous year ---------------------
            return "December";
        } else {
            return previousMonth;
        }
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
                    <motion.div variants={dayVariants} style={{width: "100%", height: "100%"}} key={i}>
                        <Day day={i} currentMonth={false} month = {checkIfJanuary()} year = {year} showEventsFunc={showEvents} eventList={eventList}></Day>
                    </motion.div>
                ))}

                {monthDays.map((i) => (
                    <motion.div variants={dayVariants} style={{width: "100%", height: "100%"}} key={i}>
                        <Day day={i} currentMonth={true} currentDay={format(new Date, "d")}
                        month = {month} year = {year} showEventsFunc={showEvents} eventList={eventList}></Day>
                     </motion.div>
                ))}

                {nextMonthDays.map((i) => (
                    <motion.div variants={dayVariants} style={{width: "100%", height: "100%"}} key={i}>
                        <Day day={i} currentMonth={false} month = {checkIfDecember()} ></Day>
                    </motion.div>
                ))}
            </motion.div>            
            <motion.div className="event-modal">
                {/*}<Events open={openEvents} hideEventsFunc={hideEvents} showEventsFunc={showEvents} month = {month} year = {year} showEventsFunc={showEvents} eventList={eventList}></Events>{*/}
            </motion.div>
        </div>
    )
}

export default Weeks
