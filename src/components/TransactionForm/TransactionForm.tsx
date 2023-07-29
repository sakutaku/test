import React, {useState} from 'react';
import {ICategory, TApiTransaction} from "../../types";
import {useAppDispatch} from "../../app/hook";
import {setShowTr} from "../../store/transactionSlice";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";

interface Props {
    onSubmit: (newTransaction: TApiTransaction) => void;
    isEdit?: boolean,
    existingCategory?: TApiTransaction,
    isLoading?: boolean,
    isAdd?: boolean,
}

const initialState = {
    type: '',
    category: '',
    price: 0,
};

const TransactionForm: React.FC<Props> = ({onSubmit, isEdit,existingCategory = initialState, isLoading, isAdd}) => {
    const dispatch = useAppDispatch();
    const [newTransaction, setNewTransaction] = useState(existingCategory);
    const categ  = useSelector((state: RootState) => state.categories.allCategories);

    let all: ICategory[] = [];

    categ.filter((item) => {
        if(item.type === newTransaction.type) {
            all.push(item);
        }
    });

    if(all.length > 0) {
        console.log(all);
    }

    const transactionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>{
        const {name, value} = e.target;

        setNewTransaction(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const onCancelClick = ()=>{
        dispatch(setShowTr(false));
        all = [];
    }

    return (
        <form className="transaction-form">
            <h2>{isEdit ? 'Edit transaction' : 'Add transaction'}</h2>
            <div className="input-transaction-one">
                <label htmlFor="type" className="label">Category</label>
                <select value={newTransaction.type}
                        onChange={transactionChange}
                        name="type"
                        id="type"
                        className="input">
                    <option value="" disabled defaultValue="">Select type</option>
                    <option value="expense" >
                        Expense
                    </option>
                    <option value="income">Income</option>
                </select>
            </div>
            <div className="input-transaction-one">
                <label htmlFor="category" className="mt-2 mb-2 fw-bold">Select Category</label>
                <select value={newTransaction.category}
                        required
                        onChange={transactionChange}
                        name="category"
                        id="category"
                        className="input">
                    <option value="" disabled defaultValue="">Select category</option>
                    {all.map((item, index) => (
                        <option value={item.id} key={index}>{item.name}</option>
                    ))}
                </select>
            </div>
            <div className="input-transaction-two">
                <label htmlFor="price">Price</label>
                <input
                    type="number"
                    name="price"
                    id="price"
                    className="input"
                    value={newTransaction.price}
                    onChange={transactionChange}
                />
            </div>
            <div className="form-btns">
                <button className="btn btn-form" type="submit">Submit</button>
                {isAdd ? <button className="btn btn-cancel" onClick={onCancelClick}>Cancel</button> : null}
            </div>
        </form>
    );
};

export default TransactionForm;