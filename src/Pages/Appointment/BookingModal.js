import { format } from 'date-fns';
import React from 'react';

const BookingModal = ({ treatment, setTreatment, selected }) => {
    const { _id, name, slots } = treatment;

    const handleBooking = event => {
        event.preventDefault();
        const slot = event.target.slot.value;
        console.log(_id, slot);
        setTreatment(null);
    }
    return (
        <div>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:  modal-middle">
                <div className="modal-box">
                    <label for="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-lg text-secondary pb-8 ">{name}</h3>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3'>
                        <input type="text" disabled value={format(selected, 'PP')} className="input input-bordered input-success w-full " />
                        <select name='slot' className="select select-bordered input-success w-full ">
                            {
                                slots.map(slot => <option value={slot} >{slot}</option>)
                            }

                        </select>
                        <input type="text" placeholder="Your Name" className="input input-bordered input-success w-full " />
                        <input type="email" placeholder="Email Address" className="input input-bordered input-success w-full " />
                        <input type="number" placeholder="Phone Number" className="input input-bordered input-success w-full " />
                        <input type="submit" value="Submit" className="btn btn-secondary w-full " />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;