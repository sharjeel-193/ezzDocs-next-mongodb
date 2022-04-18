import React from 'react'
import Header from './Header'
import { useSession, signOut } from "next-auth/react"
import { useRouter } from 'next/router'

function Layout({ children }) {
    const {data: session} = useSession()
    const router = useRouter()
    // if(!session){
    //     return (
    //         <div className='w-full m-0 p-0'>
    //             {children}
    //         </div>
    //     )
    // }
    return (
        <div className='w-full m-0 p-0'>
            {router.pathname != '/login' && <Header />}
            {children}
        </div>
    )
}

export default Layout