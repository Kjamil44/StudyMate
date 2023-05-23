import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  GetAllNotesItemResponse,
  GetNoteReponse,
  GetSubjectReponse,
  NoteApi,
  StatusEnumObject,
  SubjectApi,
} from '../../api';
import EditNote from '../notes/EditNote';
import { formatDate } from '../../utils';
import "./SubjectPage.css";
import "../../components/UI/Buttons.css";

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
        .then(setNotes)
        .catch(() => setNotes([])),
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
    getAllNotes();
  };

  return (
    <div className="subject-details">
        <div>
          <div  className="subject-details__header">

          
          <div className="subject-details__name">{subject?.name}</div>
          <div className="subject-status__container">
            <div className="subject-status" style={subject?.status === 0 ? {backgroundColor: '#d43535', color: 'white'} : subject?.status === 1 ? {backgroundColor: '#e9e94d', color: 'black'} : {backgroundColor: '#30bc5c', color: 'black'}}>{Object.keys(StatusEnumObject)[subject?.status ?? 0]}</div>
          </div>
          </div>
          <div className="subject-details__grade-container">
            <h1 className="subject-details__grade-label">Grade: </h1>
            <div className="subject-details__grade-data">{subject?.grade}</div>
          </div>
        </div>

        <div className="subject-details__date-container">
            <div className='d-flex'>
              <label className="subject-details__label">Start Date: </label>
              <div className="subject-details__date-data">{formatDate(subject?.startDate.toString())}</div>
            </div>
          <div className='d-flex'>
            <label className="subject-details__label">End Date: </label>
            <div className="subject-details__date-data">{formatDate(subject?.endDate.toString())}</div>
          </div>
        </div>
        <div className='subject-details__description-container'>
          <label className="subject-details__label">Description</label>
          <div className="subject-details__description-data">{subject?.description}</div>
        </div>
        <div className="subject-details__notes-container">
          <label className="subject-details__label">Notes</label>
          {notes.map((note) => (
            <div
              onClick={() => handleEditNoteClick(note)}
              className="subject-details__note"
            >
              <label className="subject-details__note-title">{note.title}</label>
              <div className='subject-details__note-description'>{note.description}</div>
            </div>
          ))}

          <Link to="/notes/create" state={{ belongsId: id, belongsName: 'subject' }}>
            <button className='button__edit' style={{width: '100px', height: '48px', padding: '8px', marginLeft: '0px'}}>Add note</button>
          </Link>


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
