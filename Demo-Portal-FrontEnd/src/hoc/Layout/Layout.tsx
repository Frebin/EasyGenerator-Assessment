import { useState } from 'react'
import { useMediaQuery } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store/store'
import HeaderNav from 'src/components/HeaderNav/HeaderNav'

function Layout(props: any) {
    const screenWidth = useMediaQuery('(max-width:768px)')
    const authState: any = useSelector(
        (state: RootState) => state.loginReducer.token
    )

    return (
        <>
            {authState && (<HeaderNav />)}
            <main style={{ flex: 1 }}>{props.children}</main>
        </>
    )
}

export default Layout