import { TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import tw from 'twrnc';
import { useDispatch } from 'react-redux';
import { startLogout } from "../../store/slices/auth/thunks";


const optionsHeader = (title) => {
    const dispatch = useDispatch();
    return {
        title,
        headerStyle: {
            backgroundColor: '#6b21a8'
        },
        headerTintColor: '#fff',
        headerRight: () => (
            <TouchableOpacity onPress={() => {
                dispatch(startLogout())
            }
            }>
                <FontAwesomeIcon icon={faRightFromBracket} size={25} color="white" style={tw.style("mr-5")} />
            </TouchableOpacity>
        ),
    }
}

const fetchImageFromUri = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
};

export const GENDERS = ['MACHO', 'HEMBRA'];
export const BREEDS = ['GATO', 'PERRO'];

module.exports = {
    optionsHeader,
    fetchImageFromUri,
    GENDERS,
    BREEDS
}