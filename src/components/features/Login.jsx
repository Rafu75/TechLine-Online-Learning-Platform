import React, { use, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth';





const Login = () => {

    const { signInUser, signInWithGoogle, setLoading } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()
    // console.log(location)
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('');

    const emailRef = useRef(); 







    const handleLogIn = (event) => {
        event.preventDefault()
        const email = event.target.email.value
        const password = event.target.password.value

        // console.log(email, password)


        signInUser(email, password)
            .then(result => {
                 console.log(result.user);
                event.target.reset()
                navigate(location.state || '/')
            })
            .catch(error => {
                console.log(error);
                toast.error('Please enter a valid email or Password')
            }).finally(()=>{
                setLoading(false)
            })
    }

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user)
                navigate('/')
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleShowPassword = (event) => {
        event.preventDefault()
        setShowPassword(!showPassword)
    }


    const handleForgetPassword = () => {
        const email = emailRef.current.value;
        // console.log('forget password', email)
        navigate('/forget-password', { state: { email } })

    }


    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl m-auto my-[10vh]">
            <div className="card-body">
                <h1 className="text-5xl font-bold">Login now!</h1>
                <form onSubmit={handleLogIn}>
                    <fieldset className="fieldset">
                        <label className="label">Email</label>
                        <input type="email"
                            name='email'
                            className="input"
                            ref={emailRef}
                            placeholder="Email" />
                        <label className="label">Password</label>
                        <div className='relative'>
                            <input type={showPassword ? 'text' : 'password'} className="input" placeholder="Password" name='password' />
                            <button
                                onClick={handleShowPassword}
                                className="btn btn-xs absolute top-2 right-5">
                                {
                                    showPassword ? <FaEyeSlash /> : <FaEye />
                                }
                            </button>
                        </div>
                        <div><button 
                        type='button'
                        onClick={handleForgetPassword} className="link link-hover">Forgot password?</button></div>
                        <button className="btn btn-neutral mt-4">Login</button>

                    </fieldset>
                    {
                        error && alert('please valid email or pass')
                    }

                </form>
                {/* sign in with google */}
                <button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5]">
                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                    Login with Google
                </button>
                <p>New to our website? please <Link className='text-red-600' to={'/signup'}>Signup</Link> </p>
            </div>
        </div>
    );
};

export default Login;