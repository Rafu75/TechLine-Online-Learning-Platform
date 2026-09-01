import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { sendPasswordResetEmail } from 'firebase/auth';

import toast from 'react-hot-toast';
import { auth } from '../../firebase/firebase.init';

const ForgotPass = () => {
  const location = useLocation();
  const [email, setEmail] = useState('');

  
  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  const handleReset = (event) => {
    event.preventDefault();

    if (!email) {
      toast.error('Please enter a valid email address.');
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success('Reset email sent! Redirecting to Gmail...');
        setTimeout(() => {
          window.location.href = 'https://mail.google.com';
        }, 2000);
      })
      .catch(() => {
        toast.error('Failed to send reset email.');
      });
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shadow-2xl m-auto my-[10vh]">
      <div className="card-body">
        <h1 className="text-3xl font-bold mb-4 text-center">Reset Password</h1>
        <form onSubmit={handleReset}>
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input input-bordered"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="btn btn-neutral mt-4">Reset Password</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default ForgotPass;
