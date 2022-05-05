import React, { useState, useContext } from 'react';
import { TextField } from '@mui/material';
import AuthForm from '../components/auth-form';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string | number>('');
  const [repeatPassword, setRepeatPassword] = useState<string | number>('');

  const handleRegister: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  return (
    <AuthForm
      formTitle="Register"
      submitText="Sing up"
      onSubmit={handleRegister}
    >
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
