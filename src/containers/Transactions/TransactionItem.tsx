import React, {useEffect} from 'react';
import {IAllTransactions} from "../../types";
import {NavLink} from "react-router-dom";
import {useAppDispatch} from "../../app/hook";
import {countSum} from "../../store/transactionSlice";


interface Props {
    item: IAllTransactions;
}
const TransactionItem: React.FC<Props> = ({item}) => {
    const dispatch = useAppDispatch();


    useEffect( () => {
        if(item.category === 'expense') {
            dispatch(countSum(Number(-item.price)));
        } else {
            dispatch(countSum(Number(item.price)));
        }
    }, [dispatch, item.category, item.price]);

    return (
        <div className="transaction-item">
            <div>
                <div>{item.date}</div>
                <div>{item.name}</div>
            </div>
            <div className="category-item-right">
                <span>{item.category === 'expense' ? '-' + item.price + 'KGS' : '+' + item.price + 'KGS'}</span>
                <NavLink
                    to={'edit/' + item.id}
                    className="btn-edit-two"
                >
                </NavLink>
                <button
                    className="btn-delete-two"
                >
                </button>
            </div>
        </div>
    );
};

export default TransactionItem;