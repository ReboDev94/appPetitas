const mime = require('mime');

export const fileUpload = async (file) => {
    if (!file) throw new Error('EL archivo no es valido');
    const urlCloaudinary = 'https://api.cloudinary.com/v1_1/deq5jyula/upload';
    const formData = new FormData();

    formData.append('upload_preset', 'petitasapp');
    const newImageUri = "file:///" + file.split("file:/").join("");
    formData.append('file', {
        uri: newImageUri,
        type: mime.getType(newImageUri),
        name: newImageUri.split("/").pop()
    });


    try {
        const resp = await fetch(urlCloaudinary, {
            method: 'POST',
            body: formData
        });

        if (!resp.ok) throw new Error('No se pudo subir la imagen');
        const cloudResp = await resp.json();

        return cloudResp.secure_url;

    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }


}