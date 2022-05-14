import React, { useState } from 'react';
import chair from '../../assets/images/chair.png'
import bg from "../../assets/images/bg.png"
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';

const AppointmentBanner = ({ selected, onSelect }) => {

    let footer = <p>Please pick a day.</p>;
    if (selected) {
        footer = <p>You picked {format(selected, 'PP')}.</p>;
    }
    return (
        <div style={{
            background: `url(${bg})`,
            backgroundSize: 'cover'
        }} className="hero min-h-screen mb-14">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={chair} alt="chair" className="max-w-sm rounded-lg shadow-2xl" />
                <div>
                    <DayPicker
                        mode="single"
                        selected={selected}
                        onSelect={onSelect}
                        footer={footer}
                    />

                </div>
            </div>
        </div>
    );
};

export default AppointmentBanner;