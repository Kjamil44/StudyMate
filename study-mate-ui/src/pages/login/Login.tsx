import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';

import StudyMateLogo from '../../assets/studymate2.png';
import { AuthApi, LoginRequest } from '../../api';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const request: LoginRequest = {
      email: email ?? '',
      password: password ?? '',
    };

    AuthApi.login(request)
      .then((response) => response.data)
      .then((data) => localStorage.setItem('userId', data.userId))
      .then(() => navigate('/subjects'))
      .catch(() => setError('Wrong email or password, try again.'))
  };

  return (
    <div
      className="continaer vh-100"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background:
          'linear-gradient(0deg, rgb(92, 109, 99) 0%, rgba(84,116,111,1) 45%, rgba(0,0,0,0.6278886554621849) 100%)',
      }}
    >
      <div className="row gx-2 rounded-5 col-sm-12 col-md-8 p-2 m-auto bg-white w-50 h-70">
        <div
          style={{ backgroundColor: '#54746F' }}
          className="rounded-5 col-5 d-flex flex-column justify-content-center text-center p-5"
        >
          <img src={StudyMateLogo} alt="Logo" className="w-100" />
          <p className="text-white">
            Stay on top of your studies with ease... organize, prioritize and conquer with <strong>Study Mate!</strong>
          </p>
        </div>
        <div className="col-7 p-5 d-flex flex-column justify-content-center">
          <h1 className="text-center">Login</h1>
          <form className="row g-2" onSubmit={handleSubmit}>
            <Input
              name="email"
              value={email}
              label="EMAIL"
              error={!!error}
              onChange={(event) => {
                setError(undefined);
                setEmail(event.target.value);
              }}
            />
            <Input
              name="password"
              type="password"
              value={password}
              error={!!error}
              label="PASSWORD"
              onChange={(event) => {
                setError(undefined);
                setPassword(event.target.value);
              }}
            />
            <div>
              <Link className="link-secondary" to="/forgot-password">
                Forgot your password?
              </Link>
            </div>
            <div className="text-danger">{error}</div>
            <div>
              <Button label="CONTINUE" fullwidth />
              <Link to="/register">
                <Button buttonType="ghost" label="CREATE ACCOUNT" fullwidth />
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
