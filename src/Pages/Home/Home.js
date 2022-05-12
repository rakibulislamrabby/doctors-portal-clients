import React from 'react';
import Banner from './Banner';
import Cares from './Cares';
import ContactUs from './ContactUs';
import HomeAppoinment from './HomeAppoinment';
import Info from './Info';
import Services from './Services';
import Testimonials from './Testimonials';

const Home = () => {
    return (
        <div className=''>
            <Banner></Banner>
            <Info></Info>
            <Services></Services>
            <Cares></Cares>
            <HomeAppoinment></HomeAppoinment>
            <Testimonials></Testimonials>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;