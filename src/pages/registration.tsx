import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import AuthForm from '../components/auth-form';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string | number>('');
  const [repeatPassword, setRepeatPassword] = useState<string | number>('');

  const handleRegister: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  const handleCancel: React.MouseEventHandler<Element> = (e) => {
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
      onSubmit={handleRegister}
      onCancel={handleCancel}
      cancelText="Cancel"
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
