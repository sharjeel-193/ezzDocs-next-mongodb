import React from 'react'
import Header from './Header'
import { useSession, signOut } from "next-auth/react"

function Layout({ children }) {
    const {data: session} = useSession()
    // if(!session){
    //     return (
    //         <div className='w-full m-0 p-0'>
    //             {children}
    //         </div>
    //     )
    // }
    return (
        <div className='w-full m-0 p-0'>
            <Header />
            {children}
        </div>
    )
}

export default Layout