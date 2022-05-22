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
import KeyIcon from '@mui/icons-material/Key';
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
    <Container sx={{ position: 'relative', pt: 20 }}>
      {serverErrorMsg && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Alert
            sx={{
              position: 'absolute',
              top: 0,
              minWidth: contentWidth,
              mt: 12,
            }}
            color="error"
            onClose={() => dispatch(resetServerErrorMsg())}
          >
            {serverErrorMsg}
          </Alert>
        </Box>
      )}
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
        <KeyIcon color="primary" fontSize="large" sx={{ fontSize: 70 }} />
        <Typography component="h5" variant="h5">{formTitle}</Typography>

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
    </Container>
  );
};

export default AuthForm;
