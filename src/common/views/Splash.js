
import { StyleSheet, View, ImageBackground, Image } from 'react-native';
import tw from 'twrnc';

const Splash = () => {
    return (
        <View style={tw.style("flex h-full items-center justify-center")} >
            <ImageBackground style={tw.style("h-full w-full flex justify-center")} source={require("../assets/fondo.jpg")} >
                <Image
                    style={tw.style("w-full h-24")}
                    source={require("../assets/logo.png")}
                />
            </ImageBackground>
        </View>
    )
}

export default Splash
