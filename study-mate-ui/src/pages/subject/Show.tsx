import React, { useEffect, useState } from 'react';
import EditNote from '../notes/EditNote';
import { useParams } from 'react-router-dom';
import { GetSubjectReponse, SubjectApi } from '../../api';


interface Props {}

const notes = [
  {
    Id: 1,
    Title: 'Note #1',
    Description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut arcu nec turpis convallis pretium. Fusce egestas sagittis justo non eleifend. Etiam eget mi risus. Proin lacus metus, pretium vel elit non, iaculis dapibus eros.',
    BelongsId: 1,
  },
  {
    Id: 2,
    Title: 'Note #2',
    Description:
      'Lorem ipsum dolor sit amet. Quisque ut arcu nec turpis convallis pretium. Fusce egestas sagittis justo non eleifend. Etiam eget mi risus. Proin lacus metus, pretium vel elit non, iaculis dapibus eros.',
    BelongsId: 1,
  },
];

const ShowSubject: React.FC<Props> = () => {
  const { subject: id } = useParams();
  const [subject, setSubject] = useState<GetSubjectReponse>();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    SubjectApi.getSubject(id)
      .then((response) => response.data)
      .then(setSubject);
  }, [id]);

  const showModal = () => {
    setIsOpen(true);
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
              onClick={showModal}
              className="mt-2 mb-3"
              style={{ padding: '10px', borderRadius: '10px', background: '#B5B5B5', cursor: 'pointer' }}
            >
              <label className="form-label fw-bold">{note.Title}</label>
              <div>{note.Description}</div>
            </div>
          ))}
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
            <EditNote isModal saveNote={noteSaved} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowSubject;
