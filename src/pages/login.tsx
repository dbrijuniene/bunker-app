import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import AuthForm from '../components/auth-form';
import AuthContext from '../features/auth/auth-context';
import { Crudentials } from '../types';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email adress')
        .required('Required'),
      password: Yup.string()
        .required('Requider'),
    }),

    onSubmit: (values) => {
      const crudential: Crudentials = {
        email: values.email,
        password: values.password,
      };

      login(crudential, '/dashboard');
    },

    onReset: () => navigate('/registration'),
  });

  return (
    <AuthForm
      formTitle="Login"
      submitText="Login"
      onSubmit={formik.handleSubmit}
      onReset={formik.handleReset}
      disabled={!(formik.isValid && formik.dirty)}
      resetText="Sign up"
    >
      <TextField
        id="email"
        name="email"
        type="text"
        label="Email"
        fullWidth
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <TextField
        id="password"
        name="password"
        type="password"
        label="Password"
        fullWidth
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.errors.password && formik.errors.password}
      />
    </AuthForm>
  );
};

export default LoginPage;
