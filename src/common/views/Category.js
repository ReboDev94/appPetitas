import React from 'react'
import { Text, View, FlatList, SafeAreaView } from 'react-native'
import tw from 'twrnc';

const DATA = [
    { name: 'Baño' },
    { name: 'Vacunación' },
    { name: 'Desparacitación' },
    { name: 'Revisión' },
]

const ItemCategory = ({ name }) => (
    <View style={tw.style("rounded-2 p-2 my-2 bg-blue-100")} >
        <Text style={tw.style("font-bold my-2")} >{name}</Text>
    </View>
);
const Category = () => {
    const renderItem = ({ item }) => (
        <ItemCategory {...item} />
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

export default Category
