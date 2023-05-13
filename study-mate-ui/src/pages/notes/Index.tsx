import React, { useCallback, useEffect, useState } from 'react';
import { GetAllNotesItemResponse, GetAllSubjectsItemResponse, NoteApi, SubjectApi } from '../../api';
import AddNew from '../../components/AddNew';
import Note from './Note';

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
      <div className="row">
        {filteredNotes?.map((note, index) => (
          <Note onDelete={getAllNotes} key={index} note={note} />
        ))}
        <AddNew
          title="Add note"
          state={{
            belongsId: selectedSubject?.id,
            belongsName: selectedSubject ? 'SUBJECT' : undefined,
            selectedSubject,
          }}
        />
      </div>
    </div>
  );
};

export default NotesIndexPage;
