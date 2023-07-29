import {createAsyncThunk} from "@reduxjs/toolkit";
import {IApiTransaction, ITransaction} from "../types";
import axiosApi from "../axiosApi";
import {AppDispatch, RootState} from "../app/store";
import {clearCount, updateTransaction} from "./transactionSlice";

export const fetchTransactions = createAsyncThunk<ITransaction[], undefined, { dispatch: AppDispatch , state: RootState}>(
    'transactions/fetch',
    async (_, thunkAPI) => {
        const transactionsResponse = await axiosApi.get<IApiTransaction | null>('/transactions.json');
        const transactionsData = transactionsResponse.data;
        let newTransactions: ITransaction[] = [];

        if(transactionsData) {
            newTransactions = Object.keys(transactionsData).map((key) => {
                return {
                    ...transactionsData[key],
                    id: key
                };
            });
        }

        thunkAPI.dispatch(updateTransaction(newTransactions));
        thunkAPI.dispatch(clearCount());
        return newTransactions;
    }
);

export const deleteTransaction = createAsyncThunk<void, string>(
    'transactions/delete',
    async (id) => {
        await axiosApi.delete('/transactions/' + id + '.json');
    }
);

export const fetchCategories = createAsyncThunk<void, string, { dispatch: AppDispatch , state: RootState}>(
    'transactions/fetchCategories',
    async () => {
    }
)
