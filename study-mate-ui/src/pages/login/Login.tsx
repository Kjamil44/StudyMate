import { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';

import StudyMateLogo from '../../assets/studymate2.png';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(email);
    console.log(password);

    setError('Wrong email or password, try again.');
  };

  return (
    <div className="row gx-2 rounded-5 col-sm-12 col-md-8 p-2 m-auto">
      <div
        style={{ backgroundColor: '#54746F' }}
        className="rounded-5 col-5 d-flex flex-column justify-content-center text-center p-5"
      >
        <img src={StudyMateLogo} alt="Logo" className="w-100" />
        <p className="text-white">
          Stay on top of your students with ease... organize, prioritize and
          conquer with <strong>Study Mate!</strong>
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
            <Link className="link-secondary" to="/forgot-password">Forgot your password?</Link>
          </div>
          <div className="text-danger">{error}</div>
          <div>
            <Button label="CONTINUE" fullwidth />
            <Button buttonType="ghost" label="CREATE ACCOUNT" fullwidth />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;