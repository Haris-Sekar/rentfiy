import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../Types/User";


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
    }
});

export default UserReducer.reducer;
export const { populateUserDetails } = UserReducer.actions;