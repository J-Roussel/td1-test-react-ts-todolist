export interface ITask{
    name:string;
    description:string;
}

export interface IForm {
    valueName:string;
    valueDescri:string;
    initialValue:string[];
    handleChange:(e:React.ChangeEvent<HTMLInputElement>) => void;
    addTask:(e: React.MouseEvent<HTMLInputElement ,MouseEvent>) => void;
}