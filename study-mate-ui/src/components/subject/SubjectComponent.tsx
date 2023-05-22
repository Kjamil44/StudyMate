import React, { useState } from 'react';
import Button from '../button/Button';
import DeleteConfirmation from '../UI/DeleteConfirmation';
import { GetAllSubjectsItemResponse, SubjectApi } from '../../api';
import "../UI/Buttons.css";
import "./SubjectComponent.css"
import { useNavigate } from 'react-router-dom';

interface Props {
  subject: GetAllSubjectsItemResponse;
  deleteSubject?: (subjectId: number) => void
  onDelete: () => void;
}

const styles = {
    overflow: 'hidden',
    lineHeight: '2rem',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    maxHeight: '8rem',
    textOverflow: 'ellipsis',
    WebkitLineClamp: 4
  } as any;

const SubjectComponent: React.FC<Props> = ({ subject, onDelete }) => {
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const navigate = useNavigate();

    const subjectDetailsHandler = () => {
      navigate(`${subject.id}`);
    }

    const subjectEditHandler = () => {
      navigate(`${subject.id}/edit`);
    }

    const showDeleteConfirmationHandler = () => {
      setShowDeleteConfirmation(true);
      
    }

    const deleteHandler = () => {
      closeDeleteConfirmationHandler();
      SubjectApi.deleteSubject(subject.id).then(onDelete);
    }

    const closeDeleteConfirmationHandler = () => {
      setShowDeleteConfirmation(false);
    }

    return (
      <div className="subject__container col-12 col-md-4 col-lg-4 mb-4" onClick={subjectDetailsHandler}>
        {showDeleteConfirmation && <DeleteConfirmation closeModal={closeDeleteConfirmationHandler} item={subject.name} actionHandler={deleteHandler}/>}
        <div className="subject__name">
            {subject.name}
        </div>
          <div 
            className="subject__description"
            style={styles}
          >
            {subject.description}
          </div>
          <div className="subject__buttons">
            <Button className="subject__buttons-edit button__edit " label="Edit" onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              subjectEditHandler();
            }}/>
            <Button className="subject__buttons-delete button__delete" buttonType="danger" label="Delete" onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              showDeleteConfirmationHandler();

            }}/>
          </div>
      </div>
    );
  };

  export default SubjectComponent