import React from 'react';
import doctor from "../../assets/images/doctor.png"
import appoinment from "../../assets/images/appointment.png"

const HomeAppoinment = () => {
    return (
        <section style={{
            background: `url(${appoinment})`
        }} className='flex items-center justify-center mt-28 '>
            <div className='flex-1 hidden lg:block'>
                <img className='mt-[-180px]' src={doctor} alt="" />
            </div>
            <div className='flex-1 p-5'>
                <h3 className='text-xl text-primary font-bold'>Appoinment</h3>
                <h2 className='text-3xl text-white py-3'>Make an appointment Today</h2>
                <p className='text-white pb-4 pr-10'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
                <button className="btn btn-primary text-white uppercase bg-gradient-to-r from-secondary to-primary">Get Started</button>
            </div>
        </section>
    );
};

export default HomeAppoinment;