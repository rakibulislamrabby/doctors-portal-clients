import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import Booking from './Booking';
import BookingModal from './BookingModal';

const AvailableAppointment = ({ selected }) => {
    const [services, setServices] = useState([]);
    const [treatment, setTreatment] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/service")
            .then(res => res.json())
            .then(data => setServices(data))
    }, [])

    let footer;
    if (selected) {
        footer = <p>Available Appointments on {format(selected, 'PP')}.</p>;
    }
    return (
        <div className='mb-28 px-12'>
            <h2 className='text-center text-secondary text-2xl pb-5 '> {footer}</h2>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 '>
                {
                    services.map(service => <Booking
                        key={service._id}
                        service={service}
                        setTreatment={setTreatment}
                    ></Booking>)
                }
            </div>
            {treatment && <BookingModal selected={selected} treatment={treatment} setTreatment={setTreatment}></BookingModal>}
        </div>
    );
};

export default AvailableAppointment;