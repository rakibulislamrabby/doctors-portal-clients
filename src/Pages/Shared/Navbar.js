import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase_init';

const Navbar = () => {
    const [user, loading, error] = useAuthState(auth);
    const logout = () => {
        signOut(auth);
    };
    const menuItems = <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/appointment">Appointment</Link></li>
        <li><Link to="/review">Review</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/about">About</Link></li>
        <li>{user ? <button onClick={logout} className="btn btn-ghost pt-4">Sign Up</button> : <Link to="/login">Login</Link>}</li>

    </>
    return (
        <div className="navbar bg-base-100 ">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex="0" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 pr-6 shadow bg-base-100 rounded-box w-52">
                        {menuItems}

                    </ul>

                </div>
                <a className="btn btn-ghost  text-xl ml-10">Doctors Portal</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal  ">
                    {menuItems}
                </ul>
                <div class="avatar online mr-12">
                    <div class="w-8 rounded-full ">
                        <img src="https://api.lorem.space/image/face?hash=28212" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;