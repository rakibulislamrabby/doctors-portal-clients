import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import DeleteConfirmation from './DeleteConfirmation';
import ManageDoctorRow from './ManageDoctorRow';

const ManageDoctor = () => {
    const [deletingDoctor, setDeletingDoctor] = useState(null)
    const { data: doctors, isLoading, refetch } = useQuery('doctors', () => fetch("https://aqueous-fjord-98916.herokuapp.com/doctor", {
        headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
    }).then(res => res.json()));
    if (isLoading || !Array.isArray(doctors)) {
        return <Loading></Loading>
    }
    console.log(doctors);
    return (
        <div>
            <h2 className=" text-2xl">Manage Doctor {doctors?.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th>SI</th>
                            <th>Doctor image</th>
                            <th>Name</th>
                            <th>Speciality</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors?.map((doctor, index) => <ManageDoctorRow
                                key={doctor._id}
                                doctor={doctor}
                                index={index}
                                refetch={refetch}
                                setDeletingDoctor={setDeletingDoctor}
                            ></ManageDoctorRow>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingDoctor && <DeleteConfirmation
                    deletingDoctor={deletingDoctor}
                    refetch={refetch}
                    setDeletingDoctor={setDeletingDoctor}
                ></DeleteConfirmation>
            }
        </div>
    );
};

export default ManageDoctor;