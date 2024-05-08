import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    userId: '',
    username: '', // display name is different than username
};
const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            state.token = action.payload.token;
        },
        logout: (state) => {
            Object.assign(state, initialState);
        },
    },
});

export {initialState};
export const {login} = userSlice.actions;
export default userSlice.reducer;