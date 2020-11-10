import React, {createContext, useState} from 'react'
import { format, formatDistance, formatRelative, subDays, addMonths, getDaysInMonth } from 'date-fns'

export const CalendarContext = createContext();


function CalendarContextProvider(props) {
    const [monthy, setMonthy] = useState(format(new Date, "MMMM"));
    const [yeary, setYeary] = useState(format(new Date, "yyyy"));

    return (
        <CalendarContext.Provider 
        value={{
            monthy,
            yeary
        }}>
            {props.children}
        </CalendarContext.Provider>

    )
}

export default CalendarContextProvider;