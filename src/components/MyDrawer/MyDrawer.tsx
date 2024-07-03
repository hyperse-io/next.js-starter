import type { FC, PropsWithChildren } from 'react';
import { X } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { Divider, Drawer, IconButton, Typography } from '@mui/material';
import { MyDrawerHeader } from './MyDrawerHeader';
import type { MyDrawerProps } from './type';

export const MyDrawer: FC<PropsWithChildren<MyDrawerProps>> = ({
  open,
  title,
  anchor,
  maxWidth = 400,
  onClose,
  children,
  keepMounted = true,
  showText = true,
  sx,
}) => {
  return (
    <Drawer
      sx={{
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#0F1023' : '#f6f6f6',
          maxWidth: anchor === 'bottom' ? 'auto' : maxWidth,
          overflow: 'hidden',
          width:
            anchor === 'bottom'
              ? '100%'
              : {
                  xs: '90%',
                  sm: '70%',
                },
          boxSizing: 'border-box',
        },
        ...sx,
      }}
      ModalProps={{
        // Better open performance on mobile.
        keepMounted,
      }}
      anchor={anchor}
      open={open}
      onClose={onClose}
    >
      <MyDrawerHeader className="bg-white dark:bg-slate-900">
        <div
          style={{
            display: 'flex',
            flex: 1,
            alignItems: 'center',
          }}
        >
          <Logo showText={showText} />
          {title ? (
            <Typography
              component={'h3'}
              variant="body2"
              className="text-lg font-semibold dark:text-white"
            >
              {title}
            </Typography>
          ) : null}
        </div>
        <IconButton onClick={onClose} className="dark:text-gray-400">
          <X className="size-4 cursor-pointer text-primary hover:scale-105" />
        </IconButton>
      </MyDrawerHeader>
      <Divider />
      {children}
    </Drawer>
  );
};
