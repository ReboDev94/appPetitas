import { useState, useEffect } from 'react'
import { Text, View, ImageBackground, SafeAreaView, Image, TouchableWithoutFeedback } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserWithEmailPassword } from '../../store/slices/auth/thunks';
import { setErrorMessage } from '../../store/slices/auth/actions';
import { createAlert } from '../../common/components/Alert';

import tw from 'twrnc';
import Input from '../../common/components/Input';
import Button from '../../common/components/Button';

const Register = ({ navigation }) => {

    const dispatch = useDispatch();

    const { loading, errorMessage } = useSelector((state) => state.auth);
    const [formLogin, setformLogin] = useState({
        email: '',
        password: '',
        displayName: ''
    });
    const { email, password, displayName } = formLogin;


    const onRegister = async () => {
        dispatch(startCreatingUserWithEmailPassword({ email, password, displayName }))

    }

    useEffect(() => {
        if (!!errorMessage)
            createAlert('Error al registrarse', errorMessage, [
                {
                    text: "OK", onPress: () => {
                        dispatch(setErrorMessage(null))
                    }
                }
            ]);
    }, [errorMessage])

    return (
        <SafeAreaView>
            <ImageBackground style={tw.style("h-full w-full flex justify-center items-center")} source={require("../../common/assets/fondo.jpg")} >
                <View style={tw.style('w-full px-4 flex flex-col')}>

                    <View style={tw.style("flex items-center")}>
                        <Image
                            style={tw.style("w-32 h-20 mb-5")}
                            source={require("../../common/assets/logo.png")}

                        />
                    </View>
                    <Text style={tw.style("text-2xl text-purple-800 text-center mb-10")} >Registrar</Text>

                    <Input
                        title="Nombre completo"
                        placeholder="example example example"
                        value={displayName}
                        style="mb-10"
                        editable={!loading}
                        onChangeText={(value) => setformLogin((prev) => ({ ...prev, displayName: value }))}
                    />
                    <Input
                        title="Correo electrónico"
                        placeholder="example@gmail.com"
                        value={email}
                        style="mb-10"
                        editable={!loading}
                        textContentType="emailAddress"
                        onChangeText={(value) => setformLogin((prev) => ({ ...prev, email: value }))}
                    />
                    <Input
                        title="Contraseña"
                        placeholder="********"
                        value={password}
                        secureTextEntry
                        textContentType="password"
                        style="mb-10"
                        editable={!loading}
                        onChangeText={(value) => setformLogin((prev) => ({ ...prev, password: value }))}
                    />

                    <Button onPress={onRegister} disabled={loading}>Registrar</Button>

                    <TouchableWithoutFeedback onPress={() => navigation.replace('login')}>
                        <View>
                            <Text style={tw.style("text-center mt-10 text-purple-800")}>Iniciar sesión</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default Register
