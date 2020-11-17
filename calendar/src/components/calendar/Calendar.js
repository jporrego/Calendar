import React, {useState, useEffect, useContext} from 'react';
import {CalendarContext} from '../../context/CalendarContext'
import { format, formatDistance, formatRelative, subDays, addMonths, getDaysInMonth } from 'date-fns'
import { motion } from "framer-motion"

import Weeks from '../weeks/Weeks.js';
import './Calendar.css';


function Calendar() {
    const 
    {month, 
    year,
    firstDay,
    daysInMonth,
    previousMonth,
    previousMonthDays,
    nextMonth,
    changeDate} = useContext(CalendarContext);

    const goPreviousMonth = () => {
        changeDate(null, false);        
    }

    const goNextMonth = () => {
        changeDate(null, true);       
    }

    const selectMonth = (e) => {
        changeDate(`"${e.target.value} ${year}"`, null);     
    }

    const selectYear = (e) => {
        changeDate(`"${month} ${e.target.value}"`, null);
    }

    let yearRange = [];
    for (let i = 1900; i <= 2100; i++){
        yearRange.push(i);
    }



    const variants = {
        visible: { opacity: 1, y:"0px",
        transition: {
          when: "beforeChildren",
          staggerChildren: 0,
          duration: .5,
        }, },
        hidden: { opacity: 0, y:"-25px"},
      }

    return (
        <motion.div className="calendar" initial="hidden" animate="visible" variants={variants}>
            <motion.div className="calendar__month-year">
                <motion.div className="calendar__month-year__date"> 
                    <label for="months"></label>
                    <select id="months" name="months" value={month.charAt(0).toLowerCase() + month.slice(1)} onChange={selectMonth}>
                      <option value="january">january</option>
                      <option value="february">february</option>
                      <option value="march">march</option>
                      <option value="april">april</option>
                      <option value="may">may</option>
                      <option value="june">june</option>
                      <option value="july">july</option>
                      <option value="august">august</option>
                      <option value="september">september</option>
                      <option value="october">october</option>
                      <option value="november">november</option>
                      <option value="december">december</option>
                    </select>

                    <label for="year"></label>
                    <select id="year" name="year" value={year} onChange={selectYear}>
                        {yearRange.map((i) => (
                            <option value={i} key={i}>{i}</option>
                        ))}
                    </select>
                </motion.div>                
                <motion.div className="calendar__month-year__buttons">
                    <div onClick={goPreviousMonth} className="change-month-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24" style={{transform:"scale(-1, 1)"}}>
                            <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/>
                        </svg>
                    </div>
                    <div onClick={goNextMonth} className="change-month-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24">
                            <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/>
                            </svg>
                    </div>
                </motion.div>    
            </motion.div>
            <Weeks></Weeks>
            {/* <Month month={month} year={year}></Month> */}
        </motion.div>
    )
}

export default Calendar
