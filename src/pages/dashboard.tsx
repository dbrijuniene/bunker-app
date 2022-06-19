import React from 'react';
import {
  Stack, Paper, Typography, List, ListItem, ListItemText, Grid, useMediaQuery,
} from '@mui/material';
import { isBefore } from 'date-fns';
import SharedContainer from '../components/shared-container';
import { useRootSelector } from '../store/hooks';
import { PlacedItem } from '../types/placed-item';
import Status from '../types/status-enum';
import theme from '../styles/theme';

type ListByStatusProps = {
  bgcolor: string,
  label: string,
  items: PlacedItem[],
};

const ListByStatus: React.FC<ListByStatusProps> = ({ bgcolor, label, items }) => (
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
          {items.map((item) => (
            <ListItem key={item.id} sx={{ textAlign: 'center' }}>
              <ListItemText
                primary={item.name}
              />
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  </Paper>
);

const Dashboard: React.FC = () => {
  const items = useRootSelector((state) => state.items);
  const isSmall = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <SharedContainer>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={3}
      >
        <img style={isSmall ? { width: '480px', height: '230px' } : { width: '970px', height: '420px' }} src="dashboardPhoto.jpg" alt="shoping" />
        <Typography variant="h2" sx={isSmall ? { fontSize: '31px', fontWeight: 700, pb: 4 } : { fontWeight: 700, pb: 4 }}>
          Organize it all with Bunker!
        </Typography>
        <Stack
          direction={isSmall ? 'column' : 'row'}
          justifyContent="center"
          alignItems="center"
          spacing={4}
          style={{ marginBottom: '24px' }}
        >
          <ListByStatus
            bgcolor="#498ac4"
            label="Wish"
            items={items.filter((item) => item.status === Status.Wish)}
          />
          <ListByStatus
            bgcolor="#497738"
            label="Packed"
            items={items.filter((item) => isBefore(new Date(), new Date(item.validUntil)) && item.status === Status.Packed)}
          />
          <ListByStatus
            bgcolor="#bf3e28"
            label="Expired"
            items={items.filter((item) => item.status === Status.Packed && !isBefore(new Date(), new Date(item.validUntil)))}
          />

        </Stack>
      </Stack>
    </SharedContainer>
  );
};

export default Dashboard;
