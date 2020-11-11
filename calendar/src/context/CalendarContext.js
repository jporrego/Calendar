import React, {createContext, useState, useEffect} from 'react'
import { format, formatDistance, formatRelative, subDays, addMonths, getDaysInMonth } from 'date-fns'

export const CalendarContext = createContext();


function CalendarContextProvider(props) {
    const [month, setMonth] = useState(format(new Date, "MMMM"));
    const [year, setYear] = useState(format(new Date, "yyyy"));
    const [selectedDate, setSelectedDate] = useState(new Date, "MMMM yyyy");
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

    const changeDate = (date, goNext) => {
        // Global function to set the date to display. 
        // It takes "date" and "goNext" so it can be reused with multiple inputs.

        if (date != null) {
            setSelectedDate(new Date(date)); 
        } else if (goNext) {
            let newDate = new Date(selectedDate);
            newDate = addMonths(newDate, + 1);            
            setSelectedDate(newDate);  
        } else {
            let newDate = new Date(selectedDate);
            newDate = addMonths(newDate, - 1);            
            setSelectedDate(newDate);  
        }
    }

    return (
        <CalendarContext.Provider 
        value={{
            month,
            year,
            selectedDate,
            firstDay,
            daysInMonth,
            previousMonth,
            previousMonthDays,
            nextMonth,
            changeDate
        }}>
            {props.children}
        </CalendarContext.Provider>

    )
}

export default CalendarContextProvider;