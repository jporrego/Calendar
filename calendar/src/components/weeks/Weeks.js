import React from 'react'
import { format, getDaysInMonth } from 'date-fns';
import { motion } from "framer-motion";

import Day from '../day/Day.js';
import './Weeks.css';

function Weeks(props) {

    let monthDays = [];
    for (let i = 1; i <= props.daysInMonth; i++){
        monthDays.push(i);
    }

    let prevMonthDays = [];
    for (let i = (props.daysPreviousMonth - props.firstDay + 2); i <= props.daysPreviousMonth; i++){
        prevMonthDays.push(i);
    }

    let nextMonthDays = [];
    for (let i = 1; i <= (42 - props.daysInMonth - props.firstDay + 1); i++){
        nextMonthDays.push(i);
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
      }, },
      hidden: { opacity: 0, y:"-10px" },
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
                        <Day day={i} key={i} currentMonth={false}></Day>
                    </motion.div>
                ))}

                {monthDays.map((i) => (
                    <motion.div variants={dayVariants} style={{width: "100%", height: "100%"}}>
                        <Day day={i} currentMonth={true} key={i} currentDay={format(new Date, "d")}
                        month = {props.month} year = {props.year}></Day>
                     </motion.div>
                ))}

                {nextMonthDays.map((i) => (
                    <motion.div variants={dayVariants} style={{width: "100%", height: "100%"}}>
                        <Day day={i} key={i} currentMonth={false}></Day>
                    </motion.div>
                ))}
            </motion.div>            
        </div>
    )
}

export default Weeks
