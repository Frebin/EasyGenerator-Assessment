import React, { Suspense } from 'react'
import { Box } from '@mui/material'
import { Routes, Route } from 'react-router-dom'
import Layout from 'src/hoc/Layout/Layout'
import Loader from 'src/components/Loader/Loader'

import Login from 'src/containers/Login/Login'
import NotFound from 'src/containers/NotFound/NotFound'
import SignUp from 'src/containers/SignUp/SignUp'

import Home from 'src/containers/Home/Home'
import PrivateRoute from 'src/hoc/PrivateRoute/PrivateRoute'

function FallBackComponent() {
    const spinnerContainerStyle = {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
    return (
        <Box sx={spinnerContainerStyle}>
            <Loader size={50} color='primary.main' />
        </Box>
    )
}

export default function RouteImports() {
    return (
        <Layout>
            <Routes>
                <Route path='/signin' element={<Login />} />
                <Route path='/signup' element={
                    <Suspense fallback={<FallBackComponent />}>
                        <SignUp />
                    </Suspense>
                } />
                <Route
                    path='/home'
                    element={<PrivateRoute children={<Home />} />}
                />

                <Route
                    path='/'
                    element={<PrivateRoute children={<Home />} />}
                />
                <Route path='*' element={<NotFound />} />

            </Routes>
        </Layout>
    )
}