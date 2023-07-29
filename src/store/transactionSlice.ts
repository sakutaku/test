import {ITransaction} from "../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {deleteTransaction, fetchTransactions} from "./transactionThunk";

interface TransactionState {
    items: ITransaction[],
    fetchLoading: boolean;
    total: number;
    deleteLoading: boolean | string,
}

const initialState: TransactionState = {
    items: [],
    fetchLoading: false,
    total: 0,
    deleteLoading: false,
};

const transactionSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        updateTransaction: (state, { payload: transactions}: PayloadAction<ITransaction[]>) => {
            const newTransactions: ITransaction[] = [];

            state.items.forEach((transaction) => {
                const existingTransaction = transactions.find((oneTr) => transaction.id === oneTr.id);

                if (!existingTransaction) {
                    return;
                }

                newTransactions.push({
                    ...transaction,
                });

                state.items = newTransactions;
            });
        },
        countSum: (state, {payload: num}: PayloadAction<number>) => {
            state.total+=num;
        },
        clearCount: (state) => {
            state.total = 0;
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchTransactions.pending, state => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchTransactions.fulfilled, (state, action) => {
            state.fetchLoading = false;
            state.items = action.payload;
        });
        builder.addCase(fetchTransactions.rejected, state => {
            state.fetchLoading = false;
        });
        builder.addCase(deleteTransaction.pending, (state, {meta}) => {
            state.deleteLoading = meta.arg;
        });
        builder.addCase(deleteTransaction.fulfilled, (state) => {
            state.deleteLoading = false;
        });
        builder.addCase(deleteTransaction.rejected, (state) => {
            state.deleteLoading = false;
        });
    }
})

export const transactionsReducer = transactionSlice.reducer;

export const {
    updateTransaction,
    countSum,
    clearCount
} = transactionSlice.actions;
