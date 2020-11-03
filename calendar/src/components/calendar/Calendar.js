import React, {useState, useEffect} from 'react';
import { format, formatDistance, formatRelative, subDays, addMonths, getDaysInMonth } from 'date-fns'
import { motion } from "framer-motion"

import Weeks from '../weeks/Weeks.js';
import './Calendar.css';


function Calendar() {
    const [selectedDate, setSelectedDate] = useState(new Date, "MMMM yyyy");
    const [month, setMonth] = useState(format(new Date, "MMMM"));
    const [year, setYear] = useState(format(new Date, "yyyy"));
    const [firstDay, setFirstDay] = useState(format(new Date(format(new Date, "yyyy"), format(new Date, "M") - 1, 1), "i"));
    const [daysInMonth, setDaysInMonth] = useState(getDaysInMonth(new Date));
    const [previousMonth, setPreviousMonth] = useState(format(addMonths(new Date, - 1), "MMMM"));
    const [previousMonthDays, setPreviousMonthDays] = useState(getDaysInMonth(addMonths(new Date, - 1)));
    const [nextMonth, setNextMonth] = useState(format(addMonths(new Date, + 1), "MMMM"));

    useEffect(() => {
        // Actualiza el título del documento usando la API del navegador
        setMonth(format(selectedDate, "MMMM"));
        setYear(format(selectedDate, "yyyy"));
        setFirstDay(format(new Date(format(selectedDate, "yyyy"), format(selectedDate, "M") - 1, 1), "i"))
        setDaysInMonth(getDaysInMonth(selectedDate));
        setPreviousMonth(format(addMonths(selectedDate, - 1), "MMMM"));
        setPreviousMonthDays(getDaysInMonth(addMonths(selectedDate, - 1)));
        setNextMonth(format(addMonths(selectedDate, + 1), "MMMM"));
    }, [selectedDate]);

    const goPreviousMonth = () => {
        let date = new Date(selectedDate);
        date = addMonths(date, - 1);

        setSelectedDate(date);        
    }

    const goNextMonth = () => {
        let date = new Date(selectedDate);
        date = addMonths(date, + 1);

        setSelectedDate(date);        
    }

    let yearRange = [];
    for (let i = 1900; i <= 2100; i++){
        yearRange.push(i);
    }

    const selectMonth = (e) => {
        setSelectedDate(new Date(`"${e.target.value} ${year}"`));        
    }

    const selectYear = (e) => {
        setSelectedDate(new Date(`"${month} ${e.target.value}"`));  
    }

    const variants = {
        visible: { opacity: 1, y:"0px", 
        transition: {
          when: "beforeChildren",
          staggerChildren: 0,
          duration: .5,
        }, },
        hidden: { opacity: 0, y:"-15spx" },
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
            <Weeks firstDay={firstDay} daysInMonth={daysInMonth} daysPreviousMonth = {previousMonthDays} 
            month = {month} year = {year}></Weeks>
            {/* <Month month={month} year={year}></Month> */}
        </motion.div>
    )
}

export default Calendar
