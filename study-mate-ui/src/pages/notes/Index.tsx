import React, { useEffect, useState } from 'react';
import { GetAllNotesItemResponse, GetAllSubjectsItemResponse, NoteApi, SubjectApi } from '../../api';
import Note from './Note';

interface Props {}

const NotesIndexPage: React.FC<Props> = () => {
  const [notes, setNotes] = useState<GetAllNotesItemResponse[]>();
  const [subjects, setSubjects] = useState<GetAllSubjectsItemResponse[]>();

  useEffect(() => {
    NoteApi.getAllNotes()
      .then((response) => response.data.items)
      .then(setNotes);

    SubjectApi.getAllSubjects()
      .then((response) => response.data.items)
      .then(setSubjects);
  }, []);

  return (
    <div className="container vh-100">
      <div
        className=""
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
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
          <label htmlFor="subjects" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
            Subjects
          </label>
          <select
            name="subjects"
            id="subjects"
            style={{ height: '40px', fontSize: '1.2rem', borderRadius: '10px', cursor: 'pointer' }}
          >
            <option value="All">All</option>
            {subjects?.map((subject) => (
              <option value={subject.id}>{subject.name}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="row">
        {notes?.map((note, index) => (
          <Note key={index} note={note} />
        ))}
      </div>
    </div>
  );
};

export default NotesIndexPage;
