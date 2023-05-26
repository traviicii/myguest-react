import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { GlobalContext } from '../Context/GlobalContext'

const BACK_END_URL = process.env.REACT_APP_BACKEND_URL

export default function Formulas() {


    const { client_id } = useParams()
    const { currentClient, setCurrentClient } = useContext(GlobalContext)

    return (
        <div className='flex flex-col items-center'>
            <h2 className="card-title mt-5 text-base-100 bg-primary h-10 pr-2 pl-2">{`${currentClient.first_name} ${currentClient.last_name}`}</h2>
            <div className='flex justify-center mt-5'>
                <div className="tabs">
                    <a className="tab tab-lifted tab-lg tab-active">Formulas</a>
                    <Link to={`/client/${client_id}`} className="tab tab-lifted tab-lg ">Info</Link>
                    <Link to={`/client/${client_id}/colorchart`} className="tab tab-lifted tab-lg ">Color Chart</Link>
                </div>
            </div>
        </div>
    )
}
