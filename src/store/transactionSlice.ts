import {ITransaction} from "../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchTransactions} from "./transactionThunk";

interface TransactionState {
    items: ITransaction[],
    fetchLoading: boolean;
}

const initialState: TransactionState = {
    items: [],
    fetchLoading: false
};

const transactionSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        updatePizza: (state, { payload: transactions}: PayloadAction<ITransaction[]>) => {
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
    }
})

export const transactionsReducer = transactionSlice.reducer;

export const {
    updatePizza
} = transactionSlice.actions;
