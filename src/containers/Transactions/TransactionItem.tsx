import React from 'react';
import {IAllTransactions} from "../../types";
import {NavLink} from "react-router-dom";
import BtnSpinner from "../../components/Spinner/BtnSpinner";


interface Props {
    item: IAllTransactions;
    onDelete: React.MouseEventHandler;
    deleteLoading: boolean | string;
}
const TransactionItem: React.FC<Props> = ({item, deleteLoading, onDelete}) => {
    return (
        <div className="transaction-item">
            <div>
                <div>{item.date}</div>
                <div>{item.name}</div>
            </div>
            <div className="category-item-right">
                <span style={item.category === 'expense' ? {color: '#ff3800'} : {color: 'fff'}}>{item.category === 'expense' ? '-' + item.price + 'KGS' : '+' + item.price + 'KGS'}</span>
                <NavLink
                    to={'edit/' + item.id}
                    className="btn-edit-two"
                >
                </NavLink>
                <button
                    className="btn-delete-two"
                    onClick={onDelete}
                    disabled={deleteLoading ? deleteLoading === item.id : false}
                >
                    {deleteLoading && deleteLoading === item.id && (<BtnSpinner/>)}
                </button>
            </div>
        </div>
    );
};

export default TransactionItem;