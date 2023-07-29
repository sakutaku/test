import React from 'react';
import CategoryForm from "../../components/CategoryForm/CategoryForm";
import {useAppDispatch} from "../../app/hook";
import {createCategory, fetchCategories} from "../../store/categoriesThunk";
import {TApiCategory} from "../../types";
import {setShow} from "../../store/categoriesSlice";

const CategoryModal: React.FC = () => {
    const dispatch = useAppDispatch();
    const onSubmit = async (category: TApiCategory) => {
        await dispatch(createCategory(category));
        dispatch(fetchCategories());
        dispatch(setShow(false));
    };

    return (
        <div className="backdrop">
            <div className="modal">
                <CategoryForm onSubmit={onSubmit} isAdd={true}/>
            </div>
        </div>
    );
};

export default CategoryModal;