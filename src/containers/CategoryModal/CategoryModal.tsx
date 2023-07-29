import React, {useEffect} from 'react';
import CategoryForm from "../../components/CategoryForm/CategoryForm";
import {useAppDispatch} from "../../app/hook";
import {createCategory, fetchCategories, fetchCategory, fetchUpdateCategory} from "../../store/categoriesThunk";
import {TApiCategory} from "../../types";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import Spinner from "../../components/Spinner/Spinner";
import {setShow} from "../../store/categoriesSlice";
import {useNavigate} from "react-router-dom";

interface Props {
    isEdit?: boolean;
    id?: string;
}
const CategoryModal: React.FC<Props> = ({isEdit, id}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const onSubmit = async (category: TApiCategory) => {
        await dispatch(createCategory(category));
        dispatch(fetchCategories());
        dispatch(setShow(false));
    }

    return (
        <div className="backdrop">
            <div className="modal">
                {/*<button onClick={() => dispatch(setShow(false))}>close</button>*/}
                <CategoryForm onSubmit={onSubmit} isAdd={true}/>
            </div>
        </div>
    );
};

export default CategoryModal;