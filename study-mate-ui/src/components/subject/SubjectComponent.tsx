import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../button/Button';
import DeleteConfirmation from './DeleteConfirmation';

interface Subject {
  subjectId: number;
  name: string;
  description: string;
	grade: number,
	start_date: Date,
	end_date: Date,
  status: string
}

interface Props {
  subject: Subject;
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

const SubjectComponent: React.FC<Props> = ({ subject }) => {
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const showDeleteConfirmationHandler = () => {
      setShowDeleteConfirmation(true);
    }

    const deleteHandler = () => {
      console.log("Deleted modal");
    }

    const closeDeleteConfirmationHandler = () => {
      setShowDeleteConfirmation(false);
    }

    return (
      <div className="col-12 col-md-4 col-lg-4 p-3 mb-4" style={{ height: '280px' }}>
        {showDeleteConfirmation && <DeleteConfirmation closeModal={closeDeleteConfirmationHandler} item={subject} actionHandler={deleteHandler}/>}
        <Link
          className="text-decoration-none card bg-secondary bg-opacity-25 border-0 rounded rounded-3 px-5 py-4 h-100 d-flex flex-column justify-content-between mb-2"
          to={{
            pathname: `/subjects/${subject.subjectId}`
          }}
        >
          <div 
            className="text-secondary"
            style={styles}
          >
            {subject.description}
          </div>
          <div className="d-flex justify-content-between">
            <Button className="bg-white mb-2 text-dark" label="Edit"/>
            <Link to=""><Button className="mb-2" buttonType="danger" label="Delete" onClick={showDeleteConfirmationHandler}/></Link>
          </div>
        </Link>
        <div className="fw-bold text-dark mt-2 text-center">
            {subject.name}
          </div>
      </div>
    );
  };

  export default SubjectComponent