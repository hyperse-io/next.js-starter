import { Button, Popover, PopoverContent, PopoverTrigger } from '@heroui/react';
import { Icon } from '@iconify/react';
import { HelpLinks } from './HelpLinks';

export function HelpCenter() {
  return (
    <Popover offset={12} placement="bottom-end">
      <PopoverTrigger>
        <Button
          isIconOnly
          className="overflow-visible"
          radius="full"
          variant="light"
        >
          <Icon
            className="text-default-500"
            icon="solar:question-circle-linear"
            width={24}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-[90vw] p-0 sm:max-w-[380px]">
        <HelpLinks />
      </PopoverContent>
    </Popover>
  );
}
