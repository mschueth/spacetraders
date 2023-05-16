import * as React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
}  from '@mui/material';

import {
  RocketLaunchTwoTone,

  BlurOnTwoTone,
  PodcastsTwoTone,

  DangerousTwoTone,
  ReportProblemTwoTone,

  DeleteForeverTwoTone,
  DoneOutlineTwoTone,
  
  SettingsInputComponentTwoTone,
  DisplaySettingsTwoTone,

  FingerprintTwoTone,
  KeyTwoTone,

  NotificationImportantTwoTone,
  NotificationsNoneTwoTone,

} from '@mui/icons-material';

export default function HomePage() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1">
          Home Page
        </Typography>
      </Box>
    </Container>
  );
}