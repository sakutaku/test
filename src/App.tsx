import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Main from "./containers/Main/Main";
import Categories from "./containers/Categories/Categories";
import CategoryEdit from "./containers/CategoryEdit";

const App = () => {
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
