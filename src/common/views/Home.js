import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, FlatList, Image, TouchableOpacity } from 'react-native'
import tw from 'twrnc';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { startDeletePet, startLoadingPets } from '../../store/slices/app/thunks';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { createAlert } from '../components/Alert';


const Home = ({ navigation }) => {
    const dispatch = useDispatch();
    const { pets } = useSelector((state) => state.app);

    const [refreshing, setRefreshing] = useState(false)
    const addPet = () => {
        navigation.push('add-pet')
    }

    useEffect(() => {
        dispatch(startLoadingPets())
    }, [])


    const renderItem = ({ item }) => (
        <ItemPet {...item} />
    );

    const ItemPet = (pet) => {
        const { id, name, photo, birthday, gender } = pet;
        return (
            <Menu>
                <MenuTrigger >
                    <View style={tw.style("rounded-2 p-2 my-2 bg-blue-100")} >
                        <View style={tw.style("flex items-center")}>
                            <Image style={tw.style("w-24 h-24 rounded-full")} source={{ uri: photo }} />
                            <Text style={tw.style("font-bold my-2")} >{name}</Text>
                        </View>
                        <View>
                            <Text> Nacimiento: {birthday}</Text>
                            <Text> Genero: {gender}</Text>
                        </View>
                    </View>
                </MenuTrigger>
                <MenuOptions>
                    <MenuOption onSelect={() => editar(pet)}>
                        <Text style={tw.style("text-xl px-2 py-1 text-purple-800")}>Editar</Text>
                    </MenuOption>
                    <MenuOption onSelect={() => eliminar(id)} >
                        <Text style={tw.style("text-xl px-2 py-1 text-red-800")}>Eliminar</Text>
                    </MenuOption>
                </MenuOptions>
            </Menu>
        )
    };

    const onRefresh = () => {
        setRefreshing(true);
        dispatch(startLoadingPets())
        setRefreshing(false);
    };

    const eliminar = (id) => {
        createAlert("¿Desea eliminar esta mascota?", "", [
            {
                text: "Aceptar", onPress: () => {
                    dispatch(startDeletePet(id))
                }
            },
            {
                text: "Cancelar", onPress: () => {
                    console.log("cancelled")
                }
            }
        ])
    }

    const editar = (pet) => {
        navigation.push('add-pet', pet)
    }
    return (
        <>
            <SafeAreaView >
                <FlatList
                    style={tw.style("px-2")}
                    data={pets}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
                {pets.length === 0 && (<View style={tw.style("h-full w-full flex items-center justify-center")}>
                    <Text> No tienes mascotas </Text>
                </View>)}
            </SafeAreaView>
            <TouchableOpacity
                style={tw.style("h-14 w-14 absolute bottom-10 right-10 bg-purple-800 rounded-full flex items-center justify-center")}
                onPress={addPet}
            >
                <FontAwesomeIcon icon={faPlus} size={25} style={tw.style("text-white")} />
            </TouchableOpacity>

        </>
    )
}

export default Home
