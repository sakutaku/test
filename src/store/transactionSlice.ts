import {ITransaction} from "../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createTransaction, deleteTransaction, fetchTransactions} from "./transactionThunk";

interface TransactionState {
    items: ITransaction[],
    fetchLoading: boolean;
    total: number;
    deleteLoading: boolean | string,
    show: boolean;
    createLoading: boolean;
}

const initialState: TransactionState = {
    items: [],
    fetchLoading: false,
    total: 0,
    deleteLoading: false,
    show: false,
    createLoading: false,
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
        },
        setShowTr: (state, {payload: boolean}) => {
            state.show = boolean;
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
        builder.addCase(createTransaction.pending, (state) => {
            state.createLoading = true;
        });
        builder.addCase(createTransaction.fulfilled, (state) => {
            state.createLoading = false;
        });
        builder.addCase(createTransaction.rejected, (state) => {
            state.createLoading = false;
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
    clearCount,
    setShowTr
} = transactionSlice.actions;
