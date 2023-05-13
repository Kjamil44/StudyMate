import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { GetNoteReponse, NoteApi, UpdateNoteRequest } from '../../api';
import { useNavigate } from 'react-router-dom';

type EditNoteProps = {
  isModal: boolean;
  note?: GetNoteReponse;
  saveNote?: () => void;
};

type UpdateNoteRequestForm = {
  [T in keyof UpdateNoteRequest]: { value?: any };
};


const EditNote = ({ isModal, saveNote, note: propNote }: EditNoteProps) => {
  const [note, setNote] = useState<GetNoteReponse | undefined>(propNote);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (note) {
      return;
    }

    if (!id) {
      throw new Error("Can't edit note");
    }

    NoteApi.getNote(id)
      .then((response) => response.data)
      .then(setNote);
  }, [note, id]);

  const save = (event: React.SyntheticEvent) => {
    if (!note?.id) {
      return;
    }

    event.preventDefault();
    const values = event.target as unknown as UpdateNoteRequestForm;
    const request: UpdateNoteRequest = {
      id: note?.id ?? id,
      title: values.title.value ?? '',
      description: values.description.value ?? ''
    };

    NoteApi.updateNote(note?.id ?? id, request).then(saveNote).then(x => navigate(-1));
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
        <form onSubmit={save}>
          <div className="d-sm-flex justify-content-between mb-2">
            <div className="me-sm-1 w-100">
              <label className="form-label">Title</label>
              <div>
                <input name="title" defaultValue={note?.title} className="w-100" />
              </div>
            </div>
          </div>
          <div className="w-100 mb-3">
            <label className="form-label">Description</label>
            <div>
              <textarea name="description" defaultValue={note?.description} className="w-100" rows={8} />
            </div>
          </div>
          <button className="text-center border-0 text-white py-2 bg-secondary rounded-3">
            Save Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditNote;
