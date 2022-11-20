import React, { useState, useEffect } from 'react'
import uuid from 'react-native-uuid';

import tw from 'twrnc';
import { Text, View, Image, TouchableWithoutFeedback, ActivityIndicator, SafeAreaView, ScrollView } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import dayjs from 'dayjs';
import * as ImagePicker from 'expo-image-picker';
import Input from '../../common/components/Input';
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from '../components/Button';

import { fileUpload } from '../helpers/fileUpload';
import { GENDERS, BREEDS } from '../helpers';
import { useDispatch } from 'react-redux';
import { startSavingPet } from '../../store/slices/app/thunks';

const AddPet = ({ route, navigation }) => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [formAddPet, setFormAddPet] = useState({
        id: null,
        photo: "https://img.freepik.com/vector-premium/gato-lindo-lindo-gatito-gatico_49022-14.jpg?w=740",
        name: '',
        birthday: '',
        gender: 'HEMBRA',
        breed: 'GATO',
        color: ''
    });

    const { photo, name, birthday, gender, breed, color } = formAddPet;

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);


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
                setFormAddPet((prev) => ({ ...prev, photo: secureurl }));
                setLoading(false);
            }
        } catch (e) {
            alert("Upload failed");
        }
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        const fDay = dayjs(currentDate).format('DD/MM/YYYY')
        setShow(false);
        setDate(currentDate);
        setFormAddPet((prev) => ({ ...prev, birthday: fDay.toString() }))
    };


    const save = async () => {
        setLoading(true)


        await dispatch(startSavingPet({ newPet: formAddPet }))
            .unwrap()
            .then(() => {
                navigation.goBack();
            }).catch(() => {
                alert("Ha ocurrido un error");
            })
            .finally(() => {
                setLoading(false)
            })

    }

    useEffect(() => {
        if (route.params) {
            const { id, photo, name, birthday, gender, breed, color } = route.params
            if (!!id) {
                navigation.setOptions({ title: 'Editar mascota' });
                setFormAddPet({ id, photo, name, birthday, gender, breed, color })
            }
        }


    }, [])


    return (
        <SafeAreaView >
            <ScrollView style={tw.style("flex flex-col px-5")}>
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
                <View style={tw.style("my-10")}>
                    <Input
                        title="Nombre"
                        placeholder="Kuro"
                        style="mb-6"
                        value={name}
                        onChangeText={(value) => setFormAddPet((prev) => ({ ...prev, name: value }))}
                        editable={!loading}

                    />
                    <TouchableWithoutFeedback onPress={() => !loading && setShow(true)}  >
                        <View>
                            <Input
                                title="Fecha de nacimiento"
                                placeholder="26/01/2018"
                                editable={false}
                                style="mb-6"
                                value={birthday}
                                pointerEvents="none"
                            />
                        </View>
                    </TouchableWithoutFeedback>
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode='date'
                            is24Hour={true}
                            onChange={onChange}
                            locale="es-ES"
                        />
                    )}

                    <View style={tw.style("mb-6")}>
                        <Text style={tw.style("text-sm")}>Genero.</Text>
                        <View style={tw.style("border border-purple-800 w-full rounded-2")}>
                            <Picker
                                enabled={!loading}
                                selectedValue={gender}
                                onValueChange={(itemValue, itemIndex) =>
                                    setFormAddPet((prev) => ({ ...prev, gender: itemValue }))
                                }>
                                {
                                    GENDERS.map((g) => <Picker.Item key={uuid.v4()} label={g} value={g} />)
                                }
                            </Picker>
                        </View>
                    </View>

                    <View style={tw.style("mb-6")}>
                        <Text style={tw.style("text-sm")}>Especie.</Text>
                        <View style={tw.style("border border-purple-800 w-full rounded-2")}>
                            <Picker
                                enabled={!loading}
                                selectedValue={breed}
                                onValueChange={(itemValue, itemIndex) =>
                                    setFormAddPet((prev) => ({ ...prev, breed: itemValue }))
                                }>
                                {
                                    BREEDS.map((g) => <Picker.Item key={uuid.v4()} label={g} value={g} />)
                                }
                            </Picker>
                        </View>
                    </View>

                    <Input
                        title="Color"
                        placeholder="Gris"
                        style="mb-6"
                        value={color}
                        onChangeText={(value) => setFormAddPet((prev) => ({ ...prev, color: value }))}
                        editable={!loading}
                    />

                    <Button onPress={save} disabled={loading}>Guardar</Button>

                </View>
            </ScrollView>
        </SafeAreaView >
    )
}


export default AddPet
