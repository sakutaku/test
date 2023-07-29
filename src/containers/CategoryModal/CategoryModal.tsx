import React, {useEffect} from 'react';
import CategoryForm from "../../components/CategoryForm/CategoryForm";
import {useAppDispatch} from "../../app/hook";
import {fetchCategory, fetchUpdateCategory} from "../../store/categoriesThunk";
import {TApiCategory} from "../../types";

interface Props {
    isEdit?: boolean;
    id?: string;
}
const CategoryModal: React.FC<Props> = ({isEdit, id}) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(id) {
            dispatch(fetchCategory(id));
        }

    }, [dispatch, id]);

    const onSubmit = async (category: TApiCategory) => {
        if(id) {
            await dispatch(fetchUpdateCategory({id, category}));
        }
    };

    return (
        <div className="backdrop">
            <div className="modal">
                {isEdit ? <CategoryForm isEdit={true} onSubmit={onSubmit}/> : null}
            </div>
        </div>
    );
};

export default CategoryModal;