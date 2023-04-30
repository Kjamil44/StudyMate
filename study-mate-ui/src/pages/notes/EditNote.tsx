import React from 'react';
import Login from '../login/Login';
import Input from '../../components/input/Input';

type EditNoteProps = {
  isModal: boolean;
  saveNote?: () => void;
};

const EditNote = ({ isModal, saveNote }: EditNoteProps) => {
  const save = () => {
    saveNote && saveNote();
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '90vh' }}>
      <div
        className="card bg-secondary bg-opacity-25 rounded rounded-2 p-3"
        style={{
          width: isModal ? '100%' : '50%',
          height: isModal ? '100%' : 'auto',
        }}
      >
        <div className="d-sm-flex justify-content-between mb-2">
          <div className="me-sm-1 w-100">
            <label className="form-label">Title</label>
            <div>
              <input name="title" className="w-100" />
            </div>
          </div>
        </div>
        <div className="w-100 mb-3">
          <label className="form-label">Description</label>
          <div>
            <textarea name="due_date" className="w-100" rows={8} />
          </div>
        </div>
        <button className="text-center border-0 text-white py-2 bg-secondary rounded-3" onClick={save}>
          Save Note
        </button>
      </div>
    </div>
  );
};

export default EditNote;
