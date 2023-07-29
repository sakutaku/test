import React, {useState} from 'react';
import {ICategoryMutation, TApiCategory} from "../../types";
import {useAppDispatch} from "../../app/hook";
import {setShow} from "../../store/categoriesSlice";

interface Props {
    onSubmit: (newPizza: TApiCategory) => void;
    isEdit?: boolean,
    existingCategory?: ICategoryMutation,
    isLoading?: boolean,
    isAdd?: boolean,
}

const initialState = {
    name: '',
    type: '',
};
const CategoryForm: React.FC<Props> = ({onSubmit, isEdit, existingCategory = initialState, isLoading, isAdd}) => {
    const [newCategory, setNewCategory] = useState(existingCategory);
    const dispatch = useAppDispatch();
    const categoryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>{
        const {name, value} = e.target;

        setNewCategory(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const onFormSubmit =  (e: React.FormEvent) => {
        e.preventDefault();

        if(newCategory.name !== '' && newCategory.type !== '') {
            onSubmit({
                ...newCategory,
            });
        } else {
            alert('Fill the form!');
        }
    };

    return (
        <form className="category-form" onSubmit={onFormSubmit}>
            <div className="input-wrap-one">
                <label htmlFor="type" className="label">Category</label>
                <select value={newCategory.type}
                        required
                        onChange={categoryChange}
                        name="type"
                        id="type"
                        className="input">
                    <option value="" disabled defaultValue="">Select category</option>
                    <option value="expense" >
                        Expense
                    </option>
                    <option value="income">Income</option>
                </select>
            </div>
            <div className="input-wrap-two">
                <label htmlFor="name">Title</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    className="input"
                    value={newCategory.name}
                    onChange={categoryChange}
                />
            </div>
            <div className="form-btns">
                <button className="btn btn-form" type="submit">Submit</button>
                {isAdd ? <button className="btn btn-cancel" onClick={() => dispatch(setShow(false))}>Cancel</button> : null}
            </div>

        </form>
    );
};

export default CategoryForm;