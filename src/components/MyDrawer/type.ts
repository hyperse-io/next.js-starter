import type { DrawerProps, SxProps } from '@mui/material';

export type MyDrawerProps = {
  open: boolean;
  title?: string;
  maxWidth?: number | string;
  anchor: Extract<DrawerProps['anchor'], 'left' | 'right' | 'bottom'>;
  onClose: () => void;
  showText?: boolean;
  sx?: SxProps;
  /**
   * Better open performance on mobile.
   * @default true
   */
  keepMounted?: boolean;
};
