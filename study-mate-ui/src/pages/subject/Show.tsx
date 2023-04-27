import React from 'react';

interface Subject {
  subjectId: number;
  name: string;
  description: string;
  grade: number;
  start_date: Date;
  end_date: Date;
  status: string;
}

interface Props {
  subject: Subject;
}

const ShowSubject: React.FC<Props> = (props) => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '90vh' }}>
      <div className="card bg-secondary bg-opacity-25 rounded rounded-2 p-3">
      <div className="d-sm-flex justify-content-between mb-2">
          <div className="w-100">
            <label className="form-label fw-bold">Name</label>
            <div>
            <div>{props.subject.name}</div>
            </div>
          </div>
          <div className="w-100">
            <label className="form-label fw-bold">Grade</label>
            <div>
            <div>{props.subject.grade}</div>
            </div>
          </div>
        </div>
        <div className="d-sm-flex justify-content-between mb-2">
        <div className="w-100">
            <label className="form-label fw-bold">Start Date</label>
            <div>{props.subject.start_date.toDateString()}</div>
          </div>
          <div className="w-100">
            <label className="form-label fw-bold">End Date</label>
            <div>{props.subject.end_date.toDateString()}</div>
          </div>
        </div>
        <div className="mb-2">
          <div className="w-100">
            <label className="form-label fw-bold">Status</label>
            <div>
              {props.subject.status}
            </div>
          </div>
        </div>
        <div className="w-100 mb-3">
          <label className="form-label fw-bold">Description</label>
          <div>
            {props.subject.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowSubject;
