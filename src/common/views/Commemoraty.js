import React, { useEffect, useState } from 'react'
import { Text, SafeAreaView, FlatList, View, Image, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import tw from 'twrnc';
import { startDeleteEVent, startLoadingEvents } from '../../store/slices/app/thunks';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import dayjs from 'dayjs';
import { createAlert } from '../components/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const Commemoraty = ({ navigation }) => {

    const dispatch = useDispatch();
    const { eventsPets } = useSelector((state) => state.app)

    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = () => {
        setRefreshing(true);
        dispatch(startLoadingEvents())
        setRefreshing(false);
    };

    useEffect(() => {
        dispatch(startLoadingEvents());
    }, [])



    const renderItem = ({ item }) => {
        const { id, mascota, categoria, detalles, fecha, hora, comentarios } = item;
        const { name, photo: photo } = mascota
        return (

            <Menu>
                <MenuTrigger >
                    <View style={tw.style("rounded-2 my-2 p-2 bg-blue-100")} >
                        <View style={tw.style("flex flex-row items-center")}>
                            <Image style={tw.style("w-14 h-14 rounded-full mr-5")} source={{ uri: photo || "https://i.pinimg.com/564x/23/e7/80/23e780c25eb0f70c3411b196df71e1fd--adorable-kittens-adorable-animals.jpg" }} />
                            <Text style={tw.style("font-bold")}>{name}</Text>
                        </View>

                        <View style={tw.style("mt-5")}>
                            <Text style={tw.style("font-bold pb-2")}>Categoria:&nbsp;{categoria}</Text>
                            <Text style={tw.style("font-bold pb-2")}>Detalles:&nbsp;{detalles}</Text>
                            <Text style={tw.style("font-bold pb-2")}>Fecha:&nbsp;{dayjs(fecha).format("DD/MM/YYYY")}</Text>
                            <Text style={tw.style("font-bold pb-2")}>Hora:&nbsp;{dayjs(hora).format('HH:MM')}</Text>
                            <Text style={tw.style("font-bold pb-2")}>Comentarios:&nbsp;{comentarios}</Text>
                        </View>
                    </View>

                </MenuTrigger>
                <MenuOptions>
                    <MenuOption onSelect={() => editar(item)}>
                        <Text style={tw.style("text-xl px-2 py-1 text-purple-800")}>Editar</Text>
                    </MenuOption>
                    <MenuOption onSelect={() => eliminar(id)} >
                        <Text style={tw.style("text-xl px-2 py-1 text-red-800")}>Eliminar</Text>
                    </MenuOption>
                </MenuOptions>
            </Menu>
        )
    };


    const eliminar = (id) => {
        createAlert("¿Desea eliminar este evento?", "", [
            {
                text: "Aceptar", onPress: () => {
                    dispatch(startDeleteEVent(id))
                }
            },
            {
                text: "Cancelar", onPress: () => {
                    console.log("cancelled")
                }
            }
        ])
    }

    const editar = (eventP) => {
        navigation.push('event', eventP)
    }

    const addEvent = () => {
        navigation.push('event')
    }



    return (
        <>
            <SafeAreaView >
                <FlatList
                    style={tw.style("px-2")}
                    data={eventsPets}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
                {eventsPets.length === 0 && (<View style={tw.style("h-full w-full flex items-center justify-center")}>
                    <Text> No tienes recordatorios </Text>
                </View>)}
            </SafeAreaView>
            <TouchableOpacity
                style={tw.style("h-14 w-14 absolute bottom-10 right-10 bg-purple-800 rounded-full flex items-center justify-center")}
                onPress={addEvent}
            >
                <FontAwesomeIcon icon={faPlus} size={25} style={tw.style("text-white")} />
            </TouchableOpacity>
        </>
    )
}

export default Commemoraty
