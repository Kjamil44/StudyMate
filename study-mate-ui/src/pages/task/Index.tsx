import { useCallback, useEffect, useState } from 'react';
import { GetAllTasksItemResponse, TaskApi } from '../../api';
import { Link } from 'react-router-dom';
import AddNew from '../../components/AddNew';

const SubjectTasks = () => {
  const [taskList, setTasks] = useState<GetAllTasksItemResponse[]>();

  const getAllTasks = useCallback(
    () =>
      TaskApi.getAllTasks()
        .then((response) => response.data.items)
        .then(setTasks),
    []
  );

  const deleteTask = useCallback((id: string) => TaskApi.deleteTask(id).then(getAllTasks), [getAllTasks]);

  useEffect(() => {
    getAllTasks();
  }, [getAllTasks]);

  return (
    <div>
      {taskList?.map((task) => (
        <div className="d-flex align-items-center justify-content-between py-2 px-3 mx-3 rounded-3 bg-secondary mb-3">
          <div>{task.title}</div>
          <div className="d-flex align-items-center">
            <div className="me-3 px-2 rounded-3 bg-warning">{task.status}</div>
            <Link to={`${task.id}/edit`} className="border-0 bg-secondary me-2">
              Edit
            </Link>
            <button onClick={() => deleteTask(task.id)} className="border-0 bg-secondary">
              Delete
            </button>
          </div>
        </div>
      ))}
      <AddNew title="Add task" />
    </div>
  );
};

export default SubjectTasks;
