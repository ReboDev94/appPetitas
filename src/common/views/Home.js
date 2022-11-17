import React from 'react'
import { View, Text, SafeAreaView, FlatList, Image } from 'react-native'
import tw from 'twrnc';

const DATA = [
    {
        photo: "https://img.freepik.com/fotos-premium/gato-gris-ojos-amarillos-encuentra-concepto-clinica-veterinaria-o-blog-gatos-alimentacion-animal-vertical_95685-1364.jpg?w=2000",
        name: "Taro",
        age: '2',
        gender: 'Macho',
        breed: 'Gato',
        color: 'Gris'
    },
    {
        photo: "https://img.freepik.com/fotos-premium/gato-gris-ojos-amarillos-encuentra-concepto-clinica-veterinaria-o-blog-gatos-alimentacion-animal-vertical_95685-1364.jpg?w=2000",
        name: "Taro",
        age: '2',
        gender: 'Macho',
        breed: 'Gato',
        color: 'Gris'
    },
    {
        photo: "https://img.freepik.com/fotos-premium/gato-gris-ojos-amarillos-encuentra-concepto-clinica-veterinaria-o-blog-gatos-alimentacion-animal-vertical_95685-1364.jpg?w=2000",
        name: "Taro",
        age: '2',
        gender: 'Macho',
        breed: 'Gato',
        color: 'Gris'
    },
    {
        photo: "https://img.freepik.com/fotos-premium/gato-gris-ojos-amarillos-encuentra-concepto-clinica-veterinaria-o-blog-gatos-alimentacion-animal-vertical_95685-1364.jpg?w=2000",
        name: "Taro",
        age: '2',
        gender: 'Macho',
        breed: 'Gato',
        color: 'Gris'
    },
    {
        photo: "https://img.freepik.com/fotos-premium/gato-gris-ojos-amarillos-encuentra-concepto-clinica-veterinaria-o-blog-gatos-alimentacion-animal-vertical_95685-1364.jpg?w=2000",
        name: "Taro",
        age: '2',
        gender: 'Macho',
        breed: 'Gato',
        color: 'Gris'
    }
];

const ItemPet = ({ name, photo, age, gender }) => (
    <View style={tw.style("rounded-2 p-2 my-2 bg-blue-100")} >
        <View style={tw.style("flex items-center")}>
            <Image style={tw.style("w-24 h-24 rounded-full")} source={{ uri: photo }} />
            <Text style={tw.style("font-bold my-2")} >{name}</Text>
        </View>
        <View>
            <Text> Edad: {age} años</Text>
            <Text> Genero: {gender}</Text>
        </View>
    </View>
);

const Home = () => {

    const renderItem = ({ item }) => (
        <ItemPet {...item} />
    );

    return (
        <SafeAreaView style={tw.style("px-2")}>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}

export default Home
