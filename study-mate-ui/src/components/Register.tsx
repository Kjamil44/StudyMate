import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CreateUserRequest, UserApi } from '../api';
import Logo from '../assets/studymate2.png';
import useInput from '../hooks/useInput';
import './Register.css';

const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
};

const Register: React.FC = () => {
    const [signupError, setSignupError] = useState<null | string>(null);
    const [successfulSignup, setSuccessfulSignup] = useState<boolean>(false);
    const navigate = useNavigate();


  const {
    value: enteredName,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: nameResetHandler,
  } = useInput((value) => value?.trim().length != 0);

  const {
    value: enteredSurname,
    isValid: surnameIsValid,
    hasError: surnameHasError,
    valueChangeHandler: surnameChangeHandler,
    inputBlurHandler: surnameBlurHandler,
    reset: surnameResetHandler,
  } = useInput((value) => value?.trim().length != 0);

  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailResetHandler,
  } = useInput((value) => validateEmail(value));

  const {
    value: enteredPassword,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: passwordResetHandler,
  } = useInput((value: any) => value.trim().length >= 8);

  const {
    value: enteredRepeatPassword,
    isValid: repeatPasswordIsValid,
    hasError: repeatPasswordHasError,
    valueChangeHandler: repeatPasswordChangeHandler,
    inputBlurHandler: repeatPasswordBlurHandler,
    reset: repeatPasswordResetHandler,
  } = useInput((value) => value === enteredPassword);

    let formIsValid = false;
    if(emailIsValid && passwordIsValid && repeatPasswordIsValid && nameIsValid && surnameIsValid){
        formIsValid = true;
    }

    const submitFormHandler = (event: React.FormEvent) => {
      event.preventDefault();
      if (!formIsValid || enteredPassword !== enteredRepeatPassword) {
        return;
      }

      const request: CreateUserRequest = {
        name: enteredName ?? '',
        surname: enteredSurname ?? '',
        email: enteredEmail ?? '',
        password: enteredPassword ?? '',
      };

      UserApi.createUser(request)
        .then((response) => response.data)
        .then((data) => localStorage.setItem('userId', data.userId))
        .then(() => navigate('/subjects'))
        .catch(() => setSignupError(`Email ${enteredEmail} already exists!`));
    }


  return (
    <div className='page'>    
    <div className='container-custom-class'>
    <div className='logo-container'>
        <img className='logo' src={Logo} alt='logo'/>
        <p className='slogan'>Stay on top of your studies with ease... <br />
        ... organize, prioritize and conquer with <span className='slogan-bold'>Study Mate!</span>
        </p>
    </div>
    <form className='input-form' onSubmit={submitFormHandler}>
        <h1 className='title'>SIGN UP</h1>
        <div className='input-field__double'>
            <div className='input-field__double-container'>
                <label htmlFor='name' className='label'>NAME</label>
                <input className='input' type='text' id='name' onChange={nameChangeHandler} onBlur={nameBlurHandler}/>
                {nameHasError && <p className='invalid'>Invalid name.</p> }
            </div>
            <div className='input-field__double-container'>
                <label htmlFor='surname' className='label'>SURNAME</label>
                <input className='input' type='text' id='surname' onChange={surnameChangeHandler} onBlur={surnameBlurHandler}/>
                {surnameHasError && <p className='invalid'>Invalid surname.</p> }
            </div>
        </div>

        <div className='input-field'>
            <label htmlFor='email' className='label'>EMAIL</label>
            <input className='input' type='email' id='email' onChange={emailChangeHandler} onBlur={emailBlurHandler}/>
            {emailHasError && <p className='invalid'>Invalid email.</p> }
        </div>
        <div className='input-field'>
            <label htmlFor='password' className='label'>PASSWORD</label>
            <input className='input' type='password' id='password' onChange={passwordChangeHandler} onBlur={passwordBlurHandler}/>
            {passwordHasError && <p className='invalid'>Password must contain atleast 8 characters.</p> }
        </div>
        <div className='input-field'>
            <label htmlFor='repeat-password' className='label'>REPEAT PASSWORD</label>
            <input className='input' type='password' id='repeat-password' onChange={repeatPasswordChangeHandler} onBlur={repeatPasswordBlurHandler}/>
            {repeatPasswordHasError && <p className='invalid'>Password does not match.</p> }
        </div>

        {signupError && <p className='invalid'>{signupError}</p>}
        <button className={'button__sign-up'} disabled={!formIsValid}>CREATE ACCOUNT</button>
        <p style={{ textAlign: 'center' }}>Alreade have an account? <Link to='/login'>Log in</Link></p>

        {successfulSignup &&
        <div>
            <p className='success'>Account created successfully! Please <Link to='/login'>log in.</Link></p>
        </div>
        }
    </form>
    </div>
    </div>
  )
}

export default Register