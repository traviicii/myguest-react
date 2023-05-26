import React, { useContext } from 'react'
import { UserContext } from '../Context/UserContext'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import brown_shape_round from '../images/brown_shape_round.png'
import pink_platinum from '../images/pink_platinum.png'

const BACK_END_URL = process.env.REACT_APP_BACKEND_URL

export default function SignUp() {

    const { setUser } = useContext(UserContext)
    const navigate = useNavigate()

    const randBackground = () => {
        let x = [
            brown_shape_round,
            pink_platinum
        ];
        let choice = Math.floor(Math.random() * (x.length));
        return x[choice]
    };

    const creatUserFromGoogle = async (user) => {
        const url = BACK_END_URL + '/api/googlesignup';
        const options = {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                photoURL: user.photoURL,
                // username: '',
                password: '',
                uid: user.uid,
                displayName: user.displayName,
                email: user.email
            })
        }

        // if (password !== confirmPassword){
        //     // Throw error msg here.
        //     return 
        // }

        const res = await fetch(url, options);
        const data = await res.json();
        if (data.status === 'ok') {
            // Show success msg "Account successfully created!" data.message
            console.log(data)
        }

    };


    const createNewUser = async (e) => {
        e.preventDefault()

        const first_name = e.target.first_name.value
        const last_name = e.target.last_name.value
        const email = e.target.email.value
        const password = e.target.password.value

        const url = BACK_END_URL + '/api/signup';
        const options = {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                photoURL: '',
                // username: username,
                password: password,
                uid: '',
                first_name: first_name,
                last_name: last_name,
                email: email
            })
        }

        // if (password !== confirmPassword){
        //     // Throw error msg here.
        //     return 
        // }
        try {
            const res = await fetch(url, options);
            const data = await res.json();
            if (data.status === 'ok') {
                // Show success msg
                console.log(data)
                navigate('/login')
            } else {
                return console.log(data.message)
            }
        }
        catch {
            console.log("something went wrong with createNewUser")
        }

    };


    const createPopup = async () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user
            if (user) {
                console.log(user)
                await creatUserFromGoogle(user)
                navigate('/login')
            }
        }
        catch {
            navigate('/signup')
        }
    };

    return (


        <div className="hero min-h-screen " style={{ backgroundImage: `url(${brown_shape_round})` }}>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold text-base-100">Create an account with us</h1>
                    <p className="py-6 text-base-100">or sign up with Google!</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl hero-overlay bg-base-100 bg-opacity-20">
                    <div className="card-body">
                        <form onSubmit={(e) => createNewUser(e)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base-100">First Name</span>
                                </label>
                                <input type="text" required="required" placeholder="First Name" name='first_name' className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base-100">Last Name</span>
                                </label>
                                <input type="text" required="required" placeholder="Last Name" name='last_name' className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base-100">Email</span>
                                </label>
                                <input type="text" required="required" placeholder="Email" name='email' className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base-100">Password</span>
                                </label>
                                <input type="password" required="required" placeholder="Password" name='password' className="input input-bordered" />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-accent">Sign Up</button>
                            </div>
                        </form>
                        <div className="divider text-base-100">OR</div>
                        <button className="btn btn-accent" onClick={createPopup}>
                            <div className='mr-3'>
                            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="28px" height="50px"><path d="M 26 2 C 13.308594 2 3 12.308594 3 25 C 3 37.691406 13.308594 48 26 48 C 35.917969 48 41.972656 43.4375 45.125 37.78125 C 48.277344 32.125 48.675781 25.480469 47.71875 20.9375 L 47.53125 20.15625 L 46.75 20.15625 L 26 20.125 L 25 20.125 L 25 30.53125 L 36.4375 30.53125 C 34.710938 34.53125 31.195313 37.28125 26 37.28125 C 19.210938 37.28125 13.71875 31.789063 13.71875 25 C 13.71875 18.210938 19.210938 12.71875 26 12.71875 C 29.050781 12.71875 31.820313 13.847656 33.96875 15.6875 L 34.6875 16.28125 L 41.53125 9.4375 L 42.25 8.6875 L 41.5 8 C 37.414063 4.277344 31.960938 2 26 2 Z M 26 4 C 31.074219 4 35.652344 5.855469 39.28125 8.84375 L 34.46875 13.65625 C 32.089844 11.878906 29.199219 10.71875 26 10.71875 C 18.128906 10.71875 11.71875 17.128906 11.71875 25 C 11.71875 32.871094 18.128906 39.28125 26 39.28125 C 32.550781 39.28125 37.261719 35.265625 38.9375 29.8125 L 39.34375 28.53125 L 27 28.53125 L 27 22.125 L 45.84375 22.15625 C 46.507813 26.191406 46.066406 31.984375 43.375 36.8125 C 40.515625 41.9375 35.320313 46 26 46 C 14.386719 46 5 36.609375 5 25 C 5 13.390625 14.386719 4 26 4 Z"/></svg>
                            </div>
                            Sign Up with Google
                        </button>
                    </div>
                </div>
            </div>
        </div>



    )
}
