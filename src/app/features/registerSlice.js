import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RegisterOwnerService, RegisterDriverService, loginService } from '../../apis/service';
import { clearUserData, getUserData, saveUserData } from '../../units/asyncStorageManager';

export const registerOwner = createAsyncThunk(
    'register/registerOwner',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await RegisterOwnerService(userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const registerDriver = createAsyncThunk(
    'register/registerDriver',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await RegisterDriverService(userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const loginUser = createAsyncThunk(
    'register/login',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await loginService(userData);
            saveUserData(response);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const loadInitialState = createAsyncThunk(
    'register/loadInitialState',
    async () => {
        try {
            const storedData = await getUserData();
            const { user, token , userRole} = storedData || {};
            return {
                user: user || null,
                token: token || null,
                userRole: userRole || null,
                isLoggedIn: !!token,
            };
        } catch (error) {
            throw error;
        }
    }
);

const initialState = {
    owner: null,
    driver: null,
    user: null,
    token: null,
    userRole: null,
    isLoggedIn: false,
    loading: false,
    error: null,
};

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        clearRegisterState: (state) => {
            state.owner = null;
            state.driver = null;
            state.loading = false;
            state.error = null;
        },
        logout: (state) => {
            clearUserData();
            state.isLoggedIn = false;
            state.user = null;
            state.token = null;
            console.log('User logged out successfully.');
        },
        resetError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(registerOwner.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(registerOwner.fulfilled, (state, action) => {
            state.loading = false;
            state.owner = action.payload;
        });
        builder.addCase(registerOwner.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(registerDriver.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(registerDriver.fulfilled, (state, action) => {
            state.loading = false;
            state.driver = action.payload;
        });
        builder.addCase(registerDriver.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.isLoggedIn = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.userRole = action.payload.user.role;
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(loadInitialState.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(loadInitialState.fulfilled, (state, action) => {
            state.loading = false;
            state.isLoggedIn = action.payload.isLoggedIn;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.userRole = action.payload.userRole;
        });
        builder.addCase(loadInitialState.rejected, (state) => {
            state.loading = false;
            state.isLoggedIn = false;
        });
    },
});

export const { clearRegisterState, logout, resetError } = registerSlice.actions;
export default registerSlice.reducer;
