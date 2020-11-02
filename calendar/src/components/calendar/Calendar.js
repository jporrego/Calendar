import React, {useState, useEffect} from 'react';
import { format, formatDistance, formatRelative, subDays, addMonths, getDaysInMonth } from 'date-fns'

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
    return (
        <div className="calendar">
            <div className="calendar__month-year">
                <div className="calendar__month-year__date">{month} {year}</div>                
                <div className="calendar__month-year__buttons">
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
                </div>
                
            </div>
            <Weeks firstDay={firstDay} daysInMonth={daysInMonth} daysPreviousMonth = {previousMonthDays}></Weeks>
            {/* <Month month={month} year={year}></Month> */}
        </div>
    )
}

export default Calendar
