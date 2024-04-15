import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserDetails {
    id: string,
    email: string,
    name: string,
    isNewUser: boolean,
    roleName: string,
}

interface LoginState {
    token: string | null,
    user: UserDetails,
    expiryDate: string,
    loading: boolean,
    error: string
}

const userObj = localStorage.getItem('user')
const parseObj = userObj ? JSON.parse(userObj) : null
const initialState: LoginState = {
    token: localStorage.getItem('token'),
    user: {
        id: '',
        email: '',
        name: '',
        isNewUser: parseObj ? parseObj.isNewUser : false,
        roleName: '',
    },
    expiryDate: '',
    loading: false,
    error: ''
}

const loginSlice = createSlice({
    name: 'loginReducer',
    initialState,
    reducers: {
        loginStart: (state) => {
            return {
                ...state,
                loading: true,
                error: '',
                token: ''
            }
        },
        loginSuccess: (state, action: PayloadAction<any>) => {
            return {
                ...state,
                token: action.payload.token,
                user: {
                    id: action.payload.userDetails.id,
                    email: action.payload.userDetails.email,
                    name: action.payload.userDetails.name,
                    isNewUser: action.payload.userDetails.isNewUser,
                    roleName: action.payload.userDetails.roleName,
                },
                loading: false,
                error: ''
            }
        },
        loginFailure: (state, action: PayloadAction<any>) => {
            return {
                ...state,
                token: '',
                user: {
                    id: '',
                    email: '',
                    name: '',
                    isNewUser: false,
                    roleName: '',
                },
                loading: false,
                error: action.payload.response?.data?.message
            }
        },
        logout: (state) => {
            return {
                ...state,
                token: '',
                user: {
                    id: '',
                    email: '',
                    name: '',
                    isNewUser: false,
                    roleName: '',
                },
                error: ''
            }
        },
        resetErrorState: (state) => {
            return {
                ...state,
                error: ''
            }
        }
    }
})

export const { loginStart, loginSuccess, loginFailure, logout, resetErrorState } = loginSlice.actions
export default loginSlice.reducer