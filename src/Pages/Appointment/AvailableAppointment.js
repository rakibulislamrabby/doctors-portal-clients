import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import Booking from './Booking';
import BookingModal from './BookingModal';

const AvailableAppointment = ({ date }) => {
    // const [services, setServices] = useState([]);
    const [treatment, setTreatment] = useState(null);

    const formattedDate = format(date, 'PP')
    // console.log(formattedDate);

    //fetching use react query
    const { data: services, loading, refetch } = useQuery(["available", formattedDate], () => fetch(`https://aqueous-fjord-98916.herokuapp.com/available?date=${formattedDate}`).then(res => res.json()));

    if (loading) {
        return <Loading></Loading>
    }

    // useEffect(() => {
    //     fetch(`https://aqueous-fjord-98916.herokuapp.com/available?date=${formattedDate}`)
    //         .then(res => res.json())
    //         .then(data => setServices(data))
    // }, [formattedDate]);

    // let footer;
    // if (selected) {
    //     footer = <p>Available Appointments on {format(selected, 'PP')}.</p>;
    // }
    return (
        <div className='mb-28 px-12'>
            <h2 className='text-center text-secondary text-2xl pb-5 '>Available Appointments On {format(date, 'PP')}</h2>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 '>
                {
                    services?.map(service => <Booking
                        key={service._id}
                        service={service}
                        setTreatment={setTreatment}
                    ></Booking>)
                }
            </div>
            {treatment && <BookingModal
                date={date}
                treatment={treatment}
                refetch={refetch}
                setTreatment={setTreatment}>
            </BookingModal>}
        </div>
    );
};

export default AvailableAppointment;