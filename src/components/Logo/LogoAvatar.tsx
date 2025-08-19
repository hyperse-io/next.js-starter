import { useAvatar } from '@heroui/avatar';
import { Logo } from './Logo';

type LogoAvatarProps = {
  size?: 'sm' | 'md' | 'lg';
};
export const LogoAvatar = (props: LogoAvatarProps) => {
  const { size = 'sm' } = props;
  const { getAvatarProps } = useAvatar({
    isBordered: true,
    size,
  });
  return (
    <div {...getAvatarProps()}>
      <Logo size={24} />
    </div>
  );
};
