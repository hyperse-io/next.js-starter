'use client';

import { useAppTheme } from '@/hooks';
import type { RadioGroupProps, RadioProps } from '@heroui/react';
import {
  Button,
  RadioGroup,
  useRadio,
  useRadioGroupContext,
  VisuallyHidden,
} from '@heroui/react';
import { cn } from '@heroui/react';
import { Icon } from '@iconify/react';

const ThemeRadioItem = ({ icon, ...props }: RadioProps & { icon: string }) => {
  const {
    Component,
    isSelected: isSelfSelected,
    getBaseProps,
    getInputProps,
  } = useRadio(props);

  const groupContext = useRadioGroupContext();

  const isSelected =
    isSelfSelected ||
    Number(groupContext.groupState.selectedValue) >= Number(props.value);

  return (
    <Component {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <Button
        isIconOnly
        radius="full"
        variant="light"
        className={cn(
          'pointer-events-none transition-transform group-data-[pressed=true]:scale-90',
          {
            'bg-default-200 dark:bg-default-100': isSelected,
          }
        )}
      >
        <Icon className="text-default-500" icon={icon} width={18} />
      </Button>
    </Component>
  );
};

export const ThemeSwitch = ({
  ref,
  classNames = {},
  ...props
}: RadioGroupProps) => {
  const { currentTheme, setTheme, mounted } = useAppTheme();
  if (!mounted) {
    return null;
  }
  return (
    <RadioGroup
      ref={ref}
      aria-label="Select a theme"
      classNames={{
        ...classNames,
        wrapper: cn('items-center gap-2', classNames?.wrapper),
      }}
      value={currentTheme}
      orientation="horizontal"
      {...props}
    >
      <ThemeRadioItem
        icon="solar:moon-linear"
        value="dark"
        onChange={() => setTheme('dark')}
      />
      <ThemeRadioItem
        icon="solar:sun-2-linear"
        value="light"
        onChange={() => setTheme('light')}
      />
      <ThemeRadioItem
        icon="solar:monitor-linear"
        value="system"
        onChange={() => setTheme('system')}
      />
    </RadioGroup>
  );
};
