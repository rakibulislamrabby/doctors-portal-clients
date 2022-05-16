import React from 'react';

const Booking = ({ service, setTreatment }) => {
    const { name, slots } = service;
    return (
        <div className="card lg:max-w-lg bg-base-100 shadow-xl my-10 text-center">
            <div className="card-body ">
                <h2 className="card-title justify-center text-secondary">{name}</h2>
                <p>{
                    slots?.length
                        ? <span>{slots[0]}</span>
                        : <span className='text-red-700'>No slots today</span>
                }</p>
                <p>{slots?.length} {slots?.length > 1 ? "SPACES" : "SPACE"} AVAILABE</p>
                <div className="card-actions justify-center">
                    <label htmlFor="booking-modal"
                        disabled={slots?.length == 0}
                        onClick={() => setTreatment(service)}
                        className="btn btn-primary bg-gradient-to-r from-secondary to-primary text-white ">Book Appointment</label>

                </div>
            </div>
        </div >
    );
};

export default Booking;