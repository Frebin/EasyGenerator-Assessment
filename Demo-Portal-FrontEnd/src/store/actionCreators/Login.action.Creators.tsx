import { _post } from 'src/configs/Api.config'
import { loginUrl } from 'src/constants/Routes'
import { AppDispatch } from 'src/store/store'
import { loginStart, loginFailure, loginSuccess, logout, resetErrorState } from 'src/store/reducers/Login.reducer'
import { setDomainAfterLogin } from 'src/configs/Http.config'


export const startLogin = (params: any) => async (dispatch: AppDispatch) => {
    try {
        dispatch(loginStart())
        const response: any = await _post(loginUrl, params)
        const userObj = {
            id: response.data.user._id,
            email: response.data.user.email,
            name: response.data.user.name,
            isNewUser: response.data.user.isNewUser,
            roleName: response.data.user.roleName
        }
        const authObject = {
            token: response.data.token,
            userDetails: userObj
        }
        dispatch(loginSuccess(authObject))
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(userObj))
        setDomainAfterLogin()

    } catch (error: any) {
        // console.log("error",error)
        dispatch(loginFailure(error))
    }
}

export const logoutStart = () => async (dispatch: AppDispatch) => {
    dispatch(logout())
    localStorage.removeItem('token')
    localStorage.removeItem('user')
}
export const resetErrorStateStart = () => async (dispatch: AppDispatch) => {
    dispatch(resetErrorState())
}

export const checkAuthState = () => async (dispatch: AppDispatch) => {
    const token = localStorage.getItem('token')
    if (!token) {
        dispatch(logout())
    } else {
        const userObjFromLocal: any = localStorage.getItem('user')
        const parseObj = JSON.parse(userObjFromLocal)
        const userObj = {
            id: parseObj.id,
            email: parseObj.email,
            name: parseObj.name,
            roleName: parseObj.roleName,
            isNewUser: parseObj.isNewUser,
        }
        const authObject = {
            token: token,
            userDetails: userObj
        }
        dispatch(loginSuccess(authObject))
    }
}

