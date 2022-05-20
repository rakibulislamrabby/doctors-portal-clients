import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Outlet } from 'react-router-dom';
import auth from '../../firebase_init';
import useAdmin from '../../hooks/useAdmin';

const Dashboard = () => {
    const [user] = useAuthState(auth)
    const [admin] = useAdmin(user)
    return (
        <div className="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content ">
                {/* <!-- Page content here --> */}
                <h2 className='text-4xl text-secondary text-center font-bold'>DASHBOARD</h2>
                <Outlet></Outlet>


            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 overflow-y-auto w-48 bg-base-100 text-base-content">
                    {/* <!-- Sidebar content here --> */}
                    <li className='mb-2'><Link to="/dashboard">My Appoinment</Link></li>
                    <li><Link to="/dashboard/review">My Review</Link></li>
                    <li><Link to="/dashboard/history">My History</Link></li>
                    {
                        admin && <>
                            <li><Link to="/dashboard/allusers">All Users</Link></li>
                            <li><Link to="/dashboard/addDoctor">Add a Doctor</Link></li>
                            <li><Link to="/dashboard/manageDoctor">Manage Doctor</Link></li>
                        </>
                    }
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;