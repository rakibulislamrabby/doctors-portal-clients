import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import Booking from './Booking';

const AvailableAppointment = ({ selected }) => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch("Services.json")
            .then(res => res.json())
            .then(data => setServices(data))
    }, [])

    let footer;
    if (selected) {
        footer = <p>Available Appointments on {format(selected, 'PP')}.</p>;
    }
    return (
        <div className='mb-28'>
            <h2 className='text-center text-secondary text-xl pb-5 '> {footer}</h2>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 '>
                {
                    services.map(service => <Booking
                        key={service._id}
                        service={service}
                    ></Booking>)
                }
            </div>
        </div>
    );
};

export default AvailableAppointment;