import { useState, useCallback, useEffect } from 'react';
import { GetAllSubjectsItemResponse, GetUserReponse, SubjectApi, UserApi } from '../../api';

const UserIndexPage: React.FC = () => {
  const [user, setUser] = useState<GetUserReponse>();
  const [subjects, setSubjects] = useState<GetAllSubjectsItemResponse[]>([]);
  const [grade, setGrade] = useState<number>(0);

  useEffect(() => {
    const getUserData = () => {
      UserApi.getUser(localStorage.getItem('userId') ?? '')
        .then((response: any) => response.data)
        .then((data: any) => data)
        .then(setUser);
    };

    getUserData();
  }, []);

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

  useEffect(() => {
    let grades = subjects.filter((x) => x.userId == user?.userId);
    let gradeFinal = 0.0;
    for (let i = 0; i < grades.length; i++) {
      gradeFinal += grades[i].grade;
    }
    gradeFinal /= grades.length;
    setGrade(gradeFinal);
  });

  return (
    <>
      <div className="subjects-header__container">
        <h1 className="subjects-header__text">Profile</h1>
      </div>
      {user && grade !== 0 && (
        <div className="notes-sort">
          <div
            style={{
              width: '30%',
              display: 'flex',
              justifyContent: 'flex-end',
              flexDirection: 'column',
              marginTop: '10px',
              marginBottom: '10px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '500px' }}>
              <div>
                <label htmlFor="name" style={{ color: '#678983', fontSize: '2.0rem', fontWeight: 'bold' }}>
                  Name
                </label>
                <p style={{ color: '', fontSize: '1.7rem' }}>{user?.name}</p>
              </div>
              <div>
                <label htmlFor="name" style={{ color: '#678983', fontSize: '2.0rem', fontWeight: 'bold' }}>
                  Surname
                </label>
                <p style={{ color: '', fontSize: '1.7rem' }}>{user?.surname}</p>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '500px' }}>
            <div>
              <label htmlFor="name" style={{ color: '#678983', fontSize: '2.0rem', fontWeight: 'bold' }}>
                Email
              </label>
              <p style={{ color: '', fontSize: '1.7rem' }}>{user?.email}</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '800px' }}>
            <div>
              <label htmlFor="name" style={{ color: '#678983', fontSize: '2.0rem', fontWeight: 'bold' }}>
                Subject Summary
              </label>
              <div style={{ marginTop: '20px' }}>
                {subjects
                  .filter((x) => x.userId == user?.userId)
                  .map((x) => (
                    <div
                      style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '300px' }}
                    >
                      <p style={{ color: '#678983', fontSize: '1.5rem', fontWeight: 'bold' }}>{x.name}</p>
                      <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{x.grade}</p>
                    </div>
                  ))}
              </div>
            </div>
            <div>
              <label htmlFor="name" style={{ color: '#678983', fontSize: '2.0rem', fontWeight: 'bold' }}>
                Grade
              </label>
              <p style={{ color: '', fontSize: '1.7rem', fontWeight: 'bold' }}>{Number.isNaN(grade) ? "" : grade}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserIndexPage;
