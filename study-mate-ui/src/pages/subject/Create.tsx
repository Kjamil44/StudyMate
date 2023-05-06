import React, { useState } from 'react';
import Login from '../login/Login';
import Input from '../../components/input/Input';
import { Form } from 'react-router-dom';

const taskStatuses = [
  {
    id: 0,
    name: 'To do',
  },
  {
    id: 1,
    name: 'Doing',
  },
  {
    id: 2,
    name: 'Done',
  },
];

const CreateSubject = () => {
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("0");
  const [description, setDescription] = useState("");

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //We can do the validation here

    //And after validation the following code below
    const newSubject = {
      name: name,
      grade: parseInt(grade),
      startDate: startDate,
      endDate: endDate,
      status: parseInt(status),
      description: description
    };

    console.log(JSON.stringify(newSubject));

    try {
      const response = await fetch('https://localhost:7273/api/subjects/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSubject)
      });

      if(!response.ok) {
        throw new Error(response.statusText)
      }

      setName("");
      setGrade("");
      setStartDate("");
      setEndDate("");
      setStatus("");
      setDescription("");


    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={submitHandler} className="d-flex justify-content-center align-items-center" style={{ height: '90vh' }}>
      <div className="card bg-secondary bg-opacity-25 rounded rounded-2 p-3">
        <div className="d-sm-flex justify-content-between mb-2">
          <div className="me-sm-1 w-100">
            <label className="form-label">Name</label>
            <div>
              <input name="name" className="w-100" required onChange={(event) => setName(event.target.value)} value={name}/>
            </div>
          </div>
          <div className="ms-sm-1 w-100">
            <label className="form-label">Grade</label>
            <div>
              <input name="grade" type="number" className="w-100" required onChange={(event) => setGrade(event.target.value)} value={grade}/>
            </div>
          </div>
        </div>
        <div className="d-sm-flex justify-content-between mb-2">
          <div className="me-sm-1 w-100">
            <label className="form-label">Start Date</label>
            <div>
              <input name="start_date" type='date' className="w-100" required onChange={(event) => setStartDate(event.target.value)} value={startDate}/>
            </div>
          </div>
          <div className="ms-sm-1 w-100">
            <label className="form-label">End Date</label>
            <div>
              <input name="end_date" type="date" className="w-100" required onChange={(event) => setEndDate(event.target.value)} value={endDate}/>
            </div>
          </div>
        </div>
        <div className="mb-2">
          <div className="w-100">
            <label className="form-label">Status</label>
            <div>
              <select name="priority_level" className="w-100" onChange={(event) => setStatus(event.target.value)} value={status}>
                {taskStatuses.map((status) => (
                  <option key={status.id} value={status.id}>{status.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="w-100 mb-3">
          <label className="form-label">Description</label>
          <div>
            <textarea name="description" className="w-100" required onChange={(event) => setDescription(event.target.value)} value={description}/>
          </div>
        </div>
        <button className='text-center border-0 text-white py-2 bg-secondary rounded-3'>
          Add Subject
        </button>
      </div>
    </form>
  );
};

export default CreateSubject;
