import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../Context/UserContext'
import { useContext } from 'react'
import stuntbot from '../images/stuntbot.png'



export default function Navbar() {
    const { user, logMeOut } = useContext(UserContext)

    const navigate = useNavigate()

    return (
        <div>
            <div className="navbar flex bg-neutral ">
                <div className="navbar-start ">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-accent lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <li><Link className='text-accent' to={'/'}>Home</Link></li>
                            <li><Link className='text-accent' to={'/signup'}>Sign Up</Link></li>
                            <li><Link className='text-accent' to={'/clients'}>Clients</Link></li>
                        </ul>
                    </div>
                    <Link className='flex btn btn-ghost' to={user.uid ? '/clients' :'/' }>
                        <span className="pr-0 text-base-100 normal-case text-xl">my</span>
                        <span className="pl-0 text-accent normal-case text-xl">Guest</span>
                    </Link>
                </div>

                <div className="navbar-end hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link className='text-accent' to={'/'}>Homee</Link></li>
                        <li><Link className='text-accent' to={'/SignUp'}>Sign Up</Link></li>
                        <li><Link className='text-accent' to={'/clients'}>Clients</Link></li>
                        <li><p className='text-secondary'>Hello, {user.displayName}</p></li>
                    </ul>
                </div>
                {user.uid ?
                    
                        <div className='dropdown dropdown-end'>
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src={user.photoURL ? user.photoURL : stuntbot} alt='' />
                                </div>
                            </label>
                            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                <li><Link to={'/userprofile'}>Profile</Link></li>
                                <li><Link to={'/settings'}>Settings</Link></li>
                                <li><Link onClick={()=>logMeOut()}>Logout</Link></li>
                            </ul>
                        </div>
                    
                    :

                    <div className="navbar-end">
                        <Link className="btn btn-accent" to="/login">Log In</Link>
                    </div>
                }
            </div>
            
        </div>
    )
}