import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PriorityLevelObject, StatusEnumObject, TaskApi, UpdateTaskRequest } from '../../api';

type UpdateaskRequestForm = {
  [T in keyof UpdateTaskRequest]: { value?: any };
};

const EditTask = () => {
  const { subject, task } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (event: React.SyntheticEvent) => {
    if (!subject || !task) {
      return;
    }

    event.preventDefault();
    const values = event.target as unknown as UpdateaskRequestForm;
    const request: UpdateTaskRequest = {
      id: task ?? '',
      subjectId: subject ?? '',
      title: values.title.value ?? '',
      description: values.description.value ?? '',
      dueDate: values.dueDate.value ?? '',
      priorityLevel: values.priorityLevel.value ?? '',
      status: values.status.value ?? '',
    };

    TaskApi.updateTask(task, request).then(() => navigate('/tasks'));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="d-flex justify-content-center align-items-center" style={{ height: '90vh' }}>
        <div className="card bg-secondary bg-opacity-25 rounded rounded-2 p-3">
          <div className="d-sm-flex justify-content-between mb-2">
            <div className="me-sm-1 w-100">
              <label className="form-label">Title</label>
              <div>
                <input name="title" className="w-100" />
              </div>
            </div>
            <div className="ms-sm-1 w-100">
              <label className="form-label">Due Date</label>
              <div>
                <input name="dueDate" type="date" className="w-100" />
              </div>
            </div>
          </div>
          <div className="d-sm-flex justify-content-between mb-2">
            <div className="me-sm-1  w-100">
              <label className="form-label">Priority Levels</label>
              <div>
                <select name="priorityLevel" className="me-sm-1 w-100">
                  <option value={-1}>Select Priority</option>
                  {Object.entries(PriorityLevelObject).map(([name, id]) => (
                    <option value={id}>{name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="ms-sm-1 w-100">
              <label className="form-label">Status</label>
              <div>
                <select name="status" className="me-sm-1 w-100">
                  {Object.entries(StatusEnumObject).map(([name, id]) => (
                    <option value={id}>{name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="w-100 mb-3">
            <label className="form-label">Description</label>
            <div>
              <textarea name="description" className="w-100" />
            </div>
          </div>
          <button className="text-center border-0 text-white py-2 bg-secondary rounded-3">Update Task</button>
        </div>
      </div>
    </form>
  );
};

export default EditTask;
