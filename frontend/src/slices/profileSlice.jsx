import {createSlice} from "@reduxjs/toolkit"

const getStoredUser = () => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser || storedUser === "undefined" || storedUser === "null") {
        return null;
    }

    try {
        return JSON.parse(storedUser);
    } catch {
        return null;
    }
};

const initialState = {
    user: getStoredUser(),
    loading: false,
};

const profileSlice = createSlice({
    name:"profile",
    initialState: initialState,
    reducers: {
        setUser(state, value) {
            state.user = value.payload;
        },
        setLoading(state, value) {
            state.loading = value.payload;
          },
    },
});

export const {setUser, setLoading} = profileSlice.actions;
export default profileSlice.reducer;