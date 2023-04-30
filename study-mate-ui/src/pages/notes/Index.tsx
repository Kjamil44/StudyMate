import React, { useEffect, useState } from 'react';
import { INoteModel } from '../../models/INoteModel';
import Note from './Note';

interface Props {
  notes: Array<INoteModel>;
}

const subjects = ['Subject 1', 'Subject 2', 'Subject 3', 'Subject 4', 'Subject 5'];

const NotesIndexPage: React.FC<Props> = ({ notes }) => {
  const [data, setData] = useState();

  useEffect(() => {
    const getAll = async () => {
      const fetchData = async () => {
        const response = await fetch('https://localhost:7273/api/notes/all', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      };
      const data = await fetchData();
      console.log(data);
    };

    getAll();
  });

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
            {subjects.map((subject) => (
              <option value={subject}>{subject}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="row">
        {notes.map((note: INoteModel, index: number) => (
          <Note key={index} note={note} />
        ))}
      </div>
    </div>
  );
};

export default NotesIndexPage;
