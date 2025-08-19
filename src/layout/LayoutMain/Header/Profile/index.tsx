import { usePassport } from '@/views/Passport/PassportModal';
import { SigninForm } from '@/views/Passport/SigninForm';
import {
  Avatar,
  Button,
  cn,
  Divider,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { ProfileInfo } from './ProfileInfo';
import { ProfileLinks } from './ProfileLinks';

export function Profile() {
  const { activeCustomer } = usePassport();

  return (
    <Popover offset={12} placement="bottom-end">
      <PopoverTrigger>
        <Button
          isIconOnly
          disableRipple
          className="overflow-visible"
          radius="full"
          variant="light"
        >
          <Avatar
            size="sm"
            src={''}
            showFallback
            fallback={
              <Icon
                icon="mdi:account"
                width="24"
                height="24"
                className={cn(
                  'text-primary',
                  activeCustomer ? 'text-primary' : 'text-default-500'
                )}
              />
            }
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-xs pt-4">
        {activeCustomer ? (
          <>
            <ProfileInfo activeCustomer={activeCustomer} />
            <Divider className="my-2" />
            <ProfileLinks activeCustomer={activeCustomer} />
          </>
        ) : (
          <SigninForm shortTitle onLoginSuccess={() => {}} />
        )}
      </PopoverContent>
    </Popover>
  );
}
