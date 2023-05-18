import React, { useContext } from 'react'
import { UserContext } from '../Context/UserContext'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import brown_shape_round from '../images/brown_shape_round.png'

const BACK_END_URL = process.env.REACT_APP_BACKEND_URL

export default function SignUp() {

    const { setUser } = useContext(UserContext)
    const navigate = useNavigate()

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
            // Show success msg
            console.log(data)
        }

    };


    const createNewUser = async (e) => {

        const first_name = e.target.first_name.value
        const last_name = e.target.last_name.value
        const email = e.target.email.value
        const password = e.target.password.value
        if (password == null) {
            // RETURN ERROR MESSAGE
            return console.log("You must have a password!")
        }

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

        const res = await fetch(url, options);
        const data = await res.json();
        if (data.status === 'ok') {
            // Show success msg
            console.log(data)
        }

    };


    const createPopup = async () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user
            if (user) {
                localStorage.setItem('myGuest_user', JSON.stringify(user))
                setUser(user)
                console.log(user)
                await creatUserFromGoogle(user)
                navigate('/clients')
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
                    <p className="py-6 text-base-100">or sign in with Google!</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl hero-overlay bg-base-100 bg-opacity-20">
                    <div className="card-body">
                        <form onSubmit={(e) => createNewUser(e)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base-100">First Name</span>
                                </label>
                                <input type="text" placeholder="First Name" name='first_name' className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base-100">Last Name</span>
                                </label>
                                <input type="text" placeholder="Last Name" name='last_name' className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base-100">Email</span>
                                </label>
                                <input type="text" placeholder="email" name='email' className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base-100">Password</span>
                                </label>
                                <input type="password" placeholder="password" name='password' className="input input-bordered" />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-accent">Sign Up</button>
                            </div>
                        </form>
                        <div className="divider text-base-100">OR</div>
                        <button className="btn btn-accent" onClick={createPopup}>Sign Up with Google</button>
                    </div>
                </div>
            </div>
        </div>



    )
}



{    // const createEmailUser = async (e) => {
    //     e.preventDefault()
    //     const email = e.target.email.value
    //     const password = e.target.password.value

    //     const auth = getAuth();
    //     try {
    //         const result = await createUserWithEmailAndPassword(auth, email, password);
    //         const user = result.user
    //         if (user) {
    //             localStorage.setItem('myGuest_user', JSON.stringify(user))
    //             setUser(user)
    //             console.log(user)
    //             await creatUserFromGoogle(user)
    //             navigate('/clients')
    //         }
    //     }
    //     catch {
    //         navigate('/signup')
    //     }
    // };
}