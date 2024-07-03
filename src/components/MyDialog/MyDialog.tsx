import type { FC, PropsWithChildren, ReactNode } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/utils';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';

export type MyDialogProps = {
  open: boolean;
  title?: ReactNode;
  onClose: () => void;
  className?: string;
};

export const MyDialog: FC<PropsWithChildren<MyDialogProps>> = ({
  open,
  title,
  onClose,
  children,
  className,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      className={cn(
        'border px-4 pb-10 pt-6 backdrop-blur-md backdrop-saturate-150 dark:bg-background/30'
      )}
      PaperProps={{
        className: 'bg-none m-0',
      }}
    >
      {title ? (
        <DialogTitle className="bg-foreground/5 py-3 pr-10 dark:bg-background/30">
          {title}
        </DialogTitle>
      ) : null}

      <IconButton
        onClick={onClose}
        className="absolute right-3 top-2 z-[1000] dark:text-gray-400"
      >
        <X className="size-4" />
      </IconButton>
      <DialogContent
        className={cn(
          'px-4 pb-10 pt-6 bg-foreground/5 dark:bg-background/30',
          className
        )}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
};
