import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useCheckAuth } from '../common/hooks/useCheckAuth';

import Register from '../auth/views/Register';
import Login from '../auth/views/Login';

import Splash from '../common/views/Splash';
import Root from '../common/views/Root';
import AddPet from '../common/views/AddPet';
import { optionsHeader } from '../common/helpers';


const Stack = createNativeStackNavigator();

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
        <Stack.Navigator initialRouteName="add-pet" >
            <Stack.Screen
                name="root"
                component={Root}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="add-pet"
                component={AddPet}
                options={optionsHeader('Agregar mascota')}
            />
        </Stack.Navigator>

    )

}

export default AppRouter
