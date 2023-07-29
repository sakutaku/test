import React, {useEffect} from 'react';
import {useAppDispatch} from "../../app/hook";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import Spinner from "../../components/Spinner/Spinner";
import {fetchTransactions} from "../../store/transactionThunk";
import {fetchCategories} from "../../store/categoriesThunk";
import {IAllTransactions} from "../../types";

const Transactions = () => {
    const dispatch = useAppDispatch();
    const transactions = useSelector((state: RootState) => state.transactions.items);
    const pizzasLoading = useSelector((state: RootState) => state.transactions.fetchLoading);
    const categories = useSelector((state: RootState) => state.categories.allCategories);


    const allTransactions: IAllTransactions[] = [];

    useEffect( () => {
        dispatch(fetchTransactions());
        dispatch(fetchCategories());
    }, [dispatch]);


    categories.forEach((category, index) => {
            transactions.map((oneTr) => {
                console.log(index);

            })
        });



    if(allTransactions.length > 0) {
        console.log(allTransactions);
    }

    const show = () => {
        console.log(allTransactions);
    }
    let transactionsLayout: React.ReactNode = <Spinner/>;


    return (
        <div className="transactions-page">
            <button></button>
        </div>
    );
};

export default Transactions;