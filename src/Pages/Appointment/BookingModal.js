import { format } from 'date-fns';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase_init';

const BookingModal = ({ treatment, setTreatment, selected }) => {
    const { _id, name, slots } = treatment;
    const [user, loading, error] = useAuthState(auth);
    const formattedDate = format(selected, "pp")

    const handleBooking = event => {
        event.preventDefault();
        const slot = event.target.slot.value;

        const booking = {
            treatmentId: _id,
            treatment: name,
            date: formattedDate,
            slot,
            patient: user.email,
            patientName: user.displayName,
            phone: event.target.phone.value
        }
        setTreatment(null);
    }
    return (
        <div>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:  modal-middle">
                <div className="modal-box">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-lg text-secondary pb-8 ">{name}</h3>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3'>
                        <input type="text" disabled value={format(selected, 'PP')} className="input input-bordered input-success w-full " />
                        <select name='slot' className="select select-bordered input-success w-full ">
                            {
                                slots.map((slot, index) => <option key={index} value={slot} >{slot}</option>)
                            }

                        </select>
                        <input type="text" disabled value={user?.displayName || ""} className="input input-bordered input-success w-full " />
                        <input type="email" disabled value={user?.email || ""} className="input input-bordered input-success w-full " />
                        <input type="number" placeholder="Phone Number" className="input input-bordered input-success w-full " />
                        <input type="submit" value="Submit" className="btn btn-secondary w-full " />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;