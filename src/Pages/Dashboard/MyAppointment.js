import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase_init';

const MyAppointment = () => {
    const [user] = useAuthState(auth);
    const [appointments, setAppointments] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            fetch(`https://aqueous-fjord-98916.herokuapp.com/booking?patient=${user.email}`, {
                method: "GET",
                headers: {
                    "authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }
            })
                .then(res => {
                    if (res.status === 401 || res.status === 403) {
                        signOut(auth);
                        localStorage.removeItem("accessToken")
                        navigate("/")
                    }
                    return res.json()
                })
                .then(data => setAppointments(data))
        }
    }, [user])
    // 

    return (
        <div>
            <h2 className='text-center text-xl text-primary mb-4'>Total Appointment {appointments?.length}</h2>
            <div class="overflow-x-auto pr-5">
                <table class="table w-full ">

                    <thead>
                        <tr>
                            <th>sl</th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Treatment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            appointments?.map((a, index) => <tr key={a._id}>
                                <th>{index + 1}</th>
                                <td>{a.patientName}</td>
                                <td>{a.date}</td>
                                <td>{a.slot}</td>
                                <td>{a.treatment}</td>
                            </tr>)
                        }
                        {/* <!-- row 1 --> */}


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAppointment;