import React from 'react'

export default function Client_List( { key, index, client } ) {
    return (
        <tr>

            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src="https://lh3.googleusercontent.com/a/AGNmyxYp3h0HYsVH3SKsMqCdDF46zkL2VmKov9GfX-Auuw=s96-c" alt="User Profile Image" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{client.first_name} {client.last_name}</div>
                        <div className="text-sm opacity-50">United States {client.id}</div>
                    </div>
                </div>
            </td>
            {window.innerWidth > 400 ?
                <td>
                    Zemlak, Daniel and Leannon
                    <br />
                    <span className="badge badge-accent badge-sm">{client.type}</span>
                </td>
                :
                ''
            }

            <th>
                <button onClick={()=>{}} className="btn btn-xs btn-secondary">Details</button>
            </th>
        </tr>
    )
}
