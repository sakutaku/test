import React, {useState} from 'react';
import {ICategoryMutation, TApiCategory} from "../../types";

interface Props {
    onSubmit: (newPizza: TApiCategory) => void;
    isEdit?: boolean,
    existingCategory?: ICategoryMutation,
    isLoading?: boolean,
}

const initialState = {
    name: '',
    type: '',
};
const CategoryForm: React.FC<Props> = ({onSubmit, isEdit, existingCategory = initialState, isLoading}) => {
    const [newCategory, setNewCategory] = useState(existingCategory);

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
            <div className="input-wrap">
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
            <div className="input-wrap">
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
            <button className="btn btn-form" type="submit">Submit</button>
        </form>
    );
};

export default CategoryForm;