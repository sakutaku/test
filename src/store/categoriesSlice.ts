import {ICategory, ICategoryMutation} from "../types";
import {createSlice,} from "@reduxjs/toolkit";
import {fetchCategories, fetchCategory, fetchUpdateCategory} from "./categoriesThunk";

interface CategoriesState {
    allCategories: ICategory[];
    oneCategory: ICategoryMutation | null;
    fetchLoading: boolean;
    fetchOneLoading: boolean;
    show: boolean;
    updateLoading: boolean;
}

const initialState: CategoriesState = {
    allCategories: [],
    oneCategory: null,
    fetchLoading: false,
    fetchOneLoading: false,
    show: false,
    updateLoading: false,
};

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setShow: (state, {payload: boolean}) => {
            state.show = boolean;
        },
        updateOneCategory: (state) => {
            state.oneCategory = null;
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchCategories.pending, state => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.fetchLoading = false;
            state.allCategories = action.payload;
        });
        builder.addCase(fetchCategories.rejected, state => {
            state.fetchLoading = false;
        });
        builder.addCase(fetchCategory.pending, (state) => {
            state.fetchOneLoading = true;
        });
        builder.addCase(fetchCategory.fulfilled, (state, {payload: category}) => {
            state.oneCategory = category;
            state.fetchOneLoading = false;
        });
        builder.addCase(fetchCategory.rejected, (state) => {
            state.fetchOneLoading = false;
        });
        builder.addCase(fetchUpdateCategory.pending, (state) => {
            state.updateLoading = true;
        });
        builder.addCase(fetchUpdateCategory.fulfilled, (state) => {
            state.updateLoading = false;
        });
        builder.addCase(fetchUpdateCategory.rejected, (state) => {
            state.updateLoading = false;
        });
    }
});

export const categoriesReducer = categoriesSlice.reducer;
export const {setShow, updateOneCategory} = categoriesSlice.actions;


