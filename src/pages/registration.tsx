import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField } from '@mui/material';
import AuthForm from '../components/auth-form';
import AuthContext from '../features/auth/auth-context';
import { UserRegistration } from '../types';

const RegisterPage: React.FC = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      repeatPassword: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, 'Must be at least 2 characters')
        .required('Required'),
      email: Yup.string()
        .email('Invalid email adress')
        .required('Required'),
      password: Yup.string()
        .min(8, 'Must be at least 8 characters')
        .required('Requider'),
      repeatPassword: Yup.string()
        .min(8, 'Must be at least 8 characters')
        .required('Requider')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    }),

    onSubmit: (values) => {
      const userRegistration: UserRegistration = {
        name: values.name,
        email: values.email,
        password: values.password,
        repeatPassword: values.repeatPassword,
      };

      register(userRegistration);
    },

    onReset: () => navigate('/'),
  });

  return (
    <AuthForm
      formTitle="Register"
      submitText="Sing up"
      onSubmit={formik.handleSubmit}
      onReset={formik.handleReset}
      disabled={!(formik.isValid && formik.dirty)}
      resetText="Cancel"
    >
      <TextField
        id="name"
        name="name"
        type="text"
        label="Name"
        fullWidth
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />
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
      <TextField
        id="repeatPassword"
        name="repeatPassword"
        type="password"
        label="Repeat password"
        fullWidth
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.repeatPassword}
        error={formik.touched.repeatPassword && Boolean(formik.errors.repeatPassword)}
        helperText={formik.errors.repeatPassword && formik.errors.repeatPassword}
      />
    </AuthForm>
  );
};

export default RegisterPage;
