import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseAuth } from "../../firebase/config";
import { logout, login } from "../../store/slices/auth/actions";


export const useCheckAuth = () => {
    const { status } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    useEffect(() => {
        onAuthStateChanged(FirebaseAuth, async (user) => {
            if (!user) return dispatch(logout());
            const { email, photoURL, uid, displayName } = user;
            dispatch(login({ email, photoURL, uid, displayName }));
        });
    }, []);
    return { status }
}