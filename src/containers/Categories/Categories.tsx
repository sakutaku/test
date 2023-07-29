import React, {useCallback, useEffect} from 'react';
import {useAppDispatch} from "../../app/hook";
import {deleteCategory, fetchCategories} from "../../store/categoriesThunk";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import CategoryItem from "./CategoryItem";
import Header from "../../components/Header/Header";
import {setShow, updateOneCategory} from "../../store/categoriesSlice";
import CategoryModal from "../CategoryModal/CategoryModal";
import {clearCount} from "../../store/transactionSlice";

const Categories = () => {
    const dispatch = useAppDispatch();
    const categories = useSelector((state: RootState) => state.categories.allCategories);
    const show = useSelector((state: RootState) => state.categories.show);
    const category = useSelector((state: RootState) => state.categories.oneCategory);
    const deleteLoading = useSelector((state: RootState) => state.categories.deleteLoading);



    const checkOneCategory = useCallback(async () => {
        await dispatch(updateOneCategory());
    }, [dispatch]);

    useEffect( () => {
        dispatch(fetchCategories());

        if(category !== null) {
            void checkOneCategory();
        }

    }, [dispatch, category, checkOneCategory]);

    const onAddClick = () => {
        dispatch(setShow(true));
    };

    const removeCategory = async (id: string) => {
        await dispatch(deleteCategory(id));
        await dispatch(fetchCategories());
    };

    let modal: React.ReactNode = null;

    if(show) {
        modal = <CategoryModal/>;
    }
    return (
        <>
            <Header/>
            <div className="container">
                <div className="categories-page">
                    <div className="categories-title-wrap">
                        <h1 className="category-title">Categories</h1>
                        <button className="btn" onClick={onAddClick}>Add</button>
                    </div>
                    <div>
                        {categories.map((oneCat) => (
                            <CategoryItem items={oneCat} onDelete={() => removeCategory(oneCat.id)} key={oneCat.id} deleteLoading={deleteLoading}/>
                        ))}
                    </div>
                </div>
            </div>
            {modal}
        </>


    );
};

export default Categories;