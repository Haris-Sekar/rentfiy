import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../Types/User";
import { API } from "../../api/api";


interface UserState {
    user: User | undefined,
    loading: boolean;
}

const initialState: UserState = {
    user: undefined,
    loading: false
}

// export const fetchCurrentUserDetials = createAsyncThunk<{ userDetails: User }, void, { rejectValue: string }>(
//     "users/fetchCurrentUserDetails",
//     async (_, thunkApi) => {
//         try {
//             const { data } = await API.get('/user');
//             return { userDetails: data.userDetials }
//         } catch (error: any) {
//             return thunkApi.rejectWithValue(error?.message);
//         }
//     }
// )

export const UserReducer = createSlice({
    name: "user",
    initialState,
    reducers: {
        populateUserDetails: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
    }, extraReducers: (builder) => {
        // builder
        //     .addCase(fetchCurrentUserDetials.pending, (state) => {
        //         state.loading = true;
        //     })
        //     .addCase(fetchCurrentUserDetials.fulfilled, (state, action) => {
        //         state.currentUserDetails = action.payload.userDetails;
        //         state.companyDetails = action.payload.companyDetails;
        //         state.loading = false;
        //     })
        //     .addCase(fetchCurrentUserDetials.rejected, (state, action) => {
        //         state.loading = false;
        //         state.error.message = action.error.message || 'something went wrong'
        //     })
    }
});

export default UserReducer.reducer;
export const { populateUserDetails } = UserReducer.actions;