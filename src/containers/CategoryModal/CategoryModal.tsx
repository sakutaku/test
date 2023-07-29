import React, {useEffect} from 'react';
import CategoryForm from "../../components/CategoryForm/CategoryForm";
import {useAppDispatch} from "../../app/hook";
import {fetchCategory, fetchUpdateCategory} from "../../store/categoriesThunk";
import {TApiCategory} from "../../types";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import Spinner from "../../components/Spinner/Spinner";
import {setShow} from "../../store/categoriesSlice";

interface Props {
    isEdit?: boolean;
    id?: string;
}
const CategoryModal: React.FC<Props> = ({isEdit, id}) => {
    const dispatch = useAppDispatch();
    // const fetchLoading = useSelector((state: RootState) => state.categories.fetchOneLoading);
    // const updateLoading = useSelector((state: RootState) => state.categories.updateLoading);
    // const category = useSelector((state: RootState) => state.categories.oneCategory);
    //
    // useEffect(() => {
    //     if(id) {
    //         dispatch(fetchCategory(id));
    //     }
    //
    // }, [dispatch, id]);
    //
    // const onSubmit = async (category: TApiCategory) => {
    //     if(id) {
    //         await dispatch(fetchUpdateCategory({id, category}));
    //     }
    // };

    return (
        <div className="backdrop">
            <div className="modal">
                <button onClick={() => dispatch(setShow(false))}>close</button>
            </div>
        </div>
    );
};

export default CategoryModal;