import React, {FC} from "react";
import './form.css';
import { IForm } from "../../utils/interfaces";


const Form:FC<IForm> = ({valueName, valueDescri, initialValue, handleChange, addTask}):JSX.Element => {

    
    return (
        <div className='form-container'>
            <div className="form">
                <div className="info">
                    <div className="name" >
                        <label className="label-name" htmlFor="name">&nbsp; &nbsp; &nbsp;Name</label>
                        <input className="input-name" type="text" value={valueName}  onChange={handleChange} name='inputName' placeholder={initialValue[0]}/>
                    </div>
                    <div className="description">
                        <label className="label-description" htmlFor="description">&nbsp; &nbsp; &nbsp;Description</label>
                        <input className="input-description" type="textarea" value={valueDescri} onChange={handleChange} name='inputDescri' placeholder={initialValue[1]}/>
                    </div>
                </div>
                <input type="button" className="valider" value="ADD ToDo" onClick={addTask}/>
            </div>        
        </div>
    );
}


export default Form;