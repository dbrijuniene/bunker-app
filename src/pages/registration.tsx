import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import AuthForm from '../components/auth-form';
import AuthContext from '../features/auth/auth-context';
import { UserRegistration } from '../types';

const RegisterPage: React.FC = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const userRegistration: UserRegistration = {
      name,
      surname,
      email,
      password,
      repeatPassword,
    };

    register(userRegistration);
  };

  const handleReset: React.MouseEventHandler<Element> = (e) => {
    e.preventDefault();

    setName('');
    setSurname('');
    setEmail('');
    setPassword('');
    setRepeatPassword('');

    navigate('/');
  };

  return (
    <AuthForm
      formTitle="Register"
      submitText="Sing up"
      onSubmit={handleSubmit}
      onReset={handleReset}
      resetText="Cancel"
    >
      <TextField
        type="name"
        label="Name"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        type="surname"
        label="Surname"
        fullWidth
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
      />
      <TextField
        type="email"
        label="Email"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        type="password"
        label="Password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        type="password"
        label="Repeat password"
        fullWidth
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
      />
    </AuthForm>
  );
};

export default RegisterPage;
