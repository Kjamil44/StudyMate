import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GetAllSubjectsItemResponse, SubjectApi } from '../../api';
import SubjectComponent from '../../components/subject/SubjectComponent';

const SubjectIndexPage: React.FC = () => {
  const [subjects, setSubjects] = useState<GetAllSubjectsItemResponse[]>([]);

  useEffect(() => {
    SubjectApi.getAllSubjects()
      .then((response) => response.data)
      .then((data) => data.items)
      .then(setSubjects);
  }, []);

  const borderDashed = {
    border: '0.5px dashed #4e4e4e',
  };
  return (
    <div className="container vh-100">
      <div className="row">
        {subjects?.map((subject, i) => (
          <SubjectComponent key={i} subject={subject} />
        ))}
        <div className="col-12 col-md-4 col-lg-4 p-3 cursor-pointer">
          <Link
            className="text-decoration-none d-flex flex-column justify-content-center align-items-center rounded rounded-3 h-100 w-100 p-5"
            style={borderDashed}
            to={'create'}
          >
            <div className="mb-1 bg-success text-dark rounded rounded-circle px-2 d-flex align-items-center justify-content-center">
              +
            </div>
            <div className="fs-14px fw-bold text-dark">Add subject</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SubjectIndexPage;
