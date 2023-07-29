import React from 'react';
import Header from "../../components/Header/Header";
import Transactions from "../Transactions/Transactions";

const Main = () => {
    return (
        <>
           <Header/>
           <div className="container">
               <Transactions/>
           </div>
        </>
    );
};

export default Main;