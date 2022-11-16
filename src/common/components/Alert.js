import { Alert } from 'react-native';

export const createAlert = (typeMessage = "Error", message = '', options = [
    { text: "OK", onPress: () => console.log("OK Pressed") }
]) =>
    Alert.alert(
        typeMessage,
        message,
        options
    );