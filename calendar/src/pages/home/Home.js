import React from 'react';

import Calendar from '../../components/calendar/Calendar.js';
import Events from '../../components/events/Events.js';
import './Home.css';


function Home() {
    return (
        <div className="home">
            <div className="home__container">
                <Calendar></Calendar>
                <Events></Events>
            </div>
            
        </div>
    )
}

export default Home
