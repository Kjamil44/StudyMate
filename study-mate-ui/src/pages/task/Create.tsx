import { useNavigate, useParams } from 'react-router-dom';
import { CreateTaskRequest, PriorityLevelObject, StatusEnumObject, TaskApi } from '../../api';

type CreateTaskRequestForm = {
  [T in keyof CreateTaskRequest]: { value?: any };
};

const CreateTask = () => {
  const { subject } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const values = event.target as unknown as CreateTaskRequestForm;
    const request: CreateTaskRequest = {
      description: values.description.value ?? '',
      subjectId: subject ?? '',
      dueDate: values.dueDate.value ?? '',
      title: values.title.value ?? '',
      priorityLevel: values.priorityLevel.value ?? '',
      status: 0 ?? '',
    };

    TaskApi.createTask(request).then(() => navigate(`/subjects/${subject}/tasks`));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="d-flex justify-content-center align-items-center" style={{ height: '90vh' }}>
        <div className="card bg-secondary bg-opacity-25 rounded rounded-2 p-3">
          <div className="d-sm-flex justify-content-between mb-2">
            <div className="me-sm-1 w-100">
              <label className="form-label">Title</label>
              <div>
                <input name="title" className="form-control w-100" />
              </div>
            </div>
            <div className="ms-sm-1 w-100">
              <label className="form-label">Due Date</label>
              <div>
                <input name="dueDate" type="date" className="form-control w-100" />
              </div>
            </div>
          </div>
          <div className="d-sm-flex justify-content-between mb-2">
            <div className="me-sm-1  w-100">
              <label className="form-label">Priority Levels</label>
              <div>
                <select name="priorityLevel" className="form-select me-sm-1 w-100">
                  <option value={-1}>Select Priority</option>
                  {Object.entries(PriorityLevelObject).map(([name, id]) => (
                    <option value={id}>{name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="w-100 mb-3">
            <label className="form-label">Description</label>
            <div>
              <textarea name="description" className="form-control w-100" />
            </div>
          </div>
          <button className="text-center border-0 text-white py-2 bg-secondary rounded-3">Add Task</button>
        </div>
      </div>
    </form>
  );
};

export default CreateTask;
