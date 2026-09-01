import React, { Children, use } from 'react';

import { Navigate, useLocation } from 'react-router';
import { AuthContext } from './context/AuthContext';
import useAuth from './hooks/useAuth';


const PrivateRout = ({ children }) => {
    const { user, loading } = useAuth();

    const location = useLocation()

    // console.log(location)

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            </div>
        );
    }

    if (user) {
        return children
    }
    return <Navigate state={location?.pathname} to={'/login'}></Navigate>;
};

export default PrivateRout;