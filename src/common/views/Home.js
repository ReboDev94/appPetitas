import React, { useEffect } from 'react'
import { View, Text, SafeAreaView, FlatList, Image, TouchableOpacity } from 'react-native'
import tw from 'twrnc';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { startLoadingPets } from '../../store/slices/app/thunks';
import dayjs from 'dayjs';

const ItemPet = ({ name, photo, birthday, gender }) => (
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
);

const Home = ({ navigation }) => {

    const dispatch = useDispatch();
    const { pets } = useSelector((state) => state.app);

    const addPet = () => {
        navigation.push('add-pet')
    }

    useEffect(() => {
        dispatch(startLoadingPets())
    }, [])


    const renderItem = ({ item }) => (
        <ItemPet {...item} />
    );
    return (
        <>
            <SafeAreaView style={tw.style("px-2")}>
                <FlatList
                    data={pets}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
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
