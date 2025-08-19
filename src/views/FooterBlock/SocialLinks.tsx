import { Link } from '@heroui/link';
import type { IconProps } from '@iconify/react';
import { Icon } from '@iconify/react';

type SocialIconProps = Omit<IconProps, 'icon'>;

const social = [
  {
    name: 'Facebook',
    href: '#',
    icon: (props: SocialIconProps) => (
      <Icon {...props} icon="fontisto:facebook" />
    ),
  },
  {
    name: 'Instagram',
    href: '#',
    icon: (props: SocialIconProps) => (
      <Icon {...props} icon="fontisto:instagram" />
    ),
  },
  {
    name: 'Twitter',
    href: '#',
    icon: (props: SocialIconProps) => (
      <Icon {...props} icon="fontisto:twitter" />
    ),
  },
  {
    name: 'GitHub',
    href: '#',
    icon: (props: SocialIconProps) => (
      <Icon {...props} icon="fontisto:github" />
    ),
  },
];
export const SocialLinks = () => {
  return (
    <div className="flex space-x-6">
      {social.map((item) => (
        <Link
          key={item.name}
          isExternal
          className="text-default-500"
          href={item.href}
        >
          <span className="sr-only">{item.name}</span>
          <item.icon aria-hidden="true" className="w-6" />
        </Link>
      ))}
    </div>
  );
};
