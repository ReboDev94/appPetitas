import React from 'react'
import { TextInput, View, Text } from 'react-native';
import tw from 'twrnc';

const Input = (props) => {

    const { disabled = false, title = '', style = '', ...rest } = props;
    return (
        <View>
            <Text style={tw.style("text-sm")}>{title}</Text>
            <TextInput
                style={tw.style(`border border-purple-800 w-full p-2 rounded-2 ${style}`)}
                {...rest}
            />
        </View>
    )
}

export default Input
