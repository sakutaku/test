import React from 'react';
import {IOneCategory} from "../../types";
import {useAppDispatch} from "../../app/hook";
import {setShow} from "../../store/categoriesSlice";
import CategoryModal from "../CategoryModal/CategoryModal";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {NavLink} from "react-router-dom";


interface Props {
    items: IOneCategory;
}

const CategoryItem: React.FC<Props> = ({items}) => {
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
                <button className="btn-delete"></button>
            </div>
            {modal}
        </div>
    );
};

export default CategoryItem;