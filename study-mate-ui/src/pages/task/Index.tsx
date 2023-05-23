import { useCallback, useEffect, useState } from 'react';
import { GetAllTasksItemResponse, StatusEnumObject, TaskApi } from '../../api';
import { Link } from 'react-router-dom';
import AddNew from '../../components/AddNew';
import "./TasksPage.css";
import "../../components/UI/Buttons.css"

const SubjectTasks = () => {
  const [taskList, setTasks] = useState<GetAllTasksItemResponse[]>();

  const getAllTasks = useCallback(
    () =>
      TaskApi.getAllTasks()
        .then((response) => response.data.items)
        .then(setTasks),
    []
  );

  const deleteTask = useCallback(
    (id: string) =>
      TaskApi.deleteTask(id)
        .then(getAllTasks)
        .catch(() => setTasks([])),
    [getAllTasks]
  );

  useEffect(() => {
    getAllTasks();
  }, [getAllTasks]);

  return (
    <>
   
   <div className='tasks-header__container'>
        <h1 className='tasks-header__text'>TASKS</h1>
        <AddNew title="Add task" style={{width: '100px', height: '100px', margin: "0px", padding: "0px", border: "none"}}/>
    </div>
      
    <div className='task-list'>
      {taskList?.map((task) => (
        <div className="task-item">
          <div className="task-item__status-container">
            <div className="task-item__status" style={task.status === 0 ? {backgroundColor: '#d43535', color: 'white'} : task.status === 1 ? {backgroundColor: '#e9e94d', color: 'black'} : {backgroundColor: '#30bc5c', color: 'black'}}>{Object.keys(StatusEnumObject)[task.status]}</div>
          </div>
          <div className='task-item__content'>
            <div className="task-item__title">{task.title}</div>
            <div className="task-item__description">{task.description}</div>
          </div>

          <div className="task-item__buttons h-100">
            <Link to={`${task.id}/edit`} className="button__edit">
              Edit
            </Link>
            <button onClick={() => deleteTask(task.id)} className="button__delete">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default SubjectTasks;
