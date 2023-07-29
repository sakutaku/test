import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Main from "./containers/Main/Main";
import Categories from "./containers/Categories/Categories";
import CategoryEdit from "./containers/CategoryEdit";

const App = () => {
    const date = new Date();
    const curr_date = date.getDate();
    const curr_m = date.getMonth() + 1;
    const curr_y = date.getFullYear();
    let dateMain: string = '';

    if(curr_m < 10) {
        dateMain = curr_y+"-"+"0"+curr_m+"-"+ curr_date;
    } else {
        dateMain = curr_y+"-"+curr_m+"-"+ curr_date;
    }

    console.log(dateMain);
  return (
    <Routes>
        <Route path="/" element={(
            <Main/>
        )}/>
        <Route path="/categories" element={(
            <Categories/>
        )}/>
        <Route path="/categories/edit/:id" element={(
            <CategoryEdit/>
        )}/>
    </Routes>
  );
};

export default App;
