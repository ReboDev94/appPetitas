import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from './Home';
import Profile from './Profile';
import Commemoraty from './Commemoraty';
import Event from './Event';
import { optionsHeader } from '../helpers';

const Drawer = createDrawerNavigator();

const Root = () => {
    return (
        <Drawer.Navigator initialRouteName="event" useLegacyImplementation
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
                options={optionsHeader('Nuevo evento')}
            />

        </Drawer.Navigator>
    )
}

export default Root
