import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loading from '../Shared/Loading';
import CheckoutForm from './CheckoutForm';
const stripePromise = loadStripe('pk_test_51L1bKUK0dafgbbSv1poJVc5zorLqFr1BztKeL2AOiMgMEj4MmLWj7aeLGXe4hFllPNDKvFEoyRzwD6XhrQmZPHnt001Z49SGUb');

const Payment = () => {
    const { id } = useParams();
    const url = `http://localhost:5000/booking/${id}`;
    const { data: appointment, isLoading } = useQuery(['booking', id], () => fetch(url, {
        method: "GET",
        headers: {
            "authorization": `Bearer ${localStorage.getItem("accessToken")}`
        }
    }).then(res => res.json()));

    if (isLoading) {
        return <Loading></Loading>
    }
    return (

        <div className="hero h-3/4 bg-base-200 rounded-lg mt-5">
            {/* <h2 className='text-2xl'>Payment for {id}</h2> */}
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <div className="card w-96 bg-base-100 shadow-xl">
                        <div className="card-body pl-16">
                            <h1 className='text-2xl font-bold text-purple-700'>Hello, {appointment.patientName}</h1>
                            <h2 className="card-title text">Pay for <span className='text-purple-700'>{appointment.treatment}</span></h2>
                            <p>Your Appointment is <span className='text-purple-700 font-bold'>{appointment.date}</span></p>
                            <p>Please pay: ${appointment.price}</p>

                        </div>
                    </div>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm  bg-base-100">
                    <div className="card-body">
                        <Elements stripe={stripePromise}>
                            <CheckoutForm />
                        </Elements>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;