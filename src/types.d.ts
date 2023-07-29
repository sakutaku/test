export interface ITransaction {
    id: string;
    category: string;
    date: string;
    price: number;
}

export interface IApiTransaction {
    [id: string]: ITransaction;
}

export interface ICategory{
    name: string,
    type: string,
    id: string,
}

export type TApiCategory = Omit<ICategory, 'id'>;

export interface IApiCategory {
    [id: string]: ICategory;
}
export interface ICategoryMutation{
    name: string,
    type: string,
}

export interface IAllTransactions {
    date: string,
    name: string,
    price: number,
}

export interface IOneCategory {
    name: string,
    type: string,
    id: string,
}