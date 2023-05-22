import React, { useContext } from 'react'
import orange_cyberpunk from '../images/orange_cyberpunk.png'
import haircut_background from '../images/haircut_background.png'
import blue_hair from '../images/blue_hair.png'
import group from '../images/group.png'
import dual_tone from '../images/dual_tone.png'
import { UserContext } from '../Context/UserContext'
import { useNavigate } from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const BACK_END_URL = process.env.REACT_APP_BACKEND_URL

export default function LogIn() {

  const { setUser } = useContext(UserContext)

  const navigate = useNavigate()

  const logIn = async (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value

    const url = BACK_END_URL + '/api/login';
    const options = {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(email + ":" + password)}`
        // "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
      })
    }

    try {
      const res = await fetch(url, options);
      const data = await res.json();
      if (data.status === 'ok') {
        // Show success msg
        console.log(data)
        setUser(data.data)
        localStorage.setItem('myGuest_user', JSON.stringify(data.data))
        navigate('/clients')

      } else {
        return console.log(data.message)
      }
    }
    catch {
      console.log("something went wrong logging in.")
    }
  };

  // Takes info from google popup and requests the user's information from flask to set user state
  const GooglelogIn = async (token) => {

    const url = BACK_END_URL + '/api/google/login';
    const options = {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
      })
    }

    try {
      const res = await fetch(url, options);
      const data = await res.json();
      if (data.status === 'ok') {
        // Show success "You have successfully logged in" msg data.message
        console.log(data)
        setUser(data.data)
        localStorage.setItem('myGuest_user', JSON.stringify(data.data))
        navigate('/clients')

      } else {
        // Display message "Please create an account first!"
        navigate('/signup')
        return console.log(data.message)
      }
    }
    catch {
      console.log("something went wrong logging in.")
    }
  };

  //Creates popup for getting Google account info
  const createPopup = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    try {
        const result = await signInWithPopup(auth, provider);
        const googUser = result.user
        if (googUser) {
            console.log(googUser, "Google user retreived")
            await GooglelogIn(googUser.accessToken)
        }
    }
    catch {
        console.log("PopUp Error: Invalid Google login.")
    }
};


  return (
    <>
      <div className='hero min-h-screen' style={{ backgroundImage: `url(${dual_tone})` }}>
        <div className="card w-72 ">
          <span className=' flex justify-center'>
            <p className='bg-neutral-focus text-5xl pb-10 text-base-100 pb-2'>Log In</p>
          </span>
          <form onSubmit={(e) => { logIn(e) }}>

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
              <button className="btn btn-accent">Log In</button>
            </div>
          </form>
          <div className="divider text-base-100">OR</div>
          <button className="btn btn-accent" onClick={createPopup}>Log In with Google</button>
        </div>
      </div>
    </>
  )
}
