import React from 'react';
import Service from './Service';
import fluride from "../../assets/images/fluoride.png"
import cavity from "../../assets/images/cavity.png"
import teeth from "../../assets/images/whitening.png"

const Services = () => {
    const services = [
        {
            _id: 1,
            name: "Fluoride Treatment",
            description: "Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the",
            img: fluride
        },
        {
            _id: 2,
            name: "Cavity Filling",
            description: "Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the",
            img: cavity
        },
        {
            _id: 3,
            name: "Teeth Whitening",
            description: "Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the",
            img: teeth
        }
    ]
    return (
        <div className='my-16 px-12'>
            <div className='text-center'>
                <h3 className=' text-secondary text-xl font-semibold'>Our Services</h3>
                <h2 className='text-2xl mb-16'>Services We Provide</h2>
            </div>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 '>
                {
                    services.map(service => <Service
                        key={service._id}
                        service={service}
                    ></Service>)
                }
            </div>

        </div>
    );
};

export default Services;