import { useEffect, useState } from 'react';
import { GetAllTasksItemResponse, TaskApi } from '../../api';

const SubjectTasks = () => {
  const [taskList, setTasks] = useState<GetAllTasksItemResponse[]>();

  useEffect(() => {
    TaskApi.getAllTasks()
      .then((response) => response.data.items)
      .then(setTasks);
  }, []);

  return (
    <div>
      {taskList?.map((task) => (
        <div className="d-flex align-items-center justify-content-between py-2 px-3 mx-3 rounded-3 bg-secondary mb-3">
          <div>{task.title}</div>
          <div className="d-flex align-items-center">
            <div className="me-3 px-2 rounded-3 bg-warning">{task.status}</div>
            <button className="border-0 bg-secondary me-2">Edit</button>
            <button className="border-0 bg-secondary">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubjectTasks;
