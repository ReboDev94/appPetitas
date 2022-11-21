import { createAsyncThunk } from "@reduxjs/toolkit"
import { doc, setDoc, collection, getDocs, deleteDoc, Timestamp, getDoc } from "firebase/firestore/lite";
import { FirebaseDb } from '../../../firebase/config';
import { setPetAction, setPetsAction, deletePetAction, updatePetAction, setEventsAction, deleteEventAction, updateEventAction } from "./actions";


export const startSavingPet = createAsyncThunk("app/startSavingPet", async ({ newPet }, { getState, dispatch }) => {
    const { uid } = getState().auth;
    const { id } = newPet;

    if (!id) {
        const newDoc = doc(collection(FirebaseDb, `${uid}/petitas/pets`));
        await setDoc(newDoc, newPet);
        dispatch(setPetAction({ ...newPet, id: newDoc.id }))
    } else {
        const newPetUpdate = { ...newPet };
        delete newPetUpdate.id;

        const docRef = doc(FirebaseDb, `${uid}/petitas/pets/${id}`);
        await setDoc(docRef, newPetUpdate, { merge: true })

        dispatch(updatePetAction(newPet))
    }
})


export const startLoadingPets = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        if (!uid) throw new Error('El UID del usuario no esta establecido')

        const collectionRef = collection(FirebaseDb, `${uid}/petitas/pets`);
        const docs = await getDocs(collectionRef);
        const pets = [];

        docs.forEach((doc) => {
            pets.push({ id: doc.id, ...doc.data() })
        })

        dispatch(setPetsAction(pets))
    }
}

export const startDeletePet = (id) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const docRef = doc(FirebaseDb, `${uid}/petitas/pets/${id}`);
        await deleteDoc(docRef);
        dispatch(deletePetAction(id));
    }
}

export const startSavingEvent = createAsyncThunk("app/startSavingEvent", async (newEvent, { dispatch, getState }) => {
    const { uid } = getState().auth;
    const { id } = newEvent;

    if (!id) {
        const newDoc = doc(collection(FirebaseDb, `${uid}/petitas/events`));
        await setDoc(newDoc, newEvent);
    } else {

        const newEventUpdate = { ...newEvent };
        delete newEventUpdate.id;

        const docRef = doc(FirebaseDb, `${uid}/petitas/events/${id}`);
        await setDoc(docRef, newEventUpdate, { merge: true })

        dispatch(updateEventAction(newEventUpdate))
    }

})


export const startLoadingEvents = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        if (!uid) throw new Error('El UID del usuario no esta establecido')

        const collectionRef = collection(FirebaseDb, `${uid}/petitas/events`);
        const docs = await getDocs(collectionRef);
        const events = [];


        docs.forEach((docEvent) => {
            events.push({ id: docEvent.id, ...docEvent.data() })
        })

        for (const event of events) {
            const docRef = doc(FirebaseDb, `${uid}/petitas/pets`, event.mascota);
            const docPet = await getDoc(docRef);
            event.mascota = { id: docPet.id, ...docPet.data() }
        }

        dispatch(setEventsAction(events))
    }
}

export const startDeleteEVent = (id) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const docRef = doc(FirebaseDb, `${uid}/petitas/events/${id}`);
        await deleteDoc(docRef);
        dispatch(deleteEventAction(id));
    }
}
