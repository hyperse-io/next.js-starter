import { Signout } from '@/components/Signout';
import type { ActiveCustomer } from '@/views/Passport';
import { Badge, cn, Link } from '@heroui/react';

const accountLinks = [
  {
    key: 'myAccount',
    name: 'My Account',
    link: '/account',
  },
  {
    key: 'myOrders',
    name: 'My Orders',
    link: '/account/my-orders',
  },
  {
    key: 'myReferrals',
    name: 'My Referrals',
    link: '/account/my-referrals',
  },
  {
    key: 'myPrescriptions',
    name: 'My Prescriptions',
    link: '/account/my-prescriptions',
  },
  {
    key: 'myAddressBook',
    name: 'My Address Book',
    link: '/account/my-address-book',
  },
];

type ProfileLinksProps = {
  activeCustomer: ActiveCustomer;
};

export function ProfileLinks({ activeCustomer }: ProfileLinksProps) {
  return (
    <div>
      {accountLinks.map((link) => (
        <div
          key={link.link}
          className={cn(
            'border-divider/80 flex min-w-[300px] gap-3 border-b px-6 py-2'
          )}
        >
          {activeCustomer?.myTotalInvitedCustomers &&
          link.key === 'myReferrals' ? (
            <Badge
              size="sm"
              color="secondary"
              showOutline={false}
              content={activeCustomer?.myTotalInvitedCustomers}
            >
              <Link
                href={link.link}
                className="text-small text-foreground/80 hover:text-foreground"
              >
                {link.name}
              </Link>
            </Badge>
          ) : (
            <Link
              href={link.link}
              className="text-small text-foreground/80 hover:text-foreground"
            >
              {link.name}
            </Link>
          )}
        </div>
      ))}
      <Signout className="my-3" />
    </div>
  );
}
