'use client';

import { styled } from '@mui/material';

export const MyDrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  // ...theme.mixins.toolbar,
  minHeight: 50,
  justifyContent: 'flex-end',
}));
