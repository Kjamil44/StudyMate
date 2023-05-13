import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GetAllNotesItemResponse, NoteApi } from '../../api';

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

  const handleDeleteNote = (id: string) => {
    NoteApi.deleteNote(id)
      .then(onDelete)
      .then(() => setShowDeleteModal(false));
  };

  const buttons = {
    padding: '5px 20px',
    margin: '0px 20px 0px 20px',
    width: '100%',
    borderRadius: '10px',
    textDecoration: 'none',
    background: 'white',
    cursor: 'pointer',
  };

  return (
    <div className="col-md-4">
      <div className="d-flex justify-content-center align-items-center" style={{ padding: '30px' }}>
        <div className="card bg-secondary bg-opacity-25 rounded rounded-2 p-3" style={{ height: '290px' }}>
          <div className="d-sm-flex justify-content-between mb-2">
            <div className="w-100">
              <label className="form-label fw-bold" style={{ fontSize: '1.5em' }}>
                {note.title}
              </label>
            </div>
          </div>
          <div className="w-100 mb-3" style={{ height: '200px' }}>
            <div style={{ fontSize: '1rem' }}>{note.description}</div>
          </div>
          <div className="d-sm-flex justify-content-between mb-2 w-100">
            <Link to={'edit/' + note.id} style={buttons}>
              <div className="fs-14px fw-bold text-dark">✎ Edit</div>
            </Link>
            <div className="fs-14px fw-bold text-dark" style={buttons} onClick={openDeleteModal}>
              🗑️ Delete
            </div>
          </div>
        </div>
      </div>
      {showDeleteModal && (
        <div
          className="modal"
          style={{
            display: showDeleteModal ? 'flex' : 'none',
            position: 'fixed',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            className="modal-content"
            style={{
              margin: 'auto',
              borderRadius: '5px',
              width: '50%',
              height: 'auto',
              overflow: 'auto',
            }}
            onClick={handleModalClick}
          >
            <div className="p-4">
              <p style={{ fontSize: '1.5rem' }}>
                Are you sure you want to delete <b>{note.title}</b>?
              </p>
              <div style={{ display: 'flex', justifyContent: 'right' }}>
                <div
                  onClick={() => setShowDeleteModal(false)}
                  style={{
                    marginRight: '10px',
                    padding: '10px',
                    width: '100px',
                    textAlign: 'center',
                    background: 'gray',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '10px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </div>
                <button
                  onClick={() => handleDeleteNote(note.id)}
                  style={{
                    marginRight: '20px',
                    padding: '10px',
                    width: '100px',
                    textAlign: 'center',
                    background: 'red',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '10px',
                    fontWeight: 'bold',
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Note;
