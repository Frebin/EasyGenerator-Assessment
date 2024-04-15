import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { persistStore } from 'redux-persist'

//import reducers
import LoginReducer from './reducers/Login.reducer'
import SnackbarReducer from './reducers/Snackbar.reducer'

const store = configureStore({
    reducer: {
        loginReducer: LoginReducer,
        snackbarReducer: SnackbarReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})

setupListeners(store.dispatch)

const persister = persistStore(store)

export { persister, store }
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch