import {createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit';
import {auth} from "../../config/firebase";
import {setItemsFromLocalStorage} from "../cart/cartSlice";

interface User {
    uid: string;
    email: string;
    displayName: string;
}

interface AuthState {
    user: User | null;
    isLoading: boolean;
}

const initialState: AuthState = {
    user: null,
    isLoading: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
        },
        setUserNull: (state) => {
            state.user = null;
        }
    },
});

export const { setUser, setUserNull } = authSlice.actions;

export const fetchUser = () => async (dispatch: Dispatch) => {
    try {
        const user = auth.currentUser;
        if (user) {
            const uid = user.uid;
            dispatch(setUser({
                uid: uid,
                email: user.email || '',
                displayName: user.displayName || '',
            }));
            const storedItems = localStorage.getItem(uid);
            if (storedItems) {
                const parsedItems = JSON.parse(storedItems);

                dispatch(setItemsFromLocalStorage(parsedItems));
            }
        } else {
            dispatch(setUserNull());
        }
    } catch (error) {
        console.error('Error fetching user:', error);
    }
};

export default authSlice.reducer;