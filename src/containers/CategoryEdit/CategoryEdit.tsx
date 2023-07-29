import React, {useEffect} from 'react';
import Header from "../../components/Header/Header";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch} from "../../app/hook";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {fetchCategory, fetchUpdateCategory} from "../../store/categoriesThunk";
import {TApiCategory} from "../../types";
import Spinner from "../../components/Spinner/Spinner";
import CategoryForm from "../../components/CategoryForm/CategoryForm";

const CategoryEdit = () => {
    const { id } = useParams() as {id: string};
    const dispatch = useAppDispatch();
    const fetchLoading = useSelector((state: RootState) => state.categories.fetchOneLoading);
    const updateLoading = useSelector((state: RootState) => state.categories.updateLoading);
    const category = useSelector((state: RootState) => state.categories.oneCategory);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchCategory(id));
    }, [dispatch, id]);

    const onSubmit = async (category: TApiCategory) => {
        await dispatch(fetchUpdateCategory({id, category}));
        navigate("/categories");
    };

    return (

        <>
         <Header/>
         <div className="container">
             <div className="edit-category-page">
                 <h1>Edit Category!</h1>
                 {fetchLoading && <Spinner/>}
                 {category &&
                     <CategoryForm onSubmit={onSubmit} isEdit={true} existingCategory={category} isLoading={updateLoading}/>
                 }
             </div>

         </div>
        </>
    );
};

export default CategoryEdit;