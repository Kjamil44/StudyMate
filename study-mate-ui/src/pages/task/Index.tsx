import React from 'react';

const SubjectTasks = () => {
  const taskList = [
    {
      title: 'Create React App',
      status: 'Complete',
    },
    {
      title: 'Design homepage layout',
      status: 'In progress',
    },
    {
      title: 'Build navigation bar component',
      status: 'Not started',
    },
    {
      title: 'Implement API integration for user authentication',
      status: 'Not started',
    },
    {
      title: 'Create user dashboard page',
      status: 'Not started',
    },
    {
      title: 'Test and debug components',
      status: 'Not started',
    },
    {
      title: 'Deploy to production server',
      status: 'Not started',
    },
  ];

  return (
    <div>
      {taskList.map((task) => (
        <div className='d-flex align-items-center justify-content-between py-2 px-3 mx-3 rounded-3 bg-secondary mb-3'>
          <div>
            {task.title}
          </div>
          <div className='d-flex align-items-center'>
            <div className='me-3 px-2 rounded-3 bg-warning'>{task.status}</div>
            <button className='border-0 bg-secondary me-2'>Edit</button>
            <button className='border-0 bg-secondary'>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubjectTasks;
