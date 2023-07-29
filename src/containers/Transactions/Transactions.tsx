import React, {useEffect} from 'react';
import {useAppDispatch} from "../../app/hook";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import Spinner from "../../components/Spinner/Spinner";
import {deleteTransaction, fetchTransactions} from "../../store/transactionThunk";
import {fetchCategories} from "../../store/categoriesThunk";
import {IAllTransactions, ICategory, ITransaction} from "../../types";
import TransactionItem from "./TransactionItem";

const Transactions = () => {
    const dispatch = useAppDispatch();
    const transactions = useSelector((state: RootState) => state.transactions.items);
    const transactionsLoading = useSelector((state: RootState) => state.transactions.fetchLoading);
    const categories = useSelector((state: RootState) => state.categories.allCategories);
    const totalSum = useSelector((state: RootState) => state.transactions.total);
    const deleteLoading = useSelector((state: RootState) => state.transactions.deleteLoading);



    const allTransactions: IAllTransactions[] = [];

    useEffect( () => {
        dispatch(fetchTransactions());
        dispatch(fetchCategories());
    }, [dispatch]);

    const removeTransaction = async (id: string) => {
        await dispatch(deleteTransaction(id));
        await dispatch(fetchTransactions());
    };

    categories.forEach((category: ICategory, index) => {
            transactions.forEach((oneTr: ITransaction) => {
                console.log(index);

                if(oneTr.category === category.id) {
                    const newObj = {
                        name: category.name,
                        date: oneTr.date,
                        price: oneTr.price,
                        id: oneTr.id,
                        category: category.type,
                    };

                    allTransactions.push(newObj);
                }

            });
        });

    allTransactions.sort((a,b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    let transactionsItems: React.ReactNode = <Spinner/>;

    if(!transactionsLoading) {
        transactionsItems = allTransactions.map((item) => (
                <TransactionItem item={item} key={item.id} deleteLoading={deleteLoading} onDelete={() => removeTransaction(item.id)}/>
        ));
    }


    return (
        <div className="container">
            <div className="transactions-page">
                <h2 className="transaction-total">Total: {totalSum} KGS</h2>
            </div>
            <div>
                {transactionsItems}
            </div>
        </div>
    );
};

export default Transactions;