import React from 'react';
import appoinment from "../../assets/images/appointment.png"

const ContactUs = () => {
    return (
        <section style={{
            background: `url(${appoinment})`
        }} className="text-center" >
            <div className='py-16'>
                <h3 className='text-primary text-xl'>Contact Us</h3>
                <h2 className='text-white text-3xl'>Stay connected with us</h2>
                <form className='my-5 '>
                    <input className='w-1/2 mb-5 rounded-md p-1  ' type="text" placeholder='Email Address' />
                    <br />
                    <input className='w-1/2 mb-5 rounded-md p-1  ' type="text" placeholder='Subject' />
                    <br />
                    <textarea className='w-1/2 mb-5 rounded-md p-1  ' name="" cols="30" ></textarea>

                </form>
                <button className="btn btn-primary text-white uppercase bg-gradient-to-r from-secondary to-primary">Get Started</button>
            </div>
        </section>
    );
};

export default ContactUs;