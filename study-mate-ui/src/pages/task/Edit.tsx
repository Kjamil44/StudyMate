import React from 'react';
import Login from '../login/Login';
import Input from '../../components/input/Input';

const EditTask = () => {
  const priorityLevels = [
    {
      id: -1,
      name: 'Select Priority',
    },
    {
      id: 0,
      name: 'Low',
    },
    {
      id: 1,
      name: 'Medium',
    },
    {
      id: 2,
      name: 'High',
    },
  ];

  const taskStatuses = [
    {
      id: 0,
      name: 'To do',
    },
    {
      id: 1,
      name: 'Doing',
    },
    {
      id: 2,
      name: 'Done',
    },
  ];

  return (
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
              <input name="due_date" type="date" className="w-100" />
            </div>
          </div>
        </div>
        <div className="d-sm-flex justify-content-between mb-2">
          <div className="me-sm-1  w-100">
            <label className="form-label">Priority Levels</label>
            <div>
              <select name="priority_level" className="me-sm-1 w-100">
                {priorityLevels.map((priority) => (
                  <option value={priority.id}>{priority.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="ms-sm-1 w-100">
            <label className="form-label">Status</label>
            <div>
              <select name="priority_level" className="me-sm-1 w-100">
                {taskStatuses.map((status) => (
                  <option value={status.id}>{status.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="w-100 mb-3">
          <label className="form-label">Description</label>
          <div>
            <textarea name="due_date" className="w-100" />
          </div>
        </div>
        <button className='text-center border-0 text-white py-2 bg-secondary rounded-3'>
          Update Task
        </button>
      </div>
    </div>
  );
};

export default EditTask;
