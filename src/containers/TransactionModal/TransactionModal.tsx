import React from 'react';
import TransactionForm from "../../components/TransactionForm/TransactionForm";
import {useAppDispatch} from "../../app/hook";
import {TApiOneTransaction} from "../../types";
import {createTransaction, fetchTransactions} from "../../store/transactionThunk";
import {setShowTr} from "../../store/transactionSlice";

const TransactionModal = () => {
    const dispatch = useAppDispatch();
    const onSubmit = async (transaction: TApiOneTransaction) => {
        await dispatch(createTransaction(transaction));
        dispatch(fetchTransactions());
        dispatch(setShowTr(false));
    };

    return (
        <div className="backdrop">
            <div className="modal">
                <TransactionForm onSubmit={onSubmit} isAdd={true}/>
            </div>
        </div>
    );
};

export default TransactionModal;