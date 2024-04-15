import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { RootState } from 'src/store/store'

interface PrivateRouteProps {
    children: JSX.Element
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
    const authState: string | null = useSelector(
        (state: RootState) => state.loginReducer.token
    )
    if (!authState) {
        return <Navigate to='/signin' />
    }
    return children
}