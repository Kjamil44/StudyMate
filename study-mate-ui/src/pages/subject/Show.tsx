import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { GetAllNotesItemResponse, GetNoteReponse, GetSubjectReponse, NoteApi, SubjectApi } from '../../api';
import EditNote from '../notes/EditNote';

interface Props {}

const ShowSubject: React.FC<Props> = () => {
  const { subject: id } = useParams();
  const [subject, setSubject] = useState<GetSubjectReponse>();
  const [notes, setNotes] = useState<GetAllNotesItemResponse[]>([]);

  const [editNote, setEditNote] = useState<GetNoteReponse>();

  const [isOpen, setIsOpen] = useState(false);

  const getAllNotes = useCallback(
    () =>
      NoteApi.getAllNotes()
        .then((response) => response.data.items)
        .then((items) => items.filter((item) => item.belongsId === id))
        .then(setNotes),
    [id]
  );

  useEffect(() => {
    if (!id) {
      return;
    }
    SubjectApi.getSubject(id)
      .then((response) => response.data)
      .then(setSubject);

    getAllNotes();
  }, [getAllNotes, id]);

  const handleEditNoteClick = (note: GetNoteReponse) => {
    setIsOpen(true);
    setEditNote(note);
  };

  const handleModalClick = (e: any) => {
    e.stopPropagation();
  };

  const noteSaved = () => {
    setIsOpen(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '90vh' }}>
      <div
        className="card bg-secondary bg-opacity-25 rounded rounded-2 p-3"
        style={{ width: '80%', height: '80%', overflow: 'auto' }}
      >
        <div className="d-sm-flex justify-content-between mb-2">
          <div className="w-100">
            <label className="form-label fw-bold">Name</label>
            <div>
              <div>{subject?.name}</div>
            </div>
          </div>
          <div className="w-100">
            <label className="form-label fw-bold">Grade</label>
            <div>
              <div>{subject?.grade}</div>
            </div>
          </div>
        </div>
        <div className="d-sm-flex justify-content-between mb-2">
          <div className="w-100">
            <label className="form-label fw-bold">Start Date</label>
            <div>{subject?.startDate.toString()}</div>
          </div>
          <div className="w-100">
            <label className="form-label fw-bold">End Date</label>
            <div>{subject?.endDate.toString()}</div>
          </div>
        </div>
        <div className="mb-2">
          <div className="w-100">
            <label className="form-label fw-bold">Status</label>
            <div>{subject?.status}</div>
          </div>
        </div>
        <div className="w-100 mb-3">
          <label className="form-label fw-bold">Description</label>
          <div>{subject?.description}</div>
        </div>
        <div className="w-100 mb-3">
          <label className="form-label fw-bold">Notes</label>
          {notes.map((note) => (
            <div
              onClick={() => handleEditNoteClick(note)}
              className="mt-2 mb-3"
              style={{ padding: '10px', borderRadius: '10px', background: '#B5B5B5', cursor: 'pointer' }}
            >
              <label className="form-label fw-bold">{note.title}</label>
              <div>{note.description}</div>
            </div>
          ))}
          <Link to="/notes/create" state={{ belongsId: id, belongsName: 'subject' }}>
            Add note
          </Link>
        </div>
      </div>
      {isOpen && (
        <div
          className="modal"
          style={{
            display: isOpen ? 'flex' : 'none',
            position: 'fixed',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
          onClick={() => setIsOpen(false)}
        >
          <div
            className="modal-content"
            style={{
              margin: 'auto',
              borderRadius: '5px',
              width: '600px',
              height: '400px',
              overflow: 'auto',
            }}
            onClick={handleModalClick}
          >
            <EditNote isModal note={editNote} saveNote={noteSaved} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowSubject;
