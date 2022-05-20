import React from 'react';
import { toast } from 'react-toastify';

const DeleteConfirmation = ({ deletingDoctor, setDeletingDoctor, refetch }) => {
    const { name, email } = deletingDoctor;
    const handleDelete = () => {
        fetch(`https://aqueous-fjord-98916.herokuapp.com/doctor/${email}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${localStorage.getItem("accessToken")}`
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount) {
                    toast.success(`Doctor ${name} is Deleted`);
                    setDeletingDoctor(null)
                    refetch();
                }
            })
    }
    return (
        <div>
            <input type="checkbox" id="delete-confirm-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-red-600">Are you sure to want you delete {name} </h3>
                    <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
                    <div className="modal-action">
                        <button onClick={() => handleDelete(email)} className='btn  btn-error'>Delete Doctor</button>
                        <label for="delete-confirm-modal" className="btn">cencel</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmation;