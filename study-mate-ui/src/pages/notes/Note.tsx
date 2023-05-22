import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GetAllNotesItemResponse, NoteApi } from '../../api';
import DeleteConfirmation from '../../components/UI/DeleteConfirmation';
import "../../components/UI/Buttons.css"
import "./Note.css"

interface NoteProps {
  note: GetAllNotesItemResponse;
  onDelete?: () => void;
}

const Note: React.FC<NoteProps> = ({ note, onDelete }: NoteProps) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const handleModalClick = (e: any) => {
    e.stopPropagation();
  };

  const handleDeleteNote = () => {
    console.log(note.id, note);
      NoteApi.deleteNote(note.id)
        .then(onDelete)
        .finally(() => setShowDeleteModal(false));
  };



  return (
    <div className="notes">
        <div className="note__container" style={{ height: '290px' }}>
          <div className="note__title" style={note.title.length < 16 ? { fontSize: '24px' } : { fontSize: '16px' }}>
            {note.title}
          </div>
          <div className='note__description'>{note.description}</div>
          <div className="note__buttons">
            <Link className='button__edit note__button' to={'edit/' + note.id} >
              Edit
            </Link>
            <div className="button__delete note__button"  onClick={openDeleteModal}>
              Delete
            </div>
          </div>
        </div>
      {showDeleteModal && (
        // <div
        //   className="modal"
        //   style={{
        //     display: showDeleteModal ? 'flex' : 'none',
        //     position: 'fixed',
        //     justifyContent: 'center',
        //     alignItems: 'center',
        //     width: '100%',
        //     height: '100%',
        //     backgroundColor: 'rgba(0, 0, 0, 0.5)',
        //   }}
        //   onClick={() => setShowDeleteModal(false)}
        // >
        //   <div
        //     className="modal-content"
        //     style={{
        //       margin: 'auto',
        //       borderRadius: '5px',
        //       width: '50%',
        //       height: 'auto',
        //       overflow: 'auto',
        //     }}
        //     onClick={handleModalClick}
        //   >
        //     <div className="p-4">
        //       <p style={{ fontSize: '1.5rem' }}>
        //         Are you sure you want to delete <b>{note.title}</b>?
        //       </p>
        //       <div style={{ display: 'flex', justifyContent: 'right' }}>
        //         <div
        //           onClick={() => setShowDeleteModal(false)}
        //           style={{
        //             marginRight: '10px',
        //             padding: '10px',
        //             width: '100px',
        //             textAlign: 'center',
        //             background: 'gray',
        //             color: 'white',
        //             textDecoration: 'none',
        //             borderRadius: '10px',
        //             fontWeight: 'bold',
        //             cursor: 'pointer',
        //           }}
        //         >
        //           Cancel
        //         </div>
        //         <button
        //           onClick={() => handleDeleteNote(note.id)}
        //           style={{
        //             marginRight: '20px',
        //             padding: '10px',
        //             width: '100px',
        //             textAlign: 'center',
        //             background: 'red',
        //             color: 'white',
        //             textDecoration: 'none',
        //             borderRadius: '10px',
        //             fontWeight: 'bold',
        //           }}
        //         >
        //           Delete
        //         </button>
        //       </div>
        //     </div>
        //   </div>
        // </div>
        <DeleteConfirmation closeModal={() => setShowDeleteModal(false)} item={note.title} actionHandler={handleDeleteNote}/>
      )}
    </div>
  );
};

export default Note;
