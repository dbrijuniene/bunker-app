import React from 'react';
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Typography,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useAppDispatch, useRootSelector } from '../store/hooks';
import { resetServerErrorMsg } from '../store/shared-slice';

type AuthFormProps = {
  formTitle: string,
  submitText: string,
  onSubmit?: React.FormEventHandler<HTMLFormElement>,
  onReset?: React.MouseEventHandler<Element>,
  resetText?: string,
  disabled: boolean
};

const contentWidth = 400;

const AuthForm: React.FC<AuthFormProps> = ({
  formTitle,
  submitText,
  onSubmit,
  children,
  onReset,
  resetText,
  disabled,
}) => {
  const loading = useRootSelector((state) => state.shared.loading);
  const serverErrorMsg = useRootSelector((state) => state.shared.serverErrorMsg);
  const dispatch = useAppDispatch();

  return (
    <Container sx={{
      display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'column-reverse', pt: 5,
    }}
    >
      <Paper
        component="form"
        elevation={3}
        sx={{
          display: 'flex',
          mx: 'auto',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
          p: 3,
          width: contentWidth,
        }}
        onSubmit={onSubmit}
      >
        <img style={{ width: '150px', height: '100px' }} src="Bunker_logo.jpg" alt="bunker" />
        <Typography component="h5" variant="h5">{formTitle}</Typography>
        {serverErrorMsg && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Alert
              sx={{
                minWidth: contentWidth - 48,
              }}
              onClose={() => dispatch(resetServerErrorMsg())}
              severity="error"
            >
              {serverErrorMsg}
            </Alert>
          </Box>
        )}
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: 1 / 1,
          my: 2,
        }}
        >
          {children}
        </Box>
        <LoadingButton
          loading={loading}
          disabled={disabled}
          variant="outlined"
          type="submit"
        >
          {submitText}
        </LoadingButton>
        {onReset && (
          <Button variant="text" type="reset" onClick={onReset}>{resetText}</Button>
        )}
      </Paper>
      <img style={{ width: '650px', height: '250px' }} src="organize.webp" alt="organize" />
    </Container>
  );
};

export default AuthForm;
