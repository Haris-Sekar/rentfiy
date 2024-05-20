import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAddProperty } from "../../Types/Property";
import { API } from "../../api/api";


interface PropertyState {
    properties: IAddProperty[],
    totalProperties: number,
    loading: boolean;
}

const initialState: PropertyState = {
    properties: [],
    totalProperties: 0,
    loading: false
}

export const fetchProperties = createAsyncThunk<{ properties: IAddProperty[], totalproperties: number }, { page: number, perPage: number, isSell?: boolean }, { rejectValue: string }>(
    "users/fetchCurrentUserDetails",
    async (agrs, thunkApi) => {
        try {
            const { data } = await API.get(`/property?perPage=${agrs.perPage}&page=${agrs.page}&isSell=${agrs.isSell}`);
            return { properties: data.properties, totalproperties: data.count }
        } catch (error: any) {
            return thunkApi.rejectWithValue(error?.message);
        }
    }
)

export const PropertyReducer = createSlice({
    name: "property",
    initialState,
    reducers: {
        appendProperty: (state, action: PayloadAction<IAddProperty>) => {
            state.properties.filter((e) => e._id !== action.payload._id);
            state.properties.push(action.payload)

        },
    }, extraReducers: (builder) => {
        builder
            .addCase(fetchProperties.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProperties.fulfilled, (state, action) => {
                state.properties = action.payload.properties;
                state.totalProperties = action.payload.totalproperties;
                state.loading = false;
            })
            .addCase(fetchProperties.rejected, (state, _action) => {
                state.loading = false;
            })
    }
});

export default PropertyReducer.reducer;
export const { appendProperty } = PropertyReducer.actions;