// import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { use, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { updateProfile } from 'firebase/auth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import useAuth from '../hooks/useAuth';
// import { auth } from '../firebase/firebase.init';

const Signup = () => {
    const { createUser, signInWithGoogle } = useAuth();
    const location = useLocation()
    const navigate = useNavigate()

    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false)


    const handleSignUp = (event) => {
        event.preventDefault()
        const email = event.target.email.value
        const password = event.target.password.value
        const name = event.target.name.value
        const photo = event.target.photo.value

        // console.log(email, password, name, photo)


        const passwordPattern = /^.{6,}$/;
        const casePattern = /^(?=.*[a-z])(?=.*[A-Z]).+$/;
        if (!passwordPattern.test(password)) {
            // console.log('dont match ');
            setError('Please give me at least 6 character or Longer.')
            return;
        }
        else if (!casePattern.test(password)) {
            setError('Password must have at least one upper and one lower character.')
            return;
        }


        // reset error ans Success
        setError('');
        setSuccess(false)


        createUser(email, password)
            .then(result => {
                // console.log(result.user);
                // event.target.reset()
                const profile = {
                    displayName: name,
                    photoURL: photo
                }
               updateProfile(result.user, profile)
                    .then(() => {
                        // user update in db
                        const newUser = {
                            name: name,
                            email: email,
                            image: photo 
                        }

                        fetch('https://dev-stride-server.vercel.app/users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(newUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                               // console.log('data after manual user save', data)
                            })
                            .catch(fetchError => {
                                //console.error('Database save error:', fetchError);
                               
                            })
                    })
                    .catch(error => {
                        //console.error('Firebase profile update error:', error);
                    })
                event.target.reset()
                navigate('/')
                setSuccess(true)

            })
            .catch(error => {
                setError(error.message)

            })
    }

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user)
                const newUser= {
                    name:result.user.displayName,
                    email: result.user.email,
                    image:result.user.photoURL
                }
                fetch('https://dev-stride-server.vercel.app/users',{
                    method:'POST',
                    headers:{
                        'content-type':'application/json'
                    },
                    body: JSON.stringify(newUser)
                })
                .then(res => res.json())
                .then(data =>{
                    //console.log('data after user save',data)
                })
                navigate('/')

            })
            .catch(error => {
                console.log(error)
            })
    }

    // const handleSignUp= (event)=>{
    //     event.preventDefault();
    //     const name= event.target.name.value;
    //     const email= event.target.email.value;
    //     const password= event.target.password.value;


    //     console.log(name, email, password);

    //     createUserWithEmailAndPassword(auth, email, password)
    //     .then(result =>{
    //         console.log(result.user)
    //     })
    //     .catch(error =>{
    //         console.log(error)
    //     })

    // }


    const handleShowPassword = (event) => {
        event.preventDefault()
        setShowPassword(!showPassword)
    }




    return (

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl m-auto my-[10vh]">
            <div className="card-body">
                <h1 className="text-5xl font-bold">SignUp now!</h1>
                <form onSubmit={handleSignUp}>
                    <fieldset className="fieldset">
                        {/* name  */}
                        <label className="label">Name</label>
                        <input type="text" name='name' className="input" placeholder="Your Name" />
                        {/* photo */}
                        <label className="label">Photo</label>
                        <input type="text" name='photo' className="input" placeholder="Photo URL" />
                        {/*email  */}
                        <label className="label">Email</label>
                        <input type="email" name='email' className="input" placeholder="Email" />
                        {/* password */}
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
                        {/* <div><a className="link link-hover">Forgot password?</a></div> */}
                        <button className="btn btn-neutral mt-4">SignUp</button>
                    </fieldset>
                    {
                        success && <p className='text-green-500'>Account Created Successfully</p>
                    }
                    {
                        error && <p className='text-red-500'>{error}</p>
                    }

                    <p>Already Have an account? <Link className='text-blue-600' to={'/login'}>Login</Link> </p>
                </form>
                
                    <button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5]">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                    </button>
            </div>
        </div>
    );
};

export default Signup;