import React from 'react'
import tw from 'twrnc';
import { Text, View, Image } from 'react-native'
import Input from '../../common/components/Input';
import Button from '../../common/components/Button';

// value={email}
// editable={!loading}
// onChangeText={(value) => setformLogin((prev) => ({ ...prev, email: value }))}
const Profile = () => {
    return (
        <View style={tw.style("px-5")}>
            <View style={tw.style("flex items-center py-10")}>
                <Image style={tw.style("w-34 h-34 rounded-full")} source={{ uri: "https://img.freepik.com/vector-premium/gato-lindo-lindo-gatito-gatico_49022-14.jpg?w=740" }} />
            </View>
            <View>
                <Input
                    title="Nombre"
                    placeholder="Yaret Araujo Delgado"
                    style="mb-6"
                />
                <Input
                    title="Correo electrónico"
                    placeholder="example@gmail.com"
                    style="mb-6"
                    editable={false}
                />
                <Button>Guardar</Button>

            </View>
        </View>
    )
}

export default Profile
