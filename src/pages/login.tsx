import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import AuthContext from '../features/auth/auth-context';
import AuthForm from '../components/auth-form';

const LoginPage: React.FC = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    login({ email, password }, '/dashboard');
  };

  const handleCancel: React.MouseEventHandler = (e) => {
    e.preventDefault();
    navigate('/registration');
  };

  return (
    <AuthForm
      formTitle="Login"
      submitText="Login"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      cancelText="Sign up"
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
    </AuthForm>
  );
};

export default LoginPage;
