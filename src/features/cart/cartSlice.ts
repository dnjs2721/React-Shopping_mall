import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    count: number;
    uid: any;
}

interface CartState {
    items: CartItem[]
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.count += 1;
            } else {
                state.items.push(action.payload);
            }
            if (action.payload.uid) {
                localStorage.setItem(action.payload.uid, JSON.stringify(state.items));
            }
        },
        incrementItem: (state, action: PayloadAction<number>) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item) {
                item.count += 1;
            }
            if (item) {
                if (item.uid) {
                    localStorage.setItem(item.uid, JSON.stringify(state.items));
                }
            }
        },
        decrementItem: (state, action: PayloadAction<number>) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item && item.count > 1) {
                item.count -= 1;
            }
            if (item) {
                if (item.uid) {
                    localStorage.setItem(item.uid, JSON.stringify(state.items));
                }
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            const uid = state.items.find(item => item.id === action.payload)?.uid;
            state.items = state.items.filter(item => item.id !== action.payload);
            if (uid) {
                localStorage.setItem(uid, JSON.stringify(state.items));
            }
        },
        removeAllFromCart: (state) => {
            state.items = [];
        },
        setItemsFromLocalStorage: (state, action: PayloadAction<CartItem[]>) => {
            state.items = action.payload;
        },
    },
});

export const { addToCart, incrementItem, decrementItem, removeFromCart, removeAllFromCart, setItemsFromLocalStorage } = cartSlice.actions;
export const selectCartItems = (state: RootState) => state.cart.items;

export default cartSlice.reducer;
