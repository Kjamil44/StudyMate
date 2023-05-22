import React, { useCallback, useEffect, useState } from 'react';
import { GetAllNotesItemResponse, GetAllSubjectsItemResponse, NoteApi, SubjectApi } from '../../api';
import AddNew from '../../components/AddNew';
import Note from './Note';
import "./NotePage.css";

const NotesIndexPage: React.FC = () => {
  const [notes, setNotes] = useState<GetAllNotesItemResponse[]>();
  const [subjects, setSubjects] = useState<GetAllSubjectsItemResponse[]>();
  const [selectedSubject, setSelectedSubject] = useState<GetAllSubjectsItemResponse>();

  const getAllNotes = useCallback(
    () =>
      NoteApi.getAllNotes()
        .then((response) => response.data.items)
        .then(setNotes)
        .catch(() => setNotes([])),
    []
  );

  useEffect(() => {
    getAllNotes();

    SubjectApi.getAllSubjects()
      .then((response) => response.data.items)
      .then(setSubjects);
  }, [getAllNotes]);

  const handleSelectedSubjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const subject = subjects?.find((subject) => subject.id === event.target.value);
    setSelectedSubject(subject);
  };

  const filteredNotes = notes?.filter((note) => !selectedSubject || note.belongsId === selectedSubject?.id);

  return (
    <>
    <div className='notes-header__container'>
      <h1 className='notes-header__text'>NOTES</h1>
    </div>
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
          <label htmlFor="subjects" style={{color: '#678983', fontSize: '1.2rem', fontWeight: 'bold' }}>
            Subjects
          </label>
          <select
          className='form-select mt-1'
            name="subjects"
            id="subjects"
            style={{ height: '40px', fontSize: '1.2rem', borderRadius: '10px', cursor: 'pointer' }}
            onChange={handleSelectedSubjectChange}
            value={selectedSubject?.id}
          >
            <option value="All">All</option>
            {subjects?.map((subject) => (
              <option value={subject.id}>{subject.name}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="notes-list">
        {filteredNotes?.map((note, index) => (
          <Note onDelete={getAllNotes} key={index} note={note} />
        ))}
          <AddNew
            style={{width: '280px', height: '290px', margin: '2px 0px'}}
            title="Add note"
            state={{
              belongsId: selectedSubject?.id,
              belongsName: selectedSubject ? 'SUBJECT' : undefined,
              selectedSubject,
            }}
          />
      </div>
    </>
  );
};

export default NotesIndexPage;
