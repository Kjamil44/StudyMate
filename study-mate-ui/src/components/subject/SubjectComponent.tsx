import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../button/Button';

interface Subject {
  subjectId: number;
  title: string;
  description: string;
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
    return (
      <div className="col-12 col-md-4 col-lg-4 p-3 mb-4" style={{ height: '280px' }}>
        <Link
          className="text-decoration-none card bg-secondary bg-opacity-25 border-0 rounded rounded-3 px-5 py-4 h-100 d-flex flex-column justify-content-between mb-2"
          to={{
            pathname: `/show-card/${subject.subjectId}`
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
            <Button className="mb-2" buttonType="danger" label="Delete"/>
          </div>
        </Link>
        <div className="fw-bold text-dark mt-2 text-center">
            {subject.title}
          </div>
      </div>
    );
  };

  export default SubjectComponent