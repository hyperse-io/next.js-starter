import { LogoAvatar } from '@/components/Logo';
import type { ActiveCustomer } from '@/views/Passport';
import { Tooltip } from '@heroui/react';
import { Icon } from '@iconify/react';

type ProfileInfoProps = {
  activeCustomer: ActiveCustomer;
};

export function ProfileInfo({ activeCustomer }: ProfileInfoProps) {
  return (
    <div className="flex w-full items-center gap-2">
      <LogoAvatar />
      <div className="flex flex-col gap-1">
        <div className="font-semibold">
          Hi, {activeCustomer?.firstName} {activeCustomer?.lastName}
        </div>
        <div className="flex items-center gap-1">
          <span className="text-sm">My Balance</span>
          <Tooltip
            placement="bottom"
            content={
              <div className="text-foreground">
                <div>
                  You have collected <span className="">100</span>
                  reward points
                </div>
                <div>
                  Use your points to get <span className="">$10</span> off your
                  next order.
                </div>
              </div>
            }
          >
            <div className="flex items-center gap-1">
              <div className="text-sm font-bold">$10</div>
              <Icon icon="solar:info-circle-linear" />
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
