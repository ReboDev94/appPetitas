import React, { useState } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useCheckAuth } from '../common/hooks/useCheckAuth';

import Register from '../auth/views/Register';
import Login from '../auth/views/Login';

import Splash from '../common/views/Splash';
import Home from '../common/views/Home';
import Profile from '../common/views/Profile';
import Category from '../common/views/Category';
import Commemoraty from '../common/views/Commemoraty';
import Event from '../common/views/Event';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


const optionsHeader = (title) => {
    return {
        title,
        headerStyle: {
            backgroundColor: '#6b21a8'
        },
        headerTintColor: '#fff',
    }
}


const AppRouter = () => {
    const { status } = useCheckAuth();
    if (status === 'checking') {
        return <Splash />
    }


    if (status !== "authenticated") {
        return (
            <Stack.Navigator initialRouteName="login" >
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
            </Stack.Navigator >
        )
    }

    return (
        <Drawer.Navigator initialRouteName="home" useLegacyImplementation
            screenOptions={{
                drawerInactiveTintColor: '#fff',
                drawerActiveTintColor: '#e9d5ff',
                drawerStyle: {
                    backgroundColor: '#a855f7',
                    width: 240,
                },
            }}>
            <Drawer.Screen
                name="profile"
                component={Profile}
                options={optionsHeader('Perfil')}
            />
            <Drawer.Screen
                name="home"
                component={Home}
                options={optionsHeader('Mascotas')}
            />
            <Drawer.Screen
                name="commemoraty"
                component={Commemoraty}
                options={optionsHeader('Recordatorio')}
            />
            <Drawer.Screen
                name="event"
                component={Event}
                options={optionsHeader('Eventos')}
            />
            <Drawer.Screen
                name="category"
                component={Category}
                options={optionsHeader('Categorias')}
            />
        </Drawer.Navigator>
    )

}

export default AppRouter
