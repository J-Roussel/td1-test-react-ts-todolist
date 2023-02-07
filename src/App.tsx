import React, {useState} from 'react';
import './App.css';
import Form from './components/form/Form';
import Card from './components/card/card';
import { ITask } from "./utils/interfaces";


function App() {


  //Default values of the the inputs of the form
  let initialValue: string[] = ["Name of the task...", "Description of the task..."];
  const [valueName, setValueName] = useState<string>("");
  const [valueDescri, setValueDescri] = useState<string>("");

  //useState for the ToDoList
  const [toDoList, setToDo] = useState<ITask[]>([]);

  const [statut, setStatut] = useState<boolean>(false);

  // mark as done
  const asDoneBtn = ():void => {
    setStatut(!statut);
  }

  //onChange function
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>):void => {
    (e.target.name==='inputName')? setValueName(e.currentTarget.value) : setValueDescri(e.currentTarget.value);
  };  

  //function that allows to add the task given by user in the ToDo card
  const addTask = ():void => {
    const newTask = {name:valueName, description:valueDescri};
    setToDo([...toDoList, newTask]);
    setStatut(false);
    setValueName("");
    setValueDescri("");
  }

  //function that allows to remove the task from its card
  const removeTask = (taskNameToDelete:string):void => {
    setToDo(toDoList.filter((task:ITask) => {
      return (task.name !== taskNameToDelete);
    }));
  }

  return (
    <React.Fragment>
      <div className='container'>
        <h1>ToDo List React Typescript</h1>
        <Form valueName={valueName} 
              valueDescri={valueDescri} 
              initialValue={initialValue}
              handleChange={handleChange}
              addTask={addTask}
        />

        <div className='card'>
          <div className="left-card">
            <Card titre="ToDo" id="left-card-title">
              <>
                {toDoList.map((task:ITask) => {
                  if((task.name !== "" || task.description !== "") && statut === false){
                    return (
                      <div className="task">
                        <div className="task-data" >
                          <h4>{task.name}</h4>
                          <p className="taskDescription">{task.description}</p>
                        </div>
                        <div className="action-btn">
                              <input className="completed-btn" type="button" value="completed" onClick={asDoneBtn}/>
                              <input className="remove-btn"  type="button" value="remove"onClick={()=>{removeTask(task.name)}}/>
                        </div>
                      </div>                
                    );
                  }
                  return "";
                })}
              </>
            </Card>
          </div>

          <div className=''>
            <Card titre='Done' id='right-card-title'>
              <>
                {toDoList.map((task:ITask) => {
                      if(statut === true){
                        return (
                          <div className="task">
                            <div className="task-data" >
                              <h4>{task.name}</h4>
                              <p className="taskDescription">{task.description}</p>
                            </div>
                            <div className="action-btn">
                                  <input className="remove-btn"  type="button" value="remove"onClick={()=>{removeTask(task.name)}}/>
                            </div>
                          </div>                
                        );
                      }
                    })}
                
                </>
              </Card>
          </div>

        </div>

      </div>
    </React.Fragment>
  );
}

export default App;
