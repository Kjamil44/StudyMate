import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SubjectComponent from '../../components/subject/SubjectComponent';


interface Subject {
  subjectId: number;
  name: string;
  description: string;
  grade: number;
  start_date: Date;
  end_date: Date;
  status: string;
}

const DUMMY_SUBJECTS = [
  {
    subjectId: 1,
    name: 'Mathematics',
    description: 'The study of numbers, quantities, and shapes.',
    start_date: new Date(),
    grade: 5,
    end_date: new Date(),
    status: '',
  },
  {
    subjectId: 2,
    name: 'Science',
    description:
      'The study of the natural world, including physics, chemistry, and biology. The study of the natural world, including physics, chemistry, and biology. The study of the natural world, including physics, chemistry, and biology. The study of the natural world, including physics, chemistry, and biology.',
    start_date: new Date(),
    grade: 5,
    end_date: new Date(),
    status: '',
  },
  {
    subjectId: 3,
    name: 'History',
    description: 'The study of past events and their significance.',
    start_date: new Date(),
    grade: 5,
    end_date: new Date(),
    status: '',
  },
  {
    subjectId: 4,
    name: 'English',
    description: 'The study of language, literature, and writing.',
    start_date: new Date(),
    grade: 5,
    end_date: new Date(),
    status: '',
  },
];

let isInitial = true;

const SubjectIndexPage: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>(DUMMY_SUBJECTS);

  const deleteSubjectHandler = async (subjectId: number) => {
      try {
        const response = await fetch('https://localhost:7273/api/subjects/delete/' + subjectId, {
          method: 'DELETE',
        });

        if(!response.ok) {
          throw new Error("Could not delete subject.");
        }
        setSubjects(prevState => prevState.filter(s => s.subjectId != subjectId));
      } catch (error) {
        console.log(error);
      }
  }

  useEffect(() => {
    const getAll = async () => {
      const fetchData = async () => {
        const response = await fetch('https://localhost:7273/api/subjects/all', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      };
      const data = await fetchData();
      console.log(data);
    };

    getAll();
  });

  useEffect(() => {
    if(isInitial) {
      isInitial = false;
      return;
    }
    //Save subjects in the backend after every change in the subject array EXCEPT FOR THE INITIAL (when we apply the state)
    //Mora vaka poso ako nema isInitial, togas pri deklaracija na useState so subjects kje se naprai infinite loop.
  }, [subjects])

  const borderDashed = {
    border: '0.5px dashed #4e4e4e',
  };
  return (
    <div className="container vh-100">
      <div className="row">
        {subjects.map((subject, i) => (
          <SubjectComponent key={i} subject={subject} deleteSubject={deleteSubjectHandler} />
        ))}
        <div className="col-12 col-md-4 col-lg-4 p-3 cursor-pointer">
          <Link
            className="text-decoration-none d-flex flex-column justify-content-center align-items-center rounded rounded-3 h-100 w-100 p-5"
            style={borderDashed}
            to={'create'}
          >
            <div className="mb-1 bg-success text-dark rounded rounded-circle px-2 d-flex align-items-center justify-content-center">
              +
            </div>
            <div className="fs-14px fw-bold text-dark">Add subject</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SubjectIndexPage;
