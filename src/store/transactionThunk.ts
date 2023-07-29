import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    IApiTransaction,
    ITransaction,
    TApiOneTransaction,
    TApiTransaction
} from "../types";
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
export const fetchTransaction = createAsyncThunk<TApiTransaction, string>(
    'transactions/fetchOne',
    async (id) => {

        const response = await axiosApi.get<TApiTransaction | null>('/transactions/' + id + '.json');
        const transaction = response.data;

        if (transaction === null) {
            throw new Error('Not found');
        }

        return transaction;
    }
);

interface UpdateTransactionParams {
    id: string;
    transaction: TApiOneTransaction;
}
export const fetchUpdateTransaction = createAsyncThunk<void, UpdateTransactionParams>(
    'transactions/updateTransaction',
    async (params) => {
        await axiosApi.put(`/transactions/${params.id}.json`, params.transaction);
    }
);
export const deleteTransaction = createAsyncThunk<void, string>(
    'transactions/delete',
    async (id) => {
        await axiosApi.delete('/transactions/' + id + '.json');
    }
);

export const createTransaction = createAsyncThunk<void, TApiOneTransaction>(
    'transactions/create',
    async (transaction) => {
        await axiosApi.post('/transactions.json', transaction);
    }
);
