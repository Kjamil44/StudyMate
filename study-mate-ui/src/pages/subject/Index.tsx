import React, { useCallback, useEffect, useState } from 'react';
import { GetAllSubjectsItemResponse, SubjectApi } from '../../api';
import SubjectComponent from '../../components/subject/SubjectComponent';
import AddNew from '../../components/AddNew';
import "./SubjectPage.css"

const SubjectIndexPage: React.FC = () => {
  const [subjects, setSubjects] = useState<GetAllSubjectsItemResponse[]>([]);

  const getAllSubjects = useCallback(
    () =>
      SubjectApi.getAllSubjects()
        .then((response) => response.data)
        .then((data) => data.items)
        .then(setSubjects),
    []
  );

  useEffect(() => {
   getAllSubjects();
  }, [getAllSubjects]);
  

  return (
    <>
    <div className='subjects-header__container'>
      <h1 className='subjects-header__text'>SUBJECTS</h1>
    </div>
    <div className="container">
      <div className="row">
        {subjects?.map((subject, i) => (
          <SubjectComponent key={i} onDelete={getAllSubjects} subject={subject} />
        ))}
        <AddNew title='Add subject'/>
      </div>
    </div>
    </>
  );
};

export default SubjectIndexPage;
