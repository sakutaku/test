import React from 'react';
import {IOneCategory} from "../../types";
import {NavLink} from "react-router-dom";
import BtnSpinner from "../../components/Spinner/BtnSpinner";


interface Props {
    items: IOneCategory;
    onDelete: React.MouseEventHandler;
    deleteLoading: boolean | string;
}

const CategoryItem: React.FC<Props> = ({items, onDelete, deleteLoading}) => {

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
        </div>
    );
};

export default CategoryItem;