import React from 'react';
import {IOneCategory} from "../../types";

interface Props {
    items: IOneCategory;
}

const CategoryItem: React.FC<Props> = ({items}) => {
    return (
        <div className="category-item">
            <div>{items.name}</div>
            <div className="category-item-right">
                <span>{items.type}</span>
                <button className="btn-edit"></button>
                <button className="btn-delete"></button>
            </div>
        </div>
    );
};

export default CategoryItem;