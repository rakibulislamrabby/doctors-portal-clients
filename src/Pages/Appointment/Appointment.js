import React, { useState } from 'react';
import AppointmentBanner from './AppointmentBanner';
import AvailableAppointment from './AvailableAppointment';

const Appointment = () => {
    const [selected, onSelect] = useState(new Date());
    return (
        <div>
            <AppointmentBanner selected={selected} onSelect={onSelect}></AppointmentBanner>
            <AvailableAppointment selected={selected}></AvailableAppointment>
        </div>
    );
};

export default Appointment;