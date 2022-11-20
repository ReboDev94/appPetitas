import React from 'react'
import { TouchableHighlight, View, Text } from 'react-native'
import tw from 'twrnc';

const Button = (props) => {
    const { disabled = false, children, onPress } = props;

    return (
        <TouchableHighlight onPress={onPress}>
            <View style={tw.style('py-3 rounded-2', { "bg-gray-500": disabled, 'bg-purple-800': !disabled })}>
                <Text style={tw.style("text-center font-bold", { "text-gray-300": disabled, "text-white": !disabled })}>{children}</Text>
            </View>
        </TouchableHighlight>
    )
}

export default Button
