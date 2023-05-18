import React, { useContext, useState } from 'react'
import { UserContext } from '../Context/UserContext';
import { getDatabase, ref, set, child, get } from "firebase/database";

export default function Clients() {

    const [clients, setClients] = useState({})
    const { user, setUser } = useContext(UserContext)

    const addClient = () => {
        const db = getDatabase()
        set(ref(db, `/${user.uid}/clientid/formulaid/`), {
            photos: 'https://cdn.discordapp.com/attachments/1004495634113511607/1107117378950668368/traviistea_stunning_hair_models_avant_garde_haircuts_mugler_pho_ea15d949-3a5b-4583-b0d9-9b475cc0a848.png',
        });
    }

    return (
        <div>

            <div className="overflow-x-auto w-full">
                <table className={`table table-compact  table-zebra w-full`}>
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Client</th>
                            {window.innerWidth > 400 ? <th>Job</th> : ''}
                            <th >
                                <form className="form-control ">
                                    <div className="input-group">
                                        <input type="text" placeholder="Search…" className="input input-bordered input-sm w-36" />
                                        <button className="btn btn-square btn-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                        </button>
                                    </div>
                                </form>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        <tr>
                            
                            <td>
                                <div className="flex items-center space-x-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src="https://lh3.googleusercontent.com/a/AGNmyxYp3h0HYsVH3SKsMqCdDF46zkL2VmKov9GfX-Auuw=s96-c" alt="User Profile Image" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">Hart Hagerty</div>
                                        <div className="text-sm opacity-50">United States</div>
                                    </div>
                                </div>
                            </td>
                            {window.innerWidth > 400 ?
                             <td>
                                Zemlak, Daniel and Leannon
                                <br />
                                <span className="badge badge-accent badge-sm">Desktop Support Technician</span>
                            </td>
                            :
                            ''
                            }

                            <th>
                                <button onClick={addClient} className="btn btn-xs btn-secondary">details</button>
                            </th>
                        </tr>
                        
                    </tbody>
                    {/* foot */}
                    <tfoot>
                        <tr>
                            <th>Client</th>
                            {window.innerWidth > 400 ? <th>Job</th> : ''}
                            <th></th>
                        </tr>
                    </tfoot>

                </table>
            </div>

        </div>
    )
}
