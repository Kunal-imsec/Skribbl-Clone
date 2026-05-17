import React from 'react';

interface Props {
  avatar: string;
  name: string;
  size?: number;
}

const AvatarDisplay: React.FC<Props> = ({ avatar, name, size = 40 }) => (
  <img
    src={avatar}
    alt={name}
    width={size}
    height={size}
    style={{ borderRadius: '50%', background: '#1e2a4a', flexShrink: 0 }}
  />
);

export default AvatarDisplay;
