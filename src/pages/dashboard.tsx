import React from 'react';
import { Stack, Paper, Typography } from '@mui/material';
import SharedContainer from '../components/shared-container';

const Dashboard: React.FC = () => (
  <SharedContainer>
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={3}
    >
      <img style={{ width: '770px', height: '550px' }} src="mainPhoto.webp" alt="shoping" />
      <Typography variant="h2" sx={{ fontWeight: 700 }}>
        Organize it all with Bunker!
      </Typography>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={4}
      >
        <Paper>
          one
        </Paper>
        <Paper>
          two
        </Paper>
        <Paper>
          three
        </Paper>
      </Stack>
    </Stack>
  </SharedContainer>
);

export default Dashboard;
