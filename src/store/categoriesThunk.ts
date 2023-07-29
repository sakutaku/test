import {createAsyncThunk} from "@reduxjs/toolkit";
import {ICategory, ICategoryMutation, TApiCategory} from "../types";
import {AppDispatch, RootState} from "../app/store";
import axiosApi from "../axiosApi";

export const fetchCategories = createAsyncThunk<ICategory[], undefined, { dispatch: AppDispatch , state: RootState}>(
    'categories/fetch',
    async (_, thunkAPI) => {
        const categoriesResponse = await axiosApi.get('/categories.json');

        let newCategories: ICategory[] = [];
        const categoriesData = categoriesResponse.data;
        if(categoriesData) {
            newCategories = Object.keys(categoriesData).map((key) => {
                return {
                    ...categoriesData[key],
                    id: key,
                }
            })
        }

        return newCategories;
    }
);

export const fetchCategory = createAsyncThunk<ICategoryMutation, string>(
    'categories/fetchOne',
    async (id) => {

        const response = await axiosApi.get<ICategoryMutation | null>('/categories/' + id + '.json');
        const category = response.data;

        if (category === null) {
            throw new Error('Not found');
        }

        return category;
    }
);

interface UpdateCategoryParams {
    id: string;
    category: TApiCategory;
}
export const fetchUpdateCategory = createAsyncThunk<void, UpdateCategoryParams>(
    'categories/updateCategory',
    async (params) => {
        await axiosApi.put(`/categories/${params.id}.json`, params.category);
    }
);
