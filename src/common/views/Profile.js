import React, { useState } from 'react'
import tw from 'twrnc';
import { Text, View, Image, ActivityIndicator, TouchableWithoutFeedback } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import Input from '../../common/components/Input';
import Button from '../../common/components/Button';
import { useSelector } from 'react-redux';
import { fileUpload } from '../helpers/fileUpload';
import { useDispatch } from 'react-redux';
import { startUpdateProfile } from '../../store/slices/auth/thunks';


const Profile = () => {

    const dispatch = useDispatch();
    const { photoUrl, email, displayName } = useSelector((state) => state.auth);

    const initStateProfile = {
        photo: photoUrl || 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
        name: displayName
    }
    const [profile, setProfile] = useState(initStateProfile);
    const { photo, name } = profile;
    const [loading, setLoading] = useState(false);

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
                setLoading(true);
                const imageAux = pickerResult.assets[0];
                const secureurl = await fileUpload(imageAux.uri);
                setProfile((prev) => ({ ...prev, photo: secureurl }));
                setLoading(false);
            }
        } catch (e) {
            alert("Upload failed");
        }
    };


    const save = () => {
        setLoading(true);
        dispatch(startUpdateProfile({ photo, name }))
            .unwrap()
            .then(() => {
                alert("Usuario actualizado")
            }).catch((err) => {
                alert(err);
            })
            .finally(() => {
                setLoading(false);
            })
    }


    return (
        <View style={tw.style("px-5")}>
            <View style={tw.style("flex items-center py-10")}>
                {loading ?
                    <View style={tw.style("border border-purple-300 rounded-full w-36 h-36 flex justify-center")}>
                        <ActivityIndicator size="large" color="#6b21a8" />
                    </View> :
                    <TouchableWithoutFeedback onPress={pickImage} >
                        <Image style={tw.style("w-36 h-36 rounded-full")} source={{ uri: photo }} />
                    </TouchableWithoutFeedback>
                }
            </View>
            <View>
                <Input
                    title="Nombre"
                    placeholder="Yaret Araujo Delgado"
                    style="mb-6"
                    value={name}
                    editable={!loading}
                    onChangeText={(value) => setProfile((prev) => ({ ...prev, name: value }))}
                />
                <Input
                    title="Correo electrónico"
                    placeholder="example@gmail.com"
                    style="mb-6"
                    value={email}
                    editable={false}
                />
                <Button disabled={loading} onPress={save}>Guardar</Button>

            </View>
        </View>
    )
}

export default Profile
