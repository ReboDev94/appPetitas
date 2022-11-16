import React, { useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useCheckAuth } from '../common/hooks/useCheckAuth';

import Login from '../auth/views/Login';
import Register from '../auth/views/Register';
import Splash from '../common/views/Splash';
import Home from '../common/views/Home';

const Stack = createNativeStackNavigator();

const AppRouter = () => {
    const { status } = useCheckAuth();
    if (status === 'checking') {
        return <Splash />
    }

    return (
        <Stack.Navigator initialRouteName={status === "authenticated" ? 'home' : 'login'} >
            {status !== "authenticated" ?
                (
                    <>
                        <Stack.Screen
                            name="login"
                            component={Login}
                            options={{ headerShown: false, }}
                        />
                        <Stack.Screen
                            name="register"
                            component={Register}
                            options={{ headerShown: false }}
                        />
                    </>
                )
                : (
                    <>
                        <Stack.Screen
                            name="home"
                            component={Home}
                        />
                        {/* <Drawer.Navigator initialRouteName="home">
                            <Drawer.Screen name="home" component={Home} />
                        </Drawer.Navigator> */}
                    </>
                )
            }
        </Stack.Navigator >

    )

}

// options = {{
//     title: 'Mascotas',
//         headerStyle: {
//         backgroundColor: '#6b21a8'
//     },
//     headerTintColor: '#fff',
// }}

export default AppRouter
