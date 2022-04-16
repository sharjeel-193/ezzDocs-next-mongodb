import Login from '../components/Login'
import { getSession } from "next-auth/react"

function login(props) {
    return (
        <Login />
    )
}

export default login
export async function getServerSideProps(context) {
    const session = await getSession(context)
  
    if (session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
  
    return {
        props: { session }
    }
}