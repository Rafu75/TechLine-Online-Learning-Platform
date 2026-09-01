import { use, useContext, useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router';

import { CgProfile } from 'react-icons/cg';
import { AuthContext } from '../context/AuthContext';



const Navbar = () => {

    const { user, signOutUser } = use(AuthContext) || {};
    console.log(user);
    const dashboardRef = useRef(null);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");


    // apply theme
    useEffect(() => {
        document.querySelector("html").setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    const handleSignOut = () => {
        signOutUser()
            .then(() => {
            })
            .catch(error => {
                // console.log(error)
            })
    }

    const closeDashboard = () => {
        if (dashboardRef.current) {
            dashboardRef.current.open = false;
        }
    };

    const links = (
        <>
            <li>
                <NavLink
                    to="/"
                    onClick={closeDashboard}
                    className={({ isActive }) => (isActive ? "text-blue-600 font-semibold" : "")}
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/allCourses"
                    onClick={closeDashboard}
                    className={({ isActive }) => (isActive ? "text-blue-600 font-semibold" : "")}
                >
                    All Courses
                </NavLink>
            </li>

            {/* Dashboard Dropdown */}
            <li tabIndex={0}>
                <details ref={dashboardRef}>
                    <summary>Dashboard</summary>
                    <ul className="p-2 bg-base-100 w-[150px] rounded-t-none z-50">
                        <li>
                            <NavLink
                                to="/addCourse"
                                onClick={closeDashboard}
                                className={({ isActive }) => (isActive ? "text-blue-600 font-semibold" : "")}
                            >
                                Add Course
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/myCourse"
                                onClick={closeDashboard}
                                className={({ isActive }) => (isActive ? "text-blue-600 font-semibold" : "")}
                            >
                                My Course
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/myEnrolledCourse"
                                onClick={closeDashboard}
                                className={({ isActive }) => (isActive ? "text-blue-600 font-semibold" : "")}
                            >
                                Enrolled Course
                            </NavLink>
                        </li>
                    </ul>
                </details>
            </li>
        </>
    );

    //sticky top-0 z-50

    return (
        <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <Link to={'/'} className="btn btn-ghost text-xl font-semibold gap-0">
  <span>Tech</span><span className="text-blue-500">Line</span>
</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end gap-2">

                {/*  daisyUI Theme Toggle */}
                <label className="swap swap-rotate">
                    <input type="checkbox" onChange={toggleTheme} checked={theme === "dark"} />
                    {/* sun icon */}
                    <svg
                        className="swap-on fill-current w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path d="M5.64,17l-.71.71a1,1,0,1,0,1.42,1.42L7.05,18.36A1,1,0,1,0,5.64,17ZM12,4a1,1,0,0,0,1-1V2a1,1,0,0,0-2,0V3A1,1,0,0,0,12,4Zm7,8a7,7,0,1,1-7-7A7,7,0,0,1,19,12Zm3,0a1,1,0,0,0-1-1H20a1,1,0,0,0,0,2h1A1,1,0,0,0,22,12Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V21A1,1,0,0,0,13,20ZM4,11H3a1,1,0,0,0,0,2H4a1,1,0,0,0,0-2Zm1.64-6.36a1,1,0,1,0-1.42,1.42L5.64,7.05A1,1,0,1,0,7.05,5.64ZM18.36,17l.71.71a1,1,0,0,0,1.42-1.42L19.77,17A1,1,0,0,0,18.36,17Z" />
                    </svg>
                    {/* moon icon */}
                    <svg
                        className="swap-off fill-current w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73,8.15,8.15,0,0,1-8.14-8.14,8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8.11,2.36,10.14,10.14,0,1,0,22,14.86,1,1,0,0,0,21.64,13Z" />
                    </svg>
                </label>

                {
                    user ? (
                        <>
                            {/* profile tooltip */}
                            <div className="tooltip tooltip-bottom" data-tip={user.displayName || 'No Name'}>
                                <Link to={'/'} >
                                    {user.photoURL ? (
                                        <img
                                            src={user.photoURL || photoURL}
                                            alt="User"
                                            className="w-10 h-10 rounded-full border-2 border-gray-400 hover:scale-105 transition"
                                        />
                                    ) : (
                                        <CgProfile className="w-8 h-8" />
                                    )}
                                </Link>
                            </div>

                            <button onClick={handleSignOut} className="btn">
                                <Link to={'/login'}>Sign Out</Link>
                            </button>
                        </>
                    )
                        : <><Link to={'/login'} className="btn">Login</Link>
                            <Link to={'/signup'} className="btn">Sign Up</Link> </>
                }
            </div>
        </div>
    );
};

export default Navbar;