import React, { useState, useCallback } from 'react'
import tw from 'twrnc';
import { Text, View, Image, TouchableWithoutFeedback, ActivityIndicator } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import Input from '../../common/components/Input';
import { fileUpload } from '../helpers/fileUpload';
import { GENDERS, BREEDS } from '../helpers';

const AddPet = () => {

    const [formAddPet, setFormAddPet] = useState({
        photo: null,
        name: '',
        birthday: '',
        gender: null,
        breed: null,
        color: ''

    });

    const [image, setImage] = useState({
        uri: "https://img.freepik.com/vector-premium/gato-lindo-lindo-gatito-gatico_49022-14.jpg?w=740",
        loading: false,
    });

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: "Images",
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        handleImagePicked(result);
    };

    const handleImagePicked = async (pickerResult) => {
        try {
            if (pickerResult.canceled) {
                return;
            } else {
                setImage((prev) => ({ ...prev, loading: true }));
                const image = pickerResult.assets[0];
                const secureurl = await fileUpload(image.uri);
                setImage((prev) => ({ ...prev, loading: false, uri: secureurl }));
            }
        } catch (e) {
            alert("Upload failed");
        }
    };

    return (
        <View style={tw.style("px-5")}>
            <View style={tw.style("flex items-center py-10")}>
                {image.loading ?
                    <View style={tw.style("border border-purple-300 rounded-full w-36 h-36 flex justify-center")}>
                        <ActivityIndicator size="large" color="#6b21a8" />
                    </View> :
                    <TouchableWithoutFeedback onPress={pickImage} >
                        <Image style={tw.style("w-36 h-36 rounded-full")} source={{ uri: image.uri }} />
                    </TouchableWithoutFeedback>
                }
            </View>
            <View>
                <Input
                    title="Nombre"
                    placeholder="Kuro"
                    style="mb-6"
                />
                <Input
                    title="Fecha de cumpleaños"
                    placeholder="Kuro"
                    editable={false}
                    style="mb-6"
                />
            </View>
        </View>
    )
}

export default AddPet
