import { createAsyncThunk } from "@reduxjs/toolkit";
import { registerWithEmailPassword, singInWithGoogle, singInWithEmailPassword, logoutFirebase } from "../../../firebase/providers";
import { checkingCredentials, logout, login, setLoading } from "./actions";
import { updateProfile } from "firebase/auth";

import { FirebaseAuth } from '../../../firebase/config'

export const checkingAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSingIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const result = await singInWithGoogle();
    if (!result.success) dispatch(logout({ errorMessage: result.errorMessage }));

    dispatch(login(result));
  };
};

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const { success, uid, photoURL, errorMessage } = await registerWithEmailPassword({ email, password, displayName });
    dispatch(setLoading(false));
    if (!success) return dispatch(logout({ errorMessage }))
    dispatch(login({ uid, displayName, email, photoURL }));
  }

}


export const startLoginWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const result = await singInWithEmailPassword({ email, password });
    dispatch(setLoading(false));
    if (!result.success) return dispatch(logout({ errorMessage: result.errorMessage }));
    dispatch(login(result));
  }
}

export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirebase();
    dispatch(logout());
  }
}

export const startUpdateProfile = createAsyncThunk("auth/updateProfile",
  async ({ photo, name }, { rejectWithValue, dispatch }) => {
    try {
      const user = await updateProfile(FirebaseAuth.currentUser, { displayName: name, photoURL: photo })
      return { success: true, user };
    } catch (error) {
      return rejectWithValue(error.message)
    }

  })

