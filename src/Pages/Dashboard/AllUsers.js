import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import UserRow from './UserRow';

const AllUsers = () => {
    const { data: users, isLoading, refetch } = useQuery("users", () => fetch("https://aqueous-fjord-98916.herokuapp.com/user", {
        method: "GET",
        headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
    }).then(res => res.json()))
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <h2 className='text-center text-xl text-primary mb-4'>All Users {users.length}</h2>
            <div class="overflow-x-auto pr-5">
                <table class="table w-full ">

                    <thead>
                        <tr>
                            <th>sl</th>
                            <th>Email</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Treatment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user => <UserRow
                                key={user._id}
                                user={user}
                                refetch={refetch}
                            ></UserRow>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;