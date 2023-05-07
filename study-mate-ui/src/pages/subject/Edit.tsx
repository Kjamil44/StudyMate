import { useNavigate, useParams } from 'react-router-dom';
import { StatusEnumObject, SubjectApi, UpdateSubjectRequest } from '../../api';

type UpdateSubjectRequestForm = {
  [T in keyof UpdateSubjectRequest]: { value?: any };
};

const EditSubject = () => {
  const { subject } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (event: React.SyntheticEvent) => {
    if (!subject) {
      return;
    }

    event.preventDefault();
    const values = event.target as unknown as UpdateSubjectRequestForm;
    const request: UpdateSubjectRequest = {
      id: subject ?? '',
      description: values.description.value ?? '',
      name: values.name.value ?? '',
      startDate: values.startDate.value ?? '',
      endDate: values.endDate.value ?? '',
      grade: values.grade.value ?? 2,
      status: values.grade.value ?? 0,
    };

    SubjectApi.updateSubject(subject, request).then(() => navigate('/subjects'));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="d-flex justify-content-center align-items-center" style={{ height: '90vh' }}>
        <div className="card bg-secondary bg-opacity-25 rounded rounded-2 p-3">
          <div className="d-sm-flex justify-content-between mb-2">
            <div className="me-sm-1 w-100">
              <label className="form-label">Name</label>
              <div>
                <input name="name" className="w-100" />
              </div>
            </div>
            <div className="ms-sm-1 w-100">
              <label className="form-label">Grade</label>
              <div>
                <input name="grade" type="number" className="w-100" />
              </div>
            </div>
          </div>
          <div className="d-sm-flex justify-content-between mb-2">
            <div className="me-sm-1 w-100">
              <label className="form-label">Start Date</label>
              <div>
                <input name="startDate" type="date" className="w-100" />
              </div>
            </div>
            <div className="ms-sm-1 w-100">
              <label className="form-label">End Date</label>
              <div>
                <input name="endDate" type="date" className="w-100" />
              </div>
            </div>
          </div>
          <div className="mb-2">
            <div className="w-100">
              <label className="form-label">Status</label>
              <div>
                <select name="priorityLevel" className="w-100">
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
          <button className="text-center border-0 text-white py-2 bg-secondary rounded-3">Update Subject</button>
        </div>
      </div>
    </form>
  );
};

export default EditSubject;
