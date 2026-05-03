import {createSlice} from "@reduxjs/toolkit"

const normalizeUser = (user) => {
    if (!user) {
        return null;
    }

    const firstName = user.firstName || user.firstname || "";
    const lastName = user.lastName || user.lastname || "";

    return {
        ...user,
        firstName,
        lastName,
        firstname: firstName,
        lastname: lastName,
    };
};

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
    user: normalizeUser(getStoredUser()),
    loading: false,
};

const profileSlice = createSlice({
    name:"profile",
    initialState: initialState,
    reducers: {
        setUser(state, value) {
            state.user = normalizeUser(value.payload);
        },
        setLoading(state, value) {
            state.loading = value.payload;
          },
    },
});

export const {setUser, setLoading} = profileSlice.actions;
export default profileSlice.reducer;