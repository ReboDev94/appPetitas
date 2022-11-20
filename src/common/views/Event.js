import React, { useState, useEffect } from 'react'
import tw from 'twrnc';
import { Text, SafeAreaView, ScrollView, View, TouchableWithoutFeedback } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import uuid from 'react-native-uuid';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { startLoadingPets } from '../../store/slices/app/thunks';
import Input from '../components/Input';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import Button from '../components/Button';


const CATEGORIAS = [
    "Vacunación",
    "Baño",
    "Desparacitación",
    "Consulta",
]
const Event = () => {

    const dispatch = useDispatch();
    const { pets } = useSelector((state) => state.app);

    const initStateEvent = {
        mascota: null,
        categoria: null,
        detalles: '',
        fecha: new Date(),
        comentarios: ''
    }
    const [loading, setLoading] = useState(false);
    const [formNewEvent, setFormNewEvent] = useState(initStateEvent);
    const { mascota, categoria, detalles, fecha, comentarios } = formNewEvent;

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
        setFormNewEvent((prev) => ({ ...prev, fecha: currentDate }))
    };


    const save = () => {

    }

    useEffect(() => {
        dispatch(startLoadingPets())
    }, [])

    return (
        <SafeAreaView >
            <ScrollView style={tw.style("flex flex-col px-5")}>
                <View style={tw.style("py-10")}>

                    <View style={tw.style("mb-6")}>
                        <Text style={tw.style("text-sm")}>Mascota.</Text>
                        <View style={tw.style("border border-purple-800 w-full rounded-2")}>
                            <Picker
                                enabled={!loading}
                                selectedValue={mascota}
                                onValueChange={(itemValue, itemIndex) =>
                                    setFormNewEvent((prev) => ({ ...prev, mascota: itemValue }))
                                }>

                                <Picker.Item key={uuid.v4()} label="Seleccina una mascota" value={null} />
                                {
                                    pets.map((pet) => <Picker.Item key={uuid.v4()} label={pet.name} value={pet.id} />)
                                }
                            </Picker>
                        </View>
                    </View>

                    <View style={tw.style("mb-6")}>
                        <Text style={tw.style("text-sm")}>Categoria.</Text>
                        <View style={tw.style("border border-purple-800 w-full rounded-2")}>
                            <Picker
                                enabled={!loading}
                                selectedValue={categoria}
                                onValueChange={(itemValue, itemIndex) =>
                                    setFormNewEvent((prev) => ({ ...prev, categoria: itemValue }))
                                }>
                                <Picker.Item key={uuid.v4()} label="Seleccina una categoria" value={null} />
                                {
                                    CATEGORIAS.map((categoria) => <Picker.Item key={uuid.v4()} label={categoria} value={categoria} />)
                                }
                            </Picker>
                        </View>
                    </View>

                    <Input
                        title="Detalles"
                        placeholder="Describa los detalles"
                        style="mb-6"
                        value={detalles}
                        multiline
                        numberOfLines={4}
                        onChangeText={(value) => setFormNewEvent((prev) => ({ ...prev, detalles: value }))}
                        editable={!loading}
                    />

                    <TouchableWithoutFeedback onPress={() => !loading && setShow(true)}  >
                        <View>
                            <Input
                                title="Fecha"
                                placeholder="Seleccione una fecha"
                                editable={false}
                                style="mb-6"
                                value={dayjs(fecha).format('DD/MM/YYYY')}
                                pointerEvents="none"
                            />
                        </View>
                    </TouchableWithoutFeedback>
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode='date'
                            is24Hour={true}
                            onChange={onChange}
                            locale="es-ES"
                        />
                    )}

                    <Input
                        title="Comentarios"
                        placeholder="Comentarios"
                        style="mb-6"
                        value={comentarios}
                        multiline
                        numberOfLines={4}
                        onChangeText={(value) => setFormNewEvent((prev) => ({ ...prev, comentarios: value }))}
                        editable={!loading}
                    />
                    <Button onPress={save} disabled={loading}>Guardar</Button>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Event
