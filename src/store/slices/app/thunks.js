import { createAsyncThunk } from "@reduxjs/toolkit"
import { doc, setDoc, collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDb } from '../../../firebase/config';
import { setPetAction, setPetsAction } from "./actions";


export const startSavingPet = createAsyncThunk("app/startSavingPet", async ({ newPet }, { getState, dispatch }) => {
    const { uid } = getState().auth;
    const newDoc = doc(collection(FirebaseDb, `${uid}/petitas/pets`));
    await setDoc(newDoc, newPet);
    dispatch(setPetAction({ ...newPet, id: newDoc.id }))
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

