import React from 'react';
import { toast } from 'react-toastify';

const UserRow = ({ user, refetch }) => {
    const { email, role } = user;
    const makeAdmin = () => {
        fetch(`https://aqueous-fjord-98916.herokuapp.com/user/admin/${email}`, {
            method: "PUT",
            headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
            .then(res => {
                if (res.status === 403) {
                    toast.error("Failed to Make an admin")
                }
                return res.json()
            })
            .then(data => {
                if (data.modiiedCount > 0) {
                    refetch()
                    toast.success("Maked Admin Successfully")
                }
            })
    }
    return (
        <tr>
            <th>{1}</th>
            <td>{email}</td>
            <td>{role !== 'admin' && <button onClick={makeAdmin} class="btn btn-xs">Make Admin</button>}</td>
            <td><button class="btn btn-xs">Remove User</button></td>
            <td>{ }</td>
        </tr>

    );
};

export default UserRow;