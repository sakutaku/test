import {createAsyncThunk} from "@reduxjs/toolkit";
import {IApiTransaction, ITransaction} from "../types";
import axiosApi from "../axiosApi";
import {AppDispatch} from "../app/store";
import { updateTransaction} from "./transactionSlice";

export const fetchTransactions = createAsyncThunk<ITransaction[], undefined, { dispatch: AppDispatch }>(
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

        thunkAPI.dispatch(updateTransaction(newTransactions))
        return newTransactions;
    }
);

export const deleteTransaction = createAsyncThunk<void, string>(
    'transactions/delete',
    async (id) => {
        await axiosApi.delete('/transactions/' + id + '.json');
    }
);
