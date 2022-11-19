const optionsHeader = (title) => {
    return {
        title,
        headerStyle: {
            backgroundColor: '#6b21a8'
        },
        headerTintColor: '#fff',
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