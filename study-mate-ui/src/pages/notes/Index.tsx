import React, { useCallback, useEffect, useState } from 'react';
import { GetAllNotesItemResponse, GetAllSubjectsItemResponse, NoteApi, SubjectApi } from '../../api';
import Note from './Note';
import { Link } from 'react-router-dom';
import AddNew from '../../components/AddNew';

interface Props {}

const NotesIndexPage: React.FC<Props> = () => {
  const [notes, setNotes] = useState<GetAllNotesItemResponse[]>();
  const [subjects, setSubjects] = useState<GetAllSubjectsItemResponse[]>();
  const [selectedSubject, setSelectedSubject] = useState<string>('All');

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
      .then((items) => {
        setSelectedSubject(items[0].id);
        setSubjects(items);
      });
  }, [getAllNotes]);

  const handleSelectedSubjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubject(event.target.value);
  };

  const filteredNotes = notes?.filter((note) => selectedSubject === 'All' || note.belongsId === selectedSubject);

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
            value={selectedSubject}
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
        <AddNew title="Add note" />
      </div>
    </div>
  );
};

export default NotesIndexPage;
