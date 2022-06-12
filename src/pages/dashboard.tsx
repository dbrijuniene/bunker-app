import React from 'react';
import {
  Stack, Paper, Typography, List, ListItem, ListItemText, Grid,
} from '@mui/material';
import SharedContainer from '../components/shared-container';

type ListByStatusProps = {
  bgcolor: string,
  label: string,
};

const ListByStatus: React.FC<ListByStatusProps> = ({ bgcolor, label }) => (
  <Paper elevation={3}>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography
          sx={{
            pt: 3,
            pb: 3,
            fontWeight: 700,
            borderRadius: '5px 5px 0px 0px',
          }}
          bgcolor={bgcolor}
          color="primary.light"
          variant="h5"
          component="div"
        >
          {label}
        </Typography>
        <List
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: 300,
            overflow: 'auto',
            height: 350,
          }}
        >
          <ListItem sx={{ textAlign: 'center' }}>
            <ListItemText
              primary="Single-line item"
            />
          </ListItem>
        </List>
      </Grid>
    </Grid>
  </Paper>
);

const Dashboard: React.FC = () => (
  <SharedContainer>
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={3}
    >
      <img style={{ width: '770px', height: '550px' }} src="mainPhoto.webp" alt="shoping" />
      <Typography variant="h2" sx={{ fontWeight: 700, pb: 4 }}>
        Organize it all with Bunker!
      </Typography>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={4}
        style={{ marginBottom: '24px' }}
      >
        <ListByStatus
          bgcolor="#498ac4"
          label="Wish"
        />
        <ListByStatus
          bgcolor="#497738"
          label="Packed"
        />
        <ListByStatus
          bgcolor="#bf3e28"
          label="Expired"
        />

      </Stack>
    </Stack>
  </SharedContainer>
);

export default Dashboard;
