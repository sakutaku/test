import React from 'react';
import TransactionForm from "../../components/TransactionForm/TransactionForm";

const TransactionModal = () => {
    return (
        <div className="backdrop">
            <div className="modal">
                <TransactionForm onSubmit={() => console.log} isAdd={true}/>
            </div>
        </div>
    );
};

export default TransactionModal;