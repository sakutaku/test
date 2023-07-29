import React from 'react';
import {IOneCategory} from "../../types";
import {useAppDispatch} from "../../app/hook";
import {setShow} from "../../store/categoriesSlice";
import CategoryModal from "../CategoryModal/CategoryModal";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {NavLink} from "react-router-dom";
import BtnSpinner from "../../components/Spinner/BtnSpinner";


interface Props {
    items: IOneCategory;
    onDelete: React.MouseEventHandler;
    deleteLoading: boolean | string;
}

const CategoryItem: React.FC<Props> = ({items, onDelete, deleteLoading}) => {
    const dispatch = useAppDispatch();
    const show = useSelector((state: RootState) => state.categories.show);
    let modal: React.ReactNode = null;


    const onEdit = (id: string) => {
        dispatch(setShow(true));

        if(show) {
            modal = <CategoryModal isEdit={true} id={id}/>
        }
    };


    return (
        <div className="category-item">
            <div>{items.name}</div>
            <div className="category-item-right">
                <span>{items.type}</span>
                <NavLink
                    to={'edit/' + items.id}
                    className="btn-edit"
                >
                </NavLink>
                <button
                    className="btn-delete"
                    onClick={onDelete}
                    disabled={deleteLoading ? deleteLoading === items.id : false}
                >
                    {deleteLoading && deleteLoading === items.id && (<BtnSpinner/>)}
                </button>
            </div>
            {modal}
        </div>
    );
};

export default CategoryItem;