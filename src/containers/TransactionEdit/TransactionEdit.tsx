import React, {useEffect} from 'react';
import Header from "../../components/Header/Header";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch} from "../../app/hook";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {TApiOneTransaction} from "../../types";
import {fetchTransaction, fetchUpdateTransaction} from "../../store/transactionThunk";
import Spinner from "../../components/Spinner/Spinner";
import TransactionForm from "../../components/TransactionForm/TransactionForm";

const TransactionEdit = () => {
    const { id } = useParams() as {id: string};
    const dispatch = useAppDispatch();
    const fetchLoading = useSelector((state: RootState) => state.transactions.fetchOneLoading);
    const updateLoading = useSelector((state: RootState) => state.transactions.updateLoading);
    const transaction = useSelector((state: RootState) => state.transactions.oneTransaction);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchTransaction(id));
    }, [dispatch, id]);

    const onSubmit = async (transaction: TApiOneTransaction) => {
        await dispatch(fetchUpdateTransaction({id, transaction}));
        navigate("/");
    };

    return (
        <>
         <Header/>
         <div className="container">
             <div className="edit-transaction-page">
                 <h1>Edit Transaction!</h1>
                 {fetchLoading && <Spinner/>}
                 {transaction &&
                     <TransactionForm
                         onSubmit={onSubmit}
                         isEdit={true}
                         existingTransaction={transaction}
                         isLoading={updateLoading}
                     />
                 }
             </div>

         </div>
        </>
    );
};

export default TransactionEdit;