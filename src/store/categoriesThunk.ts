import {createAsyncThunk} from "@reduxjs/toolkit";
import {IApiCategory, ICategory, ICategoryMutation, TApiCategory} from "../types";
import {AppDispatch, RootState} from "../app/store";
import axiosApi from "../axiosApi";

export const fetchCategories = createAsyncThunk<ICategory[], undefined, { dispatch: AppDispatch , state: RootState}>(
    'categories/fetch',
    async (_, thunkAPI) => {
        const categoriesResponse = await axiosApi.get<IApiCategory | null>('/categories.json');

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

export const createCategory = createAsyncThunk<void, TApiCategory>(
    'categories/create',
    async (category) => {
        await axiosApi.post('/categories.json', category);
    }
);

export const deleteCategory = createAsyncThunk<void, string>(
    'categories/delete',
    async (id) => {
        await axiosApi.delete('/categories/' + id + '.json');
    }
);
